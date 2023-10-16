import { isFunction, isString } from '@ideaz/utils'

export const getContentByRenderAndSlot = (content: string | ((...args: any) => VNode) | undefined, slots: any, ...args: any) => {
  if (isFunction(content)) return content(...args)
  if (isString(content)) {
    if (content.includes('Slot') && slots[content]) return slots[content](...args)
    return content
  }
  return null
}
