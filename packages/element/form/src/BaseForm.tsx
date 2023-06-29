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
import type { FormColumn } from '~/types'

export default defineComponent({
  name: 'ZForm',
  components: { FormColumns },
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
      const { type, columns, contentPosition, activeCollapse, accordion } = props

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
          class='w-full'
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
