import type { ElForm } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import { isFunction } from '@ideaz/utils'
import { ElButton } from 'element-plus'
import { useFilterFormButtons, useFilterFormItem, useFormConfig, useFormMethods } from '../hooks'
import ZForm from './BaseForm'
import type { ToggleButtonType } from './props'
import { filterFormProps } from './props'
import ToggleButton from './ToggleButton'

export default defineComponent({
  name: 'ZFilterForm',
  components: { ToggleButton, ZForm },
  props: filterFormProps,
  emits: ['search', 'reset', 'update:modelValue'],
  setup(props, { attrs, slots, emit }) {
    const { isShowToggleButton, columns, toggleButtonType } = useFilterFormItem(props)
    const { formConfig } = useFormConfig(props)
    const { searchButtonProps, resetButtonProps } = useFilterFormButtons(props)
    const size = useFormSize()
    const ns = useNamespace('form')
    const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
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
      (ctx?.$refs.formRef as typeof ElForm).validate((val: boolean) => {
        if (val)
          emit('search')
      })
    }

    const handleReset = () => {
      (ctx?.$refs.formRef as typeof ElForm).resetFields()
      emit('reset')
    }

    const renderOperation = () => {
      if (isFunction(slots.formOperation))
        return slots.formOperation()

      if (isFunction(props.renderOperation))
        return props.renderOperation()

      return (
        <div class={ns.b('operation')}>
          <ElButton type="primary" size={size.value} onClick={handleSearch} {...searchButtonProps.value}>
            {searchButtonProps.value.label}
          </ElButton>
          <ElButton type="default" size={size.value} onClick={handleReset} {...resetButtonProps.value}>
            {resetButtonProps.value.label}
          </ElButton>
        </div>
      )
    }

    return () => {
      const { modelValue, options } = props
      return <ZForm
        ref="formRef"
        columns={columns.value}
        options={options || {}}
        // onkeydown={(e: KeyboardEvent) => handleKeyDown(e)}
        {...{ ...attrs, ...formConfig.value }}
        modelValue={modelValue}
        onUpdate:modelValue={(val: any) => { emit('update:modelValue', val) }}
        v-slots={{
          ...slots,
          button: () => (
            <>
              {renderOperation()}
              {!!isShowToggleButton.value && (
                <ToggleButton
                  modelValue={toggleButtonType.value}
                  onUpdate:modelValue={(val: ToggleButtonType) => (toggleButtonType.value = val)}
                />
              )}
            </>
          ),
        }}
      />
    }
  },
})
