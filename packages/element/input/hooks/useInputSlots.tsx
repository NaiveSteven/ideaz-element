import { isFunction, isString } from '@ideaz/utils';
import type { INPUT_SLOTS, InputProps } from '../src/input';

type Slots = {
  [K in (typeof INPUT_SLOTS)[number]]?: string | (() => JSX.Element);
};

export const useInputSlots = (props: InputProps, slots: Slots) => {
  const scopedSlots: Slots = {};

  const getSlotContent = (
    slot: string | (() => JSX.Element) | undefined,
    defaultContent: (() => JSX.Element) | undefined = () => <span />
  ) => {
    if (isFunction(slot)) {
      return slot;
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

  return { scopedSlots };
};
