import type { ExtractPropTypes } from 'vue-demi'
import type { ComponentSize } from 'element-plus'
import type { Alias, OptionsItem } from '../../types'

export interface TagSelectOptionsItem extends OptionsItem {
  type?: 'success' | 'info' | 'warning' | 'danger' | ''
  disableTransitions?: boolean
  hit?: boolean
  color?: string
  size?: 'large' | 'default' | 'small' | ''
  effect?: 'dark' | 'light' | 'plain'
  round?: boolean
  closable?: boolean
  onClick?: (option: TagSelectOptionsItem) => void
  onClose?: (option: TagSelectOptionsItem) => void
}

export interface TagSelectGroupOptionsItem {
  field: string
  children?: TagSelectOptionsItem[]
  multiple?: boolean
  all?: boolean
  titleWidth?: string | number
  size?: ComponentSize
  title?: string | (() => VNode)
  alias?: Alias
}

export const tagSelectProps = {
  options: {
    type: Array as PropType<TagSelectGroupOptionsItem[] | TagSelectOptionsItem[]>,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [Object, String, Number, Array],
    default: () => ({}),
  },
  all: {
    type: Boolean,
    default: true,
  },
  titleWidth: {
    type: [String, Number],
  },
  size: {
    type: String as PropType<ComponentSize>,
  },
  alias: {
    type: Object as PropType<Alias>,
  },
}

export const tagSelectItemProps = {
  ...tagSelectProps,
  title: {
    type: [String, Function] as PropType<string | (() => VNode)>,
    default: '',
  },
  options: {
    type: Array as PropType<TagSelectOptionsItem[]>,
    default: () => [],
  },
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | number[] | string[]>,
    default: '',
  },
}

export type TagSelectItemProps = ExtractPropTypes<typeof tagSelectItemProps>
export type TagSelectProps = ExtractPropTypes<typeof tagSelectProps>
