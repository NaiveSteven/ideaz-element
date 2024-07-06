import { isFunction, isString } from '@ideaz/utils'
import type { Ref, Slot, VNode } from 'vue'
import type { Slots } from '../element/types'

export function useFormComponentSlots(props: Record<any, any>, slots: Slots, slotKeys: string[]) {
  const scopedSlots: Ref<Slots> = shallowRef({})

  const getSlotContent = (
    slot: string | (() => VNode) | undefined | Slot,
    defaultContent: Slot | (() => VNode) | undefined = () => <span />,
  ) => {
    if (isFunction(slot))
      return slot

    else if (isString(slot))
      return () => <span>{slot}</span>

    return defaultContent
  }

  watchEffect(() => {
    scopedSlots.value = {}
    slotKeys.forEach((key) => {
      if (slots[key] || props[key])
        scopedSlots.value[key] = getSlotContent((slots[key]), getSlotContent(props[key]))
    })
  })

  return { scopedSlots }
}
