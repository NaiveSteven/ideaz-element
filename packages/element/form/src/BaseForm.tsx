// import { withModifiers } from 'vue-demi';
import { useExpose } from '@ideaz/hooks'
import { isFunction } from '@ideaz/utils'
import {
  useCol,
  useFormConfig,
  useFormItems,
  useFormMethods,
  useFormSlots,
  useRow,
} from '../hooks'
import { formProps, formProvideKey } from './props'
import FormItem from './FormItem'
import type { FormColumn } from '~/types'

const renderContent = (col: FormColumn, slots: any) => {
  if (col.slot)
    return slots[col.slot] && slots[col.slot]()

  if (isFunction(col.render))
    return col.render(h)
}

export default defineComponent({
  name: 'ZForm',
  components: { FormItem },
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
      const { formModel, options } = props

      return (
        <el-form
          {...{ ...formConfig.value, model: formModel }}
          ref="formRef"
          class={rowKls.value}
          style={rowStyle.value}
        // onSubmit={withModifiers(function () { }, ['prevent'])}
        >
          {formatFormItems.value.map((col: FormColumn, colIndex: number) => {
            const { scopedSlots } = useFormSlots(col, slots, props)
            const { colKls, colStyle } = useCol(props, { span: 24, ...col })
            return <FormItem
              key={col.__key}
              ref={`formItem${colIndex}`}
              col={col}
              formModel={formModel}
              formConfig={formConfig.value}
              options={options}
              class={colKls.value}
              style={colStyle.value}
              v-slots={scopedSlots}
              v-show={isFunction(col.hideUseVShow) ? !col.hideUseVShow() : true}
              onChange={obj => emit('change', obj)}
            >
              {(isFunction(col.render) || col.slot) ? renderContent(col, slots) : null}
            </FormItem>
          })}
        </el-form>
      )
    }
  },
})
