import { isFunction, isSlot } from '@ideaz/utils'
import type { FormItemProps } from '../src/props'
import FormItemLabel from '../src/FormItemLabel'
import type { Slots } from '~/types'

export const useFormItemSlots = (props: FormItemProps, slots: Slots) => {
  const getContent = () => {
    const { col } = props
    if (isSlot(col.label) && isFunction(slots[col.label as string]))
      return (slots[col.label as string] as () => VNode)()

    if (isFunction(col.label))
      return col.label()
  }

  const getColon = () => {
    const { col, formConfig } = props
    if (Object.prototype.hasOwnProperty.call(col.formItemProps || {}, 'colon'))
      return col.formItemProps?.colon

    if (Object.prototype.hasOwnProperty.call(col, 'colon'))
      return col.colon

    return formConfig.colon
  }

  const vSlots = computed<Slots>(() => {
    const { col } = props
    const vSlots: Slots = {} as Slots
    if (col.formItemProps?.label || col.label) {
      vSlots.label = () => {
        return getContent()
          || (
          <FormItemLabel
            {...{
              label: col.label,
              tooltip: col.tooltip,
              ...col.formItemProps,
              colon: getColon(),
            }}
            v-slots={slots}
          />
          )
      }
    }

    if (col.error) {
      if (isSlot(col.error) && isFunction(slots[col.error as string])) {
        const error = col.error as string
        vSlots.error = () => (slots[error!] as (() => VNode))()
      }
      else if (isFunction(col.error) && isFunction(slots.error)) {
        vSlots.error = () => (slots.error as () => VNode)()
      }
      else {
        vSlots.error = () => (slots.error as () => VNode)()
      }
    }
    return vSlots
  })

  return { vSlots }
}
