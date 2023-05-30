import { resolveDynamicComponent } from '@ideaz/shared'
import type { CSSProperties } from 'vue-demi'
import { rowProps } from './props'

export default defineComponent({
  name: 'ZRow',
  props: rowProps,
  emits: ['input', 'update:modelValue'],
  setup(props, { slots }) {
    const ns = useNamespace('row')

    const gutter = computed(() => props.gutter)

    provide('rowContextKey', {
      gutter,
    })

    const style = computed(() => {
      const styles: CSSProperties = {}
      if (!props.gutter)
        return styles

      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`
      return styles
    })

    const rowKls = computed(() => [
      ns.b(),
      ns.is(`justify-${props.justify}`, props.justify !== 'start'),
      ns.is(`align-${props.align}`, props.align !== 'top'),
    ])

    return () =>
      resolveDynamicComponent({
        name: props.tag,
        attrs: {
          class: rowKls.value,
          style: style.value,
        },
        content: slots.default?.(),
      })
  },
})
