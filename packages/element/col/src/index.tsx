import { definePropType } from '@ideaz/utils';
import { resolveDynamicComponent } from '@ideaz/shared';
import type { CSSProperties } from 'vue-demi';

export interface ColSizeObject {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
}
export type ColSize = number | ColSizeObject;

export default defineComponent({
  name: 'ZCol',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
    pull: {
      type: Number,
      default: 0,
    },
    push: {
      type: Number,
      default: 0,
    },
    xs: {
      type: definePropType<ColSize>([Number, Object]),
      default: () => mutable({} as const),
    },
    sm: {
      type: definePropType<ColSize>([Number, Object]),
      default: () => mutable({} as const),
    },
    md: {
      type: definePropType<ColSize>([Number, Object]),
      default: () => ({} as const),
    },
    lg: {
      type: definePropType<ColSize>([Number, Object]),
      default: () => ({} as const),
    },
    xl: {
      type: definePropType<ColSize>([Number, Object]),
      default: () => ({} as const),
    },
  },
  emits: ['input', 'update:modelValue'],
  setup(props, { slots }) {
    const { gutter } = inject('rowContextKey', { gutter: computed(() => 0) });

    const style = computed(() => {
      const styles: CSSProperties = {};
      if (gutter.value) {
        styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
      }
      return styles;
    });

    return () =>
      resolveDynamicComponent({
        name: props.tag,
        attrs: {
          class: 'colKls',
          style: style.value,
        },
        content: slots.default?.(),
      });
  },
});
