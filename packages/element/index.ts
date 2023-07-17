import ZCheckbox from './checkbox'
import ZRadio from './radio'
import ZSelect from './select'
import ZRow from './row'
import ZCol from './col'
import Form from './form'
import ZInput from './input'
import Table from './table'
import TagSelect from './tag-select'
import ZText from './text'
import ZWatermark from './watermark'
import CheckCard from './check-card'
import ZDescription from './descriptions'
import { makeInstaller } from './makeInstaller'

const { ZForm, ZFilterForm } = Form
const { ZTable, ZTableCustomColumnContainer } = Table
const { ZCheckCard, ZCheckCardGroup } = CheckCard
const { ZTagSelect, ZTagSelectGroup } = TagSelect

const components = [ZCheckbox, ZRadio, ZSelect, ZRow, ZCol, ZForm, ZInput,
  ZTable, ZFilterForm, ZTagSelect, ZText, ZWatermark, ZCheckCard, ZCheckCardGroup, ZDescription, ZTagSelectGroup, ZTableCustomColumnContainer]

const installer = makeInstaller([...components])

export default installer
export * from './types'

export {
  ZRadio, ZSelect, ZCheckbox, ZRow, ZCol, ZForm, ZInput, ZTable, ZFilterForm,
  ZTagSelect, ZText, ZWatermark, ZCheckCard, ZCheckCardGroup, ZDescription, ZTagSelectGroup, ZTableCustomColumnContainer,
}
