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

    const text = computed(() => {
      return props.modelValue === 'expand' ? '展开' : '收起'
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
        <div class="z-toggle__container" onClick={handleClick}>
          <el-button
            class={`z-toggle__button z-toggle__button--${size.value}`}
            link
            type="primary"
          // size={props.formConfig.size}
          >
            {text.value}
            <el-icon class={iconClass.value}><i-arrow-down /></el-icon>
          </el-button>
        </div>
      )
    }
  },
})
