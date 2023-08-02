import { cloneDeep } from 'lodash-es'
import { useExpose } from '@ideaz/hooks'
import { isFunction, isObject } from '@ideaz/utils'
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
  emits: ['refresh', 'radio-change', 'update:data', 'delete', 'save', 'cancel'],
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
      tableAttributes,
      tableData,
      addTableData,
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
      zTableFormRef,
    } = useTableColumns(props, emit, tableData)
    const { scopedSlots, tableSlots } = useTableSlots(formatTableCols, slots)
    const ns = useNamespace('table')
    const size = ref(props.size)

    const renderPagination = () => {
      const { pagination } = props
      return isObject(pagination)
        ? (
          <el-pagination
            class={ns.e('pagination')}
            background
            small
            currentPage={pagination.page}
            total={pagination.total}
            {...paginationAttrs.value}
            onUpdate:current-page={handleCurrentChange}
            onUpdate:page-size={handleSizeChange}
          />
          )
        : null
    }

    const renderToolBar = () => {
      const { topRender, toolBar } = props

      return <div
        class={ns.be('tool-bar', 'container')}
        style={{
          marginBottom: (toolBar || (toolBar && isFunction(topRender)) || isFunction(slots.top)) ? '16px' : 0,
        }}
      >
        <div class={ns.bm('tool-bar', 'left')}>
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
    }

    const renderTable = () => {
      const { loading, editable } = props

      return (
        <el-table
          ref="zTableRef"
          v-loading={loading}
          class={[ns.b(''), editable && ns.b('editable')]}
          key={tableKey.value}
          v-slots={tableSlots}
          {...{ ...tableAttributes.value, data: tableData.value, size: size.value }}
        >
          {formatTableCols.value.map((item, index) => {
            return (
              <TableColumn
                ref={`zTableColumn${index}`}
                column={item}
                size={size.value}
                tableProps={tableAttributes.value}
                onRadio-change={(row: any) => emit('radio-change', row)}
                columnIndex={index}
                columnsLength={formatTableCols.value.length}
                v-slots={scopedSlots}
              />
            )
          })}
        </el-table>
      )
    }

    const renderContent = () => {
      const { editable, maxLength } = props
      const position = isObject(editable) ? (editable.position || 'bottom') : 'bottom'
      if (editable) {
        return (
          <>
            <el-form
              ref={zTableFormRef}
              model={{ tableData: tableData.value }}
            >
              {renderTable()}
            </el-form>
            {position === 'bottom'
              && maxLength !== tableData.value.length
              && <el-button
                icon='i-plus'
                class='w-full mt-2'
                onClick={() => addTableData()}
              >
                新增数据
              </el-button>}
          </>
        )
      }
      return renderTable()
    }

    return () => {
      return (
        <div class={ns.e('container')}>
          {renderToolBar()}
          {renderContent()}
          {renderPagination()}
        </div>
      )
    }
  },
})
