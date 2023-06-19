// import { h } from 'vue-demi';
import { isFunction } from '@ideaz/utils'
import FormItemLabel from '../src/FormItemLabel'
import type { FormProps } from '../src/props'
import type { FormColumn, Slots } from '~/types'

export const useFormSlots = (col: FormColumn, slots: Slots, props: FormProps) => {
  const scopedSlots: Slots = {}

  scopedSlots[col.frontSlot || 'label'] = () => {
    if (col.frontSlot && isFunction(slots[col.frontSlot]))
      return (slots[col.frontSlot] as (() => VNode))()

    if (isFunction(col.label))
      return col.label()

    if (col.formItemProps && isFunction(col.formItemProps.label))
      return col.formItemProps.label()

    return (
      <FormItemLabel
        {...{
          ...col.formItemProps,
          colon: Object.prototype.hasOwnProperty.call(
            col.formItemProps || {},
            'colon',
          )
            ? col.formItemProps?.colon
            : props.colon,
        }}
      />
    )
  }

  if (col.rearSlot && isFunction(slots[col.rearSlot]))
    scopedSlots[col.rearSlot] = () => (slots[col.rearSlot!] as (() => VNode))()

  return { scopedSlots }
}
