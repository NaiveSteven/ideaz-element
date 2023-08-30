import { omit } from 'lodash-unified'
import type { ExtractPropTypes } from 'vue'
import { tableProps } from '../../table/src/props'
import { formProps } from '../../form/src/props'
import type { TableFormConfig } from '~/types'

const _tableProps = omit(tableProps, 'columns')
const _formProps = omit(formProps, 'columns')

type FormKeys = Array<keyof typeof formProps>
type TableKeys = Array<keyof typeof tableProps>

export const tableKeys = Object.keys(_tableProps) as TableKeys
export const formKeys = Object.keys(formProps) as FormKeys

export const crudProps = {
  ..._tableProps,
  ..._formProps,
  columns: Array as PropType<any>,
  formData: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  tableDecorator: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  formDecorator: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  name: {
    type: String,
    default: '',
  },
  paginationStorage: {
    type: Boolean,
    default: undefined,
  },
  formStorage: {
    type: Boolean,
    default: undefined,
  },
  request: {
    type: Object as PropType<any>,
  },
  export: {
    type: [Function, String],
  },
  add: {
    type: [Object, Boolean] as PropType<TableFormConfig | boolean>,
    default: false,
  },
  edit: {
    type: [Object, Boolean] as PropType<TableFormConfig | boolean>,
    default: false,
  },
  search: {
    type: [Object, Boolean] as PropType<TableFormConfig | boolean>,
    default: false,
  },
  form: {
    type: [Object, Boolean] as PropType<TableFormConfig | boolean>,
    default: false,
  },
  detail: {
    type: [Object, Boolean] as PropType<TableFormConfig | boolean>,
    default: false,
  },
  dialog: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  addFormData: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  editFormData: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  onCancel: {
    type: Function,
  },
}

export interface TableDataReq {
  alias: {
    list: string | ((res: any) => any)
    total: string | ((res: any) => any)
  }
}

export type CrudProps = ExtractPropTypes<typeof crudProps>
