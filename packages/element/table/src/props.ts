import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue'
import type { ComponentSize, watermarkProps } from 'element-plus'
import type {
  DefaultRow,
  TableProps,
} from 'element-plus/es/components/table/src/table/defaults'
import type { EditableTableEventParams, Pagination, TableCol, ToolBar } from '../../types'

export interface TableEdit {
  type?: 'multiple' | 'single'
  position?: 'bottom' | 'top'
  maxLength?: number
  deleteConfirm?: boolean
  onEdit?: ({ row, $index, column, formRef }: EditableTableEventParams) => void
  onSave?: ({ row, $index, column, formRef }: EditableTableEventParams) => void
  onDelete?: ({ row, $index, column, formRef }: EditableTableEventParams) => void
  onCancel?: ({ row, $index, column, formRef }: EditableTableEventParams) => void
}

export interface TableSticky {
  top?: string
  parent?: string
  zIndex?: number
  style?: CSSProperties
}

// 虚拟表格属性定义（传给Element Plus TableV2）
export const virtualTableProps = {
  itemHeight: {
    type: Number,
    default: 48,
  },
  estimatedRowHeight: {
    type: Number,
    default: 48,
  },
  // Element Plus TableV2 属性
  footerHeight: {
    type: Number,
    default: 0,
  },
  headerClass: {
    type: [String, Function] as PropType<string | Function>,
    default: '',
  },
  headerProps: {
    type: [Object, Function] as PropType<object | Function>,
    default: () => ({}),
  },
  headerCellProps: {
    type: [Object, Function] as PropType<object | Function>,
    default: () => ({}),
  },
  headerHeight: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 50,
  },
  rowClass: {
    type: [String, Function] as PropType<string | Function>,
    default: '',
  },
  rowProps: {
    type: [Object, Function] as PropType<object | Function>,
    default: () => ({}),
  },
  rowEventHandlers: {
    type: Object,
    default: () => ({}),
  },
  cellProps: {
    type: [Object, Function] as PropType<object | Function>,
    default: () => ({}),
  },
  dataGetter: {
    type: Function,
  },
  fixedData: {
    type: Object,
    default: () => ({}),
  },
  defaultExpandedRowKeys: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  fixed: {
    type: Boolean,
    default: false,
  },
  indentSize: {
    type: Number,
    default: 12,
  },
  hScrollbarSize: {
    type: Number,
    default: 6,
  },
  vScrollbarSize: {
    type: Number,
    default: 6,
  },
  sortBy: {
    type: Object,
    default: () => ({}),
  },
  sortState: {
    type: Object,
  },
}

// 通用属性定义（两者都支持）
export const commonTableProps = {
  height: [String, Number],
  width: [String, Number],
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({}),
  },
  className: {
    type: String,
    default: '',
  },
  size: String as PropType<ComponentSize>,
  data: {
    type: Array as PropType<DefaultRow[]>,
    default: () => [],
  },
  rowKey: [String, Function] as PropType<TableProps<DefaultRow>['rowKey']>,
  showHeader: {
    type: Boolean,
    default: true,
  },
  emptyText: String,
  loading: Boolean,
  scrollbarAlwaysOn: Boolean,
}

// 组件级属性定义
export const componentLevelProps = {
  pagination: {
    type: [Object, Boolean] as PropType<Pagination | boolean>,
    default: () => ({ page: 1, pageSize: 0, total: 0, align: 'right' }),
  },
  columns: {
    type: Array as PropType<TableCol[]>,
    default: () => [],
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  toolBar: {
    type: [Boolean, Object] as PropType<ToolBar | boolean>,
    default: true,
  },
  editable: {
    type: [Object, Boolean] as PropType<TableEdit | boolean>,
  },
  watermark: {
    type: [String, Object, Boolean] as PropType<boolean | string | ElWatermarkProps>,
    default: false,
  },
  fullScreenElement: {
    type: [Function, HTMLElement] as PropType<() => HTMLElement | HTMLElement>,
  },
  totalData: {
    type: Array,
    default: () => [],
  },
  title: {
    type: [String, Function] as PropType<string | (() => VNode)>,
    default: '',
  },
  sticky: {
    type: [Boolean, Object] as PropType<boolean | TableSticky>,
    default: false,
  },
  mergeCells: {
    type: Object as PropType<{
      direction: 'row' | 'column' | 'both'  // 合并方向：行、列、或两者都合并
      props?: string[]  // 需要合并的字段，不传则所有列都参与合并
    }>,
  },
  virtual: {
    type: [Boolean, Object] as PropType<boolean | VirtualScrollConfig>,
    default: false,
  },
  options: {
    type: Object,
    default: () => {},
  },
}

// 类型定义
export type VirtualTableProps = ExtractPropTypes<typeof virtualTableProps>
export type CommonTableProps = ExtractPropTypes<typeof commonTableProps>
export type ComponentLevelProps = ExtractPropTypes<typeof componentLevelProps>

export interface VirtualScrollConfig extends Partial<VirtualTableProps> {
  // 内部控制属性
  enabled?: boolean
  threshold?: number
}



export const tableProps = {
  ...commonTableProps,
  ...componentLevelProps,
  maxHeight: [String, Number],
  fit: {
    type: Boolean,
    default: true,
  },
  stripe: Boolean,
  border: Boolean,
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
  expandRowKeys: Array as PropType<TableProps<DefaultRow>['expandRowKeys']>,
  expandedRowKeys: Array as PropType<(string | number)[]>,
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
  tableLayout: {
    type: String as PropType<'fixed' | 'auto'>,
    default: 'fixed',
  },
  flexible: Boolean,
  showOverflowTooltip: Boolean,
  align: String as PropType<'left' | 'center' | 'right'>,
  headerAlign: String as PropType<'left' | 'center' | 'right'>,
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

export type ElWatermarkProps = ExtractPropTypes<typeof watermarkProps>
export type ITableProps = ExtractPropTypes<typeof tableProps>
export type TableColumnProps = ExtractPropTypes<typeof tableColumnProps>
export type ToolBarProps = ExtractPropTypes<typeof toolBarProps>
export const tableProvideKey = Symbol('tableKey')
