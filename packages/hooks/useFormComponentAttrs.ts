import { toCamelCase } from '@ideaz/utils'

export function useFormComponentAttrs(props: Record<any, any>) {
  const attrs = useAttrs()
  const onAll = computed(() => {
    const newOn: any = {}
    if (props.evts) {
      Object.keys(props.evts).forEach((eventName: string) => {
        newOn[`on${toCamelCase(eventName)}`] = (...args: any) => (props.evts[eventName] || function () {})(props.rowData, ...args)
      })
    }
    return newOn
  })
  const attrsAll = computed(() => {
    return { ...props, ...attrs }
  })

  return { attrsAll, onAll }
}
