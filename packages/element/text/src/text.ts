import type { ExtractPropTypes } from 'vue-demi'
import type { ComponentSize } from 'element-plus'

export const textProps = {
  value: {
    type: String,
    default: '',
  },
  /**
   * @description text type
   */
  type: {
    type: String,
    values: ['primary', 'success', 'info', 'warning', 'danger', ''],
    default: '',
  },
  /**
   * @description text size
   */
  size: {
    type: String as PropType<ComponentSize>,
    default: '',
  },
  /**
   * @description render ellipsis
   */
  truncated: {
    type: Boolean,
  },
  /**
   * @description custom element tag
   */
  tag: {
    type: String,
    default: 'span',
  },
  tooltip: {
    type: [Boolean, Object],
    default: () => ({}),
  },
  height: {
    type: Number,
  },
  lines: {
    type: Number,
  },
  length: {
    type: Number,
  },
  fullWidthRecognition: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '',
  },
}

export type TextProps = ExtractPropTypes<typeof textProps>
