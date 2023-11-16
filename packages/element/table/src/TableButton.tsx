import { isBoolean, isFunction, isSlot, isString } from '@ideaz/utils'
import { ArrowDown } from '@element-plus/icons-vue'
import { omit } from 'lodash-unified'
import type { BtnItem } from '~/types'

// interface DropdownProps {
//   disabled?: boolean | ((row: any, index: number, column: any) => boolean)
//   reference?: string | ((h: any, scope: any) => VNode)
//   size?: string
//   trigger?: string
//   type?: string
//   onCommand?: (command: string) => void
// }

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
      type: Object,
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

    const getButtonVisible = (button: BtnItem, row: any, index: number, column: any) => {
      const keys = Object.keys(button)
      if (keys.includes('hide')) {
        return isBoolean(button.hide)
          ? !button.hide
          : isFunction(button.hide)
            ? !(button.hide as (row: any, index: number, column: any) => boolean)(row, index, column)
            : true
      }
      return true
    }

    const getDisabled = (button: BtnItem, row: any, index: number, column: any) => {
      const keys = Object.keys(button)
      if (keys.includes('disabled')) {
        return isBoolean(button.disabled)
          ? button.disabled
          : isFunction(button.disabled)
            ? (button.disabled as (row: any, index: number, column: any) => boolean)(row, index, column)
            : false
      }
      return false
    }

    const renderReference = (
      scope: any,
      dropdownProps: BtnItem,
    ) => {
      const reference = dropdownProps.reference
      if (isFunction(reference))
        return reference(h, scope)

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
      const isShowButton = getButtonVisible(
        button,
        scope.row,
        scope.$index,
        scope.column,
      )

      if (isShowButton) {
        if (button.type === 'dropdown') {
          const dropdownProps = omit(button, FILTER_KEYS)
          return <el-dropdown
            type="primary"
            size={size.value}
            trigger="click"
            class={ns.e('dropdown')}
            {...dropdownProps}
            onCommand={(command: string) => {
              const dropdownItem = button.children?.find((item: BtnItem) => item.label === command)
              if (dropdownItem && isFunction(dropdownItem.onClick)) dropdownItem.onClick(scope.row, scope.$index, scope.column)
            }}
            v-slots={{
              dropdown: () => (
                <el-dropdown-menu>
                  {button.children?.map((dropdownItem: BtnItem) => {
                    const dropdownProps = omit(dropdownItem, FILTER_KEYS)
                    const isHide = isFunction(dropdownItem.hide) ? dropdownItem.hide() : dropdownItem.hide
                    if (isHide) return null
                    return (
                      <el-dropdown-item
                        {...dropdownProps}
                        disabled={getDisabled(dropdownItem, scope.row, scope.$index, scope.column)}
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
        }
        return (
          <el-button
            size={size.value}
            {...{
              ...button,
              disabled: getDisabled(button, scope.row, scope.$index, scope.column),
              onClick: () => {
                if (isFunction(button.onClick)) button.onClick(scope.row, scope.$index, scope.column)
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
