import { ElCheckbox, ElFormItem, ElIcon, ElTooltip } from 'element-plus'
import { QuestionFilled } from '@element-plus/icons-vue'
import type { CheckboxValueType } from 'element-plus'
import type { FunctionalComponent } from 'vue'
import { computed, ref, unref } from 'vue'
import { getEventsFromCamel, isArray, isFunction, isObject, isSlot, isString } from '@ideaz/utils'
import { useFormSize, useLocale, useNamespace } from '@ideaz/hooks'
import { getDynamicComponentName, getTableColumnLabel, getTableColumnRules } from '@ideaz/shared'
import type { TableCol } from '../../../types'
import TableCustomColumnContainer from '../TableCustomColumnContainer'
import TableButton from '../TableButton'

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
  const { t } = useLocale()
  const size = useFormSize()

  // 计算分页偏移量
  const getPageOffset = () => {
    if (props.pagination && typeof props.pagination === 'object') {
      const { page = 1, pageSize = 10 } = props.pagination
      return (page - 1) * pageSize
    }
    return 0
  }

  // 获取标签显示内容
  const getLabel = (row: any, column: TableCol) => {
    return getTableColumnLabel(row, column, props.options)
  }

  // 获取验证规则
  const getRules = (column: TableCol) => {
    return getTableColumnRules(column, t)
  }

  // 选择状态管理
  const selectedRowKeys = ref<Set<string | number>>(new Set())

  // 展开状态管理 - 支持双向绑定
  const expandedRowKeys = computed({
    get() {
      return Array.isArray(props.expandedRowKeys) ? props.expandedRowKeys : []
    },
    set(value) {
      emit('update:expandedRowKeys', value)
    }
  })

  // 检查是否有展开列
  const hasExpandColumn = computed(() => {
    return formatTableCols.value.some(col => col.type === 'expand')
  })

  // 获取展开列的key
  const expandColumnKey = computed(() => {
    const expandCol = formatTableCols.value.find(col => col.type === 'expand')
    return expandCol ? (expandCol.prop || 'expand') : undefined
  })

  // 展开相关方法
  const toggleRowExpansion = (row: any, expanded?: boolean) => {
    const rowKey = row[props.rowKey || 'id']
    const currentKeys = [...expandedRowKeys.value]
    const keyIndex = currentKeys.indexOf(rowKey)

    if (expanded === undefined) {
      if (keyIndex > -1) {
        currentKeys.splice(keyIndex, 1)
      } else {
        currentKeys.push(rowKey)
      }
    } else if (expanded) {
      if (keyIndex === -1) {
        currentKeys.push(rowKey)
      }
    } else {
      if (keyIndex > -1) {
        currentKeys.splice(keyIndex, 1)
      }
    }

    // 更新展开状态
    expandedRowKeys.value = currentKeys

    // 触发展开变化事件 (保持向后兼容)
    emit('expand-change', row, currentKeys.includes(rowKey))
  }

  // 虚拟表格列配置
  const virtualColumns = computed(() => {
    const ns = useNamespace('table-column')

    return formatTableCols.value.map((col, index) => {
      const baseColumn: any = {
        ...col,
        key: col.prop || `column-${index}`,
        dataKey: col.prop || `column-${index}`,
        title: typeof col.label === 'string' ? col.label : `Column ${index + 1}`,
        width: typeof col.width === 'number' ? col.width : 150,
      }

      // 处理展开列 - TableV2会自动处理有children的行
      if (col.type === 'expand') {
        return {
          key: 'expand',
          width: col.width || 50,
          // TableV2会自动为有children的行添加展开按钮
        }
      }

      // 处理索引列
      if (col.type === 'index') {
        return {
          key: 'index',
          width: col.width || 60,
          cellRenderer: ({ rowIndex }: any) => {
            // 如果有自定义索引函数
            if (typeof col.index === 'function') {
              return col.index(rowIndex + getPageOffset())
            }
            // 默认从1开始的索引，如果有分页则考虑分页偏移
            const startIndex = typeof col.index === 'number' ? col.index : 1
            return startIndex + rowIndex + getPageOffset()
          },
          headerCellRenderer: () => typeof col.label === 'string' ? col.label : '#',
        }
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

      // 处理按钮列
      if (col.type === 'button' && isArray(col.buttons)) {
        baseColumn.cellRenderer = ({ rowData, rowIndex }: any) => {
          const scope = {
            row: rowData,
            column: col,
            $index: rowIndex
          } as any
          return (
            <div class={ns.e('operation')}>
              {(col.buttons as any[]).map((button) => {
                return <TableButton button={button} scope={scope} size={size.value} />
              })}
            </div>
          )
        }
        return baseColumn
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

      // 处理表单组件列
      if (col.component && !col.render && !col.slot) {
        const prop = col.prop || ''

        baseColumn.cellRenderer = ({ rowData, rowIndex }: any) => {
          const scope = {
            row: rowData,
            column: col,
            $index: rowIndex
          }

          // 渲染自定义组件
          const renderCustomComponent = () => {
            const events = getEventsFromCamel(col)
            return (
              <TableCustomColumnContainer
                modelValue={rowData[prop]}
                onUpdate:modelValue={(val: any) => {
                  const newRowData = { ...rowData, [prop]: val }
                  const list = [...tableData.value]
                  list.splice(rowIndex, 1, newRowData)
                  emit('update:data', list)
                }}
                componentName={getDynamicComponentName(col.component!)}
                evts={events}
                size={size.value}
                options={props.options?.[prop] || []}
                scope={scope}
                column={col}
                fieldProps={col.fieldProps}
              />
            )
          }

          // 如果表格是可编辑的，则根据编辑状态渲染不同内容
          if (props.editable) {
            return rowData.__isEdit === true
              ? (
                <ElFormItem
                  prop={`tableData.${rowIndex}.${prop}`}
                  rules={getRules(col)}
                  class={[ns.b('form-item'), ns.bm('form-item', size.value)]}
                >
                  {renderCustomComponent()}
                </ElFormItem>
                )
              : <span>{getLabel(rowData, col)}</span>
          }

          // 非编辑状态下直接渲染组件
          return renderCustomComponent()
        }
      }

      // 处理表头渲染
      if (col.label && typeof col.label === 'function') {
        baseColumn.headerCellRenderer = ({ columnIndex }: any) => (col.label as Function)({
          column: col,
          $index: columnIndex
        })
      } else if (typeof col.label === 'string' && slots[col.label]) {
        baseColumn.headerCellRenderer = ({ columnIndex }: any) => {
          return slots[col.label as string]?.({
            column: col,
            $index: columnIndex
          })
        }
      } else if (!isSlot(col.label) && !isFunction(col.label) && col.tooltip) {
        // 处理tooltip - 类似于useTableColumnSlots的实现
        const tooltip = col.tooltip
        const ns = useNamespace('virtual-table-column')

        baseColumn.headerCellRenderer = ({ columnIndex }: any) => {
          // 处理tooltip配置 - 与useTableColumnSlots保持一致
          let tooltipProps: any = { effect: 'dark', placement: 'top' }
          const tooltipSlot: any = {}

          if (isString(tooltip)) {
            // 字符串tooltip直接设置content
            tooltipProps.content = tooltip
          } else if (isFunction(tooltip)) {
            // 函数tooltip使用slot方式避免Vue警告
            tooltipSlot.content = () => tooltip({
              column: col,
              $index: columnIndex
            })
          } else if (isObject(tooltip)) {
            // 对象tooltip需要特殊处理
            const { content, ...restProps } = tooltip
            // 先设置其他属性，但不包含content
            tooltipProps = { ...tooltipProps, ...restProps }

            if (isString(content)) {
              // content是字符串，直接设置
              tooltipProps.content = content
            } else if (isFunction(content)) {
              // content是函数，使用slot方式，确保不传递content prop
              tooltipSlot.content = () => content({
                column: col,
                $index: columnIndex
              })
              // 明确删除content属性，防止传递函数
              delete tooltipProps.content
            }
          }

          return (
            <span class={ns.be('label', 'container')}>
              {col.label}
              {tooltip && (
                <ElTooltip
                  {...tooltipProps}
                  v-slots={tooltipSlot}
                >
                  <ElIcon
                    class={ns.be('label', 'icon')}
                  >
                    <QuestionFilled />
                  </ElIcon>
                </ElTooltip>
              )}
            </span>
          )
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
    hasExpandColumn,
    expandColumnKey,
    selectedRowKeys,
    expandedRowKeys,
    clearSelection,
    toggleRowSelection,
    toggleAllSelection,
    toggleRowExpansion,
  }
}
