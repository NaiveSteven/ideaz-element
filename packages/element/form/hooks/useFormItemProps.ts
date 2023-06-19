import { isFunction } from '@ideaz/utils'
import type { FormItemProps } from '../src/props'
import type { FormColumn } from '~/types'

export const useFormItemProps = (props: FormItemProps) => {
  const formItemProps = computed(() => {
    const { col } = props
    const myProps = { extra: col.extra, rules: col.rules, ...col.formItemProps } as FormColumn
    if (isFunction(myProps.label))
      delete myProps.label

    return myProps
  })

  return { formItemProps }
}
