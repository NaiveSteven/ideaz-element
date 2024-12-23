import { withInstall } from '@ideaz/utils'
import TagSelectItem from './src/TagSelectItem'
import TagSelect from './src/index'

export * from './src/props'
export default { ZTagSelect: withInstall(TagSelect), ZTagSelectItem: withInstall(TagSelectItem) }
