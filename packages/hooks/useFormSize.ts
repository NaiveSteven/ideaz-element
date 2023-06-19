import { computed, ref, unref } from 'vue-demi'
import type { MaybeRef } from '@vueuse/core'
import { formItemProvideKey, formProvideKey } from '../element/form/src/props'
import { useGlobalSize } from './useGlobalSize'
import { useProp } from './useProp'
import { useAttr } from './useAttr'

const getAttribute = (key: string) => {
  if (useAttr(key)?.value) return useAttr(key)
  if (useProp(key)?.value) return useProp(key)
  return { value: '' }
}

export const useFormSize = (
  fallback?: MaybeRef<any | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {},
) => {
  const emptyRef = ref(undefined)

  const size = ignore.prop ? emptyRef : getAttribute('size')
  const globalConfig = ignore.global ? emptyRef : useGlobalSize()
  const form = ignore.form
    ? { size: undefined }
    : inject(formProvideKey, undefined)
  const formItem = ignore.formItem
    ? { size: undefined }
    : inject(formItemProvideKey, undefined)

  return computed(
    (): any =>
      size.value
      || unref(fallback)
      || formItem?.size
      || form?.size
      || globalConfig.value
      || '',
  )
}
