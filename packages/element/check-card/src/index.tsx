export default defineComponent({
  name: 'ZCheckCard',
  props: {
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
  },
  emits: ['click'],
  setup(props, { emit }) {
    const stateChecked = ref(props.defaultChecked)

    const handleClick = (e: any) => {
      emit('click', e)
      // checkCardGroup?.toggleOption?.({ value: props.value });
      stateChecked.value = !stateChecked.value
    }

    const checkCardGroup: any = {}

    const getSizeCls = (size?: string) => {
      if (size === 'large') return 'lg'
      if (size === 'small') return 'sm'
      return ''
    }

    // useEffect(() => {
    //   checkCardGroup?.registerValue?.(props.value);
    //   return () => checkCardGroup?.cancelValue?.(props.value);
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [props.value]);

    /**
   * 头像自定义
   *
   * @param prefixCls
   * @param cover
   * @returns
   */
    const renderCover = (prefixCls: string, cover: string | React.ReactNode) => {
      return (
        <div class={`${prefixCls}-cover`}>
          {typeof cover === 'string' ? <img src={cover} alt="check-card" /> : cover}
        </div>
      )
    }

    const {
      avatar,
      title,
      description,
      cover,
      extra,
      style = {},
      ...others
    } = props

    const checkCardProps: any = { ...others }

    const { wrapSSR, hashId } = useStyle('prefixCls')

    checkCardProps.checked = stateChecked.value

    let multiple = false

    if (checkCardGroup) {
      // 受组控制模式
      checkCardProps.disabled = props.disabled || checkCardGroup.disabled
      checkCardProps.loading = props.loading || checkCardGroup.loading
      checkCardProps.bordered = props.bordered || checkCardGroup.bordered

      multiple = checkCardGroup.multiple

      const isChecked = checkCardGroup.multiple
        ? checkCardGroup.value?.includes(props.value)
        : checkCardGroup.value === props.value

      // loading时check为false
      checkCardProps.checked = checkCardProps.loading ? false : isChecked
      checkCardProps.size = props.size || checkCardGroup.size
    }

    const { disabled = false, size, loading: cardLoading, bordered = true, checked } = checkCardProps

    const metaDom = () => {
      if (cardLoading)
        return <CardLoading prefixCls={prefixCls || ''} />

      if (cover)
        return renderCover(prefixCls || '', cover)

      const avatarDom = avatar
        ? (
          <div class={`${prefixCls}-avatar ${hashId}`}>
            {typeof avatar === 'string' ? <el-avatar size={48} shape="square" src={avatar} /> : avatar}
          </div>
        )
        : null

      const headerDom = (title || extra) && (
        <div class={`${prefixCls}-header ${hashId}`}>
          <div class={`${prefixCls}-title ${hashId}`}>{title}</div>
          {extra && <div class={`${prefixCls}-extra ${hashId}`}>{extra}</div>}
        </div>
      )

      const descriptionDom = description
        ? (
          <div class={`${prefixCls}-description ${hashId}`}>{description}</div>
        )
        : null

      const metaClass = class(`${prefixCls}-content`, hashId, {
        [`${prefixCls}-avatar-header`]: avatarDom && headerDom && !descriptionDom,
      })

      return (
        <div class={metaClass}>
          {avatarDom}
          {headerDom || descriptionDom
            ? (
              <div class={`${prefixCls}-detail ${hashId}`}>
                {headerDom}
                {descriptionDom}
              </div>
            )
            : null}
        </div>
      )
    }

    const sizeCls = getSizeCls(size);

    const classString = computed(() => {
      return {
        [`${prefixCls}-loading`]: cardLoading,
        [`${prefixCls}-${sizeCls}`]: sizeCls,
        [`${prefixCls}-checked`]: checked,
        [`${prefixCls}-multiple`]: multiple,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-bordered`]: bordered,
      }
    })

    return () => {
      return <div
        class={classString.value}
        onClick={(e) => {
          if (!cardLoading && !disabled) {
            handleClick(e);
          }
        }}
      >
        {metaDom()}
      </div>
    }
  },
})
