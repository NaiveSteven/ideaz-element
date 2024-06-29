import type { FormItemProps } from '../props'

const Z_COMPONENT_NAMES = ['select', 'radio', 'checkbox', 'input']

export function useFormItemComponent(props: FormItemProps) {
  const getComponentName = (component: string | (() => string)) => {
    const propComponentName = typeof component === 'function' ? component() : component

    if (Z_COMPONENT_NAMES.includes(propComponentName)) {
      return `z-${propComponentName}`
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
