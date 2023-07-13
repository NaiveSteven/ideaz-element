export default defineComponent({
  name: 'ToggleButton',
  props: {
    modelValue: {
      type: String,
      default: 'expand',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const size = useFormSize()
    const ns = useNamespace('form')
    const { t } = useLocale()

    const text = computed(() => {
      return props.modelValue === 'expand' ? t('tagSelect.expand') : t('tagSelect.retract')
    })

    const iconClass = computed(() => {
      return {
        'z-toggle__icon': true,
        'z-icon__arrow': props.modelValue !== 'expand',
      }
    })

    const handleClick = () => {
      emit('update:modelValue', props.modelValue === 'expand' ? 'up' : 'expand')
    }
    return () => {
      return (
        <div class={ns.b('toggle')} onClick={handleClick}>
          <el-button
            class={ns.b('toggle-button')}
            link
            type="primary"
            size={size.value}
          >
            {text.value}
            <el-icon class={iconClass.value}><i-arrow-down /></el-icon>
          </el-button>
        </div>
      )
    }
  },
})
