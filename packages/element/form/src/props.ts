import type { ExtractPropTypes } from 'vue-demi'
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
  modelValue: {
    type: Object,
    default: () => ({}),
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
    type: String as PropType<'normal' | 'group' | 'array' | 'collapse'>,
    default: 'normal',
  },
  contentPosition: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'center',
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
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FilterFormProps = ExtractPropTypes<typeof filterFormProps>
export const formProvideKey = Symbol('formKey')
export const formItemProvideKey = Symbol('formItemKey')
