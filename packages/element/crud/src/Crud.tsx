import { useAttrs } from 'element-plus'
import { omit, pick } from 'lodash-unified'
import { useFormMethods } from '../../form/hooks'
import {
  useTableMethods,
} from '../../table/hooks'
import { useFormColumns } from '../hooks'
import { crudProps, formKeys, tableKeys } from './props'

export default defineComponent({
  name: 'ZCrud',
  props: crudProps,
  emits: ['update:formData', 'update:pagination'],
  setup(props, { emit }) {
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
        children: <z-table ref="zTableRef" {...{ ...pick(props, tableKeys), columns: props.columns, ...attrs.value }}></z-table>,
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
          modelValue={props.formData}
          onUpdate:modelValue={(val: any) => { emit('update:formData', val) }}
        >
        </z-filter-form>,
      })
    }

    return () => {
      return <div class={ns.b('')}>
        {renderForm()}
        {renderTable()}
      </div>
    }
  },
})
