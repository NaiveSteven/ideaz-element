import { useFormMethods } from '../../form/hooks'
import {
  useTableMethods,
} from '../../table/hooks'

export default defineComponent({
  name: 'ZCrud',
  props: {},
  setup(props) {
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
      return <z-table ref="zTableRef"></z-table>
    }

    const renderForm = () => {
      return <z-filter-form ref="formRef"></z-filter-form>
    }

    return () => {
      return <div>
        {renderForm()}
        {renderTable()}
      </div>
    }
  },
})
