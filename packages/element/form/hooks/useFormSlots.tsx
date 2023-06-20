// import { h } from 'vue-demi';
import { isFunction, isSlot } from '@ideaz/utils'
import FormItemLabel from '../src/FormItemLabel'
import type { FormProps } from '../src/props'
import type { FormColumn, Slots } from '~/types'

export const useFormSlots = (col: FormColumn, slots: Slots, props: FormProps) => {
  const scopedSlots: Slots = {}

  const getLabelSlotName = () => {
    if (isSlot(col.label)) return col.label as string
    return 'label'
  }

  scopedSlots[getLabelSlotName()] = () => {
    const labelSlotName = getLabelSlotName()
    if (isSlot(col.label) && isFunction(slots[labelSlotName]))
      return (slots[labelSlotName] as (() => VNode))()

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

  if (col.error) {
    if (isSlot(col.error) && isFunction(slots[col.error as string])) {
      const error = col.error as string
      scopedSlots[error] = () => <div class="el-form-item__error">{(slots[error!] as (() => VNode))()}</div>
    }
    else if (isFunction(col.error)) {
      scopedSlots.error = () => <div class="el-form-item__error">{(col.error as (() => VNode))()}</div>
    }
    else {
      scopedSlots.error = () => <div class="el-form-item__error">{col.error}</div>
    }
  }

  return { scopedSlots }
}
