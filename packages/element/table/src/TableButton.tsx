import { isBoolean, isFunction, isSlot, isString } from '@ideaz/utils'
import { ArrowDown } from '@element-plus/icons-vue'
import { omit } from 'lodash-unified'
import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from 'element-plus'
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

    const getKeyValue = (config: any, key: string, scope: TableColumnScopeData, defaultValue: boolean) => {
      if (!config)
        return defaultValue
      const keys = Object.keys(config)
      if (keys.includes(key)) {
        return isBoolean(config[key])
          ? config[key]
          : isFunction(config[key])
            ? (config[key] as (scope: TableColumnScopeData) => boolean)(scope)
            : false
      }
      return false
    }

    // const getButtonVisible = (button: BtnItem, scope: TableColumnScopeData) => {
    //   const keys = Object.keys(button)
    //   if (keys.includes('hide')) {
    //     return isBoolean(button.hide)
    //       ? !button.hide
    //       : isFunction(button.hide)
    //         ? !(button.hide as (scope: TableColumnScopeData) => boolean)(scope)
    //         : true
    //   }
    //   return true
    // }

    // const getDisabled = (button: BtnItem, scope: TableColumnScopeData) => {
    //   const keys = Object.keys(button)
    //   if (keys.includes('disabled')) {
    //     return isBoolean(button.disabled)
    //       ? button.disabled
    //       : isFunction(button.disabled)
    //         ? (button.disabled as (scope: TableColumnScopeData) => boolean)(scope)
    //         : false
    //   }
    //   return false
    // }

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
        <ElButton type="primary" link size={size.value}>
          {isString(dropdownProps.reference) ? dropdownProps.reference : t('table.more')}
          <ElIcon class="el-icon--right">
            <ArrowDown />
          </ElIcon>
        </ElButton>
      )
    }

    return () => {
      const { button, scope } = props
      const isShowButton = !getKeyValue(button, 'hide', scope, false)

      if (isShowButton) {
        if (button.type === 'dropdown') {
          const dropdownProps = omit(button, FILTER_KEYS)
          return (
            <ElDropdown
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
                  <ElDropdownMenu>
                    {button.children?.map((dropdownItem: BtnItem) => {
                      const dropdownProps = omit(dropdownItem, FILTER_KEYS)
                      const isHide = isFunction(dropdownItem.hide) ? dropdownItem.hide(scope) : dropdownItem.hide
                      if (isHide)
                        return null
                      return (
                        <ElDropdownItem
                          {...dropdownProps}
                          disabled={getKeyValue(dropdownItem, 'disabled', scope, false)}
                          command={dropdownItem.label}
                        >
                          {dropdownItem.label}
                        </ElDropdownItem>
                      )
                    })}
                  </ElDropdownMenu>
                ),
              }}
            >
              {renderReference(scope, button)}
            </ElDropdown>
          )
        }
        return (
          <ElButton
            size={size.value}
            {...{
              ...button,
              type: button.type,
              disabled: getKeyValue(button, 'disabled', scope, false),
              onClick: () => {
                if (isFunction(button.onClick))
                  button.onClick(scope)
              },
            }}
          >
            {button.label}
          </ElButton>
        )
      }
      return null
    }
  },
})
