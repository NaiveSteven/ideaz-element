import type { Slot } from 'vue'
import { mergeProps } from 'vue-demi'
import { reactiveOmit } from '@vueuse/core'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { getContentByRenderAndSlot } from '@ideaz/shared'
import { get } from 'lodash-unified'
import { isFunction } from '@ideaz/utils'
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
        return get(props.detail, item.prop, '')
      }
    }

    function createLabel(item: DescriptionsColumn) {
      if (slots[`detail-${item.prop}-label`]) {
        return (slots[`detail-${item.prop}-label`] as Slot)({
          size: size.value,
          item,
        })
      }
      else if (item.renderLabel) {
        return isFunction(item.renderLabel)
          ? item.renderLabel(item)
          : String(item.renderLabel)
      }
      else {
        return null
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
            label: () => createLabel(item),
          },
        ),
      )
    }

    return () =>
      h(ElDescriptions, mergeProps(config, { class: 'pro-descriptions' }), {
        default: () => [createDefault(), slots.default && slots.default()],
        title: () => getContentByRenderAndSlot(props.title, slots),
        extra: () => getContentByRenderAndSlot(props.extra, slots),
      })
  },
})
