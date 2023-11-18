import type { ExtractPropTypes, PropType } from 'vue-demi'
import { formProps as elFormProps } from 'element-plus'
import type { FormColumn } from '~/types'

export const RowJustify = [
  'start',
  'center',
  'end',
  'space-around',
  'space-between',
  'space-evenly',
] as const

export const RowAlign = ['top', 'middle', 'bottom'] as const

export const formProps = {
  ...elFormProps,
  rules: elFormProps.rules,
  modelValue: {
    type: [Object, Array] as PropType<any>,
    default: () => ({}),
  },
  activeCollapse: {
    type: [Array, String] as PropType<string[] | string>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<FormColumn[]>,
    default: () => [],
  },
  options: {
    type: Object,
    default: () => {},
  },
  colon: {
    type: Boolean,
    default: false,
  },
  gutter: {
    type: Number,
    default: 0,
  },
  justify: {
    type: String,
    values: RowJustify,
    default: 'start',
  },
  align: {
    type: String,
    values: RowAlign,
    default: 'top',
  },
  column: {
    type: Number,
  },
  type: {
    type: String as PropType<'normal' | 'group' | 'array' | 'collapse' | 'step'>,
    default: 'normal',
  },
  contentPosition: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'center',
  },
  borderStyle: {
    type: String as PropType<'none' | 'solid' | 'hidden' | 'dashed' | ''>,
    default: 'solid',
  },
  accordion: {
    type: Boolean,
    default: false,
  },
  processStatus: {
    type: String as PropType<'wait' | 'process' | 'finish' | 'error' | 'success'>,
    default: 'process',
  },
  finishStatus: {
    type: String as PropType<'wait' | 'process' | 'finish' | 'error' | 'success'>,
    default: 'success',
  },
  simple: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
  },
  activeStep: {
    type: Number,
    default: 0,
  },
  footer: {
    type: [Boolean, Function] as PropType<boolean | (() => VNode)>,
  },
}

export const formItemProps = {
  formConfig: {
    type: Object,
    default: () => ({}),
  },
  modelValue: {
    type: Object,
    default: () => ({ }),
  },
  options: {
    type: Object,
    default: () => ({ }),
  },
  col: {
    type: Object as PropType<FormColumn>,
    default: () => ({ }),
  },
}

export const filterFormProps = {
  ...formProps,
  collapsed: {
    type: Boolean,
    default: true,
  },
  searchButtonLoading: {
    type: Boolean,
    default: false,
  },
  searchButtonLabel: {
    type: String,
  },
  resetButtonLabel: {
    type: String,
  },
  resetButtonLoading: {
    type: Boolean,
    default: false,
  },
  searchButtonProps: {
    type: Object,
    default: () => ({}),
  },
  resetButtonProps: {
    type: Object,
    default: () => ({}),
  },
  renderOperation: {
    type: Function as PropType<() => VNode>,
  },
}

export type ToggleButtonType = 'up' | 'expand'
export type FormProps = ExtractPropTypes<typeof formProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FilterFormProps = ExtractPropTypes<typeof filterFormProps>
export const formProvideKey = Symbol('formKey')
export const formItemProvideKey = Symbol('formItemKey')
export const FORM_ITEM_FILTER_KEYS = ['children', 'max', 'field', 'fieldProps']
export const FORM_FILTER_KEYS = [
  'gutter', 'justify', 'align', 'options', 'modelValue', 'columns',
  'children', 'colon', 'activeCollapse', 'type', 'contentPosition',
  'borderStyle', 'accordion', 'processStatus', 'finishStatus',
  'simple', 'max', 'collapsed', 'searchButtonLoading', 'searchButtonLabel', 'resetButtonLabel',
  'resetButtonLoading', 'searchButtonProps', 'resetButtonProps', 'renderOperation', 'footer', 'activeStep',
]
