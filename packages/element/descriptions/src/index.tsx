import type { Slot } from 'vue'
import { mergeProps } from 'vue-demi'
import { reactiveOmit } from '@vueuse/core'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { getContentByRenderAndSlot } from '@ideaz/shared'
import { get } from 'lodash-unified'
import { isArray, isFunction, isString } from '@ideaz/utils'
import { descriptionsProps } from './descriptions'
import type { DescriptionsColumn } from './descriptions'

export default defineComponent({
  name: 'ZDescriptions',
  props: descriptionsProps,
  setup(props, { slots }) {
    const size = useFormSize()
    const config = reactiveOmit(
      props,
      'title',
      'extra',
      'columns',
      'detail',
      'align',
      'labelAlign',
    )
    const ns = useNamespace('descriptions')

    function createDetail(item: DescriptionsColumn) {
      if (slots[`detail-${item.prop}`]) {
        return (slots[`detail-${item.prop}`] as Slot)({
          size: size.value,
          item: props.detail,
        })
      }
      else if (item.render) {
        return isFunction(item.render)
          ? item.render(props.detail)
          : String(item.render)
      }
      else {
        const val = get(props.detail, item.prop, '')
        return isArray(val) ? val.join(', ') : val
      }
    }

    function createDefault() {
      return props.columns?.map(item =>
        h(
          ElDescriptionsItem,
          {
            ...item,
            align: item.align ?? props.align,
            labelAlign: item.labelAlign ?? props.labelAlign,
          },
          {
            default: () => createDetail(item),
            label: () => getContentByRenderAndSlot(item.label, slots, item),
          },
        ),
      )
    }

    function createExtra() {
      if (isFunction(props.extra)) return props.extra()
      if (isString(props.extra)) return props.extra
      if (isFunction(slots.extra)) return slots.extra()
      return null
    }

    return () =>
      h(ElDescriptions, mergeProps(config, { class: ns.b() }), {
        default: () => [createDefault(), slots.default && slots.default()],
        title: () => getContentByRenderAndSlot(props.title, slots),
        extra: () => createExtra(),
      })
  },
})
