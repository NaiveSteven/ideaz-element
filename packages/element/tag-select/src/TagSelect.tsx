import { ArrowDown } from '@element-plus/icons'
import { getPxValue } from '@ideaz/shared'
import { isValid } from '@ideaz/utils'
import { useShowMore } from './hooks'
import type { TagSelectOptionsItem } from './props'
import { tagSelectProps } from './props'

export default defineComponent({
  name: 'ZTagSelect',
  components: { ArrowDown },
  props: tagSelectProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const { isShowMore, zTag } = useShowMore()
    const ns = useNamespace('tag-select')
    const size = useFormSize()
    const { t } = useLocale()
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
        return [{ label: t('tagSelect.all'), value: 'all' }, ...props.options]

      return props.options
    })

    const cls = computed(() => {
      return {
        [ns.e('container')]: true,
        [ns.em('container', 'more')]: isExpand.value,
      }
    })

    const iconClass = computed(() => {
      return {
        [ns.e('icon')]: true,
        [ns.e('arrow')]: isExpand.value,
      }
    })

    const handleChangeExpand = () => {
      isExpand.value = !isExpand.value
    }

    const isActive = (item: TagSelectOptionsItem) => {
      const effect = item.effect || 'dark'
      if (props.multiple)
        return (activeTag.value as number[]).includes(item.value) ? effect : undefined

      return String(activeTag.value) === String(item.value) ? effect : undefined
    }

    const handleClickTag = (item: TagSelectOptionsItem) => {
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
            activeTag.value = options.value.map((item: TagSelectOptionsItem) => item.value)
            emit('change', options.value.map((item: TagSelectOptionsItem) => item.value))
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
        const values = options.value.map((item: TagSelectOptionsItem) => item.value)
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

    const getTagClass = (item: TagSelectOptionsItem, index: number) => {
      const effect = item.effect || 'dark'
      return {
        [ns.e('tag')]: true,
        [ns.em('tag', 'last')]: index !== options.value.length - 1,
        [ns.em('tag', 'inactive')]: isActive(item) !== effect,
      }
    }

    return () => {
      const { titleWidth, title } = props
      return <div class={cls.value} ref={zTag}>
        {title && <span class={ns.e('title')} style={{ width: isValid(titleWidth) ? getPxValue(titleWidth) : 'auto' }}>{title}</span>}
        <div class={ns.e('content')}>
          {options.value.map((item: TagSelectOptionsItem, index: number) => {
            return <el-tag
              {...item}
              effect={isActive(item)}
              class={getTagClass(item, index)}
              onClick={() => handleClickTag(item)}
              size={size.value}
            >
              {item.label}
            </el-tag>
          })}
          {isShowMore.value && <span onClick={handleChangeExpand} class={ns.m('expand')}>
            {isExpand.value ? t('tagSelect.retract') : t('tagSelect.expand')}<el-icon class={iconClass.value}><ArrowDown /></el-icon>
          </span>}
        </div>
      </div>
    }
  },
})
