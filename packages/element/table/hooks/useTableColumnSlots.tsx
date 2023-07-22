import { isFunction } from '@ideaz/utils'
import type { TableColumnProps } from '../src/props'
import TableButton from '../src/TableButton'
import { useTableColComponentName } from './useTableColComponentName'

export const useTableColumnSlots = (props: TableColumnProps, slots: any) => {
  const scopedSlots = shallowRef<any>({})

  const getLabel = (row: any) => {
    const { column = {} } = props
    const options = props.tableProps.options
    if (column.type === 'radio' || (column.type === 'select' && !column.attrs?.multiple))
      return options[column.prop] ? options[column.prop].find((item: { label: string; value: any }) => item.value === row?.[column.prop])?.label : ''

    if ((column.type === 'select' && column.attrs?.multiple) || column.type === 'checkbox') {
      const label: string[] = []
      if (row[column.prop]) {
        row[column.prop].forEach((item: any) => {
          label.push(options[column.prop].find((option: { label: string; value: any }) => option.value === item)?.label)
        })
      }
      return label.join(',')
    }
    if (column.type === 'el-switch')
      return row[column.prop] ? (column.attrs?.activeText || 'true') : (column.attrs?.inactiveText || 'false')

    return row[column.prop]
  }

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

          if (column.type === 'button' && !props.tableProps.editable) {
            // return useRenderDropdownButton(column, slots, scope, size);
            return <span>button</span>
          }

          const row = scope.row
          if (column.type === 'button' && props.tableProps.editable) {
            return column.buttons?.map((button) => {
              return <TableButton button={button} scope={scope} />
            })
          }

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
            : <span>{getLabel(scope.row)}</span>
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
