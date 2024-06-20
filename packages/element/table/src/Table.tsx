import { cloneDeep } from 'lodash-es'
import { Plus } from '@element-plus/icons-vue'
import { isFunction, isObject, isString } from '@ideaz/utils'
import { ElButton, ElForm, ElPagination, ElTable } from 'element-plus'
import { getCurrentInstance } from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { draggable } from '../../../directives'
import {
  useDraggable,
  usePagination,
  useTableColumns,
  useTableMethods,
  useTableSlots,
} from './hooks'
import TableColumn from './TableColumn'
import ToolBar from './ToolBar'
import { tableProps, tableProvideKey } from './props'

export default defineComponent({
  name: 'ZTable',
  components: { TableColumn, ToolBar },
  directives: { draggable },
  inheritAttrs: false,
  props: tableProps,
  emits: ['refresh', 'radio-change', 'update:data', 'update:pagination', 'drag-sort-end', 'drag-column-end'],
  setup(props, { emit, slots, expose }) {
    const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance
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

    expose({
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
      pagination,
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
    const { draggableOptions, dragging } = useDraggable(emit, tableData, middleTableCols)
    const ns = useNamespace('table')
    const { t } = useLocale()
    const size = ref(props.size)

    provide(tableProvideKey, computed(() => {
      return {
        ...toRefs(props),
        size: size.value,
      }
    }))

    const renderPagination = () => {
      return pagination.value.pageSize
        ? (
          <div class={ns.be('pagination', 'container')}>
            <div class={ns.bm('pagination', 'top')}>
              {isFunction(slots.paginationTop) ? slots.paginationTop() : null}
            </div>
            <div class={ns.bm('pagination', 'center')}>
              <div class={ns.bm('pagination', 'left')}>
                {isFunction(slots.paginationLeft) ? slots.paginationLeft() : null}
              </div>
              <div class={ns.bm('pagination', 'right')}>
                <ElPagination
                  class={ns.e('pagination')}
                  background
                  small
                  {...paginationAttrs.value}
                  currentPage={pagination.value.page}
                  total={pagination.value.total}
                  onUpdate:current-page={handleCurrentChange}
                  onUpdate:page-size={handleSizeChange}
                />
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
      const { toolBar, title } = props
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
                toolBar={props.toolBar}
                tableProps={{ ...props, fullScreenElement: props.fullScreenElement || (() => ctx!.$refs.zTableRef as HTMLElement) }}
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

    const renderTable = () => {
      const { loading, editable } = props
      return (
        <ElTable
          ref="zTableRef"
          v-loading={loading}
          class={[editable && ns.b('editable'), dragging.value && 'z-table-dragging']}
          v-slots={tableSlots}
          key={tableKey.value}
          v-draggable={draggableOptions}
          {...{ ...tableAttributes.value, data: tableData.value, size: size.value }}
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
      if (isString(props.watermark)) {
        return (
          <z-watermark content={props.watermark} gapY={80}>
            {renderTable()}
          </z-watermark>
        )
      }
      if (isObject(props.watermark)) {
        return (
          <z-watermark {...{ gapY: 80, ...props.watermark }}>
            {renderTable()}
          </z-watermark>
        )
      }
      return renderTable()
    }

    const renderContent = () => {
      const { editable } = props
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
                onClick={() => addTableData()}
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
      const { toolBar } = props
      return (
        <div class={toolBar ? ns.bm('tool-bar', 'top') : ns.e('top')}>
          {isFunction(slots.tableTop) ? slots.tableTop() : null}
          {!!toolBar && isFunction(slots.toolBarTop) ? slots.toolBarTop() : null}
        </div>
      )
    }

    return () => {
      return (
        <div class={ns.b('')} ref="zTableRef">
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
