import { isObject, uid } from '@ideaz/utils'
import { reactiveOmit } from '@vueuse/core'
import { set } from 'lodash-unified'
import type { ITableProps } from '../src/props'
import type { Pagination } from '~/types'

export const usePagination = (props: ITableProps, emit: any) => {
  const tableData = ref<any>([])

  const attrsAll = computed<any>(() => {
    const omitProps = reactiveOmit(props, ['pagination', 'columns', 'draggable', 'topRender', 'toolBar', 'loading'])
    return { ...omitProps, size: props.size, border: props.border }
  })

  watch(
    () => attrsAll.value,
    () => {
      const pagination = isObject(props.pagination) ? props.pagination : {} as Pagination
      if (
        attrsAll.value.data
        && pagination.total
        && attrsAll.value.data.length === pagination.total
      ) {
        getTableData(pagination)
      }
      else {
        if (props.editable) {
          const editableType = isObject(props.editable) ? (props.editable.type || 'single') : 'single'
          const columnProps = props.columns.map(column => column.prop).filter(prop => prop)
          tableData.value = attrsAll.value.data.map((item: any) => {
            const obj: { [propName: string]: string } = {}
            columnProps.forEach((prop) => {
              if (Object.hasOwnProperty.call(item, prop))
                obj[`${prop}Prop`] = item[prop]
            })
            return { ...item, __isEdit: editableType !== 'single', ...obj }
          })
        }
        else {
          tableData.value = attrsAll.value.data
        }
      }
    },
    { immediate: true },
  )

  const paginationAttrs = computed(() => {
    const pagination = isObject(props.pagination) ? props.pagination : {} as Pagination
    return {
      ...pagination,
      layout: pagination.layout || 'total, prev, pager, next',
      pageSizes: pagination.pageSizes || [100, 200, 300, 400, 500],
    }
  })

  const isPaginationByFront = computed(() => {
    const pagination = isObject(props.pagination) ? props.pagination : {} as Pagination
    if (
      attrsAll.value.data
      && attrsAll.value.data.length === pagination.total
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
    const page = pagination.page
    const pageSize = pagination.pageSize
    const list = attrsAll.value.data
    const length = attrsAll.value.data.length
    let start = (page - 1) * pageSize
    let end = page * pageSize
    if (start >= length) start = 0
    if (end >= length) end = length
    tableData.value = list.slice(start, end)
  }

  const handleCurrentChange = (val: number) => {
    const pagination = isObject(props.pagination) ? props.pagination : {} as Pagination
    if (isPaginationByFront.value) {
      getTableData({
        page: val,
        pageSize: pagination.pageSize,
      })
      pagination.page = val
    }
    else {
      emit('refresh', {
        page: val,
        pageSize: pagination.pageSize,
      })
    }
  }

  const handleSizeChange = (val: number) => {
    if (isPaginationByFront.value && isObject(props.pagination)) {
      getTableData({ page: 1, pageSize: val })
      props.pagination.pageSize = val
    }
    else {
      emit('refresh', { page: 1, pageSize: val })
    }
  }

  const handleRefresh = () => {
    const page = (isObject(props.pagination) && props.pagination.page) ? props.pagination.page : 1
    handleCurrentChange(page)
  }

  return {
    paginationAttrs,
    attrsAll,
    tableData,
    addTableData,
    handleCurrentChange,
    handleSizeChange,
    handleRefresh,
  }
}
