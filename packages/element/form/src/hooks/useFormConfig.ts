import { omit } from 'lodash-unified'
import type { ComputedRef } from 'vue'
import { FORM_FILTER_KEYS } from '../props'
import type { FormProps } from '../props'

export function useFormConfig(mergedProps: ComputedRef<FormProps>) {
  const size = useFormSize()

  const formConfig = computed(() => {
    return {
      size: size.value,
      ...omit(mergedProps.value, FORM_FILTER_KEYS),
    }
  })

  return { formConfig }
}
