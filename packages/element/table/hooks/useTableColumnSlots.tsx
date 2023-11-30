import { Operation, QuestionFilled } from '@element-plus/icons-vue'
import { isBoolean, isEmptyObject, isFunction, isObject, isSlot, isString } from '@ideaz/utils'
import { ElIcon } from 'element-plus'
import type { TableColumnProps } from '../src/props'
import TableButton from '../src/TableButton'
import { SELECT_TYPES } from '../../form/hooks'
import { useTableColComponentName } from './useTableColComponentName'

export const useTableColumnSlots = (props: TableColumnProps, slots: any, emit: any) => {
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
                const rowData = { ...scope.row, [column.prop]: val }
                const list = [...props.tableProps.data]
                list.splice(scope.$index, 1, rowData)
                emit('update:data', list)
              },
              'componentName': getDynamicComponentName(column.type!),
              'on': column.on,
              'rowData': scope.row,
              size,
              'options': tableProps.options?.[column.prop] || [],
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
            return slots.expand(scope)

          if (column.slot && slots[column.slot])
            return slots[column.slot](scope)

          if (column.type === 'sort' && isFunction(slots.sort))
            return <div class={ns.b('draggable')}>{slots.sort(scope)}</div>

          if (column.type === 'sort' && isFunction(column.render))
            return <div class={ns.b('draggable')}>{column.render(h, scope)}</div>

          if (isFunction(column.render))
            return column.render(h, scope)

          if (column.type === 'button') {
            return <div class={ns.e('operation')}>
              {column.buttons?.map((button) => {
                return <TableButton button={button} scope={scope} size={size} />
              })}
            </div>
          }

          if (column.type === 'sort')
            return <div class={ns.b('draggable')}><ElIcon class={ns.be('draggable', 'handle')} size={24}><Operation /></ElIcon></div>

          if (tableProps.editable) {
            return scope.row.__isEdit === true
              ? <el-form-item prop={`tableData.${scope.$index}.${column.prop}`} rules={getRules()} class={[ns.b('form-item'), ns.bm('form-item', size)]}>
              {renderCustomComponent()}
            </el-form-item>
              : <span>{getLabel(scope.row)}</span>
          }

          // warning
          if ((column.slot && !slots[column.slot]) || (column.type === 'expand' && !isFunction(slots.expand)))
            return null

          return renderCustomComponent()
        }
      }

      if (isSlot(column.label) && slots[column.label]) {
        scopedSlots.value.header = (scope: any) =>
          slots[column.label](scope)
      }
      if (isFunction(column.label))
        scopedSlots.value.header = (scope: any) => column.label(scope)

      if (!isSlot(column.label) && !isFunction(column.label) && column.tooltip) {
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
                    <QuestionFilled />
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
