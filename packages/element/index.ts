import ZCheckbox from './checkbox'
import ZRadio from './radio'
import ZSelect from './select'
import ZRow from './row'
import ZCol from './col'
import Form from './form'
import ZInput from './input'
import ZTable from './table'
import { makeInstaller } from './makeInstaller'

const { ZForm, ZFilterForm } = Form

const components = [ZCheckbox, ZRadio, ZSelect, ZRow, ZCol, ZForm, ZInput, ZTable, ZFilterForm]

const installer = makeInstaller([...components])

export default installer
export * from './types'

export { ZRadio, ZSelect, ZCheckbox, ZRow, ZCol, ZForm, ZInput, ZTable, ZFilterForm }
