import { useComponentMethods } from './useComponentMethods'

export const useFormComponentAttrs = (props: Record<any, any>) => {
  const { blur, focus, change, input, clear, visibleChange, removeTag }
    = useComponentMethods(props)
  const obj = {
    blur,
    focus,
    change,
    input,
    clear,
    visibleChange,
    removeTag,
  }

  type EventType = keyof typeof obj

  const attrs = useAttrs()
  const onAll = computed(() => {
    const newOn: {
      [K in EventType]: any
    } = {} as typeof obj
    if (props.on) {
      Object.keys(props.on).forEach((item) => {
        newOn[item as keyof typeof obj] = obj[item as keyof typeof obj] || function () {}
      })
    }
    return newOn
  })
  const attrsAll = computed(() => {
    return { ...props, ...attrs, ...props.attrs }
  })

  return { attrsAll, onAll }
}
