import { isFunction, isString } from '@ideaz/utils'

export const getContentByRenderAndSlot = (content: string | (() => VNode), slots: any) => {
  if (isFunction(content)) return content()
  if (isString(content)) {
    if (content.includes('Slot') && slots[content]) return slots[content]()
    return content
  }
  return null
}
