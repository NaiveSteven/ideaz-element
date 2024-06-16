import { omit } from 'lodash-unified'
import { FORM_FILTER_KEYS } from '../props'
import type { FormProps } from '../props'

export const useFormConfig = (props: FormProps) => {
  const size = useFormSize()

  const formConfig = computed(() => {
    return {
      size: size.value,
      ...omit(props, FORM_FILTER_KEYS),
    }
  })

  return { formConfig }
}
