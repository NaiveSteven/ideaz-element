import { useIsShowButton } from '../hooks'

export default defineComponent({
  name: 'TableButton',
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
    return () => {
      const { size, button, scope } = props
      const isShowButton = useIsShowButton(
        button,
        scope.row,
        scope.$index,
        scope.column,
      )

      if (isShowButton) {
        const buttonProps = { ...button }
        if (buttonProps.type === 'text') {
          delete buttonProps.type
          buttonProps.link = true
          buttonProps.type = 'primary'
        }
        return (
          <el-button
            size={size}
            disabled={
              button.isDisabled
              && button.isDisabled(scope.row, scope.$index, scope.column)
            }
            {...buttonProps}
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
