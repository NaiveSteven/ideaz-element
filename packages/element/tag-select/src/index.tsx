import elementResizeDetectorMaker from 'element-resize-detector'

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

    const observer = elementResizeDetectorMaker()
    const isExpand = ref(false)
    const isShowMore = ref(false)
    const zTag = ref()

    onMounted(() => {
      observer.listenTo(
        { strategy: 'scroll' },
        zTag.value,
        computedMore,
      )
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

    function computedMore() {
      const element = zTag.value
      const tagTitle = element.getElementsByClassName('z-tag-select__title')[0]
      if (element) {
        const width = element.offsetWidth - 38
        const tags = element.querySelectorAll('.el-tag')
        let totalWidth = 0 + (tagTitle ? tagTitle.offsetWidth + 24 : 0)
        let index = 0
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i]
          totalWidth = i === tags.length - 1 ? totalWidth + tag.offsetWidth : totalWidth + tag.offsetWidth + 16

          if (totalWidth > width) {
            index = i
            break
          }
        }
        if (index > 0)
          isShowMore.value = true

        else
          isShowMore.value = false
      }
    }

    // 支持展开收起项自动隐藏展示、支持传入type、effect等属性、优化title列和tag列的样式（分成两列）

    const handleChangeExpand = () => {
      isExpand.value = !isExpand.value
    }

    const isActive = (item: any) => {
      if (props.multiple)
        return (activeTag.value as number[]).includes(item.value) ? 'dark' : 'light'

      return String(activeTag.value) === String(item.value) ? 'dark' : 'light'
    }

    const handleClickTag = (item: any) => {
      const effect = isActive(item)
      if (item.value === 'all') {
        if (effect === 'dark') {
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

    return () => {
      return <div class={cls.value} ref={zTag}>
        {props.title && <span class='mr-6 z-tag-select__title'>{props.title}</span>}
        {options.value.map((item: any, index: number) => {
          return <el-tag
            effect={isActive(item)}
            class={index === options.value.length - 1 ? 'cursor-pointer' : 'cursor-pointer mr-4'}
            onClick={() => handleClickTag(item)}
            {...item}
          >
            {item.label}
          </el-tag>
        })}
        {isShowMore.value && <span onClick={handleChangeExpand} class="z-tag-select__expand">
          {isExpand.value ? '收起' : '展开'}<el-icon class={iconClass.value}><i-arrow-down /></el-icon>
        </span>}
      </div>
    }
  },
})
