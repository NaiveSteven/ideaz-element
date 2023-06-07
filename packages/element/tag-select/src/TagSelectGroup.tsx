import TagSelect from './TagSelect'
import type { TagSelectGroupOptionsItem } from './props'
import { tagSelectGroupProps } from './props'

export default defineComponent({
  name: 'ZTagSelectGroup',
  components: { TagSelect },
  props: tagSelectGroupProps,
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateModelValue = (val: any, option: TagSelectGroupOptionsItem) => {
      emit('update:modelValue', { ...props.modelValue, [option.field]: val })
    }

    return () => {
      const { options, size, all, titleWidth, multiple } = props
      return <div>
        {options.map((option: TagSelectGroupOptionsItem) => {
          return <TagSelect
            modelValue={props.modelValue[option.field]}
            onUpdate:modelValue={val => updateModelValue(val, option)}
            size={size}
            titleWidth={titleWidth}
            multiple={multiple}
            all={all}
            {...option}
          />
        })}
      </div>
    }
  },
})
