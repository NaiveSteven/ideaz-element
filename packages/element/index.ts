import ZCheckbox from './checkbox'
import ZRadio from './radio'
import ZSelect from './select'
import ZRow from './row'
import ZCol from './col'
import Form from './form'
import ZInput from './input'
import ZTable from './table'
import TagSelect from './tag-select'
import ZText from './text'
import ZWatermark from './watermark'
import CheckCard from './check-card'
import ZDescription from './description'
import { makeInstaller } from './makeInstaller'

const { ZForm, ZFilterForm } = Form
const { ZCheckCard, ZCheckCardGroup } = CheckCard
const { ZTagSelect, ZTagSelectGroup } = TagSelect

const components = [ZCheckbox, ZRadio, ZSelect, ZRow, ZCol, ZForm, ZInput, ZTable, ZFilterForm, ZTagSelect, ZText, ZWatermark, ZCheckCard, ZCheckCardGroup, ZDescription, ZTagSelectGroup]

const installer = makeInstaller([...components])

export default installer
export * from './types'

export { ZRadio, ZSelect, ZCheckbox, ZRow, ZCol, ZForm, ZInput, ZTable, ZFilterForm, ZTagSelect, ZText, ZWatermark, ZCheckCard, ZCheckCardGroup, ZDescription, ZTagSelectGroup }
