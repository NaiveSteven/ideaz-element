import { cloneDeep } from 'lodash-es'
import { isObject } from '@ideaz/utils'
import type { CrudProps } from '../src/props'
import type { Pagination } from '~/types'

export const usePaginationStorage = (props: CrudProps, emit: any) => {
  const originPagination = ref(cloneDeep(props.pagination || {}))
  const zCrudName = props.name

  const middlePagination = ref<Pagination>(
    sessionStorage.getItem('zCrudPagination')
      ? (JSON.parse(sessionStorage.getItem('zCrudPagination')!)[zCrudName]
          || originPagination.value)
      : originPagination.value,
  )

  const isUsePaginationStorage = computed(() => {
    return props.name && props.paginationStorage !== false
  })

  watch(
    () => middlePagination.value,
    () => {
      if (isObject(props.pagination) && isUsePaginationStorage) {
        const pagination: Pagination = {} as Pagination
        Object.keys(props.pagination).forEach((key) => {
          pagination[key] = middlePagination.value[key as keyof Pagination]
        })
        emit('update:pagination', pagination)
      }
    },
    { deep: true, immediate: true },
  )

  watch(
    () => props.pagination,
    () => {
      if (isObject(props.pagination) && isUsePaginationStorage) {
        Object.keys(props.pagination).forEach((key) => {
          middlePagination.value[key] = (props.pagination as Pagination)![key as keyof Pagination]
        })
      }
    },
    { deep: true },
  )

  return { middlePagination, originPagination, isUsePaginationStorage }
}
