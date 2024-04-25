import { isString } from '@ideaz/utils'
import { inputProps } from 'element-plus'
import type { ExtractPropTypes, PropType } from 'vue-demi'

export const definePropType = <T>(val: any): PropType<T> => val

export const zInputProps = {
  ...inputProps,
  prepend: {
    type: [String, Function] as PropType<string | (() => VNode)>,
  },
  append: {
    type: [String, Function] as PropType<string | (() => VNode)>,
  },
  prefix: {
    type: [String, Function] as PropType<string | (() => VNode)>,
  },
  suffix: {
    type: [String, Function] as PropType<string | (() => VNode)>,
  },
}
export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  'update:modelValue': (value: string) => isString(value),
  // 'input': (value: string) => isString(value),
}

export const INPUT_SLOTS = ['prepend', 'append', 'prefix', 'suffix']

const totalInputEmits = {
  ...inputEmits,
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
}

export type InputEmits = typeof totalInputEmits

export const FILTER_INPUT_PROPS = ['prepend', 'append', 'prefix', 'suffix']
