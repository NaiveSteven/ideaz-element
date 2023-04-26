import { isFunction, isObject, isString } from '@ideaz/utils'
import type { Ref } from 'vue-demi'
import type { TableCol } from '~/types'

export const useTableSlots = (tableCols: Ref<TableCol[]>, slots: any) => {
  const scopedSlots: any = {}
  const tableSlots: any = {}

  watch(
    () => tableCols.value,
    () => {
      tableCols.value.forEach((item: TableCol) => {
        if (item.slot && slots[item.slot]) {
          scopedSlots[item.slot] = (scope: any) =>
            slots[item.slot]({ ...scope, $index: scope.index })
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
              slots[item.dropdown.reference]({ ...scope, $index: scope.index })
          }
        }
        if (item.headerSlot && slots[item.headerSlot]) {
          scopedSlots[item.headerSlot] = (scope: any) =>
            slots[item.headerSlot]({ ...scope, $index: scope.index })
        }
      })
    },
    { immediate: true, deep: true },
  )

  if (isFunction(slots.empty))
    tableSlots.empty = () => slots.empty()

  return { scopedSlots, tableSlots }
}
