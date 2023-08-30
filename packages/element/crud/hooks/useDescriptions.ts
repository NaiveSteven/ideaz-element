import { isArray, isObject } from '@ideaz/utils'
import { omit } from 'lodash-unified'
import type { CrudProps } from '../src/props'
import type { TableCol } from '~/types'

export const useDescriptions = (props: CrudProps) => {
  const descriptionColumns = computed(() => {
    if (isObject(props.detail) && isArray(props.detail?.columns)) return props.detail.columns
    return props.columns.filter((column: TableCol) => column.detail).map((column: TableCol) => {
      return {
        label: column.label,
        prop: column.prop,
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
