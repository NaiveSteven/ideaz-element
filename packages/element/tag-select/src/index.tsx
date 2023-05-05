import elementResizeDetectorMaker from 'element-resize-detector'
import { useWindowSize } from '@vueuse/core'

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

    const observer = elementResizeDetectorMaker()

    const { width } = useWindowSize()

    const zTag = ref(null)

    watch(() => width.value, () => {
      computedMore()
    })

    onMounted(() => {
      // observer.listenTo(
      //   { strategy: 'scroll' }, // 基于滚动的情况下，提高性能
      //   document.querySelector('.z-tag-select__container'),
      //   computedMore,
      // )
      computedMore()
    })

    function computedMore(ele?: any) {
      const element = ele || document.getElementsByClassName('z-tag-select__container')[0]
      const tagTitle = document.getElementsByClassName('z-tag-select__title')[0]
      if (element) {
        const width = element.offsetWidth
        const tags = element.querySelectorAll('.el-tag')
        const originTagWidth = tags[0].offsetWidth
        let totalWidth = 0 + (tagTitle ? tagTitle.offsetWidth + 20 : 0)
        let index = 0
        for (let i = 0; i < tags.length; i++) {
          // const tag = tags[i]
          totalWidth = totalWidth + originTagWidth + 16
          if (totalWidth > width) {
            index = i
            break
          }
        }
        // console.log(totalWidth, width, index, tags, 'asdf')
        if (index > 0) {
          showHideMore(tags, 'hide', index)
          let more = element.querySelector('.z-tag-select__more')
          if (!more)
            more = document.createElement('span')

          more.innerHTML = `+${tags.length - index}`
          more.style.marginLeft = '4px'
          more.style.cursor = 'pointer'
          more.style.position = 'absolute'
          more.style.top = '1px'
          more.style.right = '0'
          more.className += ' z-tag-select__more'
          more.onclick = () => {
            if (more.innerHTML.startsWith('+')) {
              showHideMore(tags, 'show', index)
              more.innerHTML = `-${tags.length - index}`
            }
            else {
              showHideMore(tags, 'hide', index)
              more.innerHTML = `+${tags.length - index}`
            }
          }
          element.appendChild(more)
        }
      }
    }

    function showHideMore(tags: any, operate: 'show' | 'hide', index: number) {
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        if (operate === 'hide') {
          if (i < index)
            tag.style.display = 'inline-flex'

          else
            tag.style.display = 'none'
        }
        else {
          tag.style.display = 'inline-flex'
        }
      }
    }

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
      return <div ref={zTag.value} class='z-tag-select__container'>
        {props.title && <span class='mr-6 z-tag-select__title'>{props.title}</span>}
        {props.options.map((item: any, index: number) => {
          return <el-tag effect={isActive(item)} class={index === props.options.length - 1 ? 'cursor-pointer' : 'cursor-pointer mr-4'} onClick={() => handleClick(item)}>{item.label}</el-tag>
        })}
      </div>
    }
  },
})
