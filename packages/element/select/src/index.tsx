import { setFormAlias } from '@ideaz/shared'
import { isArray } from '@ideaz/utils'
import type { SelectOptionsItem } from './props'
import { selectProps } from './props'

export default defineComponent({
  name: 'ZSelect',
  props: selectProps,
  emits: ['input', 'update:modelValue'],
  setup(props, { emit, listeners = {} }) {
    const { attrsAll, onAll } = useFormComponentAttrs(props)
    const { vModelVal, handleInput } = useVModel(props, emit)
    const size = useFormSize()
    const attrs = useAttrs()

    const getOption = (option: SelectOptionsItem) => {
      const value = option[setFormAlias(props).keys.value]
      return (
        <el-option
          key={value}
          {...{ props: option }}
          label={option[setFormAlias(props).keys.label]}
          disabled={option[setFormAlias(props).keys.disabled]}
          value={value}
        />
      )
    }

    return () => (
      <el-select
        value={vModelVal.value}
        modelValue={vModelVal.value}
        {...{ props: attrsAll.value }}
        {...{ on: { ...onAll.value, ...listeners } }}
        {...attrs}
        size={size.value}
        onInput={handleInput}
        onUpdate:modelValue={(val: string) => (vModelVal.value = val)}
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
