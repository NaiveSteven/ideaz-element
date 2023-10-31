import { isFunction, isObject, isSlot, isString } from '@ideaz/utils'
import { QuestionFilled } from '@element-plus/icons-vue'
import { ElIcon, ElTooltip } from 'element-plus'

export default defineComponent({
  name: 'FormItemLabel',
  props: {
    label: {
      type: [String, Function],
      default: '',
    },
    tooltip: {
      type: [String, Function, Object],
      default: '',
    },
    colon: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const ns = useNamespace('form-item')

    return () => {
      const { label, colon, tooltip } = props

      const tooltipProps = isObject(tooltip)
        ? tooltip
        : { content: isString(tooltip) ? tooltip : '' }
      const tooltipSlot: any = {}

      if (isFunction(tooltip))
        tooltipSlot.content = () => tooltip(h)

      if (isSlot(tooltip))
        tooltipSlot.content = () => slots[tooltip as string]?.()

      return (
        <span>
          {label}
          <ElTooltip
            effect="dark"
            placement="top"
            {...tooltipProps}
            v-slots={tooltipSlot}
          >
            {tooltip && (
              <ElIcon class={ns.be('label', 'icon')}>
                <QuestionFilled />
              </ElIcon>
            )}
          </ElTooltip>
          {colon ? ':' : null}
        </span>
      )
    }
  },
})
