import { resolveDynamicComponent } from '@ideaz/shared'
import { isFunction, isValid } from '@ideaz/utils'
import { get } from 'lodash-unified'
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
          {...{ ...attrs, ...props }}
          value={vModelVal.value}
          modelValue={vModelVal.value}
          size={size.value}
          onInput={handleInput}
          onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
        >
          {props.options.map((option) => {
            const ChildName = getChildComponentName(option)
            return resolveDynamicComponent({
              name: ChildName,
              attrs: {
                ...option,
                border: isValid(option.border) ? option.border : props.border,
                label: get(option, props.alias?.value || 'value', ''),
                disabled: get(option, props.alias?.disabled || 'disabled', false),
                key: get(option, props.alias?.value || 'value', ''),
                onClick: (e: MouseEvent) => {
                  if (props.isCancel) {
                    e.preventDefault()
                    if (vModelVal.value === option.value)
                      vModelVal.value = ''
                    else
                      vModelVal.value = option.value
                  }
                  if (isFunction(option.onClick))
                    option.onClick(e)
                },
              },
              content: () => get(option, props.alias?.label || 'label', ''),
            })
          })}
        </el-radio-group>
      )
    }
  },
})
