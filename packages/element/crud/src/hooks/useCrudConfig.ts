import { debounce } from 'lodash-unified'
import type { ElForm } from 'element-plus'
import { isObject } from '@ideaz/utils'
import type { ComponentInternalInstance } from 'vue'
import type { CrudProps } from '../props'
import type { Pagination } from '../../../types'
import { useFormStorage } from './useFormStorage'
import { usePaginationStorage } from './usePaginationStorage'

export function useCrudConfig(mergedProps: ComputedRef<CrudProps>, emit: any) {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance

  const { middleFormData, originFormData, isUseFormDataStorage } = useFormStorage(mergedProps, emit)
  const { middlePagination, originPagination, isUsePaginationStorage }
    = usePaginationStorage(mergedProps, emit)

  const handleSearch = debounce(() => {
    if (isUseFormDataStorage.value)
      updateTableProFormData(mergedProps.value, mergedProps.value.formData)

    if (isUsePaginationStorage.value)
      updateTableProPagination(mergedProps.value.pagination)

    emit('update:formData', middleFormData.value)
    emit('search')
  }, 200)

  const handleReset = () => {
    (ctx!.$refs.formRef as typeof ElForm).resetFields()
    if (isUseFormDataStorage.value && isObject(mergedProps.value.formData)) {
      const formData: any = {}
      Object.keys(mergedProps.value.formData).forEach((key) => {
        formData[key] = originFormData.value[key]
        middleFormData.value[key] = originFormData.value[key]
      })
      emit('update:formData', formData)
      updateTableProFormData(mergedProps.value)
    }
    if (isObject(mergedProps.value.pagination) && isUsePaginationStorage.value) {
      const pagination: Pagination = {}
      Object.keys(mergedProps.value.pagination).forEach((key) => {
        (pagination[key as keyof typeof mergedProps.value.pagination] as Pagination) = originPagination.value[key as keyof typeof mergedProps.value.pagination] as Pagination;
        (middlePagination.value[key as keyof typeof mergedProps.value.pagination] as Pagination) = originPagination.value[key as keyof typeof mergedProps.value.pagination] as Pagination
      })
      emit('update:pagination', pagination)
      updateTableProPagination()
    }
    emit('reset')
  }

  const handlePaginationChange = (val: any) => {
    if (isObject(mergedProps.value.pagination) && isUsePaginationStorage.value) {
      const pagination = {
        ...mergedProps.value.pagination,
        ...val,
      }
      updateTableProPagination(pagination)
    }
    emit('refresh', val)
  }

  function updateTableProFormData(config: CrudProps, data?: any) {
    const formData = window.sessionStorage.getItem('zCrudFormData')
      ? JSON.parse(window.sessionStorage.getItem('zCrudFormData')!)
      : {}
    formData[config.name] = data
    if (!data)
      delete formData[config.name]

    window.sessionStorage.setItem('zCrudFormData', JSON.stringify(formData))
  }

  function updateTableProPagination(data?: any) {
    const pagination = sessionStorage.getItem('zCrudPagination')
      ? JSON.parse(sessionStorage.getItem('zCrudPagination')!)
      : {}
    pagination[mergedProps.value.name] = data
    if (!data)
      delete pagination[mergedProps.value.name]

    sessionStorage.setItem('zCrudPagination', JSON.stringify(pagination))
  }

  return {
    handleSearch,
    handleReset,
    handlePaginationChange,
    middleFormData,
    isUseFormDataStorage,
    middlePagination,
    isUsePaginationStorage,
    updateTableProPagination,
  }
}
