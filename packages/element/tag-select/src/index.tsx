import { useShowMore } from './hooks'

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
    all: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const { isShowMore, zTag } = useShowMore()
    const isExpand = ref(false)

    const activeTag = computed<number[] | number | string | string[]>({
      get() {
        return props.modelValue
      },
      set(val: number[] | number | string | string[]) {
        emit('update:modelValue', val)
      },
    })

    const options = computed(() => {
      if (props.all && props.multiple)
        return [{ label: '全部', value: 'all' }, ...props.options]

      return props.options
    })

    const cls = computed(() => {
      return {
        'z-tag-select__container': true,
        'z-tag-select__container--more': isExpand.value,
      }
    })

    const iconClass = computed(() => {
      return {
        'z-toggle__icon': true,
        'z-icon__arrow': isExpand.value,
      }
    })

    const handleChangeExpand = () => {
      isExpand.value = !isExpand.value
    }

    const isActive = (item: any) => {
      const effect = item.effect || 'dark'
      if (props.multiple)
        return (activeTag.value as number[]).includes(item.value) ? effect : undefined

      return String(activeTag.value) === String(item.value) ? effect : undefined
    }

    const handleClickTag = (item: any) => {
      const activeEffect = item.effect || 'dark'
      const effect = isActive(item)
      if (item.value === 'all') {
        if (effect === activeEffect) {
          if (props.multiple) {
            activeTag.value = []
            emit('change', [])
            return
          }
          else {
            activeTag.value = ''
            emit('change', item)
          }
        }
        else {
          if (props.multiple) {
            activeTag.value = options.value.map((item: any) => item.value)
            emit('change', options.value.map((item: any) => item.value))
            return
          }
          else {
            activeTag.value = item.value
            emit('change', item)
          }
        }
        return
      }
      if (props.multiple) {
        const actives = activeTag.value as number[]
        if (effect === activeEffect) {
          const index = actives.indexOf(item.value)
          actives.splice(index, 1)
        }
        else {
          actives.push(item.value)
        }
      }
      else {
        if (effect === activeEffect) {
          activeTag.value = ''
          emit('change', item)
        }
        else {
          activeTag.value = item.value
          emit('change', item)
        }
      }
      // compute is select all or not
      if (props.multiple) {
        const actives = activeTag.value as string[]
        const values = options.value.map((item: any) => item.value)
        if (actives.includes('all')) {
          if (actives.length !== values.length) {
            const index = actives.indexOf('all')
            actives.splice(index, 1)
            emit('change', values)
          }
        }
        else {
          if (actives.length === values.length - 1) {
            activeTag.value = values
            emit('change', values)
          }
        }
      }
    }

    const getTagClass = (item: any, index: number) => {
      const effect = item.effect || 'dark'
      return {
        'cursor-pointer': true,
        'mr-4': index !== options.value.length - 1,
        'z-tag-select__tag--inactive': isActive(item) !== effect,
      }
    }

    return () => {
      return <div class={cls.value} ref={zTag}>
        {props.title && <span class='z-tag-select__title'>{props.title}</span>}
        <div class='z-tag-select__content'>
          {options.value.map((item: any, index: number) => {
            return <el-tag
              {...item}
              effect={isActive(item)}
              class={getTagClass(item, index)}
              onClick={() => handleClickTag(item)}
            >
              {item.label}
            </el-tag>
          })}
          {isShowMore.value && <span onClick={handleChangeExpand} class="z-tag-select__expand">
            {isExpand.value ? '收起' : '展开'}<el-icon class={iconClass.value}><i-arrow-down /></el-icon>
          </span>}
        </div>
      </div>
    }
  },
})
