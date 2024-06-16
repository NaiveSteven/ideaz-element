import { Operation, QuestionFilled } from '@element-plus/icons-vue'
import { getEventsFromCamel, isArray, isEmptyObject, isFunction, isObject, isSlot, isString } from '@ideaz/utils'
import { ElFormItem, ElIcon, ElTooltip } from 'element-plus'
import type { TableColumnProps } from '../props'
import TableButton from '../TableButton'
import { SELECT_TYPES } from '../../../form/src/hooks'
import TableCustomColumnContainer from '../TableCustomColumnContainer'
import type { TableColumnScopeData } from '../../../types'
import { useTableColComponentName } from './useTableColComponentName'

export function useTableColumnSlots(props: TableColumnProps, slots: any, emit: any) {
  const scopedSlots = shallowRef<any>({})
  const ns = useNamespace('table-column')
  const { t } = useLocale()

  const getLabel = (row: any) => {
    const { column = {} } = props
    const options = props.tableProps.options
    const type = isFunction(column.component) ? column.component() : isObject(column.component) ? column.component.name : column.component
    if (type === 'radio' || (type === 'select' && !column.fieldProps?.multiple))
      return options[column.prop] ? options[column.prop].find((item: { label: string, value: any }) => item.value === row?.[column.prop])?.label : ''

    if ((type === 'select' && column.fieldProps?.multiple) || type === 'checkbox') {
      const label: string[] = []
      if (row[column.prop]) {
        row[column.prop].forEach((item: any) => {
          label.push(options[column.prop].find((option: { label: string, value: any }) => option.value === item)?.label)
        })
      }
      return label.join(',')
    }
    if (type === 'el-switch')
      return row[column.prop] ? (column.fieldProps?.activeText || 'true') : (column.fieldProps?.inactiveText || 'false')

    return row[column.prop]
  }

  const getRules = () => {
    const column = props.column
    const label = props.column.label
    const type = isFunction(column.component) ? column.component() : isObject(column.component) ? column.component.name : column.component
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
    return isEmptyObject(rules) ? undefined : rules
  }

  watch(
    () => props.column,
    () => {
      const { column = {}, size, tableProps } = props
      const { getDynamicComponentName } = useTableColComponentName()

      if (
        !['index', 'selection', 'radio', undefined].includes(column.type)
        || column.slot
        || column.render
        || column.component
      ) {
        scopedSlots.value.default = (scope: TableColumnScopeData) => {
          const renderCustomComponent = () => {
            const events = getEventsFromCamel(column)
            return (
              <TableCustomColumnContainer
                modelValue={scope.row[column.prop]}
                onUpdate:modelValue={(val: any) => {
                  const rowData = { ...scope.row, [column.prop]: val }
                  const list = [...props.tableProps.data]
                  list.splice(scope.$index, 1, rowData)
                  emit('update:data', list)
                }}
                componentName={getDynamicComponentName(column.component!)}
                evts={events}
                size={size}
                options={tableProps.options?.[column.prop] || []}
                scope={scope}
                column={column}
                fieldProps={column.fieldProps}
              />
            )
          }

          if (column.type === 'expand' && isFunction(slots.expand))
            return slots.expand(scope)

          if (column.slot && slots[column.slot])
            return slots[column.slot](scope)

          if (column.type === 'sort' && isFunction(slots.sort))
            return <div class={ns.b('draggable')}>{slots.sort(scope)}</div>

          if (column.type === 'sort' && isFunction(column.render))
            return <div class={ns.b('draggable')}>{column.render(scope)}</div>

          if (isFunction(column.render))
            return column.render(scope)

          if (column.type === 'button' && isArray(column.buttons)) {
            return (
              <div class={ns.e('operation')}>
                {column.buttons?.map((button) => {
                  return <TableButton button={button} scope={scope} size={size} />
                })}
              </div>
            )
          }

          if (column.type === 'sort')
            return <div class={ns.b('draggable')}><ElIcon class={ns.be('draggable', 'handle')} size={24}><Operation /></ElIcon></div>

          if (tableProps.editable) {
            return scope.row.__isEdit === true
              ? (
                <ElFormItem prop={`tableData.${scope.$index}.${column.prop}`} rules={getRules()} class={[ns.b('form-item'), ns.bm('form-item', size)]}>
                  {renderCustomComponent()}
                </ElFormItem>
                )
              : <span>{getLabel(scope.row)}</span>
          }

          // warning
          if ((column.slot && !slots[column.slot]) || (column.type === 'expand' && !isFunction(slots.expand)))
            return null

          return renderCustomComponent()
        }
      }

      if (isSlot(column.label) && slots[column.label]) {
        scopedSlots.value.header = (scope: TableColumnScopeData) =>
          slots[column.label](scope)
      }
      if (isFunction(column.label))
        scopedSlots.value.header = (scope: TableColumnScopeData) => column.label(scope)

      if (!isSlot(column.label) && !isFunction(column.label) && column.tooltip) {
        const tooltip = column.tooltip
        const tooltipProps = isObject(tooltip)
          ? tooltip
          : { content: isString(tooltip) ? tooltip : '' }
        const tooltipSlot: any = {}

        scopedSlots.value.header = (scope: TableColumnScopeData) => {
          if (isFunction(tooltip))
            tooltipSlot.content = () => tooltip(scope)
          return (
            <span>
              {column.label}
              <ElTooltip
                effect="dark"
                placement="top"
                {...tooltipProps}
                v-slots={tooltipSlot}
              >
                {tooltip && (
                  <ElIcon class={ns.be('label', 'icon')}>
                    <QuestionFilled />
                  </ElIcon>
                )}
              </ElTooltip>
            </span>
          )
        }
      }
    },
    { immediate: true, deep: true },
  )

  return { scopedSlots }
}
