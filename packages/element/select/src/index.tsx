import { ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import { isArray, isFunction, isSlot } from '@ideaz/utils'
import { get } from 'lodash-unified'
import type { Slots } from '../../types'
import { useOptions, useSelectMethods } from './hooks'
import type { SelectOptionsItem } from './props'
import { SELECT_SLOTS, selectProps } from './props'

export default defineComponent({
  name: 'ZSelect',
  props: selectProps,
  emits: ['input', 'update:modelValue'],
  setup(props, { emit, slots }) {
    const { vModelVal } = useVModel(props, emit)
    const { focus, blur } = useSelectMethods()
    const { scopedSlots } = useFormComponentSlots(props, slots, SELECT_SLOTS)
    const { options, handleSelectInput } = useOptions(props, vModelVal)
    const size = useFormSize()
    const attrs = useAttrs()

    useExpose({ focus, blur })

    const getOption = (option: SelectOptionsItem) => {
      const value = get(option, props.alias?.value || 'value', '')
      const optionSlot: Slots = {}
      if (isSlot(option.render) && slots[option.render as string])
        optionSlot.default = () => slots[option.render as string]!({ option })

      return (
        <ElOption
          key={value}
          label={get(option, props.alias?.label || 'label', '')}
          disabled={get(option, props.alias?.disabled || 'disabled', false)}
          value={value}
          v-slots={optionSlot}
        >
          {isFunction(option.render) ? option.render({ option }) : null}
        </ElOption>
      )
    }

    return () => (
      <ElSelect
        ref="selectRef"
        modelValue={vModelVal.value}
        {...{ ...attrs, multiple: props.multiple }}
        size={size.value}
        onUpdate:modelValue={handleSelectInput}
        v-slots={scopedSlots.value}
      >
        {options.value.map((option) => {
          if (isArray(option.options)) {
            return (
              <ElOptionGroup label={option.label} key={option.label} disabled={option.disabled}>
                {option.options.map((childOption) => {
                  return getOption(childOption)
                })}
              </ElOptionGroup>
            )
          }
          return getOption(option)
        })}
      </ElSelect>
    )
  },
})
