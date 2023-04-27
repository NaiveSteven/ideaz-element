import { withInstall } from '@ideaz/utils'
import Form from './src/BaseForm.tsx'
import FilterForm from './src/FilterForm.tsx'

export default { ZForm: withInstall(Form), ZFilterForm: withInstall(FilterForm) }
