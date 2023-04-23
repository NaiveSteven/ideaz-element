import { computed } from 'vue';
import { isFunction } from '@ideaz/utils';
import FormItemLabel from '../src/FormItemLabel';

export const useFormItemSlots = (props: any, slots: any) => {
  const vSlots = computed<any>(() => {
    const { col, formConfig } = props;
    const vSlots: any = {};
    if (col.formItem?.label || col.frontSlot) {
      vSlots.label = () => (
        <>
          {isFunction(slots[col.frontSlot]) ? (
            slots[col.frontSlot]!()
          ) : (
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
          )}
        </>
      );
    }

    if (
      col.rearSlot &&
      slots[col.rearSlot] &&
      isFunction(slots[col.rearSlot])
    ) {
      vSlots.error = () =>
        isFunction(slots[col.rearSlot]) && slots[col.rearSlot]!();
    }
    return vSlots;
  });

  return { vSlots };
};
