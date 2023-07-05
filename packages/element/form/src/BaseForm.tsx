// import { withModifiers } from 'vue-demi';
import { useExpose } from '@ideaz/hooks'
import {
  useFormConfig,
  useFormItems,
  useFormMethods,
  useRow,
} from '../hooks'
import { formProps, formProvideKey } from './props'
import FormColumns from './FormColumns'
import OperationCard from './OperationCard'
import type { FormColumn } from '~/types'

export default defineComponent({
  name: 'ZForm',
  components: { FormColumns, OperationCard },
  props: formProps,
  emits: ['input', 'update:modelValue', 'change', 'update:activeCollapse', 'collapse-change'],
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
    const arrayFormColumns = reactive<{ [propName: string]: FormColumn[][] }>({})

    if (props.type === 'array') {
      props.columns.forEach((column) => {
        const field = column.field!
        if (column.label && column.children && column.children.length)
          arrayFormColumns[field] = [column.children]
      })
    }

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
        v-slots={slots}
        onUpdate:modelValue={(...args) => { emit('update:modelValue', ...args) }}
        onChange={(...args) => { emit('change', ...args) }}
      />
    }

    const renderContent = () => {
      const { type, columns, contentPosition, activeCollapse, accordion, modelValue, options } = props

      if (type === 'group') {
        return columns.map((column) => {
          if (column.label && column.children && column.children.length) {
            return <>
              <el-divider content-position={contentPosition}>{column.label}</el-divider>
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
          class={ns.b('collapse-item')}
          onUpdate:activeCollapse={(val: string[]) => { emit('update:activeCollapse', val) }}
          onChange={(val: string[] | string) => { emit('collapse-change', val) }}
        >
          {columns.map((column) => {
            if (column.label && column.children && column.children.length) {
              return <el-collapse-item title={column.label} name={column.label} disabled={column.disabled}>
                {renderCommonColumn(column.children || [])}
              </el-collapse-item>
            }
            return renderCommonColumn([column])
          })}
        </el-collapse>
      }
      else if (type === 'array') {
        const model = [...modelValue as any[]]
        return modelValue.map((data: any, index: number) => {
          // const formProps = omit(props, ['columns', 'type', 'modelValue'])
          return <OperationCard
            onAdd={() => {
              emit('update:modelValue', [...model, {}])
            }}
            onDelete={() => {
              model.splice(index, 1)
              emit('update:modelValue', model)
            }}
          >
            <el-form model={data} ref={`arrayForm${index}`}>
              <FormColumns
                modelValue={data}
                // 待修改
                options={options}
                columns={columns}
                v-slots={slots}
                onUpdate:modelValue={(val: any) => {
                  model.splice(index, 1, val)
                  emit('update:modelValue', model)
                }}
                onChange={(...args) => { emit('change', ...args) }}
              />
            </el-form>
          </OperationCard>
        })
        // return columns.map((column, i) => {
        //   if (column.label && column.children && column.children.length) {
        //     const field = column.field!
        //     return <el-form-item label={column.label} prop={column.field} class={ns.b('array-form-item')}>
        //       {modelValue[field].map((data: any, index: number) => {
        //         const formProps = omit(column, ['children', 'field'])
        //         return <OperationCard
        //           onAdd={() => {
        //             const model = { ...modelValue }
        //             model[field].push({})
        //             emit('update:modelValue', model)
        //           }}
        //           onDelete={() => {
        //             const model = cloneDeep(modelValue)
        //             model[field].splice(index, 1)
        //             emit('update:modelValue', model)
        //           }}
        //         >
        //           <el-form model={data} {...formProps} ref={`arrayForm${i}`}>
        //             <FormColumns
        //               modelValue={data}
        //               // 待修改
        //               options={options}
        //               columns={column.children}
        //               v-slots={slots}
        //               onUpdate:modelValue={(val: any) => {
        //                 const item = cloneDeep(modelValue[field])
        //                 item.splice(index, 1, val)
        //                 emit('update:modelValue', { ...modelValue, [field]: item })
        //               }}
        //               onChange={(...args) => { emit('change', ...args) }}
        //             />
        //           </el-form>
        //         </OperationCard>
        //       })}
        //     </el-form-item>
        //   }
        //   return renderCommonColumn([column])
        // })
      // }
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
          class={rowKls.value}
          style={rowStyle.value}
        // onSubmit={withModifiers(function () { }, ['prevent'])}
        >
          {renderContent()}
        </el-form>
      )
    }
  },
})
