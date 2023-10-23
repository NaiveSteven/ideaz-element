import { isString } from '@ideaz/utils'
import type { ExtractPropTypes, PropType } from 'vue-demi'

export const definePropType = <T>(val: any): PropType<T> => val

export const inputProps = {
  /**
   * @description native input id
   */
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description input box size
   */
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    values: ['large', 'default', 'small'],
    required: false,
  },
  /**
   * @description whether to disable
   */
  disabled: Boolean,
  /**
   * @description binding value for Vue3
   */
  modelValue: {
    type: definePropType<string | number | null | undefined>([
      String,
      Number,
      Object,
    ]),
    default: '',
  },
  /**
   * @description binding value for Vue2
   */
  value: {
    type: definePropType<string | number | null | undefined>([
      String,
      Number,
      Object,
    ]),
    default: '',
  },
  /**
   * @description type of input
   */
  type: {
    type: String,
    default: 'text',
  },
  /**
   * @description control the resizability
   */
  resize: {
    type: String,
    values: ['none', 'both', 'horizontal', 'vertical'],
  },
  /**
   * @description whether textarea has an adaptive height
   */
  autosize: {
    type: [Boolean, Object],
    default: false,
  },
  /**
   * @description native input autocomplete
   */
  autocomplete: {
    type: String,
    default: 'off',
  },
  /**
   * @description format content
   */
  formatter: {
    type: Function,
  },
  /**
   * @description parse content
   */
  parser: {
    type: Function,
  },
  /**
   * @description placeholder
   */
  placeholder: {
    type: String,
  },
  /**
   * @description native input form
   */
  form: {
    type: String,
  },
  /**
   * @description native input readonly
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * @description native input readonly
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description toggleable password input
   */
  showPassword: {
    type: Boolean,
    default: false,
  },
  /**
   * @description word count
   */
  showWordLimit: {
    type: Boolean,
    default: false,
  },
  /**
   * @description suffix icon
   */
  suffixIcon: {
    type: [String, Function, Object],
  },
  /**
   * @description prefix icon
   */
  prefixIcon: {
    type: [String, Function, Object],
  },
  /**
   * @description input prepend content
   */
  prepend: {
    type: [String, Function] as PropType<string | (() => VNode)>,
  },
  /**
   * @description input append content
   */
  append: {
    type: [String, Function] as PropType<string | (() => VNode)>,
  },
  /**
   * @description input prepend content
   */
  prefix: {
    type: [String, Function] as PropType<string | (() => VNode)>,
  },
  /**
   * @description input append content
   */
  suffix: {
    type: [String, Function] as PropType<string | (() => VNode)>,
  },
  /**
   * @description container role, internal properties provided for use by the picker component
   */
  containerRole: {
    type: String,
    default: undefined,
  },
  /**
   * @description native input aria-label
   */
  label: {
    type: String,
    default: undefined,
  },
  /**
   * @description input tabindex
   */
  tabindex: {
    type: [String, Number],
    // default: '0',
  },
  /**
   * @description whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description input or texearea element style
   */
  inputStyle: {
    type: definePropType<CSSStyleDeclaration>([Object, Array, String]),
    default: () => ({} as const),
  },
}
export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  'update:modelValue': (value: string) => isString(value),
  'input': (value: string) => isString(value),
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
