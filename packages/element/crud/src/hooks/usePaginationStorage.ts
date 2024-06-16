import { cloneDeep } from 'lodash-es'
import { isObject } from '@ideaz/utils'
import type { CrudProps } from '../props'
import type { Pagination } from '../../../types'

export function usePaginationStorage(props: CrudProps, emit: any) {
  const originPagination = ref<Pagination>(cloneDeep(props.pagination || {}) as Pagination)

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

  return { middlePagination, originPagination, isUsePaginationStorage }
}
