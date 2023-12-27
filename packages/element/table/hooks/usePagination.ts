import { isObject, uid } from '@ideaz/utils'
import { reactiveOmit } from '@vueuse/core'
import { set } from 'lodash-unified'
import type { ITableProps } from '../src/props'
import type { Pagination } from '~/types'

export const usePagination = (props: ITableProps, emit: any) => {
  const tableData = ref<any>([])
  const attrs = useAttrs()

  const pagination = computed<Pagination>({
    get() {
      // editable is not compatible with pagination
      return (isObject(props.pagination) && !props.editable) ? props.pagination : {}
    },
    set(val) {
      emit('update:pagination', val)
    },
  })

  const tableAttributes = computed<any>(() => {
    const omitProps = reactiveOmit(props, ['pagination', 'columns', 'draggable', 'toolBar', 'loading'])
    return { ...attrs, ...omitProps }
  })

  const paginationAttrs = computed(() => {
    return {
      ...pagination.value,
      layout: pagination.value.layout || 'total, prev, pager, next',
      pageSizes: pagination.value.pageSizes || [100, 200, 300, 400, 500],
    }
  })

  const isPaginationByFront = computed(() => {
    if (tableAttributes.value.data && paginationAttrs.value.type === 'front')
      return true

    return false
  })

  watch(
    () => tableAttributes.value.data,
    () => {
      if (props.editable) {
        const editableType = isObject(props.editable) ? (props.editable.type || 'single') : 'single'
        const columnProps = props.columns.map(column => column.prop).filter(prop => prop)
        tableData.value = tableAttributes.value.data.map((item: any) => {
          const obj: { [propName: string]: string } = {}
          columnProps.forEach((prop) => {
            // only add prop if it is not already in the object
            if (Object.hasOwnProperty.call(item, prop) && !Object.hasOwnProperty.call(item, `${prop}Prop`))
              obj[`${prop}Prop`] = item[prop]
          })
          return { __isEdit: editableType !== 'single', ...item, ...obj }
        })
      }
      else {
        tableData.value = tableAttributes.value.data
      }
    },
    { immediate: true },
  )

  watch(() => tableAttributes.value.totalData, () => {
    if (
      pagination.value.total && paginationAttrs.value.type === 'front'
    )
      getTableData(pagination.value)
  })

  const addTableData = () => {
    const rowData = { __isEdit: true }
    if (props.rowKey)
      set(rowData, String(props.rowKey), uid())

    tableData.value.push(rowData)
  }

  function getTableData(pagination: Pagination) {
    const page = pagination.page!
    const pageSize = pagination.pageSize!
    const list = tableAttributes.value.totalData
    const length = tableAttributes.value.totalData.length
    let start = (page - 1) * pageSize
    let end = page * pageSize
    if (start >= length) start = 0
    if (end >= length) end = length
    tableData.value = list.slice(start, end)
    emit('update:data', tableData.value)
  }

  const handleCurrentChange = (val: number) => {
    emit('update:pagination', { ...pagination.value, page: val })
    if (isPaginationByFront.value) {
      getTableData({
        page: val,
        pageSize: pagination.value.pageSize,
      })
    }
    else {
      emit('refresh', {
        page: val,
        pageSize: pagination.value.pageSize,
      })
    }
  }

  const handleSizeChange = (val: number) => {
    emit('update:pagination', { ...pagination.value, pageSize: val })
    if (isPaginationByFront.value)
      getTableData({ page: 1, pageSize: val })

    else
      emit('refresh', { page: 1, pageSize: val })
  }

  const handleRefresh = () => {
    const page = pagination.value.page ? pagination.value.page : 1
    handleCurrentChange(page)
  }

  return {
    paginationAttrs,
    tableAttributes,
    tableData,
    pagination,
    addTableData,
    handleCurrentChange,
    handleSizeChange,
    handleRefresh,
  }
}
