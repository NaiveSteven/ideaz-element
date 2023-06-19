import { omit } from 'lodash-unified'
import type { FormProps } from '../src/props'

export const useFormConfig = (props: FormProps) => {
  const formConfig = computed(() => {
    return {
      ...omit(props, ['gutter', 'justify', 'align', 'options', 'columns']),
    }
  })

  return { formConfig }
}
