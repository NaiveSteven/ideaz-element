import { cloneDeep } from 'lodash-unified'
import { isFunction } from '@ideaz/utils'
import { zInputProps } from '../element/input/src/input'
import { selectProps } from '../element/select/src/props'

const componentProps = {
  ...zInputProps,
  ...selectProps,
}

const DYNAMIC_FIELDS = Object.keys(componentProps).filter((key) => {
  const val = componentProps[key as keyof typeof componentProps] as any
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
