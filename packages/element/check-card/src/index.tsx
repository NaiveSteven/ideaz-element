import type { ExtractPropTypes, PropType } from 'vue-demi'

const cardProps = {
  defaultChecked: {
    type: Boolean,
  },
  checked: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  avatar: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  value: {
    type: [String, Number],
  },
  loading: {
    type: Boolean,
  },
  cover: {
    type: String,
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
  },
  bordered: {
    type: Boolean,
  },
  extra: {
    type: String,
  },
}

export default defineComponent({
  name: 'ZCheckCard',
  props: cardProps,
  emits: ['click'],
  setup(props, { emit }) {
    const stateChecked = ref(props.defaultChecked)

    const checkCardProps = ref<ExtractPropTypes<typeof cardProps>>({} as any)

    const multiple = ref(false)

    const handleClick = (e: any) => {
      emit('click', e)
      // checkCardGroup?.toggleOption?.({ value: props.value });
      stateChecked.value = !stateChecked.value
    }

    const prefixCls = 'z-pro-checkcard'
    const checkCardGroup: any = {}
    const getSizeCls = (size?: string) => {
      if (size === 'large') return 'lg'
      if (size === 'small') return 'sm'
      return ''
    }

    // useEffect(() => {
    //   checkCardGroup?.registerValue?.(props.value);
    //   return () => checkCardGroup?.cancelValue?.(props.value);
    // }, [props.value]);

    /**

    * 头像自定义
    *
    * @param prefixCls
    * @param cover
    * @returns
    */
    const renderCover = (prefixCls: string, cover: string) => {
      return (
        <div class={`${prefixCls}-cover`}>
          {typeof cover === 'string'
            ? (
              <img src={cover} alt="check-card" />
            )
            : (
              cover
            )}
        </div>
      )
    }

    watchEffect(() => {
      const { avatar, title, description, cover, extra, ...others } = props
      checkCardProps.value = { ...others }
      checkCardProps.value.checked = stateChecked.value

      if (checkCardGroup) {
        // 受组控制模式
        checkCardProps.value.disabled = props.disabled || checkCardGroup.disabled
        checkCardProps.value.loading = props.loading || checkCardGroup.loading
        checkCardProps.value.bordered = props.bordered || checkCardGroup.bordered
        multiple.value = checkCardGroup.multiple

        const isChecked = checkCardGroup.multiple
          ? checkCardGroup.value?.includes(props.value)
          : checkCardGroup.value === props.value

        // loading时check为false
        checkCardProps.value.checked = checkCardProps.value.loading ? false : isChecked
        checkCardProps.value.size = props.size || checkCardGroup.size
      }
    })

    const classString = computed(() => {
      const {
        disabled = false,
        size,
        loading: cardLoading,
        bordered = true,
        checked,
      } = checkCardProps.value
      const sizeCls = getSizeCls(size)

      return {
        [`${prefixCls}-loading`]: cardLoading,
        [`${prefixCls}-${sizeCls}`]: sizeCls,
        [`${prefixCls}-checked`]: checked,
        [`${prefixCls}-multiple`]: multiple.value,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-bordered`]: bordered,
        'z-pro-checkcard': true,
      }
    })

    return () => {
      const {
        disabled = false,
        loading: cardLoading,
      } = checkCardProps.value
      const { avatar, title, description, cover, extra } = props

      const metaDom = () => {
        if (cardLoading) return 'card-loading'
        // return <CardLoading prefixCls={prefixCls || ''} />

        if (cover) return renderCover(prefixCls || '', cover)

        const avatarDom = avatar
          ? (
            <div class={`${prefixCls}-avatar`}>
              {typeof avatar === 'string'
                ? (
                  <el-avatar size={48} shape="square" src={avatar} />
                )
                : (
                  avatar
                )}
            </div>
          )
          : null

        const headerDom = (title || extra) && (
          <div class={`${prefixCls}-header`}>
            <div class={`${prefixCls}-title`}>{title}</div>
            {extra && <div class={`${prefixCls}-extra`}>{extra}</div>}
          </div>
        )

        const descriptionDom = description
          ? (
            <div class={`${prefixCls}-description`}>{description}</div>
          )
          : null

        const metaClass = computed(() => {
          return {
            [`${prefixCls}-avatar-header`]:
              avatarDom && headerDom && !descriptionDom,
            [`${prefixCls}-content`]: true,
          }
        })

        return (
          <div class={metaClass.value}>
            {avatarDom}
            {headerDom || descriptionDom
              ? (
                <div class={`${prefixCls}-detail`}>
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
