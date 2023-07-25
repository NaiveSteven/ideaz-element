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
      default: 'small',
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
        <el-button type="primary" link size='small'>
          {isString(dropdownProps.reference) ? dropdownProps.reference : '更多'}
          <el-icon class="el-icon--right">
            <i-arrow-down />
          </el-icon>
        </el-button>
      )
    }

    return () => {
      const { size, button, scope } = props
      const isShowButton = getButtonVisible(
        button,
        scope.row,
        scope.$index,
        scope.column,
      )

      if (isShowButton) {
        if (button.type === 'dropdown') {
          const dropdownProps = reactiveOmit(button, ['children', 'type', 'hide', 'click'])
          return <el-dropdown
            type="primary"
            size={'small'}
            trigger="click"
            class={ns.e('dropdown')}
            {...dropdownProps}
            onCommand={(command: string) => {
              const btn = button.children.find((item: BtnItem) => item.label === command)
              if (btn && isFunction(btn.click)) btn.click(scope.row, scope.$index, scope.column)
            }}
            v-slots={{
              dropdown: () => (
                <el-dropdown-menu>
                  {button.children.map((button: BtnItem) => {
                    const dropdownProps = reactiveOmit(button, ['children', 'type', 'hide', 'click', 'isDisabled'])
                    return (
                      <el-dropdown-item
                        {...dropdownProps}
                        disabled={
                          button.isDisabled
                          && button.isDisabled(scope.row, scope.$index, scope.column)
                        }
                        command={button.label}
                      >
                        {button.label}
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
            size={size}
            disabled={
              button.isDisabled
              && button.isDisabled(scope.row, scope.$index, scope.column)
            }
            {...button}
            onClick={
              button.click
                ? () => button.click!(scope.row, scope.$index, scope.column)
                : () => { }
            }
          >
            {button.label}
          </el-button>
        )
      }
      return null
    }
  },
})
