import { cloneDeep } from 'lodash-unified'
import { isFunction } from '@ideaz/utils'
import { inputProps } from 'element-plus'

const DYNAMIC_FIELDS = Object.keys(inputProps).filter((key) => {
  const val = inputProps[key as keyof typeof inputProps] as any
  if (val && val.type && val!.type === Function)
    return false

  return true
})

export function getDynamicAttributes(fieldProps: any, scope: any) {
  const props = cloneDeep(fieldProps)
  Object.keys(props).forEach((key) => {
    if (isFunction(props[key]) && DYNAMIC_FIELDS.includes(key))
      props[key] = props[key](scope)
  })
  return props
}
