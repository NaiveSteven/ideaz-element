import type { ElForm } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import { useFilterFormItem, useFormConfig, useFormMethods } from '../hooks'
import type { ToggleButtonType } from './props'
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
    const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
    const { t } = useLocale()
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

    return () => {
      const { modelValue, options } = props
      return <z-form
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
              {!slots.formOperation
                ? (
                  <div class={ns.b('operation')}>
                    <el-button type="primary" size={size.value} onClick={handleSearch} loading={props.searchLoading}>
                      {t('form.search')}
                    </el-button>
                    <el-button type="default" size={size.value} onClick={handleReset}>
                      {t('form.reset')}
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
                    onUpdate:modelValue={(val: ToggleButtonType) => (toggleButtonType.value = val)}
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
