export default defineComponent({
  name: 'ZTagSelect',
  props: {
    options: {
      type: Array as PropType<any>,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number, Array] as PropType<any>,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const activeTag = computed<number[] | number | string>({
      get() {
        return props.modelValue
      },
      set(val: number[] | number | string) {
        emit('update:modelValue', val)
      },
    })

    const isActive = (item: any) => {
      if (props.multiple)
        return (activeTag.value as number[]).includes(item.value) ? 'dark' : 'light'

      return String(activeTag.value) === String(item.value) ? 'dark' : 'light'
    }

    const handleClick = (item: any) => {
      const effect = isActive(item)
      if (props.multiple) {
        const actives = activeTag.value as number[]
        if (effect === 'dark') {
          const index = actives.indexOf(item.value)
          actives.splice(index, 1)
        }
        else {
          actives.push(item.value)
        }
      }
      else {
        if (effect === 'dark') {
          activeTag.value = ''
          emit('change', item)
        }
        else {
          activeTag.value = item.value
          emit('change', item)
        }
      }
    }

    return () => {
      return <div class='z-tag-select__container'>
        {props.title && <span class='mr-6'>{props.title}</span>}
        {props.options.map((item: any, index: number) => {
          return <el-tag effect={isActive(item)} class={index === props.options.length - 1 ? 'cursor-pointer' : 'cursor-pointer mr-4'} onClick={() => handleClick(item)}>{item.label}</el-tag>
        })}
      </div>
    }
  },
})
