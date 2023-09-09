import { useAttrs } from 'element-plus'
import { omit, pick } from 'lodash-unified'
import { useFormMethods } from '../../form/hooks'
import {
  useTableMethods,
} from '../../table/hooks'
import { useDataRequest, useDescriptions, useDialogConfig, useDrawerConfig, useFormColumns } from '../hooks'
import { crudProps, formKeys } from './props'

export default defineComponent({
  name: 'ZCrud',
  props: crudProps,
  emits: ['update:formData', 'update:pagination', 'search', 'reset', 'refresh', 'submit', 'delete', 'sort-change', 'update:data', 'update:editFormData', 'update:addFormData'],
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
      isUseFormDataStorage,
      handleCheckboxChange,
      handleRadioChange,
      handleExport,
      getTableData,
      isShowDialog,
      rowData,
      currentMode,
      isShowDrawer,
    } = useDataRequest(props, emit)
    const { addFormColumns, editFormColumns, searchFormColumns, detailColumns } = useFormColumns(props)
    const { dialogProps, dialogFormData, dialogForm, handleCancel, handleConfirm, handleDialogClosed } = useDialogConfig(props, emit, currentMode, isShowDialog, rowData)
    const { drawerProps } = useDrawerConfig(props)
    const { descriptionColumns, descriptionProps } = useDescriptions(props)
    const ns = useNamespace('crud')
    const { t } = useLocale()

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

    const renderDecorator = (decoratorProps: any) => {
      const nativeTags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      const isNativeTag = nativeTags.includes(decoratorProps.name)
      const name = decoratorProps.name ? isNativeTag ? decoratorProps.name : resolveComponent(decoratorProps.name) : resolveComponent('el-card')
      return h(name, omit(decoratorProps, ['children', 'name']), isNativeTag ? decoratorProps.children : () => decoratorProps.children)
    }

    const renderTable = () => {
      return renderDecorator({
        ...props.tableDecorator,
        children: <z-table
          ref="zTableRef"
          {...tableProps.value}
          topRender={() =>
            (slots.topLeft || slots.topRight || props.export) && (
              <div class={ns.b('top')}>
                <div>
                  {slots.topLeft && slots.topLeft()}
                  <el-button
                    size={tableProps.value.size || 'small'}
                    type='primary'
                    onClick={() => {
                      currentMode.value = 'add'
                      isShowDialog.value = true
                    }}
                  >
                    {t('crud.add')}
                  </el-button>
                  <el-button size={tableProps.value.size || 'small'} type='primary' class={ns.be('top', 'export')} onClick={handleExport}>{t('crud.export')}</el-button>
                </div>
                <div>{slots.topRight && slots.topRight()}</div>
              </div>
            )
          }
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
        children: <z-filter-form
          ref="formRef"
          {...{ ...pick(props, formKeys), columns: searchFormColumns.value, ...attrs.value }}
          modelValue={isUseFormDataStorage.value ? middleFormData.value : props.formData}
          onUpdate:modelValue={(val: any) => { emit('update:formData', val) }}
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
      >
        <z-descriptions columns={descriptionColumns.value} detail={rowData.value} {...descriptionProps.value} />
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
