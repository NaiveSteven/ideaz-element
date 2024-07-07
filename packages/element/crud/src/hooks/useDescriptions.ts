import { isArray, isObject } from '@ideaz/utils'
import { omit } from 'lodash-unified'
import type { CrudProps } from '../props'
import type { CrudCol, TableFormConfig } from '../../../types'

export function useDescriptions(props: CrudProps) {
  const descriptionColumns = computed(() => {
    if (isObject(props.detail) && isArray((props.detail as TableFormConfig).columns))
      return (props.detail as TableFormConfig).columns
    if (isObject(props.form) && isArray(props.form.columns) && props.detail !== false) {
      return props.form.columns.map((column) => {
        return {
          prop: column.field,
          ...column,
        }
      })
    }
    return props.columns?.filter((column: CrudCol) => column.detail || (column.form && column.detail !== false)).map((column: CrudCol) => {
      return {
        label: column.detail?.label || column.form?.label || column.label,
        prop: column.detail?.prop || column.detail?.field || column.form?.field,
        ...column.form,
        ...column.detail,
      }
    })
  })

  const descriptionProps = computed(() => {
    const detailConfig = omit(props.detail || {}, ['columns'])
    return {
      column: 1,
      border: true,
      ...detailConfig,
    }
  })

  return { descriptionColumns, descriptionProps }
}
