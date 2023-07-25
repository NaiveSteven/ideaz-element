import { isFunction, isString } from '@ideaz/utils'
import { reactiveOmit } from '@vueuse/core'
import type { BtnItem } from '~/types'

export default defineComponent({
  name: 'ZTableButton',
  props: {
    button: {
      type: Object,
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

    const FILTER_KEYS = ['children', 'type', 'hide', 'onClick', 'isDisabled']

    const getButtonVisible = (button: BtnItem, row: any, index: number, column: any) => {
      const keys = Object.keys(button)
      if (keys.includes('hide')) {
        return typeof button.hide === 'boolean'
          ? !button.hide
          : typeof button.hide === 'function'
            ? !(button.hide as (row: any, index: number, column: any) => boolean)(row, index, column)
            : true
      }
      return true
    }

    const renderReference = (
      scope: any,
      dropdownProps: any,
    ) => {
      const reference = dropdownProps.reference
      if (isFunction(reference))
        return reference(h, { ...scope, index: scope.$index })

      if (isString(reference)) {
        if (reference.includes('slot') || reference.includes('Slot'))
          return props.tableColumnSlots[reference]({ ...scope, index: scope.$index })
      }
      return (
        <el-button type="primary" link size={size.value}>
          {isString(dropdownProps.reference) ? dropdownProps.reference : t('table.more')}
          <el-icon class="el-icon--right">
            <i-arrow-down />
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
          const dropdownProps = reactiveOmit(button, FILTER_KEYS)
          return <el-dropdown
            type="primary"
            size={size.value}
            trigger="click"
            class={ns.e('dropdown')}
            {...dropdownProps}
            onCommand={(command: string) => {
              const dropdownItem = button.children.find((item: BtnItem) => item.label === command)
              if (dropdownItem && isFunction(dropdownItem.onClick)) dropdownItem.onClick(scope.row, scope.$index, scope.column)
            }}
            v-slots={{
              dropdown: () => (
                <el-dropdown-menu>
                  {button.children.map((dropdownItem: BtnItem) => {
                    const dropdownProps = reactiveOmit(dropdownItem, FILTER_KEYS)
                    return (
                      <el-dropdown-item
                        {...dropdownProps}
                        disabled={
                          dropdownItem.isDisabled
                          && dropdownItem.isDisabled(scope.row, scope.$index, scope.column)
                        }
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
            disabled={
              button.isDisabled
              && button.isDisabled(scope.row, scope.$index, scope.column)
            }
            {...{
              ...button,
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
