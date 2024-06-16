// import draggable from 'vuedraggable'
import { Back, DCaret, FullScreen, Operation, Refresh, Right, VideoPause } from '@element-plus/icons-vue'
import { VueDraggable } from 'vue-draggable-plus'
import { isFunction } from '@ideaz/utils'
import type { CheckboxValueType } from 'element-plus'
import { ElButton, ElCheckbox, ElCheckboxGroup, ElDivider, ElDropdown, ElDropdownItem, ElDropdownMenu, ElPopover, ElTooltip } from 'element-plus'
import { useFixedTableCols, useToolBarTableCols } from './hooks'
import type { TableCol } from '../../types'
import { toolBarProps } from './props'

function mergeArraysByUID(arr1: TableCol[], arr2: TableCol[]) {
  const uidMap: any = {}
  const mergedArray = [...arr2]

  arr1.forEach((item: TableCol, index: number) => {
    uidMap[item.__uid!] = index
  })

  arr1.forEach((item: TableCol) => {
    if (!mergedArray.some(mergedItem => mergedItem.__uid === item.__uid)) {
      const insertIndex = uidMap[item.__uid!]
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
    const size = useFormSize()

    const isIndeterminate = ref(getIsIndeterminate(leftCheckedTableColsUids.value, checkedTableCols.value, rightCheckedTableColsUids.value))
    const checkAll = ref(getIsCheckAll(leftCheckedTableColsUids.value, checkedTableCols.value, rightCheckedTableColsUids.value))

    const isFullScreen = ref(false)

    function getIsCheckAll(leftChecked: string[], centerChecked: string[], rightChecked: string[]) {
      const leftFixedTableColsUids = leftFixedTableCols.value.map(item => item.__uid!)
      const centerTableColsUids = props.sortTableCols.filter((item: any) => isFunction(item.hide) ? !item.hide() : !item.hide).map(item => item.__uid!)
      const rightFixedTableColsUids = rightFixedTableCols.value.map(item => item.__uid!)
      return (leftFixedTableColsUids.every(item => leftChecked.includes(item)))
        && (centerTableColsUids.every(item => centerChecked.includes(item)))
        && (rightFixedTableColsUids.every(item => rightChecked.includes(item)))
    }

    function getIsIndeterminate(leftChecked: string[], centerChecked: string[], rightChecked: string[]) {
      const leftIndeterminate = leftFixedTableCols.value.map(item => item.__uid).some(__uid => leftChecked.includes(__uid!))
      const centerIndeterminate = props.sortTableCols.filter((item: any) => isFunction(item.hide) ? !item.hide() : !item.hide).map(item => item.__uid).some(__uid => centerChecked.includes(__uid!))
      const rightIndeterminate = rightFixedTableCols.value.map(item => item.__uid).some(__uid => rightChecked.includes(__uid!))
      return (leftIndeterminate || centerIndeterminate || rightIndeterminate)
        && !getIsCheckAll(leftChecked, centerChecked, rightChecked)
        && Boolean(leftChecked.length || centerChecked.length || rightChecked.length)
    }

    watchEffect(() => {
      isIndeterminate.value = getIsIndeterminate(leftCheckedTableColsUids.value, checkedTableCols.value, rightCheckedTableColsUids.value)
      checkAll.value = getIsCheckAll(leftCheckedTableColsUids.value, checkedTableCols.value, rightCheckedTableColsUids.value)
    })

    // center checked table cols
    const handleChangeTableCols = (values: CheckboxValueType[]) => {
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
            fixed: leftCheckedTableColsUids.value.includes(item.__uid!) ? 'left' : rightCheckedTableColsUids.value.includes(item.__uid!) ? 'right' : undefined,
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

    const handleCheckAllChange = (val: CheckboxValueType) => {
      checkedTableCols.value = val ? props.sortTableCols.map((item: TableCol) => item.__uid!) : []
      handleChangeTableCols(val ? props.sortTableCols.map((item: TableCol) => item.__uid!) : [])
    }

    const handleCheckedTableColsChange = (val: CheckboxValueType[]) => {
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
        checkboxChange: (val: CheckboxValueType[]) => handleFixedCheckedTableColsChange('left', val),
        dragModelValue: leftFixedTableCols,
        dragChange: () => handleSideFixedDragChange('left'),
        dragEnd: (dragData: any) => handleSortTableCols(dragData, 'left'),
        checkboxData: leftFixedTableCols.value,
        extraContent: (item: TableCol) => (
          <>
            <ElTooltip effect="dark" content={t('table.unpin')} placement="top" showAfter={300}>
              <ElButton icon={VideoPause} text onClick={() => handleUnfixedTableCol(item)}></ElButton>
            </ElTooltip>
            <ElTooltip effect="dark" content={t('table.rightFixed')} placement="top" showAfter={300}>
              <ElButton icon={Right} text onClick={() => handleFixedTableColFromSide(item, 'right')}></ElButton>
            </ElTooltip>
          </>
        ),
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
        extraContent: (item: TableCol) => (
          <>
            <ElTooltip effect="dark" content={t('table.leftFixed')} placement="top" showAfter={300}>
              <ElButton icon={Back} text onClick={() => handleTableColFixedFromCenter(item, 'left')}></ElButton>
            </ElTooltip>
            <ElTooltip effect="dark" content={t('table.rightFixed')} placement="top" showAfter={300}>
              <ElButton icon={Right} text onClick={() => handleTableColFixedFromCenter(item, 'right')}></ElButton>
            </ElTooltip>
          </>
        ),
      },
      {
        title: t('table.rightFixed'),
        titleVisible: rightFixedTableCols.value.length,
        checkboxModelValue: rightCheckedTableColsUids,
        checkboxChange: (val: CheckboxValueType[]) => handleFixedCheckedTableColsChange('right', val),
        dragModelValue: rightFixedTableCols,
        dragChange: () => handleSideFixedDragChange('right'),
        dragEnd: (dragData: any) => handleSortTableCols(dragData, 'right'),
        checkboxData: rightFixedTableCols.value,
        extraContent: (item: TableCol) => (
          <>
            <ElTooltip effect="dark" content={t('table.leftFixed')} placement="top" showAfter={300}>
              <ElButton icon={Back} text onClick={() => handleFixedTableColFromSide(item, 'left')}></ElButton>
            </ElTooltip>
            <ElTooltip effect="dark" content={t('table.unpin')} placement="top" showAfter={300}>
              <ElButton icon={VideoPause} text onClick={() => handleUnfixedTableCol(item)}></ElButton>
            </ElTooltip>
          </>
        ),
      },
    ]

    return () => {
      const loading = props.tableProps?.loading
      const fullScreenElement = props.tableProps?.fullScreenElement
      const sortTableCols = props.sortTableCols.filter((item: TableCol) => isFunction(item.hide) ? !item.hide() : !item.hide)
      const CONTENT_CONFIG = getContentConfig(sortTableCols)

      return (
        <div class={ns.b('')}>
          <ElTooltip effect="dark" content={t('common.refresh')} placement="top" showAfter={300}>
            <ElButton v-loading={loading} size={size.value} icon={Refresh} text onClick={handleRefresh}></ElButton>
          </ElTooltip>
          <ElTooltip effect="dark" content={t('table.density')} placement="top" showAfter={300}>
            <ElDropdown
              onCommand={handleCommand}
              trigger="click"
              size="default"
              v-slots={{
                dropdown: () => (
                  <>
                    <ElDropdownMenu>
                      {TABLE_SIZE_LIST.map(item => (
                        <ElDropdownItem
                          command={item.size}
                          class={props.size === item.size && 'density-dropdown__active'}
                        >
                          {item.label}
                        </ElDropdownItem>
                      ))}
                    </ElDropdownMenu>
                  </>
                ),
              }}
            >
              <ElButton icon={DCaret} text></ElButton>
            </ElDropdown>
          </ElTooltip>
          <ElTooltip effect="dark" content={isFullScreen.value ? t('common.cancelFullScreen') : t('common.fullScreen')} placement="top" showAfter={300}>
            <z-full-screen el={fullScreenElement || document.getElementsByClassName('z-table__container')[0]} onChange={(val: boolean) => isFullScreen.value = val}>
              <ElButton icon={FullScreen} text size={size.value} />
            </z-full-screen>
          </ElTooltip>
          <ElTooltip effect="dark" content={t('table.columnSetting')} placement="top" showAfter={300}>
            <div>
              <ElPopover
                placement="bottom"
                width="190"
                trigger="click"
                v-slots={{
                  reference: () => (
                    <ElButton icon={Operation} text size={size.value}></ElButton>
                  ),
                }}
              >
                <div class="column-popover__inner">
                  <div class="column-popover__title">
                    <ElCheckbox
                      modelValue={checkAll.value}
                      indeterminate={isIndeterminate.value}
                      onChange={handleCheckAllChange}
                      onUpdate:modelValue={(val: any) => {
                        checkAll.value = val
                      }}
                      size="small"
                    >
                      {t('table.columnDisplay')}
                    </ElCheckbox>
                    <a onClick={resetAll} href="javascript:;" class="column-popover__reset">
                      {t('common.reset')}
                    </a>
                  </div>
                  <div class="column-popover__content">
                    {CONTENT_CONFIG.map((config) => {
                      const dragModelValue = (config.dragModelValue as Ref<TableCol[]>).value ? (config.dragModelValue as Ref<TableCol[]>).value : sortTableCols
                      return (
                        <>
                          {config.titleVisible ? <ElDivider>{config.title}</ElDivider> : null}
                          <ElCheckboxGroup
                            v-model={config.checkboxModelValue.value}
                            size="small"
                            onChange={config.checkboxChange}
                          >
                            <draggable
                              modelValue={dragModelValue}
                              animation={200}
                              onChange={config.dragChange}
                              onEnd={config.dragEnd}
                              ghostClass="column-popover-checkbox__drag--ghost"
                            >
                              {config.checkboxData.map((item: TableCol) => {
                                return (
                                  <div key={item.__uid} class="column-popover-checkbox">
                                    <ElCheckbox value={item.__uid} key={item.__uid}>
                                      {item.label || item.type}
                                    </ElCheckbox>
                                    <div class={ns.be('setting-item', 'extra')}>
                                      {config.extraContent(item)}
                                    </div>
                                  </div>
                                )
                              })}
                            </draggable>
                          </ElCheckboxGroup>
                        </>
                      )
                    })}
                  </div>
                </div>
              </ElPopover>
            </div>
          </ElTooltip>
        </div>
      )
    }
  },
})
