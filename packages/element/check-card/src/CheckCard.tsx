import { h } from 'vue-demi'
import { isFunction } from '@ideaz/utils'
import { useNamespace } from '@ideaz/hooks'
import type { CheckCardProps } from './props'
import type CheckCardGroup from './CheckBoxGroup'
import { cardProps } from './props'

export default defineComponent({
  name: 'ZCheckCard',
  props: cardProps,
  emits: ['click', 'change'],
  setup(props, { emit }) {
    const stateChecked = ref(props.defaultChecked)
    const checkCardProps = ref<CheckCardProps>({} as CheckCardProps)
    const multiple = ref(false)
    const checkCardGroup = inject<typeof CheckCardGroup | null>('check-card-group', null)
    const ns = useNamespace('check-card')

    const getSizeCls = (size?: string) => {
      if (size === 'large') return 'lg'
      if (size === 'small') return 'sm'
      return ''
    }

    watchEffect(() => {
      const {
        defaultChecked,
        checked,
        disabled,
        loading,
        bordered,
        value,
        size,
      } = props

      checkCardProps.value = {
        defaultChecked,
        checked,
        disabled,
        loading,
        bordered,
        value,
        size,
      }

      checkCardProps.value.checked = stateChecked.value

      if (checkCardGroup?.value) {
        // 受组控制模式
        checkCardProps.value.disabled
          = props.disabled || checkCardGroup.value.disabled
        checkCardProps.value.loading
          = props.loading || checkCardGroup.value.loading
        checkCardProps.value.bordered
          = props.bordered || checkCardGroup.value.bordered

        multiple.value = checkCardGroup.value.multiple

        const isChecked = checkCardGroup.value.multiple
          ? checkCardGroup.value.value?.includes(props.value)
          : checkCardGroup.value.value === props.value

        // loading时check为false
        checkCardProps.value.checked = checkCardProps.value.loading
          ? false
          : isChecked
        checkCardProps.value.size = props.size || checkCardGroup.value.size
      }
    })

    const classString = computed(() => {
      const {
        disabled = false,
        size,
        loading: cardLoading,
        bordered,
        checked,
      } = checkCardProps.value
      const sizeCls = getSizeCls(size)

      return {
        [ns.m('loading')]: cardLoading,
        [ns.m(sizeCls)]: sizeCls,
        [ns.m('checked')]: checked,
        [ns.m('multiple')]: multiple.value,
        [ns.m('disabled')]: disabled,
        [ns.m('bordered')]: bordered,
        'z-check-card': true,
      }
    })

    const renderCover = (cover: string | ((h: (type: string, children?: any) => VNode) => VNode)) => {
      return (
        <div class={ns.e('cover')}>
          {typeof cover === 'string'
            ? (
              <img src={cover} alt="check-card" />
            )
            : (
              cover(h)
            )}
        </div>
      )
    }

    const handleClick = (e: MouseEvent) => {
      emit('click', e)
      checkCardGroup?.value.toggleOption?.({ value: props.value })
      stateChecked.value = !stateChecked.value
      emit('change', stateChecked.value)
    }

    return () => {
      const { disabled = false, loading: cardLoading } = checkCardProps.value
      const { avatar, title, description, cover, extra, style } = props

      const metaDom = () => {
        if (cardLoading) return <div class="py-3 px-4"><el-skeleton rows={2} animated /></div>

        if (cover) return renderCover(cover)

        const avatarDom = avatar
          ? (
            <div class={ns.e('avatar')}>
              {typeof avatar === 'string'
                ? (
                  <el-avatar size={48} shape="square" src={avatar} />
                )
                : (
                  avatar(h)
                )}
            </div>
          )
          : null

        const headerDom = (title || extra) && (
          <div class={ns.e('header')}>
            <div class={ns.e('title')}>
              {isFunction(title) ? title(h) : title}
            </div>
            {extra && <div class={ns.e('extra')}>
              {isFunction(extra) ? extra(h) : extra}
            </div>}
          </div>
        )

        const descriptionDom = description
          ? (
            <div class={ns.e('description')}>
              {isFunction(description) ? description(h) : description}
            </div>
          )
          : null

        const metaClass = computed(() => {
          return {
            [ns.e('avatar-header')]:
              avatarDom && headerDom && !descriptionDom,
            [ns.e('content')]: true,
          }
        })

        return (
          <div class={metaClass.value}>
            {avatarDom}
            {(headerDom || descriptionDom)
              ? (
                <div class={ns.e('detail')}>
                  {headerDom}
                  {descriptionDom}
                </div>
              )
              : null}
          </div>
        )
      }

      return (
        <div
          class={classString.value}
          style={style}
          onClick={(e) => {
            if (!cardLoading && !disabled)
              handleClick(e)
          }}
        >
          {metaDom()}
        </div>
      )
    }
  },
})