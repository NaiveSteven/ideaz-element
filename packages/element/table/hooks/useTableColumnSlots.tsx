import { isFunction } from '@ideaz/utils'
import { useTableColComponentName } from './useTableColComponentName'

export const useTableColumnSlots = (props: any, slots: any) => {
  const scopedSlots = shallowRef<any>({})

  watch(
    () => props.tableCol,
    () => {
      const { tableCol = {}, size } = props
      const { getComponentName, getDynamicComponentName } = useTableColComponentName()
      const componentName = getComponentName(tableCol.type!)

      if (
        !['index', 'selection', 'expand', 'radio', undefined].includes(tableCol.type)
        || tableCol.slot
        || tableCol.render
      ) {
        scopedSlots.value.default = (scope: any) => {
          if (tableCol.slot && slots[tableCol.slot])
            return slots[tableCol.slot]({ ...scope, index: scope.$index })

          if (isFunction(tableCol.render))
            return tableCol.render(h, { ...scope, index: scope.$index })

          if (tableCol.type === 'button') {
            // return useRenderDropdownButton(tableCol, slots, scope, size);
            return <span>button</span>
          }
          return h(resolveComponent(componentName), {
            'modelValue': scope.row[tableCol.prop],
            'onUpdate:modelValue': (val: any) => {
              scope.row[tableCol.prop] = val
            },
            'componentName': getDynamicComponentName(tableCol.type),
            'on': tableCol.on,
            'rowData': scope.row,
            size,
            'options': tableCol.options,
            ...tableCol.attrs,
            'disabled':
              tableCol.isDisabled && tableCol.isDisabled(scope.row, scope.$index, scope.column),
          })
        }
      }

      if (tableCol.headerSlot && slots[tableCol.headerSlot]) {
        scopedSlots.value.header = (scope: any) =>
          slots[tableCol.headerSlot]({ ...scope, index: scope.$index })
      }
    },
    { immediate: true, deep: true },
  )

  return { scopedSlots }
}
