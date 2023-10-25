import { cloneDeep, get, omit, set } from 'lodash-unified'
import { isObject } from '@ideaz/utils'
import TagSelectItem from './TagSelectItem'
import type { TagSelectGroupOptionsItem, TagSelectOptionsItem } from './props'
import { tagSelectProps } from './props'

export default defineComponent({
  name: 'ZTagSelect',
  components: { TagSelectItem },
  props: tagSelectProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots }) {
    const size = useFormSize()

    return () => {
      const { options, all, titleWidth, multiple, alias } = props
      if (isObject(props.modelValue)) {
        return (options as TagSelectGroupOptionsItem[]).map((option: TagSelectGroupOptionsItem) => {
          return <TagSelectItem
            modelValue={get(props.modelValue, option.field, '')}
            onUpdate:modelValue={val => emit('update:modelValue', set(cloneDeep(props.modelValue as object), option.field, val))}
            size={size.value}
            titleWidth={titleWidth}
            multiple={multiple}
            all={all}
            alias={alias}
            options={option.children}
            v-slots={slots}
            {...omit(option, 'children')}
            onChange={val => emit('change', val)}
          />
        })
      }
      return <TagSelectItem
        modelValue={props.modelValue}
        onUpdate:modelValue={val => emit('update:modelValue', val)}
        size={size.value}
        titleWidth={titleWidth}
        multiple={multiple}
        all={all}
        alias={alias}
        options={options as TagSelectOptionsItem[]}
        v-slots={slots}
        onChange={val => emit('change', val)}
      />
    }
  },
})
