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
    type: [String, Function],
  },
  title: {
    type: [String, Function],
  },
  description: {
    type: [String, Function],
  },
  value: {
    type: [String, Number],
    default: '',
  },
  loading: {
    type: Boolean,
  },
  cover: {
    type: [String, Function] as PropType<string | ((h: (type: string, children?: any) => VNode) => VNode)>,
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  extra: {
    type: [String, Function],
  },
  style: {
    type: Object,
  },
}

export type CheckCardProps = ExtractPropTypes<typeof cardProps>

export type CheckCardValueType = string | number | boolean

export type CheckGroupValueType =
  | CheckCardValueType[]
  | CheckCardValueType

export const checkCardGroupProps = {
  options: {
    type: Array as PropType<(CheckCardProps | string)[]>,
    default: () => [],
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
  value: {
    type: [String, Number, Array] as PropType<CheckGroupValueType>,
  },
  modelValue: {
    type: [String, Number, Array] as PropType<CheckGroupValueType>,
  },
  loading: {
    type: Boolean,
  },
  bordered: {
    type: Boolean,
  },
}

export type CheckCardGroupProps = ExtractPropTypes<typeof checkCardGroupProps>
