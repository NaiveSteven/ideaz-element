import { debounce } from 'lodash-unified'
import type { ElForm } from 'element-plus'
import { isObject } from '@ideaz/utils'
import type { ComponentInternalInstance } from 'vue'
import type { CrudProps } from '../src/props'
import { useFormStorage } from './useFormStorage'
import { usePaginationStorage } from './usePaginationStorage'

export const useCrudConfig = (props: CrudProps, emit: any) => {
  const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance

  const { middleFormData, originFormData, isUseFormDataStorage } = useFormStorage(props, emit)
  const { middlePagination, originPagination, isUsePaginationStorage }
    = usePaginationStorage(props, emit)

  const handleSearch = debounce(() => {
    if (isUseFormDataStorage.value)
      updateTableProFormData(props, props.formData)

    if (isUsePaginationStorage.value)
      updateTableProPagination(props.pagination)

    emit('update:formData', middleFormData.value)
    emit('search')
  }, 200)

  const handleReset = () => {
    (ctx!.$refs.formRef as typeof ElForm).resetFields()
    if (isUseFormDataStorage.value && isObject(props.formData)) {
      const formData: any = {}
      Object.keys(props.formData).forEach((key) => {
        formData[key] = originFormData.value[key]
        middleFormData.value[key] = originFormData.value[key]
      })
      emit('update:formData', formData)
      updateTableProFormData(props)
    }
    if (isObject(props.pagination) && isUsePaginationStorage.value) {
      const pagination: any = {}
      Object.keys(props.pagination).forEach((key) => {
        pagination[key] = originPagination.value[key]
        middlePagination.value[key] = originPagination.value[key]
      })
      emit('update:pagination', pagination)
      updateTableProPagination()
    }
    emit('reset')
  }

  const handlePaginationChange = (val: any) => {
    if (isObject(props.pagination) && isUsePaginationStorage.value) {
      const pagination = {
        ...props.pagination,
        ...val,
      }
      updateTableProPagination(pagination)
    }
    emit('refresh', val)
  }

  function updateTableProFormData(config: any, data?: any) {
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
    pagination[props.name] = data
    if (!data)
      delete pagination[props.name]

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
