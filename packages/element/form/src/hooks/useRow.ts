import type { CSSProperties, ComputedRef } from 'vue'
import type { FormProps } from '../props'

export function useRow(mergedProps: ComputedRef<FormProps>) {
  const ns = useNamespace('row', ref('el'))

  const rowStyle = computed(() => {
    const styles: CSSProperties = {}
    if (!mergedProps.value.gutter)
      return styles

    styles.marginRight = styles.marginLeft = `-${mergedProps.value.gutter / 2}px`
    return styles
  })

  const rowKls = computed(() => [
    ns.b(),
    ns.is(`justify-${mergedProps.value.justify}`, mergedProps.value.justify !== 'start'),
    ns.is(`align-${mergedProps.value.align}`, mergedProps.value.align !== 'top'),
  ])

  return { rowStyle, rowKls }
}
