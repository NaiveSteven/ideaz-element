import { resolveDynamicComponent, setFormAlias } from '@ideaz/shared'
import { isValid } from '@ideaz/utils'
import { radioProps } from './props'
import type { RadioOptionsItem } from './props'

export default defineComponent({
  name: 'ZRadio',
  props: radioProps,
  emits: ['input', 'update:modelValue'],
  setup(props, { emit, listeners = {} }) {
    const { attrsAll, onAll } = useFormComponentAttrs(props)
    const { vModelVal, handleInput } = useVModel(props, emit)
    const size = useFormSize()
    const attrs = useAttrs()

    const getChildComponentName = (option: RadioOptionsItem) => {
      if (!option.type && props.type) return `el-${props.type}`
      if (option.type === 'radio' || option.type === 'radio-button')
        return `el-${option.type}`
      return 'el-radio'
    }

    return () => {
      return (
        <el-radio-group
          {...{ props: attrsAll.value }}
          {...{ on: { ...onAll.value, ...listeners } }}
          {...attrs}
          value={vModelVal.value}
          modelValue={vModelVal.value}
          size={size.value}
          onInput={handleInput}
          onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
        >
          {props.options.map((option, index) => {
            const ChildName = getChildComponentName(option)
            return resolveDynamicComponent({
              name: ChildName,
              attrs: {
                ...option,
                border: isValid(option.border) ? option.border : props.border,
                label: option[setFormAlias(props).keys.value],
                disabled: option[setFormAlias(props).keys.disabled],
                key: index,
              },
              content: () => option[setFormAlias(props).keys.label],
            })
          })}
        </el-radio-group>
      )
    }
  },
})
