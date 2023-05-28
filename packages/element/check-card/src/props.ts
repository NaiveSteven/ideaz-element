import type { ExtractPropTypes, PropType } from 'vue-demi'

export const cardProps = {
  defaultChecked: {
    type: Boolean,
  },
  checked: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  value: {
    type: [String, Number],
    default: '',
  },
  loading: {
    type: Boolean,
  },
  cover: {
    type: String,
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  extra: {
    type: String,
  },
}

export type CheckCardProps = ExtractPropTypes<typeof cardProps>

export type CheckCardValueType = string | number | boolean

export type CheckGroupValueType =
  | CheckCardValueType[]
  | CheckCardValueType

export const checkCardGroupProps = {
  /** 指定可选项 */
  options: {
    type: Object as PropType<(CheckCardProps | string)[]>,
  },
  disabled: {
    type: Boolean,
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
  },
  multiple: {
    type: Boolean,
  },
  defaultValue: {
    type: Object as PropType<CheckGroupValueType>,
  },
  value: {
    type: Object as PropType<CheckGroupValueType>,
  },
  modelValue: {
    type: Object as PropType<CheckGroupValueType>,
  },
  loading: {
    type: Boolean,
  },
  bordered: {
    type: Boolean,
  },
}

export type CheckCardGroupProps = ExtractPropTypes<typeof checkCardGroupProps>
