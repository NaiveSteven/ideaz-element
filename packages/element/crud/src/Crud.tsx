import { useAttrs } from 'element-plus'
import { omit, pick } from 'lodash-unified'
import { Delete, Download, Plus } from '@element-plus/icons-vue'
import { isFunction } from '@ideaz/utils'
import type { ComponentInternalInstance } from 'vue'
import { useFormMethods } from '../../form/hooks'
import {
  useTableMethods,
} from '../../table/hooks'
import { useDataRequest, useDescriptions, useDialogConfig, useDrawerConfig, useFormColumns, useSelectionData } from '../hooks'
import { crudProps, crudProvideKey, formKeys } from './props'

export default defineComponent({
  name: 'ZCrud',
  props: crudProps,
  emits: ['update:formData', 'update:pagination', 'search', 'reset', 'refresh', 'submit', 'delete',
    'sort-change', 'update:data', 'update:editFormData', 'update:addFormData', 'update:selectionData', 'update:loading', 'selection-change'],
  setup(props, { emit, slots }) {
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
    } = useFormMethods(props)
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
    } = useDataRequest(props, emit)
    const { selectionData, isSelection, handleCheckboxChange, handleCloseAlert, handleMultipleDelete } = useSelectionData(props, emit, tableProps, getTableData)
    const { addFormColumns, editFormColumns, searchFormColumns, detailColumns } = useFormColumns(props)
    const { dialogProps, dialogFormData, dialogForm, handleCancel, handleConfirm, handleDialogClosed } = useDialogConfig(props, emit, currentMode, isShowDialog, rowData)
    const { drawerProps, isDescLoading, viewData, handleDrawerOpen } = useDrawerConfig(props)
    const { descriptionColumns, descriptionProps } = useDescriptions(props)
    const ns = useNamespace('crud')
    const { t } = useLocale()
    const size = useFormSize()

    provide(crudProvideKey, {
      props,
      size: tableProps.value.size,
    })

    useExpose({
      resetFields,
      validate,
      validateField,
      clearValidate,
      scrollToField,
    })

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
      getTableData,
    })
    const { proxy: ctx } = getCurrentInstance() as ComponentInternalInstance

    const renderDecorator = (decoratorProps: any) => {
      const nativeTags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      const isNativeTag = nativeTags.includes(decoratorProps.name)
      const name = decoratorProps.name ? isNativeTag ? decoratorProps.name : resolveComponent(decoratorProps.name) : resolveComponent('el-card')
      return h(name, omit(decoratorProps, ['children', 'name']), isNativeTag ? decoratorProps.children : () => decoratorProps.children)
    }

    const renderAlert = () => {
      const { alert } = props
      if (isFunction(alert.render))
        return alert.render(selectionData.value)

      return <el-alert
        type="success"
        close-text={t('crud.unselect')}
        onClose={handleCloseAlert}
        {...omit(props.alert, 'title')}
        v-slots={{
          title: isFunction(alert.title)
            ? () => (alert.title as Function)(selectionData.value, ctx!.$refs.zTableRef)
            : () => (alert.title || t('crud.selected') + selectionData.value.length + t('crud.term')),
          default: isFunction(alert.content) ? () => (alert.content as Function)(selectionData.value, ctx!.$refs.zTableRef) : () => (alert.content || ''),
        }}
      />
    }

    const renderTable = () => {
      return renderDecorator({
        ...props.tableDecorator,
        class: ns.be('table', 'container'),
        children: <z-table
          ref="zTableRef"
          {...tableProps.value}
          v-slots={{
            ...slots,
            topLeft: () => {
              return <>
                {slots.topLeft && slots.topLeft()}
                <el-button
                  size={size.value}
                  type='primary'
                  icon={Plus}
                  onClick={() => {
                    currentMode.value = 'add'
                    isShowDialog.value = true
                  }}
                >
                  {t('crud.add')}
                </el-button>
                {!!props.export && <el-button size={size.value} type='primary' icon={Download} class={ns.e('export')} onClick={handleExport}>{t('crud.export')}</el-button>}
                {!!isSelection.value
                  && <el-button
                    plain
                    size={size.value}
                    type='danger'
                    class={ns.e('multiple-delete')}
                    icon={Delete}
                    onClick={handleMultipleDelete}>
                    {t('crud.multipleDelete')}
                  </el-button>}
              </>
            },
            topBottom: () => {
              if (isSelection.value)
                return renderAlert()

              return slots.topBottom?.()
            },
          }}
          onRefresh={handlePaginationChange}
          onSort-change={handleSortChange}
          onSelection-change={handleCheckboxChange}
          onRadio-change={handleRadioChange}
        >
        </z-table>,
      })
    }

    const renderSearchForm = () => {
      return renderDecorator({
        ...props.formDecorator,
        style: {
          marginBottom: '16px',
          ...props.formDecorator?.style,
        },
        class: ns.be('filter-form', 'container'),
        children: <z-filter-form
          ref="formRef"
          {...{ ...pick(props, formKeys), columns: searchFormColumns.value, ...attrs.value, searchLoading: tableProps.value.loading }}
          modelValue={middleFormData.value}
          onUpdate:modelValue={(val: any) => { middleFormData.value = val }}
          onSearch={handleSearch}
          onReset={handleReset}
          onkeydown={(e: KeyboardEvent) => handleKeyDown(e)}
        >
        </z-filter-form>,
      })
    }

    const renderOperateForm = () => {
      const columns = currentMode.value === 'add' ? addFormColumns.value : currentMode.value === 'edit' ? editFormColumns.value : detailColumns.value
      const formData = currentMode.value === 'add' ? props.addFormData : currentMode.value === 'edit' ? props.editFormData : rowData.value
      const formProps = omit(props.form || {}, ['columns'])
      return <z-form
        {...formProps}
        ref={dialogForm}
        columns={columns}
        modelValue={dialogFormData.value}
        onUpdate:modelValue={(val: any) => { dialogFormData.value = val }}
      >

      </z-form>
    }

    const renderDialog = () => {
      return <z-dialog
        modelValue={isShowDialog.value}
        onUpdate:modelValue={(val: boolean) => isShowDialog.value = val}
        {...dialogProps.value}
        onClosed={handleDialogClosed}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      >
        {renderOperateForm()}
      </z-dialog>
    }

    const renderDrawer = () => {
      return <el-drawer
        modelValue={isShowDrawer.value}
        onUpdate:modelValue={(val: boolean) => isShowDrawer.value = val}
        {...drawerProps.value}
        onOpen={() => handleDrawerOpen(rowData.value)}
      >
        <z-descriptions v-loading={isDescLoading.value} columns={descriptionColumns.value} detail={viewData.value} {...descriptionProps.value} />
      </el-drawer>
    }

    return () => {
      console.log('刷新')
      return <div class={ns.b('')}>
        {renderSearchForm()}
        {renderTable()}
        {renderDialog()}
        {renderDrawer()}
      </div>
    }
  },
})
