import type { ExtractPropTypes, VNode } from 'vue'
import type { Alias, OptionsItem } from '../../types'

export interface SelectOptionsItem extends OptionsItem {
  options?: OptionsItem[]
  render?: string | (({ option }: { option: SelectOptionsItem }) => VNode)
}

export const selectProps = {
  value: {
    type: [String, Number, Array, Boolean],
    default: '',
    required: false,
  },
  modelValue: {
    type: [String, Number, Array, Boolean],
    default: '',
    required: false,
  },
  options: {
    type: Array as PropType<SelectOptionsItem[]>,
    default: () => [],
  },
  alias: {
    type: Object as PropType<Alias>,
  },
  prefix: {
    type: [String, Function],
  },
  empty: {
    type: [String, Function],
  },
  all: {
    type: Boolean,
  },
  multiple: {
    type: Boolean,
  },
}

export const SELECT_SLOTS = ['prefix', 'empty', 'header', 'footer', 'tag', 'loading', 'label']

export type SelectProps = ExtractPropTypes<typeof selectProps>
