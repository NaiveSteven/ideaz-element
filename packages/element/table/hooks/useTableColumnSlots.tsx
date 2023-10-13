import { isBoolean, isEmptyObject, isFunction, isObject, isString } from '@ideaz/utils'
import type { TableColumnProps } from '../src/props'
import TableButton from '../src/TableButton'
import { SELECT_TYPES } from '../../form/hooks'
import { useTableColComponentName } from './useTableColComponentName'

export const useTableColumnSlots = (props: TableColumnProps, slots: any) => {
  const scopedSlots = shallowRef<any>({})
  const ns = useNamespace('table-column')
  const { t } = useLocale()

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

  const getRules = () => {
    const column = props.column
    const label = props.column.label
    const type = isFunction(column.type) ? column.type() : column.type
    let message = ''
    let rules = {}
    if (SELECT_TYPES.includes((type || '').toLowerCase()))
      message = label ? `${t('form.selectPlaceholder')}${label}` : `${t('form.selectPlaceholder')}`

    else
      message = label ? `${t('form.inputPlaceholder')}${label}` : `${t('form.inputPlaceholder')}`

    if (column.required === true || column.rules?.required) {
      rules = {
        required: true,
        message,
        ...column.rules,
      }
    }
    return isEmptyObject(rules) ? null : rules
  }

  watch(
    () => props.column,
    () => {
      const { column = {}, size, tableProps } = props
      const { getComponentName, getDynamicComponentName } = useTableColComponentName()
      const componentName = getComponentName(column.type!)

      if (
        !['index', 'selection', 'radio', undefined].includes(column.type)
        || column.slot
        || column.render
      ) {
        scopedSlots.value.default = (scope: any) => {
          const renderCustomComponent = () => {
            return h(resolveComponent(componentName), {
              'modelValue': scope.row[column.prop],
              'onUpdate:modelValue': (val: any) => {
                scope.row[column.prop] = val
              },
              'componentName': getDynamicComponentName(column.type!),
              'on': column.on,
              'rowData': scope.row,
              size,
              'options': tableProps.options[column.prop] || [],
              ...column.attrs,
              'disabled':
                isBoolean(column.disabled)
                  ? column.disabled
                  : isFunction(column.disabled)
                    ? column.disabled(scope.row, scope.$index, scope.column)
                    : false,
            })
          }

          if (column.type === 'expand' && isFunction(slots.expand))
            return slots.expand({ ...scope, index: scope.$index })

          if (column.slot && slots[column.slot])
            return slots[column.slot]({ ...scope, index: scope.$index })

          if (isFunction(column.render))
            return column.render(h, { ...scope, index: scope.$index })

          if (column.type === 'button') {
            return column.buttons?.map((button) => {
              return <TableButton button={button} scope={scope} size={size} />
            })
          }

          if (tableProps.editable) {
            return scope.row.__isEdit === true
              ? <el-form-item prop={`tableData.${scope.$index}.${column.prop}`} rules={getRules()} class={[ns.b('form-item'), ns.bm('form-item', size)]}>
              {renderCustomComponent()}
            </el-form-item>
              : <span>{getLabel(scope.row)}</span>
          }

          return renderCustomComponent()
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
