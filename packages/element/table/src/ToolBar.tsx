// import draggable from 'vuedraggable'
import { useToolBarTableCols } from '../hooks'
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

    const TABLE_SIZE_LIST = [
      {
        label: '宽松',
        size: 'large',
      },
      {
        label: '中等',
        size: 'default',
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
      return (
        <div class="tool-bar">
          <el-tooltip class="item" effect="dark" content="刷新" placement="top" showAfter={500}>
            <el-icon size="18px" class="mr-12">
              <i-refresh-right class="el-icon-refresh-right" onClick={handleRefresh} />
            </el-icon>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="尺寸" placement="top" showAfter={500}>
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
              <el-icon class="mr-12">
                <i-d-caret />
              </el-icon>
            </el-dropdown>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="列设置" placement="top" showAfter={500}>
            <div>
              <el-popover
                placement="bottom"
                width="150"
                trigger="click"
                v-slots={{
                  reference: () => (
                    <el-icon>
                      <i-setting class="el-icon-setting" />
                    </el-icon>
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
