import { radioGroupProps } from 'element-plus'
import type { ExtractPropTypes } from 'vue-demi'
import type { Alias, RadioOptionsItem } from '../../types'

export type RadioType = 'radio' | 'radio-button'

export const radioProps = {
  ...radioGroupProps,
  value: {
    type: [String, Number],
    default: '',
    required: false,
  },
  modelValue: {
    type: [String, Number],
    default: '',
    required: false,
  },
  options: {
    type: Array as PropType<RadioOptionsItem[]>,
    default: () => [],
  },
  type: {
    type: String,
    default: '',
  },
  alias: {
    type: Object as PropType<Alias>,
  },
  border: {
    type: Boolean,
  },
  isCancel: {
    type: Boolean,
  },
}

export type RadioProps = ExtractPropTypes<typeof radioProps>

export const FILTER_RADIO_PROPS = ['border', 'options']
