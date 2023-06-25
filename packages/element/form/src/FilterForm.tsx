import { useFilterFormItem, useFormConfig, useFormMethods } from '../hooks'
import { filterFormProps } from './props'
import ToggleButton from './ToggleButton'

export default defineComponent({
  name: 'ZFilterForm',
  components: { ToggleButton },
  props: filterFormProps,
  emits: ['search', 'reset', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const { isShowToggleButton, columns, toggleButtonType } = useFilterFormItem(props)
    const { formConfig } = useFormConfig(props)
    const size = useFormSize()
    const ns = useNamespace('form')
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

    const handleSearch = () => {
      emit('search')
    }

    const handleReset = () => {
      emit('reset')
    }

    return () => {
      const { modelValue, options } = props
      return <z-form
        ref="formRef"
        columns={columns.value}
        options={options || {}}
        // onkeydown={(e: KeyboardEvent) => handleKeyDown(e)}
        {...{ ...attrs, ...formConfig.value }}
        v-model={modelValue}
        v-slots={{
          ...slots,
          button: () => (
            <>
              {!slots.formOperation
                ? (
                  <div class={ns.b('operation')}>
                    <el-button type="primary" size={size.value} onClick={handleSearch}>
                      查询
                    </el-button>
                    <el-button type="default" size={size.value} onClick={handleReset}>
                      重置
                    </el-button>
                  </div>
                  )
                : (
                    slots.formOperation()
                  )}
              {isShowToggleButton.value
                ? (
                  <ToggleButton
                    modelValue={toggleButtonType.value}
                    onUpdate:modelValue={(val: any) => (toggleButtonType.value = val)}
                  />
                  )
                : null}
            </>
          ),
        }}
      />
    }
  },
})
