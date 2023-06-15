import type { ExtractPropTypes } from 'vue-demi'
import type { Alias, OptionsItem } from '../../types'

export interface SelectOptionsItem extends OptionsItem {
  options?: OptionsItem[]
  render?: string | ((h: any, { option }: { option: SelectOptionsItem }) => JSX.Element)
}

export const selectProps = {
  value: {
    type: [String, Number, Array],
    default: '',
    required: false,
  },
  modelValue: {
    type: [String, Number, Array],
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

export const SELECT_SLOTS = ['prefix', 'empty']

export type SelectProps = ExtractPropTypes<typeof selectProps>
