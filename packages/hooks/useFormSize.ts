import { computed, ref, unref } from 'vue-demi'
import type { MaybeRef } from '@vueuse/core'
import type { ComponentSize } from 'element-plus'
import { formItemProvideKey, formProvideKey } from '../element/form/src/props'
import { tableProvideKey } from '../element/table/src/props'
import { crudProvideKey } from '../element/crud/src/props'
import { useGlobalSize } from './useGlobalSize'
import { useProp } from './useProp'
import { useAttr } from './useAttr'

function getAttribute(key: string) {
  if (useAttr(key)?.value)
    return useAttr(key)
  if (useProp(key)?.value)
    return useProp(key)
  return { value: '' }
}

export function useFormSize(fallback?: MaybeRef<any | undefined>, ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global' | 'table' | 'crud', boolean>> = {}) {
  const emptyRef = ref(undefined)

  const size = ignore.prop ? emptyRef : getAttribute('size')
  const globalConfig = ignore.global ? emptyRef : useGlobalSize()
  const form = ignore.form
    ? { value: { size: undefined } }
    : inject(formProvideKey, undefined)
  const formItem = ignore.formItem
    ? { value: { size: undefined } }
    : inject(formItemProvideKey, undefined)
  const table = ignore.table
    ? { value: { size: undefined } }
    : inject(tableProvideKey, undefined)
  const crud = ignore.crud
    ? { value: { size: undefined } }
    : inject(crudProvideKey, undefined)

  return computed(
    (): ComponentSize => {
      return size.value
        || unref(fallback)
        || formItem?.value.size
        || form?.value.size
        || table?.value.size
        || crud?.value.size
        || globalConfig.value
        || ''
    },
  )
}
