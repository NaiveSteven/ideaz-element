export const props = {
  layout: {
    type: Object,
    default: () => {
      return {
        rowLayout: {
          gutter: 0,
          interval: 0,
          justify: 'start',
          direction: 'row',
        },
        colLayout: {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 8,
        },
      };
    },
  },
  formConfig: {
    type: Object,
    default: () => {},
  },
  formItemConfig: {
    type: Array,
    default: () => [],
  },
  formModel: {
    type: Object,
    default: () => {},
  },
  options: {
    type: Object,
    default: () => {},
  },
};
