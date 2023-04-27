import { getCurrentInstance, isVue2, isVue3 } from 'vue-demi'
import { toCamelCase } from '@ideaz/utils'

interface IndexType {
  [propName: string]: any
}

interface ResolveOptions {
  name: string
  attrs: IndexType
  content?: any
}

export const resolveDynamicComponent = (options: ResolveOptions) => {
  const nativeTags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  const cop = isVue2
    ? options.name
    : nativeTags.includes(options.name)
      ? options.name
      : getCurrentInstance()!.appContext!.components[toCamelCase(options.name)]
  if (isVue3) {
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
