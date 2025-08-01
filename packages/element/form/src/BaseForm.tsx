// import { withModifiers } from 'vue';
import { useExpose, useFormConfig as useGlobalFormConfig } from '@ideaz/hooks'
import { cloneDeep, omit } from 'lodash-unified'
import { Plus } from '@element-plus/icons-vue'
import { getContentByRenderAndSlot } from '@ideaz/shared'
import { useVModel } from '@vueuse/core'
import { isFunction, isString } from '@ideaz/utils'
import type { CollapseModelValue, FormRules } from 'element-plus'
import { ElButton, ElCollapse, ElCollapseItem, ElDivider, ElForm, ElFormItem, ElMessage, ElStep, ElSteps } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import { draggable } from '../../../directives'
import type { FormColumn } from '../../types'
import {
  useDraggable,
  useFormConfig,
  useFormItems,
  useFormMethods,
  useRow,
} from './hooks'
import { FORM_FILTER_KEYS, FORM_ITEM_FILTER_KEYS, formProps, formProvideKey } from './props'
import FormColumns from './FormColumns'
import OperationCard from './OperationCard'
import ZFormItem from './FormItem'

export default defineComponent({
  name: 'ZForm',
  components: { FormColumns, OperationCard, ZFormItem },
  props: formProps,
  directives: { draggable },
  emits: ['input', 'update:modelValue', 'change', 'update:activeCollapse', 'collapse-change', 'next-step', 'previous-step', 'update:activeStep', 'submit', 'update:columns'],
  setup(props, { emit, slots }) {
    // 合并全局配置和用户传入的 props
    const mergedProps = useGlobalFormConfig(props)

    const { formatFormItems } = useFormItems(mergedProps)
    const { rowStyle, rowKls } = useRow(mergedProps)
    const { formConfig } = useFormConfig(mergedProps)
    const {
      resetFields,
      validate,
      validateField,
      clearValidate,
      scrollToField,
    } = useFormMethods(mergedProps)
    const { draggableOptions } = useDraggable(emit, formatFormItems)
    const ns = useNamespace('form')
    const { t } = useLocale()

    const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
    const activeStep = useVModel(props, 'activeStep', emit)

    useExpose({
      resetFields,
      validate,
      validateField,
      clearValidate,
      scrollToField,
    })

    provide(formProvideKey, computed(() => {
      return {
        ...mergedProps.value,
        size: formConfig.value.size,
      }
    }))

    const renderCommonColumn = (contentColumns: FormColumn[]) => {
      const { modelValue, options } = mergedProps.value

      return (
        <FormColumns
          modelValue={modelValue}
          options={options}
          columns={contentColumns}
          formProps={mergedProps}
          v-slots={slots}
          onUpdate:modelValue={(...args) => { emit('update:modelValue', ...args) }}
          onChange={(...args) => { emit('change', ...args) }}
        />
      )
    }

    const renderStepFooter = () => {
      const { footer } = props
      if (isFunction(footer))
        return footer()
      if (slots.footer)
        return slots.footer()
      return (
        <ElFormItem>
          <ElButton
            disabled={activeStep.value === 0}
            onClick={() => {
              emit('previous-step')
              if (activeStep.value-- <= 0)
                activeStep.value = 0
            }}
          >
            {t('form.previousStep')}
          </ElButton>
          {activeStep.value !== formatFormItems.value.length - 1 && (
            <ElButton
              type="primary"
              onClick={() => {
                (ctx?.$refs.formRef as typeof ElForm).validate((val: boolean) => {
                  if (val) {
                    emit('next-step')
                    if (activeStep.value++ >= formatFormItems.value.length - 1)
                      activeStep.value = 0
                  }
                })
              }}
            >
              {t('form.nextStep')}
            </ElButton>
          )}
          {activeStep.value === formatFormItems.value.length - 1 && (
            <ElButton
              type="primary"
              onClick={() => {
                (ctx?.$refs.formRef as typeof ElForm).validate((val: boolean) => {
                  if (val)
                    emit('submit')
                })
              }}
            >
              {t('common.submit')}
            </ElButton>
          )}
        </ElFormItem>
      )
    }

    const renderContent = () => {
      const { type, contentPosition, borderStyle, activeCollapse, accordion, modelValue, options, finishStatus, processStatus, simple, max, min, action } = mergedProps.value
      const isChildren = formatFormItems.value.some(column => column.children)

      if (isFunction(slots.default))
        return slots.default()

      if (type === 'group') {
        return formatFormItems.value.map((column) => {
          if (column.label && column.children && column.children.length) {
            return (
              <>
                <ElDivider contentPosition={column.contentPosition || contentPosition} borderStyle={column.borderStyle || borderStyle}>
                  {getContentByRenderAndSlot(column.label, slots)}
                </ElDivider>
                {renderCommonColumn(column.children || [])}
              </>
            )
          }
          return renderCommonColumn([column])
        })
      }
      else if (type === 'collapse') {
        return (
          <ElCollapse
            modelValue={activeCollapse}
            accordion={accordion}
            class={ns.b('collapse')}
            onUpdate:modelValue={(val: CollapseModelValue) => { emit('update:activeCollapse', val) }}
            onChange={(val: CollapseModelValue) => { emit('collapse-change', val) }}
          >
            {formatFormItems.value.map((column) => {
              if (column.children) {
                const name = isString(column.label) ? column.label : column.key
                return (
                  <ElCollapseItem
                    name={name}
                    disabled={column.disabled}
                    v-slots={{
                      title: () => getContentByRenderAndSlot(column.label, slots),
                    }}
                  >
                    {column.render?.() || slots[column.slot || '']?.() || renderCommonColumn(column.children || [])}
                  </ElCollapseItem>
                )
              }
              else if (column.slot || column.render) {
                return renderCommonColumn([column])
              }
              else {
                return null
              }
            })}
          </ElCollapse>
        )
      }
      else if (type === 'array' && !isChildren) {
        const model = [...modelValue as any[]]
        return (
          <>
            {modelValue.map((data: any, index: number) => {
              const formProps = omit(mergedProps.value, FORM_FILTER_KEYS)
              return (
                <OperationCard
                  onAdd={() => { emit('update:modelValue', [...model, {}]) }}
                  onDelete={() => {
                    if (modelValue.length === min) {
                      ElMessage.warning(`${t('form.minNum')}${min}${t('form.minNumUnit')}`)
                      return
                    }
                    model.splice(index, 1)
                    emit('update:modelValue', model)
                  }}
                  showAdd={modelValue.length !== max && !!action}
                  showDelete={!!action}
                  action={action}
                  contentIndex={index}
                  v-slots={slots}
                >
                  <ElForm {...{ labelWidth: formConfig.value.labelWidth, ...formProps }} model={data} ref={`arrayForm${index}`}>
                    <FormColumns
                      modelValue={data}
                      options={options}
                      columns={formatFormItems.value}
                      v-slots={slots}
                      formProps={mergedProps}
                      onUpdate:modelValue={(val: any) => {
                        model.splice(index, 1, val)
                        emit('update:modelValue', model)
                      }}
                      onChange={(...args) => { emit('change', ...args) }}
                    />
                  </ElForm>
                </OperationCard>
              )
            })}
            {modelValue.length !== max && action && (
              <ElButton class={ns.be('array', 'add')} onClick={() => { emit('update:modelValue', [...model, {}]) }} icon={Plus}>
                {t('form.add')}
              </ElButton>
            )}
          </>
        )
      }
      else if (type === 'array' && isChildren) {
        return formatFormItems.value.map((column) => {
          if (column.label && column.children && column.children.length) {
            const field = column.field!
            const maxLength = column.max || max
            return (
              <ZFormItem col={column} class={ns.b('array-form-item')} formConfig={{ ...omit(column, FORM_ITEM_FILTER_KEYS) }} v-slots={slots}>
                <>
                  {modelValue[field].map((data: any, index: number) => {
                    const formProps = omit(column, FORM_FILTER_KEYS)
                    return (
                      <OperationCard
                        onAdd={() => {
                          const model = { ...modelValue }
                          model[field].push({})
                          emit('update:modelValue', model)
                        }}
                        onDelete={() => {
                          const model = cloneDeep(modelValue)
                          model[field].splice(index, 1)
                          emit('update:modelValue', model)
                        }}
                        showAdd={modelValue[field].length !== maxLength && !!action}
                        showDelete={!!action}
                        action={action}
                        contentIndex={index}
                        v-slots={slots}
                      >
                        <ElForm {...{ labelWidth: formConfig.value.labelWidth, ...formProps, rules: formProps.rules as FormRules }} model={data} ref={`arrayForm${index}${field}`}>
                          <FormColumns
                            modelValue={data}
                            options={column.options || options}
                            columns={column.children}
                            v-slots={slots}
                            formProps={mergedProps}
                            onUpdate:modelValue={(val: any) => {
                              const item = cloneDeep(modelValue[field])
                              item.splice(index, 1, val)
                              emit('update:modelValue', { ...modelValue, [field]: item })
                            }}
                            onChange={(...args) => { emit('change', ...args) }}
                          />
                        </ElForm>
                      </OperationCard>
                    )
                  })}
                  {modelValue[field].length !== maxLength && action && (
                    <ElButton
                      class={ns.be('array', 'add')}
                      onClick={() => {
                        const model = { ...modelValue }
                        model[field].push({})
                        emit('update:modelValue', model)
                      }}
                      icon={Plus}
                    >
                      {t('form.add')}
                    </ElButton>
                  )}
                </>
              </ZFormItem>
            )
          }
          return renderCommonColumn([column])
        })
      }
      else if (type === 'step') {
        return (
          <>
            <ElSteps active={activeStep.value} finishStatus={finishStatus} processStatus={processStatus} simple={simple} class={ns.b('steps')}>
              {formatFormItems.value.map((column) => {
                return (
                  <ElStep
                    status={column.status}
                    v-slots={{
                      icon: () => getContentByRenderAndSlot(column.icon, slots),
                      description: () => getContentByRenderAndSlot(column.description, slots),
                      title: () => getContentByRenderAndSlot(column.label, slots),
                    }}
                  />
                )
              })}
            </ElSteps>
            {formatFormItems.value.map((column, index) => {
              if (index === activeStep.value) {
                if (column.label && column.children && column.children.length)
                  return renderCommonColumn(column.children || [])
                return renderCommonColumn([column])
              }
              return null
            })}
            {renderStepFooter()}
          </>
        )
      }
      else {
        return renderCommonColumn(formatFormItems.value)
      }
    }

    return () => {
      const { modelValue } = mergedProps.value

      return (
        <ElForm
          {...{ ...formConfig.value, model: modelValue }}
          ref="formRef"
          v-draggable={draggableOptions}
          class={[rowKls.value, ns.b('')]}
          style={rowStyle.value}
        // onSubmit={withModifiers(function () { }, ['prevent'])}
        >
          {renderContent()}
        </ElForm>
      )
    }
  },
})
