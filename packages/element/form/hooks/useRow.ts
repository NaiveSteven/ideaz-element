import type { CSSProperties } from 'vue-demi'
import type { FormProps } from '../src/props'

export const useRow = (props: FormProps) => {
  const ns = useNamespace('row')

  const rowStyle = computed(() => {
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

  return { rowStyle, rowKls }
}
