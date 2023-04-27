export default defineComponent({
  name: 'ToggleButton',
  props: {
    modelValue: {
      type: String,
      default: 'expand',
    },
    formConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const text = computed(() => {
      return props.modelValue === 'expand' ? '展开' : '收起'
    })

    const iconClass = computed(() => {
      return {
        'c-toggle__icon': true,
        'c-icon__arrow': props.modelValue !== 'expand',
      }
    })

    const handleClick = () => {
      emit('update:modelValue', props.modelValue === 'expand' ? 'up' : 'expand')
    }
    return () => {
      return (
        <div class="c-toggle__container" onClick={handleClick}>
          <el-button
            class={`c-toggle__button c-toggle__button--${props.formConfig.size}`}
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
