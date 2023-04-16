import { isDef, isUnDef } from '../../utils/src/is.js'

export const setFormAlias = (props: Record<any, any>) => {
  const getLabelKey = () => {
    if (isUnDef(props.alias))
      return 'label'
    if (isDef(props.alias.label))
      return props.alias.label
    return 'label'
  }

  const getValueKey = () => {
    if (isUnDef(props.alias))
      return 'value'
    if (isDef(props.alias.value))
      return props.alias.value
    return 'value'
  }

  const getDisabledKey = () => {
    if (isUnDef(props.alias))
      return 'disabled'
    if (isDef(props.alias.disabled))
      return props.alias.disabled
    return 'disabled'
  }

  return { getLabelKey, getValueKey, getDisabledKey }
}
