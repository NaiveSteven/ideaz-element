import { withInstall } from '@ideaz/utils'
import Form from './src/BaseForm'
import FilterForm from './src/FilterForm'
import FormItem from './src/FormItem'

export default { ZForm: withInstall(Form), ZFilterForm: withInstall(FilterForm), ZFormItem: withInstall(FormItem) }
export * from './src/props'
