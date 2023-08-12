import type { TableCol } from '~/types'

export const useFormColumns = (props: any) => {
  const formColumns = computed(() => {
    const { columns } = props
    return columns.filter((column: TableCol) => column.search).map((column: TableCol) => {
      return {
        field: column.prop,
        component: column.type,
        label: column.label,
        clearable: true,
        filterable: true,
        ...column,
      }
    })
  })

  return { formColumns }
}
