// import type { CFormProps } from '../use-attrs';

export const useComponentMethods = (prop: Record<any, any>) => {
  const doMethod = (type: string, ...args: Array<string | boolean | number | Event>) => {
    if (prop.on && prop.on[type])
      prop.rowData ? prop.on[type](prop.rowData, ...args) : prop.on[type](...args)
  }
  const blur = (event: Event) => {
    doMethod('blur', event)
  }
  const focus = (event: Event) => {
    doMethod('focus', event)
  }
  const change = (value: string | number) => {
    doMethod('change', value)
  }
  const input = (value: string | number) => {
    doMethod('input', value)
  }
  const clear = () => {
    doMethod('clear')
  }
  const visibleChange = (visible: boolean) => {
    doMethod('visible-change', visible)
  }
  const removeTag = (value: string) => {
    doMethod('remove-tag', value)
  }

  return { blur, focus, change, input, clear, visibleChange, removeTag }
}
