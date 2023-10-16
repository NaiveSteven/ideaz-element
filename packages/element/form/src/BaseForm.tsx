// import { withModifiers } from 'vue-demi';
import { useExpose } from '@ideaz/hooks'
import { cloneDeep, omit } from 'lodash-unified'
import { Plus } from '@element-plus/icons-vue'
import { getContentByRenderAndSlot } from '@ideaz/shared'
import { getCurrentInstance } from 'vue-demi'
import type { ElForm } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import {
  useFormConfig,
  useFormItems,
  useFormMethods,
  useRow,
} from '../hooks'
import { FORM_FILTER_KEYS, FORM_ITEM_FILTER_KEYS, formProps, formProvideKey } from './props'
import FormColumns from './FormColumns'
import OperationCard from './OperationCard'
import type { FormColumn } from '~/types'

export default defineComponent({
  name: 'ZForm',
  components: { FormColumns, OperationCard },
  props: formProps,
  emits: ['input', 'update:modelValue', 'change', 'update:activeCollapse', 'collapse-change', 'next-step', 'previous-step'],
  setup(props, { emit, slots }) {
    const { formatFormItems } = useFormItems(props)
    const { rowStyle, rowKls } = useRow(props)
    const { formConfig } = useFormConfig(props)
    const {
      resetFields,
      validate,
      validateField,
      clearValidate,
      scrollToField,
    } = useFormMethods(props)
    const ns = useNamespace('form')
    const { t } = useLocale()

    const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
    const activeStep = ref(0)

    useExpose({
      resetFields,
      validate,
      validateField,
      clearValidate,
      scrollToField,
    })

    provide(formProvideKey, {
      props,
      size: formConfig.value.size,
    })

    const renderCommonColumn = (contentColumns: FormColumn[]) => {
      const { modelValue, options } = props

      return <FormColumns
        modelValue={modelValue}
        options={options}
        columns={contentColumns}
        formProps={props}
        v-slots={slots}
        onUpdate:modelValue={(...args) => { emit('update:modelValue', ...args) }}
        onChange={(...args) => { emit('change', ...args) }}
      />
    }

    const renderContent = () => {
      const { type, contentPosition, borderStyle, activeCollapse, accordion, modelValue, options, finishStatus, processStatus, simple, max } = props
      const isChildren = formatFormItems.value.some(column => column.children)

      if (type === 'group') {
        return formatFormItems.value.map((column) => {
          if (column.label && column.children && column.children.length) {
            return <>
              <el-divider contentPosition={column.contentPosition || contentPosition} borderStyle={column.borderStyle || borderStyle}>
                {getContentByRenderAndSlot(column.label, slots)}
              </el-divider>
              {renderCommonColumn(column.children || [])}
            </>
          }
          return renderCommonColumn([column])
        })
      }
      else if (type === 'collapse') {
        return <el-collapse
          modelValue={activeCollapse}
          accordion={accordion}
          class={ns.b('collapse')}
          onUpdate:activeCollapse={(val: string[]) => { emit('update:activeCollapse', val) }}
          onChange={(val: string[] | string) => { emit('collapse-change', val) }}
        >
          {formatFormItems.value.map((column, index) => {
            if (column.label && column.children && column.children.length) {
              return <el-collapse-item name={index} disabled={column.disabled} v-slots={{
                title: () => getContentByRenderAndSlot(column.label, slots),
              }}>
                {renderCommonColumn(column.children || [])}
              </el-collapse-item>
            }
            return renderCommonColumn([column])
          })}
        </el-collapse>
      }
      else if (type === 'array' && !isChildren) {
        const model = [...modelValue as any[]]
        return <>
          {modelValue.map((data: any, index: number) => {
            const formProps = omit(props, FORM_FILTER_KEYS)
            return <OperationCard
              onAdd={() => { emit('update:modelValue', [...model, {}]) }}
              onDelete={() => {
                model.splice(index, 1)
                emit('update:modelValue', model)
              }}
              addVisible={modelValue.length !== max}
            >
              <el-form {...{ labelWidth: formConfig.value.labelWidth, formProps }} model={data} ref={`arrayForm${index}`}>
                <FormColumns
                  modelValue={data}
                  options={options}
                  columns={formatFormItems.value}
                  v-slots={slots}
                  onUpdate:modelValue={(val: any) => {
                    model.splice(index, 1, val)
                    emit('update:modelValue', model)
                  }}
                  onChange={(...args) => { emit('change', ...args) }}
                />
              </el-form>
            </OperationCard>
          })}
          {modelValue.length !== max
            && <el-button class={ns.bm('array', 'add')} onClick={() => { emit('update:modelValue', [...model, {}]) }} icon={Plus}>
              {t('form.add')}
            </el-button>}
        </>
      }
      else if (type === 'array' && isChildren) {
        return formatFormItems.value.map((column, i) => {
          if (column.label && column.children && column.children.length) {
            const field = column.field!
            const maxLength = column.max || max
            return <el-form-item label={column.label} prop={column.field} class={ns.b('array-form-item')} {...omit(column, FORM_ITEM_FILTER_KEYS)}>
              <>
                {modelValue[field].map((data: any, index: number) => {
                  const formProps = omit(column, FORM_FILTER_KEYS)
                  return <OperationCard
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
                    addVisible={modelValue[field].length !== maxLength}
                  >
                    <el-form {...{ labelWidth: formConfig.value.labelWidth, ...formProps }} model={data} ref={`arrayForm${index}${field}`}>
                      <FormColumns
                        modelValue={data}
                        options={column.options || options}
                        columns={column.children}
                        v-slots={slots}
                        onUpdate:modelValue={(val: any) => {
                          const item = cloneDeep(modelValue[field])
                          item.splice(index, 1, val)
                          emit('update:modelValue', { ...modelValue, [field]: item })
                        }}
                        onChange={(...args) => { emit('change', ...args) }}
                      />
                    </el-form>
                  </OperationCard>
                })}
                {modelValue[field].length !== maxLength
                  && <el-button
                    class={ns.bm('array', 'add')}
                    onClick={() => {
                      const model = { ...modelValue }
                      model[field].push({})
                      emit('update:modelValue', model)
                    }}
                    icon={Plus}
                  >
                    {t('form.add')}
                  </el-button>}
              </>
            </el-form-item>
          }
          return renderCommonColumn([column])
        })
      }
      else if (type === 'step') {
        return <>
          <el-steps active={activeStep.value} finishStatus={finishStatus} processStatus={processStatus} simple={simple} class={ns.b('steps')}>
            {formatFormItems.value.map((column) => {
              return <el-step status={column.status} v-slots={{
                icon: () => getContentByRenderAndSlot(column.icon, slots),
                description: () => getContentByRenderAndSlot(column.description, slots),
                title: () => getContentByRenderAndSlot(column.label, slots),
              }} />
            })}
          </el-steps>
          {formatFormItems.value.map((column, index) => {
            if (index === activeStep.value) {
              if (column.label && column.children && column.children.length)
                return renderCommonColumn(column.children || [])
              return renderCommonColumn([column])
            }
            return null
          })}
          <el-form-item>
            <el-button
              disabled={activeStep.value === 0}
              onClick={() => {
                emit('previous-step')
                if (activeStep.value-- <= 0) activeStep.value = 0
              }}
            >
              {t('form.previousStep')}
            </el-button>
            <el-button
              disabled={activeStep.value === formatFormItems.value.length - 1}
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
            </el-button>
          </el-form-item>
        </>
      }
      else {
        return renderCommonColumn(formatFormItems.value)
      }
    }

    return () => {
      const { modelValue } = props

      return (
        <el-form
          {...{ ...formConfig.value, model: modelValue }}
          ref="formRef"
          class={[rowKls.value, ns.b('')]}
          style={rowStyle.value}
        // onSubmit={withModifiers(function () { }, ['prevent'])}
        >
          {renderContent()}
        </el-form>
      )
    }
  },
})
