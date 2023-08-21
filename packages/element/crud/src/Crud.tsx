import { useAttrs } from 'element-plus'
import { omit, pick } from 'lodash-unified'
import { useFormMethods } from '../../form/hooks'
import {
  useTableMethods,
} from '../../table/hooks'
import { useDataRequest, useFormColumns } from '../hooks'
import { crudProps, formKeys } from './props'

export default defineComponent({
  name: 'ZCrud',
  props: crudProps,
  emits: ['update:formData', 'update:pagination', 'search', 'reset', 'refresh', 'sort-change', 'update:data'],
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
    } = useDataRequest(props, emit)
    const { formColumns } = useFormColumns(props)
    const ns = useNamespace('crud')

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
                <div>{slots.topLeft && slots.topLeft()}</div>
                <el-button size={tableProps.value.size || 'small'} type='primary' class={ns.be('top', 'export')} onClick={handleExport}>导出</el-button>
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

    const renderForm = () => {
      return renderDecorator({
        ...props.formDecorator,
        style: {
          marginBottom: '16px',
          ...props.formDecorator?.style,
        },
        children: <z-filter-form
          ref="formRef"
          {...{ ...pick(props, formKeys), columns: formColumns.value, ...attrs.value }}
          modelValue={isUseFormDataStorage.value ? middleFormData.value : props.formData}
          onUpdate:modelValue={(val: any) => { emit('update:formData', val) }}
          onSearch={handleSearch}
          onReset={handleReset}
          onkeydown={(e: KeyboardEvent) => handleKeyDown(e)}
        >
        </z-filter-form>,
      })
    }

    return () => {
      console.log('刷新')
      return <div class={ns.b('')}>
        {renderForm()}
        {renderTable()}
      </div>
    }
  },
})
