import { cloneDeep, get, set } from 'lodash-unified'
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
      emit('update:modelValue', set(cloneDeep(props.modelValue), option.field, val))
    }

    return () => {
      const { options, size, all, titleWidth, multiple, alias } = props
      return <div>
        {options.map((option: TagSelectGroupOptionsItem) => {
          return <TagSelect
            modelValue={get(props.modelValue, option.field, '')}
            onUpdate:modelValue={val => updateModelValue(val, option)}
            size={size}
            titleWidth={titleWidth}
            multiple={multiple}
            all={all}
            alias={alias}
            {...option}
          />
        })}
      </div>
    }
  },
})
