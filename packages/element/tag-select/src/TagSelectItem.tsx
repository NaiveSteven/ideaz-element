import { ArrowDown } from '@element-plus/icons-vue'
import { getPxValue, isFunction, isValid } from '@ideaz/utils'
import { getContentByRenderAndSlot } from '@ideaz/shared'
import { get, set } from 'lodash-unified'
import { ElTag } from 'element-plus'
import { useShowMore } from './hooks'
import type { TagSelectOptionsItem } from './props'
import { tagSelectItemProps } from './props'

export default defineComponent({
  name: 'ZTagSelectItem',
  components: { ArrowDown, ElTag },
  props: tagSelectItemProps,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, slots }) {
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
      if (props.all && props.multiple) {
        const all: TagSelectOptionsItem = {} as TagSelectOptionsItem
        set(all, props.alias?.label || 'label', t('tagSelect.all'))
        set(all, props.alias?.value || 'value', 'all')
        return [all, ...props.options]
      }
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
      const itemValue = get(item, props.alias?.value || 'value', '')
      if (props.multiple)
        return (activeTag.value as number[]).includes(itemValue) ? effect : undefined

      return String(activeTag.value) === String(itemValue) ? effect : undefined
    }

    const handleClickTag = (item: TagSelectOptionsItem) => {
      if (isFunction(item.onClick))
        item.onClick(item)
      const itemValue = get(item, props.alias?.value || 'value', '')
      const activeEffect = item.effect || 'dark'
      const effect = isActive(item)
      if (itemValue === 'all') {
        if (effect === activeEffect) {
          if (props.multiple) {
            activeTag.value = []
            emit('change', [])
            return
          }
          else {
            activeTag.value = ''
            emit('change', itemValue)
          }
        }
        else {
          if (props.multiple) {
            activeTag.value = options.value.map((item: TagSelectOptionsItem) => get(item, props.alias?.value || 'value', ''))
            emit('change', options.value.map((item: TagSelectOptionsItem) => get(item, props.alias?.value || 'value', '')))
            return
          }
          else {
            activeTag.value = itemValue
            emit('change', itemValue)
          }
        }
        return
      }
      if (props.multiple) {
        const actives = activeTag.value as number[]
        if (effect === activeEffect) {
          const index = actives.indexOf(itemValue)
          actives.splice(index, 1)
        }
        else {
          actives.push(itemValue)
        }
      }
      else {
        if (effect === activeEffect) {
          activeTag.value = ''
          emit('change', '')
        }
        else {
          activeTag.value = itemValue
          emit('change', itemValue)
        }
      }
      // compute is select all or not
      if (props.multiple) {
        const actives = activeTag.value as string[]
        const values = options.value.map((item: TagSelectOptionsItem) => get(item, props.alias?.value || 'value', ''))
        if (actives.includes('all')) {
          if (actives.length !== values.length) {
            const index = actives.indexOf('all')
            actives.splice(index, 1)
          }
          emit('change', actives)
        }
        else {
          // if select all other tag, then select the all tag
          if (actives.length === values.length - 1 && props.all) {
            activeTag.value = values

            emit('change', values)
          }
          else {
            emit('change', actives)
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
        {title && <span class={ns.e('title')} style={{ width: isValid(titleWidth) ? getPxValue(titleWidth) : 'auto' }}>
          {getContentByRenderAndSlot(title, slots)}
        </span>}
        <div class={ns.e('content')}>
          {options.value.map((item: TagSelectOptionsItem, index: number) => {
            return <ElTag
              {...{
                ...item,
                onClick: () => handleClickTag(item),
                onClose: () => isFunction(item.onClose) && item.onClose(item),
              }}
              effect={isActive(item)}
              class={getTagClass(item, index)}
              size={size.value}
            >
              {get(item, props.alias?.label || 'label', '')}
            </ElTag>
          })}
          {isShowMore.value && <span onClick={handleChangeExpand} class={ns.m('expand')}>
            {isExpand.value ? t('tagSelect.retract') : t('tagSelect.expand')}<el-icon class={iconClass.value}><ArrowDown /></el-icon>
          </span>}
        </div>
      </div>
    }
  },
})
