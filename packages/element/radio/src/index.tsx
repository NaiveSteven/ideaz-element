import { ElRadioGroup } from 'element-plus'
import { resolveDynamicComponent } from '@ideaz/shared'
import { isFunction, isValid } from '@ideaz/utils'
import { get, omit } from 'lodash-unified'
import type { RadioOptionsItem } from '../../types'
import { FILTER_RADIO_PROPS, radioProps } from './props'

export default defineComponent({
  name: 'ZRadio',
  props: radioProps,
  emits: ['input', 'update:modelValue'],
  setup(props, { emit }) {
    const { vModelVal } = useVModel(props, emit)
    const size = useFormSize()
    const attrs = useAttrs()

    const getChildComponentName = (option: RadioOptionsItem) => {
      if (!option.type && props.type)
        return `el-${props.type}`
      if (option.type === 'radio' || option.type === 'radio-button')
        return `el-${option.type}`
      return 'el-radio'
    }

    return () => {
      return (
        <ElRadioGroup
          {...{ ...attrs, ...omit(props, FILTER_RADIO_PROPS) }}
          modelValue={vModelVal.value}
          size={size.value}
          onUpdate:modelValue={(val: string | number | boolean | undefined) => (vModelVal.value = val)}
        >
          {props.options.map((option) => {
            const ChildName = getChildComponentName(option)
            return resolveDynamicComponent({
              name: ChildName,
              attrs: {
                ...option,
                border: isValid(option.border) ? option.border : props.border,
                value: get(option, props.alias?.value || 'value', ''),
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
        </ElRadioGroup>
      )
    }
  },
})
