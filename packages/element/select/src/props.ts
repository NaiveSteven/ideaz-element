import type { ExtractPropTypes } from 'vue-demi'
import type { Alias, OptionsItem } from '../../types'

export interface SelectOptionsItem extends OptionsItem {
  options?: OptionsItem[]
  render?: string | ((h: any, { option }: { option: SelectOptionsItem }) => JSX.Element)
}

export const selectProps = {
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

export const SELECT_SLOTS = ['prefix', 'empty', 'tag', 'loading', 'header', 'footer']

export type SelectProps = ExtractPropTypes<typeof selectProps>
