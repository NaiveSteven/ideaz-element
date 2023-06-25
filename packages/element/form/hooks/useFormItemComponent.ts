import type { FormItemProps } from '../src/props'

const Z_COMPONENT_NAMES = ['select', 'radio', 'checkbox', 'input']
const ELEMENT_COMPONENT_NAMES = ['datepicker', 'switch']

export const useFormItemComponent = (props: FormItemProps) => {
  const getComponentName = (component: string | (() => string)) => {
    const propComponentName = typeof component === 'function' ? component() : component

    if (Z_COMPONENT_NAMES.includes(propComponentName)) {
      return `z-${propComponentName}`
    }
    else if (ELEMENT_COMPONENT_NAMES.includes(propComponentName)) {
      if (propComponentName === 'datepicker')
        return 'el-date-picker'

      return `el-${propComponentName}`
    }
    else {
      return propComponentName || 'unknown'
    }
  }

  const componentName = computed(() => {
    return getComponentName(props.col.component || 'unknown')
  })

  return { componentName }
}
