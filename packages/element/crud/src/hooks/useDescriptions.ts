import { isArray, isObject } from '@ideaz/utils'
import { omit } from 'lodash-unified'
import type { CrudProps } from '../props'
import type { CrudCol, TableFormConfig } from '../../../types'

export function useDescriptions(mergedProps: ComputedRef<CrudProps>) {
  const descriptionColumns = computed(() => {
    if (isObject(mergedProps.value.detail) && isArray((mergedProps.value.detail as TableFormConfig).columns))
      return (mergedProps.value.detail as TableFormConfig).columns
    if (isObject(mergedProps.value.form) && isArray(mergedProps.value.form.columns) && mergedProps.value.detail !== false) {
      return mergedProps.value.form.columns.map((column) => {
        return {
          prop: column.field,
          ...column,
        }
      })
    }
    return mergedProps.value.columns?.filter((column: CrudCol) => column.detail || (column.form && column.detail !== false)).map((column: CrudCol) => {
      return {
        label: column.detail?.label || column.form?.label || column.label,
        prop: column.detail?.prop || column.detail?.field || column.form?.field,
        ...column.form,
        ...column.detail,
      }
    })
  })

  const descriptionProps = computed(() => {
    const detailConfig = omit(mergedProps.value.detail || {}, ['columns'])
    return {
      column: 1,
      border: true,
      ...detailConfig,
    }
  })

  return { descriptionColumns, descriptionProps }
}
