import { isFunction, isObject, isSlot, isString } from '@ideaz/utils'
import type { Ref } from 'vue-demi'
import type { TableCol } from '~/types'

export const useTableSlots = (columns: Ref<TableCol[]>, slots: any) => {
  const scopedSlots: any = {}
  const tableSlots: any = {}

  watch(
    () => columns.value,
    () => {
      columns.value.forEach((item: TableCol) => {
        if (item.slot && slots[item.slot]) {
          scopedSlots[item.slot] = (scope: any) =>
            slots[item.slot](scope)
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

        if (isSlot(item.label) && slots[item.label]) {
          scopedSlots[item.label] = (scope: any) =>
            slots[item.label](scope)
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
