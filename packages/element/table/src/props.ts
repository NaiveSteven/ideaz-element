import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize, ElForm, TableColumnCtx } from 'element-plus'
import type {
  DefaultRow,
  TableProps,
} from 'element-plus/es/components/table/src/table/defaults'
import type { WatermarkProps } from '../../watermark/src/watermark'
import type { Pagination, TableCol, ToolBar } from '../../types'

export interface TableEdit {
  type?: 'multiple' | 'single'
  position?: 'bottom' | 'top'
  maxLength?: number
  deleteConfirm?: boolean
  onEdit?: ({ row, index, column, formRef }: { row: any, index: number, column: TableColumnCtx<any>, formRef: typeof ElForm }) => void
  onSave?: ({ row, index, column, formRef }: { row: any, index: number, column: TableColumnCtx<any>, formRef: typeof ElForm }) => void
  onDelete?: ({ row, index, column, formRef }: { row: any, index: number, column: TableColumnCtx<any>, formRef: typeof ElForm }) => void
  onCancel?: ({ row, index, column, formRef }: { row: any, index: number, column: TableColumnCtx<any>, formRef: typeof ElForm }) => void
}

export const tableProps = {
  data: {
    type: Array as PropType<DefaultRow[]>,
    default: () => [],
  },
  height: [String, Number],
  maxHeight: [String, Number],
  fit: {
    type: Boolean,
    default: true,
  },
  stripe: Boolean,
  border: Boolean,
  rowKey: [String, Function] as PropType<TableProps<DefaultRow>['rowKey']>,
  showHeader: {
    type: Boolean,
    default: true,
  },
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function as PropType<TableProps<DefaultRow>['summaryMethod']>,
  rowClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['rowClassName']
  >,
  rowStyle: [Object, Function] as PropType<TableProps<DefaultRow>['rowStyle']>,
  cellClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['cellClassName']
  >,
  cellStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['cellStyle']
  >,
  headerRowClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['headerRowClassName']
  >,
  headerRowStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['headerRowStyle']
  >,
  headerCellClassName: [String, Function] as PropType<
    TableProps<DefaultRow>['headerCellClassName']
  >,
  headerCellStyle: [Object, Function] as PropType<
    TableProps<DefaultRow>['headerCellStyle']
  >,
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  emptyText: String,
  expandRowKeys: Array as PropType<TableProps<DefaultRow>['expandRowKeys']>,
  defaultExpandAll: Boolean,
  defaultSort: Object as PropType<TableProps<DefaultRow>['defaultSort']>,
  tooltipEffect: String,
  spanMethod: Function as PropType<TableProps<DefaultRow>['spanMethod']>,
  selectOnIndeterminate: {
    type: Boolean,
    default: true,
  },
  indent: {
    type: Number,
    default: 16,
  },
  treeProps: {
    type: Object as PropType<TableProps<DefaultRow>['treeProps']>,
    default: () => {
      return {
        hasChildren: 'hasChildren',
        children: 'children',
      }
    },
  },
  lazy: Boolean,
  load: Function as PropType<TableProps<DefaultRow>['load']>,
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  className: {
    type: String,
    default: '',
  },
  tableLayout: {
    type: String as PropType<'fixed' | 'auto'>,
    default: 'fixed',
  },
  scrollbarAlwaysOn: Boolean,
  flexible: Boolean,
  showOverflowTooltip: Boolean,
  align: String as PropType<'left' | 'center' | 'right'>,
  headerAlign: String as PropType<'left' | 'center' | 'right'>,
  size: String as PropType<ComponentSize>,
  loading: Boolean,
  columns: {
    type: Array as PropType<TableCol[]>,
    default: () => [],
  },
  pagination: {
    type: [Object, Boolean] as PropType<Pagination | boolean>,
    default: () => ({ page: 1, pageSize: 0, total: 0 }),
  },
  toolBar: {
    type: [Boolean, Object] as PropType<ToolBar | boolean>,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  editable: {
    type: [Object, Boolean] as PropType<TableEdit | boolean>,
  },
  options: {
    type: Object,
    default: () => {},
  },
  watermark: {
    type: [String, Object, Boolean] as PropType<boolean | string | WatermarkProps>,
    default: false,
  },
  fullScreenElement: {
    type: [Function, HTMLElement] as PropType<() => HTMLElement | HTMLElement>,
  },
  totalData: {
    type: Array,
    default: () => [],
  },
}

export const tableColumnProps = {
  column: {
    type: Object as PropType<TableCol>,
    default: () => ({}),
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default',
  },
  tableProps: {
    type: Object as PropType<ITableProps>,
    default: () => ({}),
  },
  columnIndex: {
    type: Number,
  },
  columnsLength: {
    type: Number,
    default: 0,
  },
}

export const radioColumnProps = {
  column: {
    type: Object as PropType<TableCol>,
    default: () => ({}),
  },
  tableProps: {
    type: Object as PropType<ITableProps>,
    default: () => ({}),
  },
}

export const toolBarProps = {
  formatTableCols: {
    type: Array as PropType<TableCol[]>,
    default: () => [],
  },
  sortTableCols: {
    type: Array as PropType<TableCol[]>,
    default: () => [],
  },
  middleTableCols: {
    type: Array as PropType<TableCol[]>,
    default: () => [],
  },
  originFormatTableCols: {
    type: Array as PropType<TableCol[]>,
    default: () => [],
  },
  size: {
    type: String,
    default: 'default',
  },
  toolBar: {
    type: [Boolean, Object],
    default: undefined,
  },
  tableProps: {
    type: Object as PropType<ITableProps>,
  },
}

export type ITableProps = ExtractPropTypes<typeof tableProps>
export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>
export type ToolBarProps = ExtractPropTypes<typeof toolBarProps>
export const tableProvideKey = Symbol('tableKey')
