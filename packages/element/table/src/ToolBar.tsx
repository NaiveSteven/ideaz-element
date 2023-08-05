// import draggable from 'vuedraggable'
import { Back, DCaret, FullScreen, Operation, Refresh, Right } from '@element-plus/icons'
import { VueDraggable } from 'vue-draggable-plus'
import { isFunction } from '@ideaz/utils'
import { useToolBarTableCols } from '../hooks'
import type { ITableProps } from './props'
import type { TableCol } from '~/types'

const mergeArraysByUID = (arr1: TableCol[], arr2: TableCol[]) => {
  const uidMap: any = {}
  const mergedArray = [...arr2]

  arr1.forEach((item: TableCol, index: number) => {
    uidMap[item.__uid] = index
  })

  arr1.forEach((item: TableCol) => {
    if (!mergedArray.some(mergedItem => mergedItem.__uid === item.__uid)) {
      const insertIndex = uidMap[item.__uid]
      mergedArray.splice(insertIndex, 0, item)
    }
  })

  return mergedArray
}

export default defineComponent({
  name: 'ToolBar',
  components: {
    Draggable: VueDraggable,
  },
  props: {
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
    const ns = useNamespace('table-tool-bar')

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

    // const handleEnd = () => {
    //   console.log(props.sortTableCols, 'props.sortTableCols')
    //   // handleDataChange(props.sortTableCols as TableCol[], props.middleTableCols as TableCol[])
    // }

    return () => {
      const loading = props.tableProps?.loading
      const sortTableCols = props.sortTableCols.filter((item: any) => isFunction(item.hide) ? !item.hide() : !item.hide)
      return (
        <div class={ns.b('')}>
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
                      <draggable
                        modelValue={sortTableCols}
                        animation={200}
                        onEnd={() => handleDataChange(mergeArraysByUID(props.sortTableCols, sortTableCols), props.middleTableCols)}
                        ghostClass='column-popover-checkbox__drag--ghost'
                      >
                        {sortTableCols.map((item: any, index) => {
                          return (
                            <div key={index} class='column-popover-checkbox'>
                              <el-checkbox label={item.__uid} key={index}>
                                {item.label || item.type}
                              </el-checkbox>
                              <i class='el-icon-rank' />
                              <div class={ns.be('setting-item', 'extra')}>
                                <el-tooltip effect="dark" content="左固定" placement="top" showAfter={300}>
                                  <el-button icon={Back} text></el-button>
                                </el-tooltip>
                                <el-tooltip effect="dark" content="右固定" placement="top" showAfter={300}>
                                  <el-button icon={Right} text></el-button>
                                </el-tooltip>
                              </div>
                            </div>
                          )
                        })}
                      </draggable>
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
