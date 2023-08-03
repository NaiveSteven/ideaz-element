// import draggable from 'vuedraggable'
import { DCaret, FullScreen, Operation, Refresh } from '@element-plus/icons'
import { useToolBarTableCols } from '../hooks'
import type { ITableProps } from './props'
import type { TableCol } from '~/types'

export default defineComponent({
  name: 'ToolBar',
  components: {
    // Draggable: draggable,
  },
  props: {
    formatTableCols: {
      type: Array,
      default: () => [],
    },
    sortTableCols: {
      type: Array,
      default: () => [],
    },
    middleTableCols: {
      type: Array,
      default: () => [],
    },
    originFormatTableCols: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: 'small',
    },
    toolBar: {
      type: [Boolean, Object],
      default: undefined,
    },
    tableProps: {
      type: Object as PropType<ITableProps>,
    },
  },
  emits: ['columns-change', 'size-change', 'refresh', 'table-cols-change'],
  setup(props, { emit }) {
    const {
      checkAll,
      isIndeterminate,
      checkedTableCols,
      handleCheckAllChange,
      handleCheckedTableColsChange,
      handleReset,
      handleDataChange,
    } = useToolBarTableCols(props, emit)
    const ns = useNamespace('table')

    const TABLE_SIZE_LIST = [
      {
        label: '默认',
        size: 'default',
      },
      {
        label: '宽松',
        size: 'large',
      },
      {
        label: '紧凑',
        size: 'small',
      },
    ]

    const handleRefresh = () => {
      emit('refresh')
    }

    const handleCommand = (command: string) => {
      emit('size-change', command)
    }

    const handleEnd = () => {
      handleDataChange(props.sortTableCols as TableCol[], props.middleTableCols as TableCol[])
    }

    return () => {
      const loading = props.tableProps?.loading
      return (
        <div class={ns.b('tool-bar')}>
          <el-tooltip effect="dark" content="刷新" placement="top" showAfter={300}>
            <el-button v-loading={loading} icon={Refresh} text onClick={handleRefresh}></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="密度" placement="top" showAfter={300}>
            <el-dropdown
              onCommand={handleCommand}
              trigger="click"
              size="default"
              v-slots={{
                dropdown: () => (
                  <>
                    <el-dropdown-menu>
                      {TABLE_SIZE_LIST.map(item => (
                        <el-dropdown-item
                          command={item.size}
                          class={props.size === item.size && 'density-dropdown__active'}
                        >
                          {item.label}
                        </el-dropdown-item>
                      ))}
                    </el-dropdown-menu>
                  </>
                ),
              }}
            >
              <el-button icon={DCaret} text></el-button>
            </el-dropdown>
          </el-tooltip>
          <el-tooltip effect="dark" content="全屏" placement="top" showAfter={300}>
            <z-full-screen getElement={() => document.getElementsByClassName('z-table__container')[0]} teleported={true}>
              <el-button icon={FullScreen} text />
            </z-full-screen>
          </el-tooltip>
          <el-tooltip effect="dark" content="列设置" placement="top" showAfter={300}>
            <div>
              <el-popover
                placement="bottom"
                width="150"
                trigger="click"
                v-slots={{
                  reference: () => (
                    <el-button icon={Operation} text></el-button>
                  ),
                }}
              >
                <div class="column-popover__inner">
                  <div class="column-popover__title">
                    <el-checkbox
                      modelValue={checkAll.value}
                      indeterminate={isIndeterminate.value}
                      onChange={handleCheckAllChange}
                      onUpdate:modelValue={(val: any) => {
                        checkAll.value = val
                      }}
                      size="small"
                    >
                      列展示
                    </el-checkbox>
                    <a onClick={handleReset} class="column-popover__reset">
                      重置
                    </a>
                  </div>
                  <div class="column-popover__content">
                    <el-checkbox-group
                      modelValue={checkedTableCols.value}
                      onUpdate:modelValue={(val: any) => {
                        checkedTableCols.value = val
                      }}
                      size="small"
                      onChange={handleCheckedTableColsChange}
                    >
                      {/* <draggable
                        list={props.sortTableCols}
                        sort={true}
                        animation={200}
                        filter=".not-drag"
                        ghost-class="column-popover-checkbox__drag--ghost"
                        item-key="key"
                        onEnd={handleEnd}
                        v-slots={{
                          item: ({ element, index }: { element: TableCol; index: number }) => {
                            return (
                              <div key={index} class="column-popover-checkbox">
                                <el-checkbox label={element.__uid} key={index}>
                                  {element.label || element.type}
                                </el-checkbox>
                                <el-icon class="el-icon-rank">
                                  <i-rank />
                                </el-icon>
                              </div>
                            )
                          },
                        }}
                      /> */}
                    </el-checkbox-group>
                  </div>
                </div>
              </el-popover>
            </div>
          </el-tooltip>
        </div>
      )
    }
  },
})
