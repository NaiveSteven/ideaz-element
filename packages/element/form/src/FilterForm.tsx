import { useFilterFormItem } from '../hooks'
import { props } from './props'
import ToggleButton from './ToggleButton.tsx'

export default defineComponent({
  name: 'ZFilterForm',
  components: { ToggleButton },
  props,
  emits: ['search', 'reset'],
  setup(props, { attrs, slots, emit }) {
    const { isShowToggleButton, formItemConfig, toggleButtonType, layout } = useFilterFormItem(props)

    const handleSearch = () => {
      emit('search')
    }

    const handleReset = () => {
      emit('reset')
    }

    return () => {
      const { formModel, formConfig, options } = props
      return <z-form
        // ref="formRef"
        formModel={formModel}
        formConfig={formConfig}
        formItemConfig={formItemConfig.value}
        options={options || {}}
        layout={layout.value}
        // onkeydown={(e: KeyboardEvent) => handleKeyDown(e)}
        {...attrs}
        v-slots={{
          // ...FormScopedSlots,
          button: () => (
            <>
              {!slots.formOperation
                ? (
                  <div class="c-form-operation__container">
                    <el-button type="primary" size={formConfig.size} onClick={handleSearch}>
                      查询
                    </el-button>
                    <el-button type="default" size={formConfig.size} onClick={handleReset}>
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
                    formConfig={formConfig}
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
