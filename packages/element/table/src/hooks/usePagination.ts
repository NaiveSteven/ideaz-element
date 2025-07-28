import { isObject, uid } from '@ideaz/utils'
// import { reactiveOmit } from '@vueuse/core'
import { omit, set } from 'lodash-unified'
import type { Ref } from 'vue'
import type { ITableProps } from '../props'
import type { Pagination } from '../../../types'

export function usePagination(mergedProps: Ref<ITableProps>, emit: any) {
  const tableData = ref<any>([])
  const attrs = useAttrs()

  const pagination = computed<Pagination>({
    get() {
      // editable is not compatible with pagination
      return (isObject(mergedProps.value.pagination) && !mergedProps.value.editable) ? mergedProps.value.pagination : {}
    },
    set(val) {
      emit('update:pagination', val)
    },
  })

  const tableAttributes = computed<any>(() => {
    const omitProps = omit(mergedProps.value, ['pagination', 'columns', 'draggable', 'toolBar', 'loading'])
    return { ...attrs, ...omitProps }
  })

  const paginationAttrs = computed(() => {
    return {
      ...pagination.value,
      layout: pagination.value.layout || 'total, sizes, prev, pager, next, jumper',
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
      if (mergedProps.value.editable) {
        const editableType = isObject(mergedProps.value.editable) ? (mergedProps.value.editable.type || 'single') : 'single'
        const columnProps = mergedProps.value.columns.map(column => column.prop).filter(prop => prop)
        tableData.value = tableAttributes.value.data.map((item: any) => {
          const obj: { [propName: string]: string } = {}
          columnProps.forEach((prop) => {
            // only add prop if it is not already in the object
            if (Object.hasOwnProperty.call(item, prop!) && !Object.hasOwnProperty.call(item, `${prop}Prop`))
              obj[`${prop}Prop`] = item[prop!]
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
    if (mergedProps.value.rowKey)
      set(rowData, String(mergedProps.value.rowKey), uid())

    tableData.value.push(rowData)
  }

  function getTableData(pagination: Pagination) {
    const page = pagination.page!
    const pageSize = pagination.pageSize!
    const list = tableAttributes.value.totalData
    const length = tableAttributes.value.totalData.length
    let start = (page - 1) * pageSize
    let end = page * pageSize
    if (start >= length)
      start = 0
    if (end >= length)
      end = length
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
