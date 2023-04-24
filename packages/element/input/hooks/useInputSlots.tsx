import { isFunction, isString } from '@ideaz/utils';

export const useInputSlots = (props: any, slots: any) => {
  const scopedSlots: any = {};

  const getSlotContent = (slot: any, defaultContent = null) => {
    if (isFunction(slot)) {
      return slot();
    } else if (isString(slot)) {
      return () => <span>{slot}</span>;
    }
    return defaultContent;
  };

  watchEffect(() => {
    const { prepend, append, prefix, suffix } = props;
    if (slots.prepend || prepend) {
      scopedSlots.prepend = getSlotContent(
        slots.prepend,
        getSlotContent(prepend)
      );
    }

    if (slots.append || append) {
      scopedSlots.append = getSlotContent(slots.append, getSlotContent(append));
    }

    if (slots.prefix || prefix) {
      scopedSlots.prefix = getSlotContent(slots.prefix, getSlotContent(prefix));
    }

    if (slots.suffix || suffix) {
      scopedSlots.suffix = getSlotContent(slots.suffix, getSlotContent(suffix));
    }
  });

  // const scopedSlots: any = {};
  // if (slots.prepend) {
  //   scopedSlots.prepend = slots.prepend();
  // }
  // if (props.prepend) {
  //   scopedSlots.prepend = () => <span>{props.prepend}</span>;
  // }
  return { scopedSlots };
};
