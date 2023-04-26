export const props = {
  loading: {
    type: Boolean,
    default: false,
  },
  tableCols: {
    type: Array,
    default: () => [],
  },
  tableStatistics: {
    type: Array,
    default: () => [],
  },
  pagination: {
    type: Object,
    default: () => ({ page: 1, page_size: 0, total: 0 }),
  },
  statisticsCustomClass: {
    type: String,
    default: '',
  },
  isPagination: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'small',
  },
  border: {
    type: Boolean,
    default: true,
  },
  message: {
    type: String,
    default: '',
  },
  topRender: {
    type: Function,
    default: () => null,
  },
  toolBar: {
    type: [Boolean, Object],
    default: true,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
};
