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
  tooltip: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
  },
  lines: {
    type: Number,
    // default: 2,
  },
  length: {
    type: Number,
    default: 5,
  },
  fullWidthRecognition: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: '默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默默认文案默',
  },
}

export type TextProps = ExtractPropTypes<typeof textProps>
