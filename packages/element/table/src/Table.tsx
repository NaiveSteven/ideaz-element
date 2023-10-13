import { cloneDeep } from 'lodash-es'
import { useExpose } from '@ideaz/hooks'
import { isFunction, isObject, isString } from '@ideaz/utils'
import {
  usePagination,
  useTableColumns,
  useTableMethods,
  useTableSlots,
} from '../hooks'
import { draggable } from '../../../directives'
import TableColumn from './TableColumn'
import ToolBar from './ToolBar'
import { tableProps, tableProvideKey } from './props'

export default defineComponent({
  name: 'ZTable',
  components: { TableColumn, ToolBar },
  directives: { draggable },
  inheritAttrs: false,
  props: tableProps,
  emits: ['refresh', 'radio-change', 'update:data', 'update:pagination', 'drag-sort-end'],
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
    const ns = useNamespace('table')
    const { t } = useLocale()
    const size = ref(props.size)

    const draggableOptions = [
      {
        selector: 'tbody',
        options: {
          animation: 150,
          ghostClass: 'ghost',
          onEnd: (evt: any) => {
            const { newIndex, oldIndex } = evt
            const arr = [...tableData.value]

            // 拖动元素与新位置原元素互换位置
            // ES6 解构写法
            // [arr[newIndex as number],arr[oldIndex as number]] = [arr[oldIndex as number],arr[newIndex as number]]
            // ES5 普通写法
            // arr.splice(newIndex as number,1, ...arr.splice(oldIndex as number,1,arr[newIndex as number]))
            // 拖动元素至新位置后其余依次下移
            const [moveRowData] = [...arr.splice(oldIndex as number, 1)]
            arr.splice(newIndex as number, 0, moveRowData)

            tableData.value = []
            nextTick(() => {
              tableData.value = [...arr]
              emit('drag-sort-end', tableData.value)
            })
          },
        },
      },
      {
        selector: '.el-table__header-wrapper tr',
        options: {
          animation: 150,
          delay: 0,
          ghostClass: 'table-col__ghost',
          onEnd: (evt: any) => {
            // emit('on-update-table-column', dropCol[evt.oldIndex], evt.newIndex, evt.oldIndex);

            const { newIndex, oldIndex } = evt
            const arr = [...middleTableCols.value]
            const [moveRowData] = [...arr.splice(oldIndex as number, 1)]
            arr.splice(newIndex as number, 0, moveRowData)
            middleTableCols.value = []
            nextTick(() => {
              middleTableCols.value = [...arr]
            })
          },
        },
      },
    ]

    provide(tableProvideKey, {
      props,
      size: size.value,
    })

    const renderPagination = () => {
      return pagination.value.pageSize
        ? (
          <el-pagination
            class={ns.e('pagination')}
            background
            small
            {...paginationAttrs.value}
            currentPage={pagination.value.page}
            total={pagination.value.total}
            onUpdate:current-page={handleCurrentChange}
            onUpdate:page-size={handleSizeChange}
          />
          )
        : null
    }

    const renderToolBar = () => {
      const { toolBar } = props

      return <div
        class={ns.be('tool-bar', 'container')}
        style={{
          marginBottom: (toolBar || isFunction(slots.top) || isFunction(slots.topRight) || isFunction(slots.topLeft)) ? '16px' : 0,
        }}
      >
        <div class={ns.bm('tool-bar', 'top')}>
          {slots.top ? slots.top() : null}
        </div>
        <div class={ns.bm('tool-bar', 'center')}>
          <div class={ns.bm('tool-bar', 'center-slot')}>
            <div class={ns.bm('too-bar', 'top-left')}>
              {slots.topLeft ? slots.topLeft() : null}
            </div>
            <div class={ns.bm('tool-bar', 'top-right')}>
              {slots.topRight ? slots.topRight() : null}
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
              tableProps={props}
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
        <div class={ns.bm('tool-bar', 'top-bottom')} >
          {slots.topBottom ? slots.topBottom() : null}
        </div>
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
          v-draggable={draggableOptions}
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

    const renderTableDecorator = () => {
      if (isString(props.watermark)) {
        return <z-watermark content={props.watermark} gapY={80}>
          {renderTable()}
        </z-watermark>
      }
      if (isObject(props.watermark)) {
        return <z-watermark {...{ gapY: 80, ...props.watermark }} >
          {renderTable()}
        </z-watermark>
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
            <el-form
              ref={zTableFormRef}
              model={{ tableData: tableData.value }}
            >
              {renderTableDecorator()}
            </el-form>
            {position === 'bottom'
              && maxLength !== tableData.value.length
              && <el-button
                icon='i-plus'
                class='w-full mt-2'
                onClick={() => addTableData()}
              >
                {t('table.addData')}
              </el-button>}
          </>
        )
      }
      return renderTableDecorator()
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
