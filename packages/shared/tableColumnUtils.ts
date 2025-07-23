import { isFunction, isObject } from '@ideaz/utils'
import { SELECT_TYPES } from '../element/form/src/hooks'
import type { TableCol } from '../element/types'

// 获取动态组件名称
export function getDynamicComponentName(type: string | (() => string)) {
  const zNames = ['select', 'checkbox', 'radio', 'input']
  const propComponentName = typeof type === 'function' ? type() : type

  if (zNames.includes(propComponentName)) {
    return `z-${propComponentName}`
  }

  else {
    return propComponentName || 'unknown'
  }
}

// 获取表格列的显示标签
export function getTableColumnLabel(
  row: any,
  column: TableCol,
  options: Record<string, any[]>
): string {
  const prop = column.prop!
  const type = isFunction(column.component)
    ? column.component()
    : isObject(column.component)
    ? column.component.name
    : column.component

  if (type === 'radio' || (type === 'select' && !column.fieldProps?.multiple)) {
    return options[prop]
      ? options[prop].find((item: { label: string, value: any }) => item.value === row?.[prop])?.label || ''
      : ''
  }

  if ((type === 'select' && column.fieldProps?.multiple) || type === 'checkbox') {
    const label: string[] = []
    if (row[prop]) {
      row[prop].forEach((item: any) => {
        const option = options[prop]?.find((option: { label: string, value: any }) => option.value === item)
        if (option) {
          label.push(option.label)
        }
      })
    }
    return label.join(',')
  }

  if (type === 'el-switch') {
    return row[prop]
      ? (column.fieldProps?.activeText || 'true')
      : (column.fieldProps?.inactiveText || 'false')
  }

  return row[prop]
}

// 获取表格列的验证规则
export function getTableColumnRules(
  column: TableCol,
  t: (key: string) => string
): any {
  const label = column.label
  const type = isFunction(column.component)
    ? column.component()
    : isObject(column.component)
    ? column.component.name
    : column.component

  let message = ''
  let rules = {}

  if (SELECT_TYPES.includes((type || '').toLowerCase())) {
    message = label ? `${t('form.selectPlaceholder')}${label}` : `${t('form.selectPlaceholder')}`
  } else {
    message = label ? `${t('form.inputPlaceholder')}${label}` : `${t('form.inputPlaceholder')}`
  }

  if (column.required === true || column.rules?.required) {
    rules = {
      required: true,
      message,
      ...column.rules,
    }
  }

  return Object.keys(rules).length === 0 ? undefined : rules
}
