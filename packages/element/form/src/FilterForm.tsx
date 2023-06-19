import { useFilterFormItem, useFormConfig } from '../hooks'
import { formProps } from './props'
import ToggleButton from './ToggleButton'

export default defineComponent({
  name: 'ZFilterForm',
  components: { ToggleButton },
  props: formProps,
  emits: ['search', 'reset'],
  setup(props, { attrs, slots, emit }) {
    const { isShowToggleButton, columns, toggleButtonType } = useFilterFormItem(props)
    const { formConfig } = useFormConfig(props)
    const size = useFormSize()

    const handleSearch = () => {
      emit('search')
    }

    const handleReset = () => {
      emit('reset')
    }

    return () => {
      const { formModel, options } = props
      return <z-form
        // ref="formRef"
        columns={columns.value}
        options={options || {}}
        // onkeydown={(e: KeyboardEvent) => handleKeyDown(e)}
        {...{ ...attrs, ...formConfig.value }}
        formModel={formModel}
        v-slots={{
          // ...FormScopedSlots,
          button: () => (
            <>
              {!slots.formOperation
                ? (
                  <div class="z-form-operation__container">
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
