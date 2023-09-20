import { cloneDeep } from 'lodash-es'
import { isObject } from '@ideaz/utils'
import type { CrudProps } from '../src/props'
import type { Pagination } from '~/types'

export const usePaginationStorage = (props: CrudProps, emit: any) => {
  const originPagination = ref(cloneDeep(props.pagination || {}))

  const middlePagination = computed<Pagination>({
    get() {
      return isObject(props.pagination) ? props.pagination : {}
    },
    set(val) {
      emit('update:pagination', val)
    },
  })

  const isUsePaginationStorage = computed(() => {
    return props.name && props.paginationStorage !== false && isObject(props.pagination) && props.pagination.pageSize
  })

  onMounted(() => {
    if (isObject(props.formData) && window.sessionStorage.getItem('zCrudPagination') && JSON.parse(window.sessionStorage.getItem('zCrudPagination')!)[props.name])
      emit('update:pagination', (JSON.parse(sessionStorage.getItem('zCrudPagination')!)[props.name]))
  })

  // watch(
  //   () => middlePagination.value,
  //   () => {
  //     if (isObject(props.pagination) && isUsePaginationStorage) {
  //       const pagination: Pagination = {} as Pagination
  //       Object.keys(props.pagination).forEach((key) => {
  //         pagination[key] = middlePagination.value[key as keyof Pagination]
  //       })
  //       // console.log(pagination, 'pagination')
  //       emit('update:pagination', pagination)
  //     }
  //   },
  //   { deep: true, immediate: true },
  // )

  // watch(
  //   () => props.pagination,
  //   () => {
  //     if (isObject(props.pagination) && isUsePaginationStorage) {
  //       Object.keys(props.pagination).forEach((key) => {
  //         middlePagination.value[key] = (props.pagination as Pagination)![key as keyof Pagination]
  //       })
  //       console.log(props.pagination, 'props.pagination')
  //     }
  //   },
  //   { deep: true },
  // )

  return { middlePagination, originPagination, isUsePaginationStorage }
}
