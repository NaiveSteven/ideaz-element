import { omit } from 'lodash-unified'
import { FORM_FILTER_KEYS } from '../src/props'
import type { FormProps } from '../src/props'

export const useFormConfig = (props: FormProps) => {
  const formConfig = computed(() => {
    return {
      ...omit(props, FORM_FILTER_KEYS),
    }
  })

  return { formConfig }
}
