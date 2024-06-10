import { isArray, isObject } from '@ideaz/utils'
import type { CrudProps } from '../src/props'
import type { CrudCol } from '../../types'

export function useFormColumns(props: CrudProps) {
  const getColumns = (key: keyof typeof props) => {
    if (isObject(props.form) && isArray(props.form.columns) && !props[key]?.columns && props[key] !== false)
      return props.form.columns || []
    if (isObject(props[key]) && isArray(props[key].columns))
      return props[key].columns || []
    return props.columns?.filter((column: CrudCol) => (column[key]) || (column.form && column[key] !== false && props[key] !== false)).map((column: CrudCol) => {
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
