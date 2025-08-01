import { get, pick } from 'lodash-unified'
import { isFunction, isObject, isString } from '@ideaz/utils'
import type { ElTable } from 'element-plus'
import type { ComponentInternalInstance, ComputedRef } from 'vue'
import { FILTER_TABLE_KEYS, tableKeys } from '../props'
import type { CrudProps, RequestConfig } from '../props'
import type { Pagination } from '../../../types'
import { useCrudConfig } from './useCrudConfig'
import { useTableColumns } from './useTableColumns'

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

function getAliasData(res: any, req: RequestConfig) {
  const list = req?.alias?.list
  const total = req?.alias?.total
  return {
    list: isFunction(list) ? list(res) : isString(list) ? get(res, list) : res?.data?.list,
    total: isFunction(total) ? total(res) : isString(total) ? get(res, total) : res?.data?.total,
  }
}

export function useDataRequest(mergedProps: ComputedRef<CrudProps>, emit: any) {
  const sortableData = ref<any>({})
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
  const {
    handleSearch: searchByCustom,
    handleReset: resetByCustom,
    handlePaginationChange: changePaginationByCustom,
    middleFormData,
    isUseFormDataStorage,
    middlePagination,
  } = useCrudConfig(mergedProps, emit)
  const { tableColumns, isShowDialog, rowData, currentMode, isShowDrawer, refreshAfterRequest } = useTableColumns(mergedProps, emit, getTableData)
  const attrs = useAttrs()

  const isRequest = () => {
    return (
      isObject(mergedProps.value.request)
      || isString(mergedProps.value.request)
      || isFunction(mergedProps.value.request)
    )
  }

  const isLoading = computed({
    get() {
      return mergedProps.value.loading || false
    },
    set(val) {
      emit('update:loading', val)
    },
  })

  const tableData = computed<any>({
    get() {
      return mergedProps.value.data
    },
    set(val) {
      emit('update:data', val)
    },
  })

  const tableProps = computed<any>(() => {
    return {
      ...pick(mergedProps.value, tableKeys.filter(key => !FILTER_TABLE_KEYS.includes(key))),
      'columns': tableColumns.value,
      ...attrs,
      'fullScreenElement': () => ctx?.$refs.crudRef,
      'pagination': middlePagination.value,
      'data': tableData.value,
      'loading': isLoading.value,
      'onUpdate:data': (data: any) => tableData.value = data,
    }
  })

  async function getTableData(payload?: { column: any, prop: string, order: string }) {
    const req = mergedProps.value.request || {}
    const params = getParams(payload)
    if (isObject(req) && isFunction(req.searchFunc)) {
      req.searchFunc({ params })
      return
    }
    isLoading.value = true
    try {
      let res = null
      if (isFunction(req))
        res = await req(params)

      if (isObject(req) && isFunction(req.searchApi))
        res = await req.searchApi(params)

      tableData.value = isFunction(req.tableData) ? req.tableData(getAliasData(res, req).list) : getAliasData(res, req).list

      if (mergedProps.value.pagination !== false)
        setPaginationData({ total: Number(getAliasData(res, req).total) })

      isLoading.value = false
      return res
    }
    catch (error) {
      isLoading.value = false
    }
  }

  function getParams(payload?: { column: any, prop: string, order: string }) {
    const params = {
      ...mergedProps.value.formData,
      ...payload,
      ...sortableData.value,
    }
    if (mergedProps.value.pagination !== false) {
      params.page = middlePagination.value.page
      params.pageSize = middlePagination.value.pageSize
    }
    return params
  }

  function handleReset() {
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
    e.preventDefault()
    handleSearch()
  }

  const handlePaginationChange = (val: { page: number, pageSize: number }) => {
    changePaginationByCustom(val)
    if (isRequest()) {
      setPaginationData(val)
      getTableData()
    }
  }

  function setPaginationData(data: Pagination) {
    const pagination: Pagination = { ...middlePagination.value }
    Object.keys(data).forEach((key) => {
      if (Object.hasOwnProperty.call(middlePagination.value, key))
        (pagination[key as keyof typeof pagination] as Pagination) = data[key as keyof typeof pagination] as Pagination
    })
    middlePagination.value = pagination
    // if (isUsePaginationStorage.value)
    //   updateTableProPagination(middlePagination.value)

    return { ...middlePagination.value }
  }

  const handleRadioChange = (selection: any) => {
    emit('radio-change', selection)
  }

  const handleSortChange = ({ column, prop, order }: { column: any, prop: string, order: string }) => {
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
      const beforeData = mergedProps.value.request?.beforeData
      const afterData = mergedProps.value.request?.afterData
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
    const exportData = mergedProps.value.export
    const params = stringifyObject(getParams())
    if (isString(exportData))
      window.location.href = `${exportData}?${params}`

    if (isFunction(exportData))
      window.location.href = exportData(getParams())
  }

  if (!isUseFormDataStorage.value && isRequest())
    initTableData()

  onMounted(async () => {
    await nextTick()
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
    handleRadioChange,
    handleExport,
    getTableData,
    isShowDialog,
    rowData,
    currentMode,
    isShowDrawer,
    refreshAfterRequest,
  }
}
