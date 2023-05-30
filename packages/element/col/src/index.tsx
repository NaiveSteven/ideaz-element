import { isNumber, isObject } from '@ideaz/utils'
import { resolveDynamicComponent } from '@ideaz/shared'
import type { CSSProperties } from 'vue-demi'
import { colProps } from './props'

export default defineComponent({
  name: 'ZCol',
  props: colProps,
  emits: ['input', 'update:modelValue'],
  setup(props, { slots }) {
    const ns = useNamespace('col')
    const { gutter } = inject('rowContextKey', { gutter: computed(() => 0) })

    const style = computed(() => {
      const styles: CSSProperties = {}
      if (gutter.value)
        styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`

      return styles
    })

    const colKls = computed(() => {
      const classes: string[] = []
      const pos = ['span', 'offset', 'pull', 'push'] as const

      pos.forEach((prop) => {
        const size = props[prop]
        if (isNumber(size)) {
          if (prop === 'span') classes.push(ns.b(`${props[prop]}`))
          else if (size > 0) classes.push(ns.b(`${prop}-${props[prop]}`))
        }
      })

      const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
      sizes.forEach((size) => {
        if (isNumber(props[size])) {
          classes.push(ns.b(`${size}-${props[size]}`))
        }
        else if (isObject(props[size])) {
          Object.entries(props[size]).forEach(([prop, sizeProp]) => {
            classes.push(
              prop !== 'span'
                ? ns.b(`${size}-${prop}-${sizeProp}`)
                : ns.b(`${size}-${sizeProp}`),
            )
          })
        }
      })

      // this is for the fix
      if (gutter.value)
        classes.push(ns.is('guttered'))

      return [ns.b(), classes]
    })

    return () =>
      resolveDynamicComponent({
        name: props.tag,
        attrs: {
          class: colKls.value,
          style: style.value,
        },
        content: slots.default?.(),
      })
  },
})
