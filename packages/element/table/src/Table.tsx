import { cloneDeep } from 'lodash-es'
import { useExpose } from '@ideaz/hooks'
import { isFunction } from '@ideaz/utils'
import {
  usePagination,
  useTableColumns,
  useTableMethods,
  useTableSlots,
} from '../hooks'
import TableColumn from './TableColumn'
import ToolBar from './ToolBar'
import { tableProps } from './props'

export default defineComponent({
  name: 'ZTable',
  components: { TableColumn, ToolBar },
  inheritAttrs: false,
  props: tableProps,
  emits: ['refresh', 'radio-change'],
  setup(props, { emit, slots }) {
    const {
      setCurrentRow,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      toggleRadioSelection,
      sort,
    } = useTableMethods()

    useExpose({
      setCurrentRow,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      toggleRadioSelection,
      sort,
    })
    const {
      paginationAttrs,
      attrsAll,
      tableData,
      handleCurrentChange,
      handleSizeChange,
      handleRefresh,
    } = usePagination(props, emit)
    const {
      formatTableCols,
      middleTableCols,
      sortTableCols,
      originFormatTableCols,
      tableKey,
    } = useTableColumns(props)
    const { scopedSlots, tableSlots } = useTableSlots(formatTableCols, slots)
    const size = ref(props.size)

    return () => {
      const { pagination, isPagination, loading, topRender, toolBar } = props

      return (
        <div class="c-table-plus__container">
          <div class="tool-bar__container"
            style={{
              marginBottom: (toolBar || (toolBar && isFunction(topRender)) || isFunction(slots.top)) ? '16px' : 0,
            }}
          >
            <div class="tool-bar__left">
              {topRender ? topRender() : null}
              {slots.top ? slots.top() : null}
            </div>
            {toolBar && (
              <ToolBar
                formatTableCols={formatTableCols.value}
                middleTableCols={middleTableCols.value}
                originFormatTableCols={originFormatTableCols.value}
                sortTableCols={sortTableCols.value}
                size={size.value}
                toolBar={props.toolBar}
                onColumns-change={(data) => {
                  middleTableCols.value = cloneDeep(data)
                  tableKey.value = new Date().valueOf()
                }}
                onSize-change={(val) => {
                  size.value = val
                }}
                onTable-cols-change={(val) => {
                  sortTableCols.value = cloneDeep(val)
                  tableKey.value = new Date().valueOf()
                }}
                onRefresh={() => handleRefresh()}
              />
            )}
          </div>
          <el-table
            ref="cTableRefs"
            v-loading={loading}
            class="c-table-plus"
            key={tableKey.value}
            v-slots={tableSlots}
            {...{ ...attrsAll.value, data: tableData.value, size: size.value }}
          >
            {slots.append && slots.append()}
            {formatTableCols.value.map((item, index) => {
              return (
                <TableColumn
                  ref={`cTableColumn${index}`}
                  tableCol={item}
                  size={size.value}
                  tableAttrs={attrsAll.value}
                  onRadio-change={(row: any) => emit('radio-change', row)}
                  v-slots={scopedSlots}
                />
              )
            })}
          </el-table>
          {(isPagination || pagination.pageSize)
            ? (
              <el-pagination
                class="c-table-plus__pagination"
                background
                small
                currentPage={pagination.page}
                total={pagination.total}
                {...paginationAttrs.value}
                onUpdate:current-page={handleCurrentChange}
                onUpdate:page-size={handleSizeChange}
              />
              )
            : null}
        </div>
      )
    }
  },
})
