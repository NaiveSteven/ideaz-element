import type { ExtractPropTypes } from 'vue-demi'
import type { ComponentSize } from 'element-plus'
import type { OptionsItem } from '../../types'

export interface TagSelectOptionsItem extends OptionsItem {
  type?: 'success' | 'info' | 'warning' | 'danger' | ''
  disableTransitions?: boolean
  hit?: boolean
  color?: string
  size?: 'large' | 'default' | 'small' | ''
  effect?: 'dark' | 'light' | 'plain'
  round?: boolean
  closable?: boolean
}

export interface TagSelectGroupOptionsItem {
  field: string
  options?: TagSelectOptionsItem[]
  multiple?: boolean
  all?: boolean
  titleWidth?: string | number
  size?: ComponentSize
  title?: string
}

export const tagSelectGroupProps = {
  options: {
    type: Array as PropType<TagSelectGroupOptionsItem[]>,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Object,
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
}

export const tagSelectProps = {
  ...tagSelectGroupProps,
  title: {
    type: String,
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

export type TagSelectProps = ExtractPropTypes<typeof tagSelectProps>
export type TagSelectGroupProps = ExtractPropTypes<typeof tagSelectGroupProps>
