import { isFunction, isObject, isSlot, isString } from '@ideaz/utils'
import { QuestionFilled } from '@element-plus/icons-vue'
import { ElIcon, ElTooltip } from 'element-plus'
import type { FormItemTooltip } from '../../types'

interface TooltipReference { reference?: (() => VNode) }

export default defineComponent({
  name: 'FormItemLabel',
  props: {
    label: {
      type: [String, Function],
      default: '',
    },
    tooltip: {
      type: [String, Function, Object] as PropType<FormItemTooltip>,
      default: '',
    },
    colon: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const ns = useNamespace('form-item')

    const renderReference = (tooltip: FormItemTooltip) => {
      if (isObject(tooltip) && isFunction((tooltip as TooltipReference).reference)) {
        return (tooltip as TooltipReference).reference?.()
      }
      if (isSlot((tooltip as TooltipReference).reference)) {
        return slots[(tooltip as { reference: string }).reference]?.()
      }
      return tooltip && (
        <ElIcon class={ns.be('label', 'icon')}>
          <QuestionFilled />
        </ElIcon>
      )
    }

    return () => {
      const { label, colon, tooltip } = props

      const tooltipProps = isObject(tooltip)
        ? tooltip
        : { content: isString(tooltip) ? tooltip : '' }
      const tooltipSlot: any = {}

      if (isFunction(tooltip))
        tooltipSlot.content = () => tooltip()

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
            {renderReference(tooltip)}
          </ElTooltip>
          {colon ? ':' : null}
        </span>
      )
    }
  },
})
