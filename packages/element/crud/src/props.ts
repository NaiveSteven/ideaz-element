import { omit } from 'lodash-unified'
import type { ExtractPropTypes, VNode } from 'vue'
import type { ComponentSize, ElTable } from 'element-plus'
import { tableProps } from '../../table/src/props'
import { formProps } from '../../form/src/props'
import type { DialogProps } from '../../dialog/src/props'
import type { AddRequestApiParams, CrudCol, DeleteRequestApiParams, DetailRequestApiParams, EditRequestApiParams, TableFormConfig } from '../../types'
import type ZTable from '../../table/src/Table'

const _tableProps = omit(tableProps, 'columns')
// const _formProps = omit(formProps, 'columns')

type FormKeys = Array<keyof typeof formProps>
type TableKeys = Array<keyof typeof tableProps>

export const tableKeys = Object.keys(_tableProps) as TableKeys
export const formKeys = Object.keys(formProps) as FormKeys

export interface CrudDeleteDialogConfirmParams<T = any> {
  done: () => void
  confirmButtonLoading: Ref<boolean>
  selectionData?: T[]
  row?: T
  tableRef: typeof ZTable
  getTableData: () => void
}

export type CrudDeleteDialogTipProps<T = any> = Omit<DialogProps, 'onConfirm'> & {
  onConfirm: ({ done, confirmButtonLoading, selectionData, row, tableRef }: CrudDeleteDialogConfirmParams<T>) => void
}

export interface RequestConfig {
  deleteApi?: (params?: DeleteRequestApiParams) => Promise<any>
  submitApi?: (params?: AddRequestApiParams | EditRequestApiParams) => Promise<any>
  searchApi?: (params?: any) => Promise<any>
  addApi?: (params?: AddRequestApiParams) => Promise<any>
  editApi?: (params?: EditRequestApiParams) => Promise<any>
  detailApi?: (params: DetailRequestApiParams) => Promise<any>
  alias?: {
    list: string | ((res: any) => any)
    total: string | ((res: any) => any)
    detail: string | ((res: any) => any)
  }
  beforeData?: () => Promise<any>
  afterData?: (res: any) => Promise<any>
  searchFunc?: ({ params }: any) => void
  tableData?: (res: any) => any
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

export interface CrudOperation extends TableFormConfig {
  referenceLabel?: string
  referenceDisabled?: boolean | (() => boolean)
  referenceHide?: boolean | (() => boolean)
}

export const crudProps = {
  ..._tableProps,
  // ..._formProps,
  size: {
    type: String as PropType<ComponentSize>,
    default: 'small',
  },
  columns: Array as PropType<CrudCol[]>,
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
    type: [Object, Boolean] as PropType<CrudOperation | boolean>,
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
    type: [Object, Boolean, Function] as PropType<CrudOperation | boolean | (({ row, tableRef }: { row: any, tableRef: typeof ZTable }) => void)>,
    default: true,
  },
  delete: {
    type: [Boolean, Function, Object] as PropType<boolean | (({ row, tableRef, getTableData }: { row: any, tableRef: typeof ZTable, getTableData: (() => void) }) => void) | (CrudDeleteDialogTipProps & CrudOperation)>,
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
  onOperateCancel: {
    type: Function,
  },
  onOperateView: {
    type: Function,
  },
  dataKey: {
    type: String,
    default: 'id',
  },
  alert: {
    type: [Object, Function, Boolean] as PropType<AlertConfig | ((selectionData: any) => VNode | boolean)>,
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
export const COLUMN_TYPE_FIELDS = ['type', 'slot', 'label', 'render', 'prop', '__uid']

export const FILTER_TABLE_KEYS = ['watermark']
