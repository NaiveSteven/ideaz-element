import { isFunction, isObject, isString } from '@ideaz/utils';

export default defineComponent({
  name: 'FormItemLabel',
  props: {
    label: {
      type: String,
      default: '',
    },
    tooltip: {
      type: [String, Function, Object],
      default: '',
    },
    colon: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return () => {
      const { label, colon, tooltip } = props;

      const tooltipProps = isObject(tooltip)
        ? tooltip
        : { content: isString(tooltip) ? tooltip : '' };
      const tooltipSlot: any = {};

      if (isFunction(tooltip)) {
        tooltipSlot.content = () => tooltip(h);
      }

      return (
        <span>
          {label}
          <el-tooltip
            effect="dark"
            placement="top"
            {...tooltipProps}
            v-slots={tooltipSlot}
          >
            {tooltip && (
              <el-icon class="c-form-item-label__icon">
                <i-question-filled />
              </el-icon>
            )}
          </el-tooltip>
          {colon ? ':' : null}
        </span>
      );
    };
  },
});
