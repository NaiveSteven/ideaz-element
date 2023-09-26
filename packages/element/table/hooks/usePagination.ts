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
      return isObject(props.pagination) ? props.pagination : {}
    },
    set(val) {
      emit('update:pagination', val)
    },
  })

  const tableAttributes = computed<any>(() => {
    const omitProps = reactiveOmit(props, ['pagination', 'columns', 'draggable', 'toolBar', 'loading'])
    return { ...attrs, ...omitProps }
  })

  watch(
    () => tableAttributes.value,
    () => {
      if (
        tableAttributes.value.data
        && pagination.value.total
        && tableAttributes.value.data.length === pagination.value.total
      ) {
        getTableData(pagination.value)
      }
      else {
        if (props.editable) {
          const editableType = isObject(props.editable) ? (props.editable.type || 'single') : 'single'
          const columnProps = props.columns.map(column => column.prop).filter(prop => prop)
          tableData.value = tableAttributes.value.data.map((item: any) => {
            const obj: { [propName: string]: string } = {}
            columnProps.forEach((prop) => {
              if (Object.hasOwnProperty.call(item, prop))
                obj[`${prop}Prop`] = item[prop]
            })
            return { ...item, __isEdit: editableType !== 'single', ...obj }
          })
        }
        else {
          tableData.value = tableAttributes.value.data
        }
      }
    },
    { immediate: true },
  )

  const paginationAttrs = computed(() => {
    return {
      ...pagination.value,
      layout: pagination.value.layout || 'total, prev, pager, next',
      pageSizes: pagination.value.pageSizes || [100, 200, 300, 400, 500],
    }
  })

  const isPaginationByFront = computed(() => {
    if (
      tableAttributes.value.data
      && tableAttributes.value.data.length === pagination.value.total
      && paginationAttrs.value.type === 'front'
    )
      return true
    return false
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
    const list = tableAttributes.value.data
    const length = tableAttributes.value.data.length
    let start = (page - 1) * pageSize
    let end = page * pageSize
    if (start >= length) start = 0
    if (end >= length) end = length
    tableData.value = list.slice(start, end)
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
