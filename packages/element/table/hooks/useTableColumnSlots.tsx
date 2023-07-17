import { isFunction } from '@ideaz/utils'
import type { TableColumnProps } from '../src/props'
import { useTableColComponentName } from './useTableColComponentName'

export const useTableColumnSlots = (props: TableColumnProps, slots: any) => {
  const scopedSlots = shallowRef<any>({})

  watch(
    () => props.column,
    () => {
      const { column = {}, size } = props
      const { getComponentName, getDynamicComponentName } = useTableColComponentName()
      const componentName = getComponentName(column.type!)

      if (
        !['index', 'selection', 'expand', 'radio', undefined].includes(column.type)
        || column.slot
        || column.render
      ) {
        scopedSlots.value.default = (scope: any) => {
          if (column.slot && slots[column.slot])
            return slots[column.slot]({ ...scope, index: scope.$index })

          if (isFunction(column.render))
            return column.render(h, { ...scope, index: scope.$index })

          if (column.type === 'button') {
            // return useRenderDropdownButton(column, slots, scope, size);
            return <span>button</span>
          }

          const row = scope.row
          // if (props.columnIndex === props.columnsLength - 1 && props.tableProps.editable) {
          //   return <>
          //     <el-button type="primary" link onClick={() => { row.__isEdit = true }}>编辑</el-button>
          //     <el-button type="primary" link onClick={() => { row.__isEdit = false }}>保存</el-button>
          //     <el-button link>删除</el-button>
          //   </>
          // }

          return row.__isEdit === true
            ? h(resolveComponent(componentName), {
              'modelValue': scope.row[column.prop],
              'onUpdate:modelValue': (val: any) => {
                scope.row[column.prop] = val
              },
              'componentName': getDynamicComponentName(column.type!),
              'on': column.on,
              'rowData': scope.row,
              size,
              'options': column.options,
              ...column.attrs,
              'disabled':
              column.isDisabled && column.isDisabled(scope.row, scope.$index, scope.column),
            })
            : <span>{scope.row[column.prop]}</span>
        }
      }

      if (column.headerSlot && slots[column.headerSlot]) {
        scopedSlots.value.header = (scope: any) =>
          slots[column.headerSlot]({ ...scope, index: scope.$index })
      }
    },
    { immediate: true, deep: true },
  )

  return { scopedSlots }
}
