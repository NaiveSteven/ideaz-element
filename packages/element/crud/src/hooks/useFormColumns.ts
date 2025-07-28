import { isArray, isObject } from '@ideaz/utils'
// import type { CrudProps } from '../props'
import type { CrudCol } from '../../../types'

export function useFormColumns(mergedProps: ComputedRef<any>) {
  const getColumns = (key: any) => {
    if (isObject(mergedProps.value.form) && isArray(mergedProps.value.form.columns) && !mergedProps.value[key]?.columns && mergedProps.value[key] !== false)
      return mergedProps.value.form.columns || []
    if (isObject(mergedProps.value[key]) && isArray(mergedProps.value[key].columns))
      return mergedProps.value[key].columns || []
    return mergedProps.value.columns?.filter((column: CrudCol) => (column[key]) || (column.form && column[key] !== false && mergedProps.value[key] !== false)).map((column: CrudCol) => {
      const commonConfig = {
        field: column.prop,
        component: column.type,
        label: column.label,
        clearable: true,
        filterable: true,
      }
      if (column[key] !== false && column.form) {
        return {
          ...commonConfig,
          ...column.form,
        }
      }
      return {
        ...commonConfig,
        ...column[key],
      }
    }) || []
  }

  const addFormColumns = computed(() => getColumns('add'))

  const editFormColumns = computed(() => getColumns('edit'))

  const searchFormColumns = computed(() => getColumns('search'))

  const detailColumns = computed(() => getColumns('detail'))

  return { addFormColumns, editFormColumns, searchFormColumns, detailColumns }
}
