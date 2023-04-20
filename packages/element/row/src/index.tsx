import { resolveDynamicComponent } from '@ideaz/shared';
import type { CSSProperties } from 'vue-demi';

export const RowJustify = [
  'start',
  'center',
  'end',
  'space-around',
  'space-between',
  'space-evenly',
] as const;

export const RowAlign = ['top', 'middle', 'bottom'] as const;

export default defineComponent({
  name: 'ZRow',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    gutter: {
      type: Number,
      default: 0,
    },
    justify: {
      type: String,
      values: RowJustify,
      default: 'start',
    },
    align: {
      type: String,
      values: RowAlign,
      default: 'top',
    },
  },
  emits: ['input', 'update:modelValue'],
  setup(props, { slots }) {
    const gutter = computed(() => props.gutter);

    provide('rowContextKey', {
      gutter,
    });

    const style = computed(() => {
      const styles: CSSProperties = {};
      if (!props.gutter) {
        return styles;
      }

      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      return styles;
    });

    return () =>
      resolveDynamicComponent({
        name: props.tag,
        attrs: {
          class: 'rowKls',
          style: style.value,
        },
        content: slots.default?.(),
      });
  },
});
