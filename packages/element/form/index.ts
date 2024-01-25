import { withInstall } from '@ideaz/utils'
import Form from './src/BaseForm.tsx'
import FilterForm from './src/FilterForm.tsx'
import FormItem from './src/FormItem.tsx'

export default { ZForm: withInstall(Form), ZFilterForm: withInstall(FilterForm), ZFormItem: withInstall(FormItem) }
