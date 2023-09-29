import { resolveDynamicComponent } from '@ideaz/shared'
import { isValid } from '@ideaz/utils'
import { get } from 'lodash-unified'
import { checkboxProps } from './props'
import type { CheckboxOptionsItem } from './props'

export default defineComponent({
  name: 'ZCheckbox',
  inheritAttrs: false,
  props: checkboxProps,
  emits: ['input', 'update:modelValue'],
  setup: (props, { emit, listeners = {} }) => {
    const { attrsAll, onAll } = useFormComponentAttrs(props)
    const { vModelVal, handleInput } = useVModel(props, emit)
    const size = useFormSize()
    const attrs = useAttrs()

    const getChildComponentName = (option: CheckboxOptionsItem) => {
      if (!option.type && props.type) return `el-${props.type}`
      if (option.type === 'checkbox' || option.type === 'checkbox-button')
        return `el-${option.type}`
      return 'el-checkbox'
    }

    return () => {
      return (
        <el-checkbox-group
          {...{ props: attrsAll.value }}
          {...{ on: { ...onAll.value, ...listeners } }}
          {...{ ...attrs, ...props }}
          size={size.value}
          value={vModelVal.value}
          modelValue={vModelVal.value}
          onInput={handleInput}
          onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
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
                  label: get(option, props.alias?.value || 'value', ''),
                  disabled: get(option, props.alias?.disabled || 'disabled', false),
                  key: get(option, props.alias?.value || 'value', ''),
                },
                content: () => get(option, props.alias?.label || 'label', ''),
              })
            })}
        </el-checkbox-group>
      )
    }
  },
})
