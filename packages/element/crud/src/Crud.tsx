import { ElAlert, ElButton, ElDrawer, ElWatermark, useAttrs } from 'element-plus'
import { omit } from 'lodash-unified'
import { Delete, Download, Plus } from '@element-plus/icons-vue'
import { isFunction, isObject, isString } from '@ideaz/utils'
import type { ComponentInternalInstance } from 'vue'
import { withKeys } from 'vue'
import { useFormMethods } from '../../form/src/hooks'
import {
  useTableMethods,
} from '../../table/src/hooks'
import ZFilterForm from '../../form/src/FilterForm'
import ZDescription from '../../descriptions/src/index'
import ZDialog from '../../dialog/src/index'
import ZForm from '../../form/src/BaseForm'
import ZTable from '../../table/src/Table'
import type { Pagination } from '../../types'
import { useDataRequest, useDescriptions, useDialogConfig, useDrawerConfig, useFormColumns, useSelectionData } from './hooks'
import type { AlertConfig } from './props'
import { EXCLUDE_FORM_PROPS_KEYS, crudProps, crudProvideKey } from './props'

export default defineComponent({
  name: 'ZCrud',
  props: crudProps,
  emits: ['update:formData', 'update:pagination', 'search', 'reset', 'refresh', 'operate-submit', 'operate-delete', 'operate-view', 'operate-cancel', 'sort-change', 'update:data', 'update:editFormData', 'update:addFormData', 'update:selectionData', 'update:loading', 'selection-change', 'radio-change'],
  setup(props, { emit, slots, expose }) {
    const attrs = useAttrs()
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
    const {
      resetFields,
      validate,
      validateField,
      clearValidate,
      scrollToField,
    } = useFormMethods()
    const {
      handleSearch,
      tableProps,
      handleReset,
      handleKeyDown,
      handlePaginationChange,
      handleSortChange,
      middleFormData,
      handleRadioChange,
      handleExport,
      getTableData,
      isShowDialog,
      rowData,
      currentMode,
      isShowDrawer,
      refreshAfterRequest,
    } = useDataRequest(props, emit)
    const { selectionData, isSelection, handleCheckboxChange, handleCloseAlert, handleMultipleDelete } = useSelectionData(props, emit, tableProps, refreshAfterRequest, getTableData)
    const { addFormColumns, editFormColumns, searchFormColumns, detailColumns } = useFormColumns(props)
    const {
      dialogProps,
      dialogFormData,
      dialogForm,
      isOperateFormLoading,
      handleCancel,
      handleConfirm,
      handleDialogClosed,
      handleDialogOpen,
    } = useDialogConfig(props, emit, currentMode, isShowDialog, rowData)
    const { drawerProps, isDescLoading, viewData, handleDrawerOpen } = useDrawerConfig(props)
    const { descriptionColumns, descriptionProps } = useDescriptions(props)
    const ns = useNamespace('crud')
    const { t } = useLocale()
    const size = useFormSize()

    provide(crudProvideKey, computed(() => {
      return {
        ...toRefs(props),
        size: tableProps.value.size,
      }
    }))

    provide(crudProvideKey, computed(() => {
      return {
        ...toRefs(props),
        size: tableProps.value.size,
      }
    }))

    expose({
      resetFields,
      validate,
      validateField,
      clearValidate,
      scrollToField,

      setCurrentRow,
      toggleRowSelection,
      clearSelection,
      clearFilter,
      toggleAllSelection,
      toggleRowExpansion,
      clearSort,
      toggleRadioSelection,
      sort,
      getTableData,
    })

    const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance

    const renderDecorator = (decoratorProps: any) => {
      const nativeTags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      const isNativeTag = nativeTags.includes(decoratorProps.name)
      const name = decoratorProps.name ? isNativeTag ? decoratorProps.name : resolveComponent(decoratorProps.name) : resolveComponent('el-card')
      return h(name, omit(decoratorProps, ['children', 'name']), isNativeTag ? decoratorProps.children() : decoratorProps.children)
    }

    const renderAlert = () => {
      const { alert } = props
      if (isFunction(alert))
        return alert(selectionData.value)
      if (isFunction(slots.alert))
        return slots.alert({ selectionData: selectionData.value })

      const alertProps = omit(props.alert, ['title', 'description']) as Omit<AlertConfig, 'title' | 'description'>
      return (
        <ElAlert
          type="success"
          close-text={t('crud.unselect')}
          onClose={handleCloseAlert}
          class={ns.b('alert')}
          {...alertProps}
          v-slots={{
            title: isFunction(alert.title)
              ? () => (alert.title as Function)(selectionData.value, ctx!.$refs.zTableRef)
              : () => (alert.title || t('crud.selected') + selectionData.value.length + t('crud.term')),
            default: isFunction(alert.description) ? () => (alert.description as Function)(selectionData.value, ctx!.$refs.zTableRef) : () => (alert.description || ''),
          }}
        />
      )
    }

    const renderTable = () => {
      return renderDecorator({
        ...props.tableDecorator,
        class: ns.be('table', 'container'),
        children: () => {
          return (
            <ZTable
              ref="zTableRef"
              {...{ size: size.value, ...tableProps.value }}
              v-slots={{
                ...slots,
                toolBarLeft: () => {
                  return (
                    <>
                      {slots.toolBarLeft && slots.toolBarLeft()}
                      {props.action && props.add && (
                        <ElButton
                          size={size.value}
                          type="primary"
                          icon={Plus}
                          onClick={() => {
                            currentMode.value = 'add'
                            isShowDialog.value = true
                          }}
                        >
                          {t('crud.add')}
                        </ElButton>
                      )}
                      {!!props.export && <ElButton size={size.value} type="primary" icon={Download} class={ns.e('export')} onClick={handleExport}>{t('crud.export')}</ElButton>}
                      {!!isSelection.value && props.delete && props.action && (
                        <ElButton
                          plain
                          size={size.value}
                          type="danger"
                          class={ns.e('multiple-delete')}
                          icon={Delete}
                          onClick={handleMultipleDelete}
                        >
                          {t('crud.multipleDelete')}
                        </ElButton>
                      )}
                    </>
                  )
                },
                toolBarBottom: () => {
                  if (isSelection.value && props.action && props.alert)
                    return renderAlert()

                  return slots.toolBarBottom?.()
                },
              }}
              onUpdate:pagination={(pagination: Pagination) => emit('update:pagination', pagination)}
              onRefresh={handlePaginationChange}
              onSort-change={handleSortChange}
              onSelection-change={handleCheckboxChange}
              onRadio-change={handleRadioChange}
            >
            </ZTable>
          )
        },
      })
    }

    const renderSearchForm = () => {
      return searchFormColumns.value?.length > 0 && renderDecorator({
        ...props.formDecorator,
        style: {
          marginBottom: '16px',
          ...props.formDecorator?.style,
        },
        class: ns.be('filter-form', 'container'),
        children: () => (
          <>
            {isFunction(slots.formTop) ? slots.formTop() : null}
            <ZFilterForm
              ref="formRef"
              {...{
                size: size.value,
                labelWidth: '60px',
                ...omit(props.search || {}, EXCLUDE_FORM_PROPS_KEYS),
                columns: searchFormColumns.value,
                ...attrs.value,
                searchButtonLoading: tableProps.value.loading,
              }}
              options={props.options}
              modelValue={middleFormData.value}
              onUpdate:modelValue={(val: any) => { middleFormData.value = val }}
              onSearch={handleSearch}
              onReset={handleReset}
              onKeydown={withKeys((e: KeyboardEvent) => handleKeyDown(e), ['enter'])}
              v-slots={slots}
            >
            </ZFilterForm>
            {isFunction(slots.formBottom) ? slots.formBottom() : null}
          </>
        ),
      })
    }

    const renderOperateForm = () => {
      const columns = currentMode.value === 'add' ? addFormColumns.value : currentMode.value === 'edit' ? editFormColumns.value : detailColumns.value
      // const formData = currentMode.value === 'add' ? props.addFormData : currentMode.value === 'edit' ? props.editFormData : rowData.value
      const formProps = omit(props.form || {}, EXCLUDE_FORM_PROPS_KEYS)
      const operateFormProps = currentMode.value === 'add' ? omit(props.add || {}, EXCLUDE_FORM_PROPS_KEYS) : omit(props.edit || {}, EXCLUDE_FORM_PROPS_KEYS)
      return (
        <ZForm
          {...{ size: size.value, labelWidth: '60px', ...formProps, ...operateFormProps }}
          ref={dialogForm}
          columns={columns}
          options={props.options}
          modelValue={dialogFormData.value}
          onUpdate:modelValue={(val: any) => { dialogFormData.value = val }}
          v-loading={isOperateFormLoading.value}
          v-slots={slots}
        >

        </ZForm>
      )
    }

    const renderDialog = () => {
      return (
        <ZDialog
          modelValue={isShowDialog.value}
          onUpdate:modelValue={(val: boolean) => isShowDialog.value = val}
          {...dialogProps.value}
          onOpen={handleDialogOpen}
          onClosed={handleDialogClosed}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        >
          {renderOperateForm()}
        </ZDialog>
      )
    }

    const renderDrawer = () => {
      return (
        <ElDrawer
          modelValue={isShowDrawer.value}
          onUpdate:modelValue={(val: boolean) => isShowDrawer.value = val}
          {...drawerProps.value}
          onOpen={() => handleDrawerOpen(rowData.value)}
        >
          <ZDescription v-loading={isDescLoading.value} columns={descriptionColumns.value} detail={viewData.value} {...{ size: size.value, ...descriptionProps.value }} />
        </ElDrawer>
      )
    }

    const renderMiddleContent = () => {
      return isFunction(slots.crudMiddle) ? slots.crudMiddle() : null
    }

    const renderCrudDecorator = () => {
      const content = () => (
        <>
          {renderSearchForm()}
          {renderMiddleContent()}
          {renderTable()}
        </>
      )
      if (isString(props.watermark)) {
        return (
          <ElWatermark content={props.watermark}>
            {content()}
          </ElWatermark>
        )
      }
      if (isObject(props.watermark)) {
        return (
          <ElWatermark {...{ ...props.watermark }}>
            {content()}
          </ElWatermark>
        )
      }
      return content()
    }

    return () => {
      // eslint-disable-next-line no-console
      console.log('刷新')
      return (
        <div ref="crudRef" class={ns.b('')}>
          {renderCrudDecorator()}
          {renderDialog()}
          {renderDrawer()}
        </div>
      )
    }
  },
})
