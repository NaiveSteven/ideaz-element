// import { withModifiers } from 'vue-demi';
import { isFunction } from '@ideaz/utils'
import { useExpose } from '@ideaz/hooks'
import {
  useCol,
  useFormItems,
  // useFormLayout,
  useFormMethods,
  useFormSlots,
  useRow,
} from '../hooks'
import { props } from './props'
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
  props,
  emits: ['input', 'update:modelValue', 'change'],
  setup(props, { emit, slots }) {
    // const { rowLayout, getColLayout } = useFormLayout(props)
    const { formatFormItems } = useFormItems(props)
    const { rowStyle, rowKls } = useRow(props)
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

    return () => {
      const { formModel, formConfig = {}, options } = props

      return (
        <el-form
          {...{ model: formModel, ...formConfig }}
          ref="formRef"
          class={rowKls.value}
          style={rowStyle.value}
        // onSubmit={withModifiers(function () { }, ['prevent'])}
        >
          {/* <z-row {...rowLayout.value}> */}
            {formatFormItems.value.map(
              (col: FormColumn, colIndex: number) => {
                const { scopedSlots } = useFormSlots(col, slots, props)
                const { colKls, colStyle } = useCol(props, { span: 24, ...col })
                return (
                  // <z-col
                  //   v-show={col.hideUseVShow ? !col.hideUseVShow() : true}
                  //   {...getColLayout(col)}
                  //   key={col.__key! + colIndex}
                  // >
                  isFunction(col.render) || col.slot)
                  ? (
                      renderContent(col, slots)
                    )
                  : (
                        <FormItem
                          key={col.__key}
                          ref={`formItem${colIndex}`}
                          col={col}
                          formModel={formModel}
                          formConfig={formConfig}
                          options={options}
                          class={colKls.value}
                          style={colStyle.value}
                          v-slots={scopedSlots}
                          onChange={obj => emit('change', obj)}
                        />
                    )
              },
            )}
          {/* </z-row> */}
        </el-form>
      )
    }
  },
})
