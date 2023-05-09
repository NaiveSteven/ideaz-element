import type { ExtractPropTypes } from 'vue-demi'

export const textProps = {
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
  // size: {
  //   type: String,
  //   values: componentSizes,
  //   default: '',
  // },
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
}

export type TextProps = ExtractPropTypes<typeof textProps>
