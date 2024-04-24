import { ElCheckboxGroup } from 'element-plus'
import { resolveDynamicComponent } from '@ideaz/shared'
import { isValid } from '@ideaz/utils'
import { get, omit } from 'lodash-unified'
import type { CheckboxGroupValueType } from 'element-plus'
import { CHECKBOX_FILTER_PROPS, checkboxProps } from './props'
import type { CheckboxOptionsItem } from './props'

export default defineComponent({
  name: 'ZCheckbox',
  inheritAttrs: false,
  props: checkboxProps,
  emits: ['input', 'update:modelValue'],
  setup: (props, { emit }) => {
    const { vModelVal } = useVModel(props, emit)
    const size = useFormSize()
    const attrs = useAttrs()

    const getChildComponentName = (option: CheckboxOptionsItem) => {
      if (!option.type && props.type)
        return `el-${props.type}`
      if (option.type === 'checkbox' || option.type === 'checkbox-button')
        return `el-${option.type}`
      return 'el-checkbox'
    }

    return () => {
      return (
        <ElCheckboxGroup
          {...{ ...attrs, ...omit(props, CHECKBOX_FILTER_PROPS) }}
          size={size.value}
          modelValue={vModelVal.value}
          onUpdate:modelValue={(val: CheckboxGroupValueType) => (vModelVal.value = val)}
        >
          {props.options
            .map((option) => {
              const ChildName = getChildComponentName(option)
              return resolveDynamicComponent({
                name: ChildName,
                attrs: {
                  size: size.value,
                  ...option,
                  border: isValid(option.border) ? option.border : props.border,
                  value: get(option, props.alias?.value || 'value', ''),
                  disabled: get(option, props.alias?.disabled || 'disabled', false),
                  key: get(option, props.alias?.value || 'value', ''),
                },
                content: () => get(option, props.alias?.label || 'label', ''),
              })
            })}
        </ElCheckboxGroup>
      )
    }
  },
})
