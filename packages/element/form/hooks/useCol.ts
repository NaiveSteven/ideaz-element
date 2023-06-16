import { isNumber, isObject } from '@ideaz/utils'
import type { CSSProperties } from 'vue-demi'
import type { FormProps } from '../src/props'

export const useCol = (props: FormProps, formItem: any) => {
  const ns = useNamespace('col')
  const gutter = computed(() => props.gutter || 0)

  const colStyle = computed(() => {
    const styles: CSSProperties = {}
    if (gutter.value)
      styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`

    return styles
  })

  const colKls = computed(() => {
    const classes: string[] = []
    const pos = ['span', 'offset', 'pull', 'push'] as const

    pos.forEach((prop) => {
      const size = formItem[prop]
      if (isNumber(size)) {
        if (prop === 'span') classes.push(ns.b(`${formItem[prop]}`))
        else if (size > 0) classes.push(ns.b(`${prop}-${formItem[prop]}`))
      }
    })

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    sizes.forEach((size) => {
      if (isNumber(formItem[size])) {
        classes.push(ns.b(`${size}-${formItem[size]}`))
      }
      else if (isObject(formItem[size])) {
        Object.entries(formItem[size]).forEach(([prop, sizeProp]) => {
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

  return { colKls, colStyle }
}
