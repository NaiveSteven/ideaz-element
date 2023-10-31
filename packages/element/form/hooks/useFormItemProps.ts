import { isFunction } from '@ideaz/utils'
import type { FormItemProps } from '../src/props'

export const useFormItemProps = (props: FormItemProps) => {
  const formItemProps = computed(() => {
    const { col } = props
    const myProps = { extra: col.extra, rules: col.rules, ...col.formItemProps }
    if (col.required === true || col.rules?.required || col.formItemProps?.required) {
      myProps.rules = {
        required: true,
        message: col.message || col.fieldProps?.placeholder,
        ...col.rules,
      }
    }
    if (isFunction(myProps.label))
      delete myProps.label

    return myProps
  })

  return { formItemProps }
}
