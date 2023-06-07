import { setFormAlias } from '@ideaz/shared'
import { isArray, isFunction, isSlot } from '@ideaz/utils'
import type { Slots } from '@ideaz/hooks'
import { useSelectMethods } from '../hooks'
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
    const size = useFormSize()
    const attrs = useAttrs()

    useExpose({ focus, blur })

    const getOption = (option: SelectOptionsItem) => {
      const value = option[setFormAlias(props).keys.value]
      const optionSlot: Slots = {}
      if (isSlot(option.render) && slots[option.render as string])
        optionSlot.default = () => slots[option.render as string]!({ option })

      return (
        <el-option
          key={value}
          {...{ props: option }}
          label={option[setFormAlias(props).keys.label]}
          disabled={option[setFormAlias(props).keys.disabled]}
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
        {...attrs}
        size={size.value}
        onInput={handleInput}
        onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
        v-slots={scopedSlots.value}
      >
        {props.options.map((option) => {
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
