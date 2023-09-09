import { get, pick } from 'lodash-unified'
import { isArray, isBoolean, isFunction, isObject, isString } from '@ideaz/utils'
import type { ElTable } from 'element-plus'
import type { ComponentInternalInstance } from 'vue'
import { tableKeys } from '../src/props'
import type { CrudProps, TableDataReq } from '../src/props'
import { useCrudConfig } from './useCrudConfig'
import { useTableColumns } from './useTableColumns'
import type { Pagination } from '~/types'

export function stringifyObject(obj: any) {
  const keyValuePairs = []

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = encodeURIComponent(obj[key])
      const pair = `${key}=${value}`
      keyValuePairs.push(pair)
    }
  }

  return keyValuePairs.join('&')
}

function getAliasData(res: any, req: TableDataReq) {
  const list = req?.alias?.list
  const total = req?.alias?.total
  return {
    list: isFunction(list) ? list(res) : isString(list) ? get(res, list) : res?.data?.list,
    total: isFunction(total) ? total(res) : isString(total) ? get(res, total) : res?.data?.total,
  }
}

export const useDataRequest = (props: CrudProps, emit: any) => {
  const sortableData = ref<any>({})
  const isTableLoading = ref(false)
  const tableData = ref<any>([])
  const pagination = ref({
    page: 1,
    pageSize: 10,
    total: 0,
    ...(isBoolean(props.pagination) ? {} : props.pagination),
  })
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
  const {
    handleSearch: searchByCustom,
    handleReset: resetByCustom,
    handlePaginationChange: changePaginationByCustom,
    middleFormData,
    isUseFormDataStorage,
    isUsePaginationStorage,
    middlePagination,
    updateTableProPagination,
  } = useCrudConfig(props, emit)
  const { tableColumns, isShowDialog, rowData, currentMode, isShowDrawer } = useTableColumns(props, emit)
  const attrs = useAttrs()

  const isRequest = () => {
    return (
      isObject(props.request)
      || isString(props.request)
      || isFunction(props.request)
    )
  }

  const tableProps = computed(() => {
    return {
      ...pick(props, tableKeys),
      columns: tableColumns.value,
      ...attrs,
      pagination: isUsePaginationStorage.value
        ? middlePagination.value
        : isRequest()
          ? pagination.value
          : (props.pagination || {}),
      data: isRequest() ? tableData.value : props.data,
      loading: isRequest() ? isTableLoading.value : props.loading,
    }
  })

  watch(() => props.data, () => {
    if (isArray(props.data))
      tableData.value = props.data
  })

  async function getTableData(payload?: { column: any; prop: string; order: string }) {
    const req = props.request
    const params = getParams(payload)
    if (isObject(req) && isFunction(req.func)) {
      req.func({
        params,
        data: tableData,
        loading: isTableLoading,
        pagination: isRequest() ? pagination : middlePagination,
      })
      return
    }
    isTableLoading.value = true
    try {
      let res = null
      if (isFunction(req))
        res = await req(params)

      if (isObject(req) && isFunction(req.search))
        res = await req.search(params)

      tableData.value = isFunction(req.data) ? req.data(getAliasData(res, req).list) : getAliasData(res, req).list
      if (props.data)
        emit('update:data', tableData.value)

      if (props.pagination)
        emit('update:pagination', pagination.value)

      if (props.pagination === false)
        setPaginationData({ total: Number(getAliasData(res, req).total) })

      isTableLoading.value = false
      return res
    }
    catch (error) {
      isTableLoading.value = false
    }
  }

  function getParams(payload?: { column: any; prop: string; order: string }) {
    const req = props.request
    const params = {
      ...props.formData,
      ...payload,
      ...sortableData.value,
    }
    if (props.pagination === false) {
      params.page = setPaginationData({})?.page
      params.pageSize = setPaginationData({})?.pageSize
    }
    if (isObject(req) && isObject(req.params)) return req.params
    if (isObject(req) && isFunction(req.params)) return req.params(params)
    return params
  }

  const handleReset = () => {
    resetByCustom()
    if (isRequest()) {
      const tableRef = ctx!.$refs.zTableRef as typeof ElTable
      tableRef.clearSelection()
      tableRef.clearSort()
      tableRef.clearFilter()
      setPaginationData({ page: 1 })
      getTableData()
    }
  }

  const handleSearch = () => {
    searchByCustom()
    if (isRequest()) {
      setPaginationData({ page: 1 })
      getTableData()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      handleSearch()
    }
  }

  const handlePaginationChange = (val: { page: number;pageSize: number }) => {
    changePaginationByCustom(val)
    if (isRequest()) {
      setPaginationData(val)
      getTableData()
    }
  }

  function setPaginationData(data: Pagination) {
    const targetPagination = isUsePaginationStorage.value ? middlePagination : pagination
    Object.keys(data).forEach((key) => {
      if (Object.hasOwnProperty.call(targetPagination.value, key))
        targetPagination.value[key] = data[key as keyof typeof targetPagination.value]
    })
    if (isUsePaginationStorage.value)
      updateTableProPagination(targetPagination.value)

    if (props.pagination)
      emit('update:pagination', pagination.value)

    return { ...targetPagination.value }
  }

  const handleCheckboxChange = (selection: any) => {
    emit('selection-change', selection)
  }

  const handleRadioChange = (selection: any) => {
    emit('radio-change', selection)
  }

  const handleSortChange = ({ column, prop, order }: { column: any; prop: string; order: string }) => {
    if (order)
      sortableData.value = { sort: { column, prop, order } }

    else
      sortableData.value = {}

    emit('sort-change', { column, prop, order })
    if (isRequest())
      getTableData(sortableData.value)
  }

  const initTableData = async () => {
    try {
      const beforeData = props.request?.beforeData
      const afterData = props.request?.afterData
      if (isFunction(beforeData))
        await beforeData()

      const res = await getTableData()
      if (isFunction(afterData))
        await afterData(res)
    }
    catch (error) {

    }
  }

  const handleExport = () => {
    const exportData = props.export
    const params = stringifyObject(getParams())
    if (isString(exportData))
      window.location.href = `${exportData}?${params}`

    if (isFunction(exportData))
      window.location.href = exportData(getParams())
  }

  if (!isUseFormDataStorage.value && isRequest())
    initTableData()

  onMounted(() => {
    if (isUseFormDataStorage.value && isRequest())
      initTableData()
  })

  return {
    handleSearch,
    tableProps,
    handleReset,
    handleKeyDown,
    handlePaginationChange,
    handleSortChange,
    middleFormData,
    isUseFormDataStorage,
    handleCheckboxChange,
    handleRadioChange,
    handleExport,
    getTableData,
    isShowDialog,
    rowData,
    currentMode,
    isShowDrawer,
  }
}
