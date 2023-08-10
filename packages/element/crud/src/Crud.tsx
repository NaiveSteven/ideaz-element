import { useAttrs } from 'element-plus'
import { pick } from 'lodash-unified'
import { useFormMethods } from '../../form/hooks'
import {
  useTableMethods,
} from '../../table/hooks'
import { crudProps, formKeys, tableKeys } from './props'

export default defineComponent({
  name: 'ZCrud',
  props: crudProps,
  setup(props) {
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
    })

    const renderTable = () => {
      return <z-table ref="zTableRef" {...{ ...pick(props, tableKeys), columns: props.columns, ...attrs.value }}></z-table>
    }

    const renderForm = () => {
      return <z-filter-form ref="formRef" {...{ ...pick(props, formKeys), columns: [], ...attrs.value }}></z-filter-form>
    }

    return () => {
      return <div>
        {renderForm()}
        {renderTable()}
      </div>
    }
  },
})
