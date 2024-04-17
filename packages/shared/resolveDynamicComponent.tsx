import { getCurrentInstance, isVue2, isVue3 } from 'vue-demi'
import { isObject, toCamelCase } from '@ideaz/utils'

interface IndexType {
  [propName: string]: any
}

interface ResolveOptions {
  name: string | object
  attrs: IndexType
  content?: any
}

export function resolveDynamicComponent(options: ResolveOptions) {
  const nativeTags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  if (isVue3) {
    if (isObject(options.name))
      return h(options.name, options.attrs || {}, options.content || {})
    const cop = isVue2
      ? options.name
      : nativeTags.includes(options.name as string)
        ? options.name
        : getCurrentInstance()!.appContext!.components[toCamelCase(options.name as string)]
    return h(
      // resolveComponent(options.name),
      cop,
      {
        ...(options.attrs || {}),
      },
      options.content || {},
    )
  }
  // return
  // <name {...{ props: options.attrs || {} }} {...{ on: options.events || {} }}>
  //   {options.content || null}
  // </name>
  return h(
    options.name,
    {
      props: { ...(options.attrs || {}) },
      ...(options.attrs || {}),
    },
    options.content || {},
  )
}
