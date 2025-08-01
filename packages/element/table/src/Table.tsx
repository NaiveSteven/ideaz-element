import { cloneDeep } from 'lodash-es'
import { Plus } from '@element-plus/icons-vue'
import { isFunction, isObject, isString } from '@ideaz/utils'
import { useTableConfig } from '@ideaz/hooks'
import { ElAutoResizer, ElButton, ElForm, ElPagination, ElTable, ElTableV2, ElWatermark } from 'element-plus'
import { getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { draggable, sticky } from '../../../directives'
import {
  useDraggable,
  useEditableScroll,
  useMergeCells,
  usePagination,
  useTableColumns,
  useTableMethods,
  useTableSlots,
  useVirtualTable,
  useVirtualTableColumns,
} from './hooks'
import TableColumn from './TableColumn'
import ToolBar from './ToolBar'
import { tableProps, tableProvideKey } from './props'

export default defineComponent({
  name: 'ZTable',
  components: { TableColumn, ToolBar },
  directives: { draggable, sticky },
  inheritAttrs: false,
  props: tableProps,
  emits: ['refresh', 'radio-change', 'update:data', 'update:pagination', 'drag-sort-end', 'drag-column-end', 'sort-change', 'selection-change', 'expand-change', 'update:expandedRowKeys', 'row-expand', 'expanded-rows-change'],
  setup(props, { emit, slots, expose }) {
    const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance

    // 合并全局配置和用户传入的 props
    const mergedProps = useTableConfig(props)

    const {
      pagination,
      paginationAttrs,
      tableAttributes,
      tableData,
      addTableData,
      handleCurrentChange,
      handleSizeChange,
      handleRefresh,
    } = usePagination(mergedProps, emit)
    const {
      formatTableCols,
      middleTableCols,
      sortTableCols,
      originFormatTableCols,
      tableKey,
      zTableFormRef,
    } = useTableColumns(mergedProps, emit, tableData)
    const { scopedSlots, tableSlots } = useTableSlots(formatTableCols, slots)
    const { draggableOptions, dragging } = useDraggable(emit, tableData, middleTableCols)
    const { spanMethod } = useMergeCells(mergedProps)

    // 虚拟表格配置
    const { isVirtualEnabled, virtualTableAttributes } = useVirtualTable(mergedProps)

    // 虚拟表格列配置和选择功能
    const {
      virtualColumns,
      hasExpandColumn,
      expandColumnKey,
      clearSelection: virtualClearSelection,
      toggleRowSelection: virtualToggleRowSelection,
      toggleAllSelection: virtualToggleAllSelection,
      toggleRowExpansion: virtualToggleRowExpansion,
    } = useVirtualTableColumns(formatTableCols, tableData, slots, emit, mergedProps)

    // 暴露的方法
    const virtualTableRef = ref()

    // 虚拟表格编辑模式滚动功能
    const { enhancedAddTableData } = useEditableScroll(addTableData, {
      isVirtualEnabled,
      virtualTableRef,
      tableData,
    })

    // 表格方法管理
    const tableMethods = useTableMethods({
      isVirtualEnabled,
      virtualTableRef,
      virtualMethods: {
        clearSelection: virtualClearSelection,
        toggleRowSelection: virtualToggleRowSelection,
        toggleAllSelection: virtualToggleAllSelection,
        toggleRowExpansion: virtualToggleRowExpansion,
      }
    })

    // 暴露所有表格方法
    expose(tableMethods)

    const ns = useNamespace('table')
    const { t } = useLocale()
    const size = ref(mergedProps.value.size)

    provide(tableProvideKey, computed(() => {
      return {
        ...toRefs(mergedProps.value),
        size: size.value,
      }
    }))

    const renderPagination = () => {
      const paginationAlign = isObject(pagination.value) ? pagination.value.align || 'right' : 'right'
      const paginationDom = (
        <ElPagination
          class={ns.e('pagination')}
          background
          size="small"
          {...paginationAttrs.value}
          currentPage={pagination.value.page}
          total={pagination.value.total}
          onUpdate:current-page={handleCurrentChange}
          onUpdate:page-size={handleSizeChange}
        />
      )
      return pagination.value.pageSize
        ? (
          <div class={ns.be('pagination', 'container')}>
            <div class={ns.bm('pagination', 'top')}>
              {isFunction(slots.paginationTop) ? slots.paginationTop() : null}
            </div>
            <div class={[ns.bm('pagination', 'middle')]}>
              <div class={ns.bm('pagination', 'left')}>
                {isFunction(slots.paginationLeft) ? slots.paginationLeft() : null}
                {paginationAlign === 'left' && paginationDom}
              </div>
              <div class={[ns.bm('pagination', 'center')]}>
                {paginationAlign === 'center' && paginationDom}
              </div>
              <div class={[ns.bm('pagination', 'right')]}>
                {paginationAlign === 'right' && paginationDom}
                {isFunction(slots.paginationRight) ? slots.paginationRight() : null}
              </div>
            </div>
            <div class={ns.bm('pagination', 'bottom')}>
              {isFunction(slots.paginationBottom) ? slots.paginationBottom() : null}
            </div>
          </div>
          )
        : null
    }

    const renderToolBar = () => {
      const { toolBar, title } = mergedProps.value
      const tableTitle = slots.tableTitle?.() || (isFunction(title) ? title() : title) || null

      return (
        <div
          class={ns.be('tool-bar', 'container')}
          style={{
            marginBottom: (toolBar || isFunction(slots.tableTop)) ? '16px' : 0,
          }}
        >
          <div class={ns.bm('tool-bar', 'center')}>
            <div class={ns.bm('tool-bar', 'center-content')}>
              <div class={ns.e('title')}>
                {tableTitle}
              </div>
              <div class={ns.bm('tool-bar', 'left')}>
                {isFunction(slots.toolBarLeft) ? slots.toolBarLeft() : null}
              </div>
            </div>
            {toolBar && (
              <ToolBar
                formatTableCols={formatTableCols.value}
                middleTableCols={middleTableCols.value}
                originFormatTableCols={originFormatTableCols.value}
                sortTableCols={sortTableCols.value}
                size={size.value}
                toolBar={mergedProps.value.toolBar}
                tableProps={{ ...mergedProps.value, fullScreenElement: mergedProps.value.fullScreenElement || (() => ctx!.$refs.containerRef as HTMLElement) }}
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
            <div class={ns.bm('tool-bar', 'right')}>
              {isFunction(slots.toolBarRight) ? slots.toolBarRight() : null}
            </div>
          </div>
          <div class={ns.bm('tool-bar', 'bottom')}>
            {isFunction(slots.toolBarBottom) ? slots.toolBarBottom() : null}
          </div>
        </div>
      )
    }

    // 渲染虚拟表格
    const renderVirtualTable = () => {
      const tableHeight = mergedProps.value.height || 500

      return (
        <div style={{ height: typeof tableHeight === 'number' ? `${tableHeight}px` : tableHeight }}>
          <ElAutoResizer>
            {{
              default: ({ height, width }: { height: number; width: number }) => (
                <ElTableV2
                  ref={virtualTableRef}
                  width={width}
                  height={height}
                  {...virtualTableAttributes.value}
                  columns={virtualColumns.value as any}
                  data={tableData.value}
                  expandColumnKey={hasExpandColumn.value ? expandColumnKey.value : undefined}
                  expandedRowKeys={mergedProps.value.expandedRowKeys}
                  onUpdate:expanded-row-keys={(keys: any[]) => {
                    emit('update:expandedRowKeys', keys)
                  }}
                  onExpandedRowsChange={(keys: any[]) => {
                    emit('expanded-rows-change', keys)
                  }}
                  onRowExpand={(params: any) => emit('row-expand', params)}
                  v-loading={mergedProps.value.loading}
                  class={`${ns.b('virtual')} ${mergedProps.value.editable ? ns.b('editable') : ''}`}
                  v-slots={{
                    ...slots,
                    row: (rowProps: any) => {
                      // 如果有row插槽，使用用户自定义的渲染
                      if (slots.row || slots.expand) {
                        return slots.row?.(rowProps) || slots.expand?.(rowProps)
                      }
                      // 默认行渲染
                      return rowProps.cells
                    },
                  }}
                />
              )
            }}
          </ElAutoResizer>
        </div>
      )
    }

    const renderTable = () => {
      // 虚拟滚动模式
      if (isVirtualEnabled.value) {
        return renderVirtualTable()
      }

      // 普通表格模式 - 保持原有的renderTable逻辑
      const { loading, editable } = mergedProps.value
      return (
        <ElTable
          ref="zTableRef"
          v-loading={loading}
          class={[editable && ns.b('editable'), dragging.value && 'z-table-dragging']}
          v-slots={tableSlots}
          key={tableKey.value}
          v-draggable={draggableOptions}
          v-sticky={isObject(mergedProps.value.sticky) ? { top: '50px', zIndex: 100, ...(mergedProps.value.sticky as object) } : undefined}
          {...{ ...tableAttributes.value, spanMethod: tableAttributes.value.spanMethod || spanMethod, data: tableData.value, size: size.value }}
        >
          {formatTableCols.value.map((item, index) => {
            return (
              <TableColumn
                ref={`zTableColumn${index}`}
                column={item}
                size={size.value}
                key={item.__uid}
                tableProps={tableAttributes.value}
                onRadio-change={(row: any) => emit('radio-change', row)}
                onUpdate:data={(data: any) => emit('update:data', data)}
                columnIndex={index}
                columnsLength={formatTableCols.value.length}
                v-slots={{ ...slots, ...scopedSlots }}
              />
            )
          })}
        </ElTable>
      )
    }

    const renderTableDecorator = () => {
      if (isString(mergedProps.value.watermark)) {
        return (
          <ElWatermark content={mergedProps.value.watermark}>
            {renderTable()}
          </ElWatermark>
        )
      }
      if (isObject(mergedProps.value.watermark)) {
        return (
          <ElWatermark {...(mergedProps.value.watermark as object)}>
            {renderTable()}
          </ElWatermark>
        )
      }
      return renderTable()
    }

    const renderContent = () => {
      const { editable } = mergedProps.value
      const position = isObject(editable) ? (editable.position || 'bottom') : 'bottom'
      const maxLength = isObject(editable) ? (editable.maxLength || undefined) : undefined
      if (editable) {
        return (
          <>
            <ElForm
              ref={zTableFormRef}
              model={{ tableData: tableData.value }}
            >
              {renderTableDecorator()}
            </ElForm>
            {position === 'bottom'
            && maxLength !== tableData.value.length
            && (
              <ElButton
                icon={Plus}
                class="mt-2 w-full"
                onClick={() => enhancedAddTableData()}
              >
                {t('table.addData')}
              </ElButton>
            )}
          </>
        )
      }
      return renderTableDecorator()
    }

    const renderTableBottom = () => {
      return <div class={ns.e('bottom')}>{isFunction(slots.tableBottom) ? slots.tableBottom() : null}</div>
    }

    const renderTableTop = () => {
      const { toolBar } = mergedProps.value
      return (
        <div class={toolBar ? ns.bm('tool-bar', 'top') : ns.e('top')}>
          {isFunction(slots.tableTop) ? slots.tableTop() : null}
          {!!toolBar && isFunction(slots.toolBarTop) ? slots.toolBarTop() : null}
        </div>
      )
    }

    return () => {
      return (
        <div class={ns.b('')} ref="containerRef">
          {renderTableTop()}
          {renderToolBar()}
          {renderContent()}
          {renderPagination()}
          {renderTableBottom()}
        </div>
      )
    }
  },
})
