import { isFunction, isString } from '@ideaz/utils'
import type { VNode } from 'vue'

export function getContentByRenderAndSlot(content: string | ((...args: any) => VNode) | undefined, slots: any, ...args: any) {
  if (isFunction(content))
    return content(...args)
  if (isString(content)) {
    if (content.toLocaleLowerCase().includes('slot') && slots[content])
      return slots[content](...args)
    return content
  }
  return null
}
