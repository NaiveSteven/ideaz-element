import type { IndexOptions, IndexType, Pagination } from './common'
import type { FormColumn } from './form'
import type { Layout } from './layout'
import type { TableCol } from './table'

export interface TableProCol extends TableCol {
  formItemProps?: FormColumn
}

export interface CTableProConfig {
  formLayout?: Layout
  formConfig?: IndexType
  formOptions?: IndexOptions
  tableCols: TableProCol[]
  formModel?: IndexType
  pagination?: Pagination
  loading?: boolean
  data: any
  [propName: string]: any
}
