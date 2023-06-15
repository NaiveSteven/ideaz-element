import { isArray, isFunction, isSlot } from '@ideaz/utils'
import { get } from 'lodash-unified'
import type { Slots } from '@ideaz/hooks'
import { useOptions, useSelectMethods } from '../hooks'
import type { SelectOptionsItem } from './props'
import { SELECT_SLOTS, selectProps } from './props'

export default defineComponent({
  name: 'ZSelect',
  props: selectProps,
  emits: ['input', 'update:modelValue'],
  setup(props, { emit, listeners = {}, slots }) {
    const { attrsAll, onAll } = useFormComponentAttrs(props)
    const { vModelVal, handleInput } = useVModel(props, emit)
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
        <el-option
          key={value}
          {...{ props: option }}
          label={get(option, props.alias?.label || 'label', '')}
          disabled={get(option, props.alias?.disabled || 'disabled', false)}
          value={value}
          v-slots={optionSlot}
        >
          {isFunction(option.render) ? option.render(h, { option }) : null}
        </el-option>
      )
    }

    return () => (
      <el-select
        ref="selectRef"
        value={vModelVal.value}
        modelValue={vModelVal.value}
        {...{ props: attrsAll.value }}
        {...{ on: { ...onAll.value, ...listeners } }}
        {...{ ...attrs, multiple: props.multiple }}
        size={size.value}
        onInput={handleInput}
        onUpdate:modelValue={handleSelectInput}
        v-slots={scopedSlots.value}
      >
        {options.value.map((option) => {
          if (isArray(option.options)) {
            return <el-option-group label={option.label} key={option.label} disabled={option.disabled}>
              {option.options.map((childOption) => {
                return getOption(childOption)
              })}
            </el-option-group>
          }
          return getOption(option)
        })}
      </el-select>
    )
  },
})
