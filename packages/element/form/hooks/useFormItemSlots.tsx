import { isFunction } from '@ideaz/utils'
import type { FormItemProps } from '../src/props'
import FormItemLabel from '../src/FormItemLabel'
import type { Slots } from '~/types'

export const useFormItemSlots = (props: FormItemProps, slots: any) => {
  const getContent = () => {
    const { col } = props
    if (isFunction(slots[col.frontSlot!]))
      return slots[col.frontSlot!]()

    if (isFunction(col.label))
      return col.label()
  }

  const vSlots = computed<Slots>(() => {
    const { col, formConfig } = props
    const vSlots: Slots = {} as Slots
    if (col.formItemProps?.label || col.frontSlot || col.label) {
      vSlots.label = () => {
        return getContent()
          || (
          <FormItemLabel
            {...{
              label: col.label,
              tooltip: col.tooltip,
              ...col.formItemProps,
              colon: Object.prototype.hasOwnProperty.call(
                col.formItemProps || {},
                'colon',
              )
                ? col.formItemProps?.colon
                : formConfig.colon,
            }}
          />
          )
      }
    }

    if (
      col.rearSlot
      && isFunction(slots[col.rearSlot])
    ) {
      vSlots.error = () =>
        isFunction(slots[col.rearSlot!]) && slots[col.rearSlot!]()
    }
    return vSlots
  })

  return { vSlots }
}
