import { ElCheckbox } from 'element-plus'
import type { CheckboxValueType } from 'element-plus'
import type { FunctionalComponent } from 'vue'
import { computed, ref, unref } from 'vue'
import type { TableCol } from '../../../types'

// 虚拟表格选择功能组件
interface SelectionCellProps {
  value: boolean
  intermediate?: boolean
  onChange: (value: CheckboxValueType) => void
}

const SelectionCell: FunctionalComponent<SelectionCellProps> = ({
  value,
  intermediate = false,
  onChange,
}) => {
  return (
    <ElCheckbox
      onChange={onChange}
      modelValue={value}
      indeterminate={intermediate}
    />
  )
}

export function useVirtualTableColumns(
  formatTableCols: Ref<TableCol[]>,
  tableData: Ref<any[]>,
  slots: any,
  emit: any,
  props: any
) {
  // 选择状态管理
  const selectedRowKeys = ref<Set<string | number>>(new Set())

  // 虚拟表格列配置
  const virtualColumns = computed(() => {
    return formatTableCols.value.map((col, index) => {
      const baseColumn: any = {
        key: col.prop || `column-${index}`,
        dataKey: col.prop || `column-${index}`,
        title: typeof col.label === 'string' ? col.label : `Column ${index + 1}`,
        width: typeof col.width === 'number' ? col.width : 150,
      }

      // 处理选择列
      if (col.type === 'selection') {
        const rowKeyProp = props.rowKey || 'id'

        return {
          key: 'selection',
          width: col.width || 50,
          cellRenderer: ({ rowData }: any) => {
            const onChange = (value: CheckboxValueType) => {
              const rowKey = rowData[rowKeyProp]
              if (value) {
                selectedRowKeys.value.add(rowKey)
              } else {
                selectedRowKeys.value.delete(rowKey)
              }

              // 触发选择变化事件
              const selectedRows = tableData.value.filter((row: any) => {
                return selectedRowKeys.value.has(row[rowKeyProp])
              })
              emit('selection-change', selectedRows)
            }

            const isSelected = selectedRowKeys.value.has(rowData[rowKeyProp])
            return <SelectionCell value={isSelected} onChange={onChange} />
          },
          headerCellRenderer: () => {
            const _data = unref(tableData)
            const onChange = (value: CheckboxValueType) => {
              const rowKeyProp = props.rowKey || 'id'
              if (value) {
                // 全选
                _data.forEach((row: any) => {
                  selectedRowKeys.value.add(row[rowKeyProp])
                })
              } else {
                // 取消全选
                selectedRowKeys.value.clear()
              }

              const selectedRows = value ? [..._data] : []
              emit('selection-change', selectedRows)
            }

            const allSelected = _data.length > 0 && _data.every((row: any) =>
              selectedRowKeys.value.has(row[rowKeyProp])
            )
            const containsChecked = _data.some((row: any) =>
              selectedRowKeys.value.has(row[rowKeyProp])
            )

            return (
              <SelectionCell
                value={allSelected}
                intermediate={containsChecked && !allSelected}
                onChange={onChange}
              />
            )
          },
        }
      }

      // 处理其他类型的列
      if (col.render && typeof col.render === 'function') {
        baseColumn.cellRenderer = ({ cellData, rowData, rowIndex }: any) => {
          return col.render!({
            row: rowData,
            column: col,
            cellData,
            $index: rowIndex
          })
        }
      }

      // 处理插槽列
      if (col.slot) {
        baseColumn.cellRenderer = ({ cellData, rowData, rowIndex }: any) => {
          return slots[col.slot!]?.({
            row: rowData,
            column: col,
            cellData,
            $index: rowIndex
          }) || cellData
        }
      }

      // 处理表头渲染
      if (col.label && typeof col.label === 'function') {
        baseColumn.headerCellRenderer = () => (col.label as Function)()
      } else if (typeof col.label === 'string' && slots[col.label]) {
        baseColumn.headerCellRenderer = ({ columnIndex }: any) => {
          return slots[col.label as string]?.({
            column: col,
            $index: columnIndex
          })
        }
      }

      return baseColumn
    })
  })

  // 选择相关方法
  const clearSelection = () => {
    selectedRowKeys.value.clear()
    emit('selection-change', [])
  }

  const toggleRowSelection = (row: any, selected?: boolean) => {
    const rowKey = row[props.rowKey || 'id']
    if (selected === undefined) {
      if (selectedRowKeys.value.has(rowKey)) {
        selectedRowKeys.value.delete(rowKey)
      } else {
        selectedRowKeys.value.add(rowKey)
      }
    } else if (selected) {
      selectedRowKeys.value.add(rowKey)
    } else {
      selectedRowKeys.value.delete(rowKey)
    }

    const selectedRows = tableData.value.filter((item: any) => {
      return selectedRowKeys.value.has(item[props.rowKey || 'id'])
    })
    emit('selection-change', selectedRows)
  }

  const toggleAllSelection = () => {
    const rowKeyProp = props.rowKey || 'id'
    const allSelected = tableData.value.length > 0 &&
      tableData.value.every((row: any) => selectedRowKeys.value.has(row[rowKeyProp]))

    if (allSelected) {
      selectedRowKeys.value.clear()
    } else {
      tableData.value.forEach((row: any) => {
        selectedRowKeys.value.add(row[rowKeyProp])
      })
    }

    const selectedRows = allSelected ? [] : [...tableData.value]
    emit('selection-change', selectedRows)
  }

  return {
    virtualColumns,
    selectedRowKeys,
    clearSelection,
    toggleRowSelection,
    toggleAllSelection,
  }
}
