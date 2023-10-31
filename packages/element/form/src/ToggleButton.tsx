import { ArrowDown } from '@element-plus/icons-vue'
import { ElButton, ElIcon } from 'element-plus'

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
          <ElButton
            class={ns.b('toggle-button')}
            link
            type="primary"
            size={size.value}
          >
            {text.value}
            <ElIcon class={iconClass.value}><ArrowDown /></ElIcon>
          </ElButton>
        </div>
      )
    }
  },
})
