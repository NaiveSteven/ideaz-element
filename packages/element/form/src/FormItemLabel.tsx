import { isFunction, isObject, isSlot, isString } from '@ideaz/utils'

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
          <el-tooltip
            effect="dark"
            placement="top"
            {...tooltipProps}
            v-slots={tooltipSlot}
          >
            {tooltip && (
              <el-icon class={ns.be('label', 'icon')}>
                <i-question-filled />
              </el-icon>
            )}
          </el-tooltip>
          {colon ? ':' : null}
        </span>
      )
    }
  },
})
