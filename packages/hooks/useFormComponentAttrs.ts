import { toCamelCase } from '@ideaz/utils'

export function useFormComponentAttrs(props: Record<any, any>) {
  const attrs = useAttrs()
  const onAll = computed(() => {
    const newOn: any = {}
    if (props.evts) {
      // Temporary fix, events trigger faster than rendering, temporarily can only manually modify the corresponding data in the row
      Object.keys(props.evts).forEach((eventName: string) => {
        newOn[`on${toCamelCase(eventName)}`] = (...args: any) => {
          const scope = {
            ...props.scope,
            row: (eventName === 'input' || eventName === 'clear') ? { ...props.scope.row, [props.column.prop]: args[0] || '' } : props.scope.row,
          };
          (props.evts[eventName] || function () { })(scope, ...args)
        }
      })
    }
    return newOn
  })
  const attrsAll = computed(() => {
    return { ...props, ...attrs }
  })

  return { attrsAll, onAll }
}
