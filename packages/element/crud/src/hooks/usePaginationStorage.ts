import { cloneDeep } from 'lodash-es'
import { isObject } from '@ideaz/utils'
import type { CrudProps } from '../props'
import type { Pagination } from '../../../types'

export function usePaginationStorage(mergedProps: ComputedRef<CrudProps>, emit: any) {
  const originPagination = ref<Pagination>(cloneDeep(mergedProps.value.pagination || {}) as Pagination)

  const middlePagination = computed<Pagination>({
    get() {
      return isObject(mergedProps.value.pagination) ? mergedProps.value.pagination : {}
    },
    set(val) {
      emit('update:pagination', val)
    },
  })

  const isUsePaginationStorage = computed(() => {
    return mergedProps.value.name && mergedProps.value.paginationStorage !== false && isObject(mergedProps.value.pagination) && mergedProps.value.pagination.pageSize
  })

  onMounted(() => {
    if (isObject(mergedProps.value.formData) && window.sessionStorage.getItem('zCrudPagination') && JSON.parse(window.sessionStorage.getItem('zCrudPagination')!)[mergedProps.value.name])
      emit('update:pagination', (JSON.parse(sessionStorage.getItem('zCrudPagination')!)[mergedProps.value.name]))
  })

  return { middlePagination, originPagination, isUsePaginationStorage }
}
