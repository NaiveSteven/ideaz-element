import { isBoolean, isFunction, isSlot, isString } from '@ideaz/utils'
import { ArrowDown } from '@element-plus/icons-vue'
import { omit } from 'lodash-unified'
import type { BtnItem, TableColumnScopeData } from '../../types'

export default defineComponent({
  name: 'ZTableButton',
  props: {
    button: {
      type: Object as PropType<BtnItem>,
      default: () => ({}),
    },
    size: {
      type: String,
    },
    scope: {
      type: Object as PropType<TableColumnScopeData>,
      default: () => ({}),
    },
    tableColumnSlots: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const ns = useNamespace('table-column')
    const size = useFormSize()
    const { t } = useLocale()

    const FILTER_KEYS = ['children', 'type', 'hide', 'onClick']

    const getButtonVisible = (button: BtnItem, scope: TableColumnScopeData) => {
      const keys = Object.keys(button)
      if (keys.includes('hide')) {
        return isBoolean(button.hide)
          ? !button.hide
          : isFunction(button.hide)
            ? !(button.hide as (scope: TableColumnScopeData) => boolean)(scope)
            : true
      }
      return true
    }

    const getDisabled = (button: BtnItem, scope: TableColumnScopeData) => {
      const keys = Object.keys(button)
      if (keys.includes('disabled')) {
        return isBoolean(button.disabled)
          ? button.disabled
          : isFunction(button.disabled)
            ? (button.disabled as (scope: TableColumnScopeData) => boolean)(scope)
            : false
      }
      return false
    }

    const renderReference = (
      scope: TableColumnScopeData,
      dropdownProps: BtnItem,
    ) => {
      const reference = dropdownProps.reference
      if (isFunction(reference))
        return reference(scope)

      if (isString(reference) && isSlot(reference))
        return props.tableColumnSlots[reference](scope)

      return (
        <el-button type="primary" link size={size.value}>
          {isString(dropdownProps.reference) ? dropdownProps.reference : t('table.more')}
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </el-button>
      )
    }

    return () => {
      const { button, scope } = props
      const isShowButton = getButtonVisible(button, scope)

      if (isShowButton) {
        if (button.type === 'dropdown') {
          const dropdownProps = omit(button, FILTER_KEYS)
          return (
            <el-dropdown
              type="primary"
              size={size.value}
              trigger="click"
              class={ns.e('dropdown')}
              {...dropdownProps}
              onCommand={(command: string) => {
                const dropdownItem = button.children?.find((item: BtnItem) => item.label === command)
                if (dropdownItem && isFunction(dropdownItem.onClick))
                  dropdownItem.onClick(scope)
              }}
              v-slots={{
                dropdown: () => (
                  <el-dropdown-menu>
                    {button.children?.map((dropdownItem: BtnItem) => {
                      const dropdownProps = omit(dropdownItem, FILTER_KEYS)
                      const isHide = isFunction(dropdownItem.hide) ? dropdownItem.hide(scope) : dropdownItem.hide
                      if (isHide)
                        return null
                      return (
                        <el-dropdown-item
                          {...dropdownProps}
                          disabled={getDisabled(dropdownItem, scope)}
                          command={dropdownItem.label}
                        >
                          {dropdownItem.label}
                        </el-dropdown-item>
                      )
                    })}
                  </el-dropdown-menu>
                ),
              }}
            >
              {renderReference(scope, button)}
            </el-dropdown>
          )
        }
        return (
          <el-button
            size={size.value}
            {...{
              ...button,
              disabled: getDisabled(button, scope),
              onClick: () => {
                if (isFunction(button.onClick))
                  button.onClick(scope)
              },
            }}
          >
            {button.label}
          </el-button>
        )
      }
      return null
    }
  },
})
