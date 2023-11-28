import { omit } from 'lodash-unified'
import type { ExtractPropTypes, VNode } from 'vue'
import type { ComponentSize, ElTable } from 'element-plus'
import { tableProps } from '../../table/src/props'
import { formProps } from '../../form/src/props'
import type { TableFormConfig } from '~/types'

const _tableProps = omit(tableProps, 'columns')
const _formProps = omit(formProps, 'columns')

type FormKeys = Array<keyof typeof formProps>
type TableKeys = Array<keyof typeof tableProps>

export const tableKeys = Object.keys(_tableProps) as TableKeys
export const formKeys = Object.keys(formProps) as FormKeys

export interface RequestConfig {
  deleteApi?: any
  submitApi?: any
  searchApi?: any
  addApi?: any
  editApi?: any
  alias?: {
    list: string | ((res: any) => any)
    total: string | ((res: any) => any)
    detail: string | ((res: any) => any)
  }
  params?: any
  viewApi?: any
  beforeData?: any
  afterData?: any
  func?: any
  data?: any
}

export interface AlertConfig {
  render?: (selectionData: any) => VNode
  title?: string | ((selectionData: any, tableRef: typeof ElTable) => VNode)
  type?: 'success' | 'warning' | 'info' | 'error'
  description?: string
  closeable?: boolean
  center?: boolean
  closeText?: string
  showIcon?: boolean
  effect?: 'light' | 'dark'
  content: string | ((selectionData: any, tableRef: typeof ElTable) => VNode)
}

export const crudProps = {
  ..._tableProps,
  // ..._formProps,
  size: {
    type: String as PropType<ComponentSize>,
    default: 'small',
  },
  columns: Array as PropType<any>,
  formData: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  selectionData: {
    type: Array as PropType<any>,
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
    type: Object as PropType<RequestConfig>,
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
  drawer: {
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
  dataKey: {
    type: String,
    default: 'id',
  },
  alert: {
    type: Object as PropType<AlertConfig>,
    default: () => ({}),
  },
}

export type CrudProps = ExtractPropTypes<typeof crudProps>
export const crudProvideKey = Symbol('crudKey')
