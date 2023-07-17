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
  },
  setup(props) {
    const getIsShowButton = (button: BtnItem, row: any, index: number, column: any) => {
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

    return () => {
      const { size, button, scope } = props
      const isShowButton = getIsShowButton(
        button,
        scope.row,
        scope.$index,
        scope.column,
      )

      if (isShowButton) {
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
