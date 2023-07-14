import { isNumber, isObject } from '@ideaz/utils'
import type { CSSProperties } from 'vue-demi'
import type { FormProps } from '../src/props'
import type { FormColumn } from '~/types'

export const useCol = (props: FormProps, formItem: FormColumn) => {
  let col: FormColumn
  const ns = useNamespace('col')
  const gutter = computed(() => props.gutter || 0)

  if (props.column) {
    const columnSpan = Math.floor(24 / props.column)
    col = {
      xs: {
        span: 24,
      },
      sm: {
        span: columnSpan >= 12 ? columnSpan : 12,
      },
      md: {
        span: columnSpan,
      },
      lg: {
        span: columnSpan,
      },
      xl: {
        span: columnSpan,
      },
      ...formItem,
    }
  }
  else {
    col = {
      span: 24,
      ...formItem,
    }
  }

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
      const size = col[prop]
      if (isNumber(size)) {
        if (prop === 'span') classes.push(ns.b(`${col[prop]}`))
        else if (size > 0) classes.push(ns.b(`${prop}-${col[prop]}`))
      }
    })

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    sizes.forEach((size) => {
      if (isNumber(col[size])) {
        classes.push(ns.b(`${size}-${col[size]}`))
      }
      else if (isObject(col[size])) {
        Object.entries(col[size]!).forEach(([prop, sizeProp]) => {
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
