import { resolveDynamicComponent, setFormAlias } from '@ideaz/shared'
import { isValid } from '@ideaz/utils'
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
                  ...option,
                  border: isValid(option.border) ? option.border : props.border,
                  label: option[setFormAlias(props).keys.value],
                  disabled: option[setFormAlias(props).keys.disabled],
                  key: option[setFormAlias(props).keys.value],
                },
                content: () => option[setFormAlias(props).keys.label],
              })
            })}
        </el-checkbox-group>
      )
    }
  },
})
