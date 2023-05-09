import { resolveDynamicComponent } from '@ideaz/shared'
import { textProps } from './text'

export default defineComponent({
  name: 'ZText',
  props: textProps,
  setup(props, { slots }) {
    const ns = useNamespace('text')

    const textKls = computed(() => [
      ns.b(),
      ns.m(props.type),
      // ns.m(textSize.value),
      ns.is('truncated', props.truncated),
    ])

    return () => {
      return resolveDynamicComponent({
        name: props.tag,
        attrs: {
          class: textKls.value,
        },
        content: slots.default?.(),
      })
    }
  },
})
