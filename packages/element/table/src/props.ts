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

export interface VirtualScrollConfig {
  enabled?: boolean           // 是否启用虚拟滚动
  itemHeight?: number         // 每行的固定高度，默认48px
  estimatedRowHeight?: number // 动态高度时的预估行高
  buffer?: number            // 缓冲区大小，上下各渲染多少行
  threshold?: number         // 数据量超过多少条时自动启用虚拟滚动
  cache?: number             // 缓存行数，提升性能
  footerHeight?: number      // footer 高度，支持 element-plus table-v2 的 footer 功能
  // Element Plus TableV2 额外属性
  headerClass?: string | Function           // header 部分的自定义 class 名
  headerProps?: object | Function           // header 部分的自定义 props 名
  headerCellProps?: object | Function       // header cell 部分的自定义 props 名
  headerHeight?: number | number[]          // Header 的高度，默认 50
  rowClass?: string | Function              // row wrapper 部分的自定义 class 名
  rowProps?: object | Function              // row component 部分的自定义 class 名
  rowEventHandlers?: object                 // 行事件处理器
  cellProps?: object | Function             // 每个单元格 cell 的自定义 props
  dataGetter?: Function                     // 自定义方法从数据源获取数据
  fixedData?: object                        // 渲染在表格主内容上方和 header 下方区域的数据
  defaultExpandedRowKeys?: (string | number)[] // 默认展开的行的 key 的数组
  fixed?: boolean                           // 单元格宽度是自适应还是固定，默认 false
  indentSize?: number                       // 树形表的水平缩进，默认 12
  hScrollbarSize?: number                   // 水平滚动条大小，默认 6
  vScrollbarSize?: number                   // 垂直滚动条大小，默认 6
  sortBy?: object                           // 排序方式
  sortState?: object                        // 多个排序
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
    default: () => ({ page: 1, pageSize: 0, total: 0, align: 'right' }),
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
