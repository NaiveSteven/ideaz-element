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
  deleteApi?: (params?: any) => Promise<any>
  submitApi?: (params?: any) => Promise<any>
  searchApi?: (params?: any) => Promise<any>
  addApi?: (params?: any) => Promise<any>
  editApi?: (params?: any) => Promise<any>
  detailApi?: (params?: any) => Promise<any>
  editDetailApi?: (params?: any) => Promise<any>
  alias?: {
    list: string | ((res: any) => any)
    total: string | ((res: any) => any)
    detail: string | ((res: any) => any)
  }
  searchParams?: (params: any) => any
  detailParams?: ({ rowData }: any) => any
  submitParams?: ({ formData, rowData, type }: any) => any
  deleteParams?: (rowData: any) => any
  addParams?: ({ formData }: any) => any
  editParams?: ({ formData, rowData }: any) => any
  beforeData?: () => Promise<any>
  afterData?: (res: any) => Promise<any>
  searchFunc?: ({ params }: any) => void
  tableData?: (res: any) => any
  transformEditDetail?: (res: any) => any
}

export interface AlertConfig {
  render?: (selectionData: any) => VNode
  title?: string | ((selectionData: any, tableRef: typeof ElTable) => VNode)
  type?: 'success' | 'warning' | 'info' | 'error'
  description?: string | ((selectionData: any, tableRef: typeof ElTable) => VNode)
  closeable?: boolean
  center?: boolean
  closeText?: string
  showIcon?: boolean
  effect?: 'light' | 'dark'
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
    default: true,
  },
  edit: {
    type: [Object, Boolean] as PropType<TableFormConfig | boolean>,
    default: true,
  },
  search: {
    type: [Object, Boolean] as PropType<TableFormConfig | boolean>,
    default: true,
  },
  form: {
    type: [Object, Boolean] as PropType<TableFormConfig | boolean>,
    default: true,
  },
  detail: {
    type: [Object, Boolean] as PropType<TableFormConfig | boolean>,
    default: true,
  },
  delete: {
    type: [Object, Boolean] as PropType<boolean>,
    default: true,
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
    type: [Object, Function, Boolean] as PropType<AlertConfig | ((selectionData: any) => VNode | Boolean)>,
    default: () => ({}),
  },
  action: {
    type: Boolean,
    default: true,
  },
}

export type CrudProps = ExtractPropTypes<typeof crudProps>
export const crudProvideKey = Symbol('crudKey')
export const EXCLUDE_FORM_PROPS_KEYS = ['columns', 'dialog']
