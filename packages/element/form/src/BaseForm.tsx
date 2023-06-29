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
  emits: ['input', 'update:modelValue', 'change'],
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
      const { type, columns } = props

      if (type === 'group') {
        return columns.map((column) => {
          if (column.label && column.children && column.children.length) {
            return <>
              <el-divider content-position="left">{column.label}</el-divider>
              {renderCommonColumn(column.children || [])}
            </>
          }
          else {
            return renderCommonColumn([column])
          }
        })
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
