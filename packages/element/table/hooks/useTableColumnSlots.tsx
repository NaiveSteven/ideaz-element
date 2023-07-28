import { isBoolean, isFunction, isObject, isString } from '@ideaz/utils'
import type { TableColumnProps } from '../src/props'
import TableButton from '../src/TableButton'
import { useTableColComponentName } from './useTableColComponentName'

export const useTableColumnSlots = (props: TableColumnProps, slots: any) => {
  const scopedSlots = shallowRef<any>({})
  const ns = useNamespace('table-column')

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

          if (column.type === 'button') {
            return column.buttons?.map((button) => {
              return <TableButton button={button} scope={scope} size={size} />
            })
          }

          const row = scope.row
          return row.__isEdit === true
            ? <el-form-item prop={`tableData.${scope.$index}.${column.prop}`} rules={column.rules} class={[ns.b('form-item'), ns.bm('form-item', size)]}>
              {h(resolveComponent(componentName), {
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
                  isBoolean(column.disabled)
                    ? column.disabled
                    : isFunction(column.disabled)
                      ? column.disabled(scope.row, scope.$index, scope.column)
                      : false,
              })}
            </el-form-item>
            : <span>{getLabel(scope.row)}</span>
        }
      }

      if (column.headerSlot && slots[column.headerSlot]) {
        scopedSlots.value.header = (scope: any) =>
          slots[column.headerSlot]({ ...scope, index: scope.$index })
      }
      if (!column.headerSlot && column.tooltip) {
        const tooltip = column.tooltip
        const tooltipProps = isObject(tooltip)
          ? tooltip
          : { content: isString(tooltip) ? tooltip : '' }
        const tooltipSlot: any = {}

        scopedSlots.value.header = (scope: any) => {
          if (isFunction(tooltip))
            tooltipSlot.content = () => tooltip(scope)
          return (
            <span>
              {column.label}
              <el-tooltip
                effect="dark"
                placement="top"
                {...tooltipProps}
                v-slots={tooltipSlot}
              >
                {tooltip && (
                  <el-icon class={ns.be('label', 'icon')}>
                    <i-question-filled />
                  </el-icon>
                )}
              </el-tooltip>
            </span>
          )
        }
      }
    },
    { immediate: true, deep: true },
  )

  return { scopedSlots }
}
