import { getCurrentInstance } from 'vue'
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
  if (isObject(options.name))
    return h(options.name, options.attrs || {}, options.content || {})
  const cop = nativeTags.includes(options.name as string)
    ? options.name
    : getCurrentInstance()!.appContext!.components[toCamelCase(options.name as string)]
  return cop
    ? h(
      // resolveComponent(options.name),
      cop,
      {
        ...(options.attrs || {}),
      },
      options.content || {},
    ) : h('div')
}
