// import draggable from 'vuedraggable'
import { Back, DCaret, FullScreen, Operation, Refresh, Right, VideoPause } from '@element-plus/icons-vue'
import { VueDraggable } from 'vue-draggable-plus'
import { isFunction } from '@ideaz/utils'
import { useFixedTableCols, useToolBarTableCols } from '../hooks'
import { toolBarProps } from './props'
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
  props: toolBarProps,
  emits: ['columns-change', 'size-change', 'refresh', 'table-cols-change'],
  setup(props, { emit }) {
    const {
      checkedTableCols,
      handleReset,
      handleDataChange,
    } = useToolBarTableCols(props, emit)
    const {
      handleTableColFixedFromCenter,
      leftFixedTableCols,
      rightFixedTableCols,
      leftCheckedTableColsUids,
      rightCheckedTableColsUids,
      handleResetFixedTableCols,
      handleFixedCheckedTableColsChange,
      handleSortTableCols,
      handleUnfixedTableCol,
      handleSideFixedDragChange,
      handleFixedTableColFromSide,
    } = useFixedTableCols(props, emit, checkedTableCols)
    const ns = useNamespace('table-tool-bar')
    const { t } = useLocale()

    const isIndeterminate = ref(getIsIndeterminate(leftCheckedTableColsUids.value, checkedTableCols.value, rightCheckedTableColsUids.value))
    const checkAll = ref(getIsCheckAll(leftCheckedTableColsUids.value, checkedTableCols.value, rightCheckedTableColsUids.value))

    const isFullScreen = ref(false)

    function getIsCheckAll(leftChecked: string[], centerChecked: string[], rightChecked: string[]) {
      const leftFixedTableColsUids = leftFixedTableCols.value.map(item => item.__uid)
      const centerTableColsUids = props.sortTableCols.filter((item: any) => isFunction(item.hide) ? !item.hide() : !item.hide).map(item => item.__uid)
      const rightFixedTableColsUids = rightFixedTableCols.value.map(item => item.__uid)
      return (leftFixedTableColsUids.every(item => leftChecked.includes(item)))
        && (centerTableColsUids.every(item => centerChecked.includes(item)))
        && (rightFixedTableColsUids.every(item => rightChecked.includes(item)))
    }

    function getIsIndeterminate(leftChecked: string[], centerChecked: string[], rightChecked: string[]) {
      const leftIndeterminate = leftFixedTableCols.value.map(item => item.__uid).some(__uid => leftChecked.includes(__uid))
      const centerIndeterminate = props.sortTableCols.filter((item: any) => isFunction(item.hide) ? !item.hide() : !item.hide).map(item => item.__uid).some(__uid => centerChecked.includes(__uid))
      const rightIndeterminate = rightFixedTableCols.value.map(item => item.__uid).some(__uid => rightChecked.includes(__uid))
      return (leftIndeterminate || centerIndeterminate || rightIndeterminate)
        && !getIsCheckAll(leftChecked, centerChecked, rightChecked)
        && Boolean(leftChecked.length || centerChecked.length || rightChecked.length)
    }

    watchEffect(() => {
      isIndeterminate.value = getIsIndeterminate(leftCheckedTableColsUids.value, checkedTableCols.value, rightCheckedTableColsUids.value)
      checkAll.value = getIsCheckAll(leftCheckedTableColsUids.value, checkedTableCols.value, rightCheckedTableColsUids.value)
    })

    // center checked table cols
    const handleChangeTableCols = (values: string[]) => {
      const data: TableCol[] = []
      if (values && values.length > 0) {
        const otherData = props.originFormatTableCols.filter(
          (item: TableCol) =>
            !props.sortTableCols.map((cur: TableCol) => cur.__uid).includes(item.__uid),
        )

        props.sortTableCols.forEach((tableCol: TableCol) => {
          values.forEach((value) => {
            if (value === tableCol.__uid)
              data.push(tableCol)
          })
        })
        // need check is fixed
        otherData.forEach((item: TableCol) => {
          const column: TableCol = {
            ...item,
            fixed: leftCheckedTableColsUids.value.includes(item.__uid) ? 'left' : rightCheckedTableColsUids.value.includes(item.__uid) ? 'right' : undefined,
          }
          const i = props.originFormatTableCols.findIndex(
            (tableCol: TableCol) => column.__uid === tableCol.__uid,
          )
          if (i > -1)
            data.splice(i, 0, column)
        })
      }
      emit('columns-change', data)
    }

    const handleCheckAllChange = (val: string[]) => {
      checkedTableCols.value = val ? props.sortTableCols.map((item: TableCol) => item.__uid) : []
      handleChangeTableCols(val ? props.sortTableCols.map((item: TableCol) => item.__uid) : [])
    }

    const handleCheckedTableColsChange = (val: string[]) => {
      handleChangeTableCols(val)
    }

    const TABLE_SIZE_LIST = [
      {
        label: t('common.default'),
        size: 'default',
      },
      {
        label: t('table.loose'),
        size: 'large',
      },
      {
        label: t('table.compact'),
        size: 'small',
      },
    ]

    const handleRefresh = () => {
      emit('refresh')
    }

    const handleCommand = (command: string) => {
      emit('size-change', command)
    }

    const resetAll = () => {
      handleReset()
      handleResetFixedTableCols()
    }

    const getContentConfig = (sortTableCols: TableCol[]) => [
      {
        title: t('table.leftFixed'),
        titleVisible: leftFixedTableCols.value.length,
        checkboxModelValue: leftCheckedTableColsUids,
        checkboxChange: (val: string[]) => handleFixedCheckedTableColsChange('left', val),
        dragModelValue: leftFixedTableCols,
        dragChange: () => handleSideFixedDragChange('left'),
        dragEnd: (dragData: any) => handleSortTableCols(dragData, 'left'),
        checkboxData: leftFixedTableCols.value,
        extraContent: (item: TableCol) => <>
          <el-tooltip effect="dark" content={t('table.unpin')} placement="top" showAfter={300}>
            <el-button icon={VideoPause} text onClick={() => handleUnfixedTableCol(item)}></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content={t('table.rightFixed')} placement="top" showAfter={300}>
            <el-button icon={Right} text onClick={() => handleFixedTableColFromSide(item, 'right')}></el-button>
          </el-tooltip>
        </>,
      },
      {
        title: t('table.unfixed'),
        titleVisible: leftFixedTableCols.value.length || rightFixedTableCols.value.length,
        checkboxModelValue: checkedTableCols,
        checkboxChange: handleCheckedTableColsChange,
        dragModelValue: sortTableCols,
        dragChange: () => { },
        dragEnd: () => handleDataChange(mergeArraysByUID(props.sortTableCols, sortTableCols), props.middleTableCols),
        checkboxData: sortTableCols,
        extraContent: (item: TableCol) => <>
          <el-tooltip effect="dark" content={t('table.leftFixed')} placement="top" showAfter={300}>
            <el-button icon={Back} text onClick={() => handleTableColFixedFromCenter(item, 'left')}></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content={t('table.rightFixed')} placement="top" showAfter={300}>
            <el-button icon={Right} text onClick={() => handleTableColFixedFromCenter(item, 'right')}></el-button>
          </el-tooltip>
        </>,
      },
      {
        title: t('table.rightFixed'),
        titleVisible: rightFixedTableCols.value.length,
        checkboxModelValue: rightCheckedTableColsUids,
        checkboxChange: (val: string[]) => handleFixedCheckedTableColsChange('right', val),
        dragModelValue: rightFixedTableCols,
        dragChange: () => handleSideFixedDragChange('right'),
        dragEnd: (dragData: any) => handleSortTableCols(dragData, 'right'),
        checkboxData: rightFixedTableCols.value,
        extraContent: (item: TableCol) => <>
          <el-tooltip effect="dark" content={t('table.leftFixed')} placement="top" showAfter={300}>
            <el-button icon={Back} text onClick={() => handleFixedTableColFromSide(item, 'left')}></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content={t('table.unpin')} placement="top" showAfter={300}>
            <el-button icon={VideoPause} text onClick={() => handleUnfixedTableCol(item)}></el-button>
          </el-tooltip>
        </>,
      },
    ]

    return () => {
      const loading = props.tableProps?.loading
      const fullScreenElement = props.tableProps?.fullScreenElement
      const sortTableCols = props.sortTableCols.filter((item: TableCol) => isFunction(item.hide) ? !item.hide() : !item.hide)
      const CONTENT_CONFIG = getContentConfig(sortTableCols)

      return (
        <div class={ns.b('')}>
          <el-tooltip effect="dark" content={t('common.refresh')} placement="top" showAfter={300}>
            <el-button v-loading={loading} icon={Refresh} text onClick={handleRefresh}></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content={t('table.density')} placement="top" showAfter={300}>
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
          <el-tooltip effect="dark" content={isFullScreen.value ? t('common.cancelFullScreen') : t('common.fullScreen')} placement="top" showAfter={300}>
            <z-full-screen el={fullScreenElement || document.getElementsByClassName('z-table__container')[0]} onChange={(val: boolean) => isFullScreen.value = val}>
              <el-button icon={FullScreen} text />
            </z-full-screen>
          </el-tooltip>
          <el-tooltip effect="dark" content={t('table.columnSetting')} placement="top" showAfter={300}>
            <div>
              <el-popover
                placement="bottom"
                width="190"
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
                      {t('table.columnDisplay')}
                    </el-checkbox>
                    <a onClick={resetAll} class="column-popover__reset">
                      {t('common.reset')}
                    </a>
                  </div>
                  <div class="column-popover__content">
                    {CONTENT_CONFIG.map((config) => {
                      const dragModelValue = (config.dragModelValue as Ref<TableCol[]>).value ? (config.dragModelValue as Ref<TableCol[]>).value : sortTableCols
                      return <>
                        {config.titleVisible ? <el-divider>{config.title}</el-divider> : null}
                        <el-checkbox-group
                          v-model={config.checkboxModelValue.value}
                          size='small'
                          onChange={config.checkboxChange}
                        >
                          <draggable
                            modelValue={dragModelValue}
                            animation={200}
                            onChange={config.dragChange}
                            onEnd={config.dragEnd}
                            ghostClass='column-popover-checkbox__drag--ghost'
                          >
                            {config.checkboxData.map((item: TableCol) => {
                              return (
                                <div key={item.__uid} class='column-popover-checkbox'>
                                  <el-checkbox label={item.__uid} key={item.__uid}>
                                    {item.label || item.type}
                                  </el-checkbox>
                                  <div class={ns.be('setting-item', 'extra')}>
                                    {config.extraContent(item)}
                                  </div>
                                </div>
                              )
                            })}
                          </draggable>
                        </el-checkbox-group>
                      </>
                    })}
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
