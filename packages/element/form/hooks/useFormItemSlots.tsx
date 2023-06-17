import { isFunction } from '@ideaz/utils'
import type { Slot } from 'vue'
import type { FormItemProps } from '../src/props'
import FormItemLabel from '../src/FormItemLabel'

export interface Slots {
  [name: string]: undefined | string | (() => JSX.Element) | Slot
}

export const useFormItemSlots = (props: FormItemProps, slots: any) => {
  const vSlots = computed<any>(() => {
    const { col, formConfig } = props
    const vSlots: Slots = {} as Slots
    if (col.formItemProps?.label || col.frontSlot || col.label) {
      vSlots.label = () => {
        return isFunction(slots[col.frontSlot!])
          ? (
              slots[col.frontSlot!]()
            )
          : (
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
