import { h } from 'vue-demi';
import { isFunction } from '@ideaz/utils';
import FormItemLabel from '../src/FormItemLabel';

export const useFormSlots = (col: any, slots: any, props: Record<any, any>) => {
  const scopedSlots: any = {};
  const { formConfig } = props;

  scopedSlots[col.frontSlot || 'label'] = () => {
    if (col.frontSlot && slots[col.frontSlot]) {
      return slots[col.frontSlot]();
    }
    if (col.formItem && isFunction(col.formItem.label)) {
      return col.formItem.label(h);
    }
    return (
      <FormItemLabel
        {...{
          ...col.formItem,
          colon: Object.prototype.hasOwnProperty.call(
            col.formItem || {},
            'colon'
          )
            ? col.formItem.colon
            : formConfig.colon,
        }}
      />
    );
  };

  if (col.rearSlot && slots[col.rearSlot] && isFunction(slots[col.rearSlot])) {
    scopedSlots[col.rearSlot] = () => slots[col.rearSlot]();
  }

  return { scopedSlots };
};
