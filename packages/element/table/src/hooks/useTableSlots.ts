import { isFunction, isObject, isSlot, isString } from '@ideaz/utils'
import type { Ref } from 'vue'
import type { TableCol } from '../../../types'

export function useTableSlots(columns: Ref<TableCol[]>, slots: any) {
  const scopedSlots: any = {}
  const tableSlots: any = {}

  watch(
    () => columns.value,
    () => {
      columns.value.forEach((item: TableCol) => {
        if (item.slot && slots[item.slot]) {
          scopedSlots[item.slot] = (scope: any) =>
            slots[item.slot!](scope)
        }
        if (
          item.type === 'button'
          && isObject(item.dropdown)
          && isString(item.dropdown.reference)
        ) {
          if (
            item.dropdown.reference.includes('slot')
            || item.dropdown.reference.includes('Slot')
          ) {
            scopedSlots[item.dropdown.reference] = (scope: any) =>
              slots[item.dropdown.reference](scope)
          }
        }
        if (item.type === 'expand' && slots.expand) {
          scopedSlots.expand = (scope: any) =>
            slots.expand(scope)
        }

        const label = item.label as string
        if (isSlot(item.label) && slots[label]) {
          scopedSlots[label] = (scope: any) =>
            slots[label](scope)
        }
      })

      if (isFunction(slots.empty))
        tableSlots.empty = () => slots.empty()

      if (isFunction(slots.append))
        tableSlots.append = () => slots.append()
    },
    { immediate: true, deep: true },
  )

  return { scopedSlots, tableSlots }
}
