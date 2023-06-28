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

    return () => {
      const { modelValue, options } = props

      return (
        <el-form
          {...{ ...formConfig.value, model: modelValue }}
          ref="formRef"
          class={rowKls.value}
          style={rowStyle.value}
        // onSubmit={withModifiers(function () { }, ['prevent'])}
        >
          <FormColumns
            modelValue={modelValue}
            options={options}
            columns={formatFormItems.value}
            v-slots={slots}
            onUpdate:modelValue={(...args) => {
              emit('update:modelValue', ...args)
            }}
            onChange={(...args) => { emit('change', ...args) }}
          />
        </el-form>
      )
    }
  },
})
