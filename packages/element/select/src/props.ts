import type { OptionsItem } from '../../types'

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
    type: Object,
  },
  prefix: {
    type: [String, Function],
  },
  empty: {
    type: [String, Function],
  },
}

export const SELECT_SLOTS = ['prefix', 'empty']
