# Table

Generate tables through configuration, with built-in features more suitable for middle and back-end business.

:::tip
Some attributes are configured by default inside `z-table`, for example: `align` is set to `center`
:::

## Basic Usage

Configure `column` to generate table items. `el-table` related attributes are passed directly on the `z-table` component, `el-table-column` attributes are configured in `column`.

<preview path="../../demo/table/normal.vue" />

## Table Title

Configure `title` attribute to generate table title, supports string and function types, can also use `tableTitle` slot for customization.

<preview path="../../demo/table/title.vue" />

## Operation Buttons

Configure operation items in `column`, pass `button` to `type`, configure `buttons` array. Button attributes can be configured directly in operation items.

<preview path="../../demo/table/operation.vue" />

Operation buttons also support dynamic attributes, such as: `disabled`, etc. Pass a method with current row related data as parameter.

<preview path="../../demo/table/operation-dynamic.vue" />

## Operation Dropdown

If dropdown is needed, configure `type` as `dropdown` in `buttons` array, configure dropdown options in `children`

<preview path="../../demo/table/dropdown.vue" />

`reference` field configures dropdown reference text (default is `More`), supports function and string types.

Supports configuring `el-dropdown` and `el-dropdown-item` component attributes and methods.

<preview path="../../demo/table/reference.vue" />

## Pagination

Configure `pagination`, supports two-way binding to implement pagination effect. `layout` defaults to `total, sizes, prev, pager, next, jumper`, `pageSizes` defaults to `[100, 200, 300, 400, 500]`, supports customization.

<preview path="../../demo/table/pagination.vue" />

Configure `paginationLeft`, `paginationRight`, `paginationTop`, `paginationBottom` slots to customize pagination top, bottom, left, right content.

<preview path="../../demo/table/pagination-slot.vue" />

## Frontend Pagination

Configure `pagination` `type` as `front` to enable frontend pagination functionality, pass all data to `totalData` field.

When `pageSize` is `0`, `pagination` is `false` or `pagination` is not passed, pagination is not displayed.

<preview path="../../demo/table/pagination-front.vue" />

## Pagination Position

Configure `pagination` `align` field, supports `left`, `center`, `right`, defaults to `right`.

<preview path="../../demo/table/pagination-align.vue" />

## Hide Columns

Configure `hide` field in `column`, supports function or boolean value. Function returns boolean value, true means hide, false means show.

<preview path="../../demo/table/hide.vue" />

## Custom Column

Configure `slot` or `render` in `column` to implement custom column content.

<preview path="../../demo/table/custom-column.vue" />

## Column Types

Configure `type` in `column` to implement table column types, supports `expand`, `radio`, `selection`, `index`.

Supports custom column components, configure `component` field, supports `input`, `select`, `datepicker`, `switch`, any locally or globally registered components.

:::tip
When `type` is `radio` or cross-page selection `checkbox` is needed, it needs to be used with `rowKey` (default `id`).
:::

:::tip
When passing components directly to `component`, please use `markRaw` wrapper to prevent performance impact.
:::

<preview path="../../demo/table/column-type.vue" />

## Dynamic Attributes

`column` custom content supports dynamic attributes. Component attributes like `disabled`, `placeholder` support passing functions (function attributes are not supported yet, such as: `formatter` attribute of `ElInput` component), parameter is current row `scope` data.

<preview path="../../demo/table/dynamic-attributes.vue" />

## Custom Table Header

Configure `label` in `column` as string with `slot` or `Slot` or configure as `render` function to implement custom column header.

<preview path="../../demo/table/custom-header.vue" />

## Column Tooltip

Configure `tooltip` in `column` to implement table header tooltip functionality, supports function and string.

<preview path="../../demo/table/tooltip.vue" />

## Merge Same Items

Configure table attribute `mergeCells`, supports separate configuration of rows or columns, supports field configuration.

```ts
interface mergeCells {
  direction: 'row' | 'column' | 'both'  // Merge direction: row, column, or both
  props?: string[]  // Fields to merge, if not passed, all columns participate in merging
}
```

<preview path="../../demo/table/merge.vue" />

## Toolbar

> `toolBar` configuration item, used to configure table toolbar.

When `toolBar` value is `false`, toolbar is not displayed.

If you want to configure certain features not to display, configure the four fields `refresh`, `density`, `fullScreen`, `setting` under `toolBar` as `false`.

<preview path="../../demo/table/tool-bar.vue" />

`toolBar` supports configuring default unchecked items, configure `uncheck` field, value is `label` of `column` items.

<preview path="../../demo/table/uncheck.vue" />

`toolBar` supports excluding certain table items, configure `exclude` field, value is `label` of `column` items.

<preview path="../../demo/table/exclude.vue" />

`toolBar` top, bottom, left, right content supports customization through `toolBarTop`, `toolBarBottom`, `toolBarRight`, `toolBarLeft`, `tableTitle` slot configuration.

<preview path="../../demo/table/tool-bar-slot.vue" />

## Data Dragging

Set `draggable` to `true` to enable data dragging.

:::warning
Must configure `row-key`, otherwise update issues will occur.
:::

<preview path="../../demo/table/drag.vue" />

Supports setting `slot` or `render` to customize drag icon.

<preview path="../../demo/table/drag-icon.vue" />

## Editable Table

Set `editable` to `true` to enable table edit mode. This field supports boolean or object type, editable table `type` defaults to `single`.

<preview path="../../demo/table/editable.vue" />

Set `editable` `type` to `multiple` to enable multi-row edit mode.

Configure `maxLength` of `editable` to set maximum add quantity. Configure `deleteConfirm` of `editable` to `true` to enable delete confirmation.

<preview path="../../demo/table/editable-multiple.vue" />

Configure `onSave`, `onDelete`, `onEdit`, `onCancel` of `editable`.

<preview path="../../demo/table/editable-events.vue" />

Supports custom operation buttons.

<preview path="../../demo/table/custom-operation.vue" />

## Sticky

Implement sticky functionality by configuring `sticky` attribute's `top`, `parent (DOM element where scroll bar appears)` and `zIndex`.
`top` defaults to `50px`, `zIndex` defaults to `100`.

<preview path="../../demo/table/sticky.vue" />

Supports customizing sticky table header style through `sticky.style`.

<preview path="../../demo/table/sticky-style.vue" />

## Watermark

Configure `watermark`, for details refer to `el-watermark` configuration.

<preview path="../../demo/table/watermark.vue" />

## Table Methods

`z-table` table methods can be used according to `el-table`.

<preview path="../../demo/table/methods.vue" />

## z-table Attributes

| Attribute               | Description                                                                                                                                                                                               | Type                                                      | Accepted Values                                                                    | Default                                                                                      |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| modelValue:data         | Display data, supports two-way binding                                                                                                                                                                    | array                                                     | —                                                                                  | —                                                                                            |
| modelValue:pagination   | Pagination configuration, supports two-way binding                                                                                                                                                        | object                                                    | —                                                                                  | —                                                                                            |
| loading                 | Table loading                                                                                                                                                                                             | boolean                                                   | —                                                                                  | —                                                                                            |
| title                   | Table title                                                                                                                                                                                               | string / function                                         | —                                                                                  | —                                                                                            |
| columns                 | Table configuration items                                                                                                                                                                                 | array                                                     | —                                                                                  | —                                                                                            |
| toolBar                 | Toolbar configuration                                                                                                                                                                                     | object / boolean                                          | —                                                                                  | —                                                                                            |
| editable                | Editable table configuration                                                                                                                                                                              | object / boolean                                          | —                                                                                  | —                                                                                            |
| options                 | Table internal option data source                                                                                                                                                                         | object                                                    | —                                                                                  | —                                                                                            |
| watermark               | Watermark configuration                                                                                                                                                                                   | object (see `el-watermark` documentation for details)    | —                                                                                  | —                                                                                            |
| sticky                  | Table header sticky configuration                                                                                                                                                                         | object                                                    | —                                                                                  | —                                                                                            |
| totalData               | All table data (effective for frontend pagination)                                                                                                                                                       | array                                                     | —                                                                                  | —                                                                                            |
| mergeCells              | Table same item merge configuration                                                                                                                                                                       | object                                                    | —                                                                                  | —                                                                                            |
| height                  | Table height, defaults to auto height. If height is number type, unit is px; if height is string type, this height will be set as Table's style.height value, Table height will be controlled by external styles. | string / number                                           | —                                                                                  | —                                                                                            |
| max-height              | Table max height. Valid values are numbers or heights in px units.                                                                                                                                       | string / number                                           | —                                                                                  | —                                                                                            |
| stripe                  | Whether table is striped                                                                                                                                                                                  | boolean                                                   | —                                                                                  | false                                                                                        |
| border                  | Whether table has vertical borders                                                                                                                                                                        | boolean                                                   | —                                                                                  | false                                                                                        |
| size                    | Table size                                                                                                                                                                                                | string                                                    | large / default /small                                                             | —                                                                                            |
| fit                     | Whether column width fits content                                                                                                                                                                         | boolean                                                   | —                                                                                  | true                                                                                         |
| show-header             | Whether to show table header                                                                                                                                                                              | boolean                                                   | —                                                                                  | true                                                                                         |
| highlight-current-row   | Whether to highlight current row                                                                                                                                                                          | boolean                                                   | —                                                                                  | false                                                                                        |
| current-row-key         | Key of current row, write-only property                                                                                                                                                                   | string / number                                           | —                                                                                  | —                                                                                            |
| row-class-name          | Function for row className, can also use string to set fixed className for all rows.                                                                                                                     | function({ row, rowIndex }) / string                      | —                                                                                  | —                                                                                            |
| row-style               | Function for row style, can also use fixed Object to set same Style for all rows.                                                                                                                        | function({ row, rowIndex }) / object                      | —                                                                                  | —                                                                                            |
| cell-class-name         | Function for cell className, can also use string to set fixed className for all cells.                                                                                                                   | function({ row, column, rowIndex, columnIndex }) / string | —                                                                                  | —                                                                                            |
| cell-style              | Function for cell style, can also use fixed Object to set same Style for all cells.                                                                                                                      | function({ row, column, rowIndex, columnIndex }) / object | —                                                                                  | —                                                                                            |
| header-row-class-name   | Function for header row className, can also use string to set fixed className for all header rows.                                                                                                       | function({ row, rowIndex }) / string                      | —                                                                                  | —                                                                                            |
| header-row-style        | Function for header row style, can also use fixed Object to set same Style for all header rows.                                                                                                          | function({ row, rowIndex }) / object                      | —                                                                                  | —                                                                                            |
| header-cell-class-name  | Function for header cell className, can also use string to set fixed className for all header cells.                                                                                                     | function({ row, column, rowIndex, columnIndex }) / string | —                                                                                  | —                                                                                            |
| header-cell-style       | Function for header cell style, can also use fixed Object to set same Style for all header cells.                                                                                                        | function({ row, column, rowIndex, columnIndex }) / object | —                                                                                  | —                                                                                            |
| row-key                 | Key for row data, used to optimize Table rendering; required when using `reserve-selection` feature and displaying tree data. When type is String, supports multi-level access: `user.info.id`, but does not support `user.info[0].id`, use `Function` for this case. | function(row) / string                                    | —                                                                                  | —                                                                                            |
| empty-text              | Text displayed when data is empty, can also be set through `#empty` slot                                                                                                                                 | string                                                    | —                                                                                  | No Data                                                                                      |
| default-expand-all      | Whether to expand all rows by default, effective when Table contains expandable rows or is tree table                                                                                                    | boolean                                                   | —                                                                                  | false                                                                                        |
| expand-row-keys         | Set currently expanded rows through this property, requires row-key property to be set, this property is an array of keys for expanded rows.                                                            | array                                                     | —                                                                                  | —                                                                                            |
| default-sort            | Default sort column prop and order. Its `prop` property specifies default sort column, `order` specifies default sort order                                                                             | object                                                    | (order: 'ascending' 'descending')                                                 | 'descending')                                                                                |
| tooltip-effect          | `effect` of overflow tooltip                                                                                                                                                                              | string                                                    | dark / light                                                                       | dark                                                                                         |
| tooltip-options         | Options for overflow tooltip, [see tooltip component below](https://element-plus.org/en-US/component/tooltip.html#attributes)                                                                           | `object`                                                  | [see tooltip](https://element-plus.org/en-US/component/tooltip.html#attributes)   | `object`                                                                                     |
| show-summary            | Whether to show summary row at table footer                                                                                                                                                               | boolean                                                   | —                                                                                  | false                                                                                        |
| sum-text                | Text for first column of summary row                                                                                                                                                                      | string                                                    | —                                                                                  | Sum                                                                                          |
| summary-method          | Custom summary calculation method                                                                                                                                                                         | function({ columns, data })                               | —                                                                                  | —                                                                                            |
| span-method             | Method for merging rows or columns                                                                                                                                                                        | function({ row, column, rowIndex, columnIndex })          | —                                                                                  | —                                                                                            |
| select-on-indeterminate | Behavior when clicking header checkbox when only some rows are selected in multi-select table. If true, select all rows; if false, deselect all rows                                                  | boolean                                                   | —                                                                                  | true                                                                                         |
| indent                  | Indentation of tree nodes when displaying tree data                                                                                                                                                       | number                                                    | —                                                                                  | 16                                                                                           |
| lazy                    | Whether to lazy load child node data                                                                                                                                                                      | boolean                                                   | —                                                                                  | —                                                                                            |
| load                    | Function for loading child node data, effective when `lazy` is true                                                                                                                                       | function(row, treeNode, resolve)                          | —                                                                                  | —                                                                                            |
| tree-props              | Configuration options for rendering nested data                                                                                                                                                           | object                                                    | —                                                                                  | `{ hasChildren: 'hasChildren', children: 'children' }`                                      |
| table-layout            | Layout method for table cells, rows and columns                                                                                                                                                           | string                                                    | fixed / auto                                                                       | fixed                                                                                        |
| scrollbar-always-on     | Always show scrollbar                                                                                                                                                                                     | boolean                                                   | —                                                                                  | false                                                                                        |
| show-overflow-tooltip   | Whether to hide extra content and show them in Tooltip when cell content overflows. This will affect all columns.                                                                                       | boolean / [`object`](https://element-plus.org/en-US/component/table.html#table-attributes) | —                                                                                  | See [tooltip-options](https://element-plus.org/en-US/component/table.html#table-attributes) |
| flexible                | Ensure minimum size of main axis to not exceed content                                                                                                                                                    | boolean                                                   | —                                                                                  | false                                                                                        |
| virtual                 | Virtual scroll configuration, supports high-performance large data rendering                                                                                                                              | boolean / object                                          | See [virtual table documentation](./table-virtual.md)                             | false                                                                                        |

## z-table Events

| Event Name          | Description                                                                                                                                                                                              | Callback Parameters               |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| refresh             | Event triggered when paging                                                                                                                                                                              | pagination                        |
| radio-change        | Event triggered when user manually checks Radio of data row                                                                                                                                              | row                               |
| select              | Event triggered when user manually checks Checkbox of data row                                                                                                                                           | selection, row                    |
| select-all          | Event triggered when user manually checks select all Checkbox                                                                                                                                            | selection                         |
| selection-change    | Event triggered when selection changes                                                                                                                                                                   | selection                         |
| cell-mouse-enter    | Event triggered when cell hover enters                                                                                                                                                                   | row, column, cell, event          |
| cell-mouse-leave    | Event triggered when cell hover leaves                                                                                                                                                                   | row, column, cell, event          |
| cell-click          | Event triggered when a cell is clicked                                                                                                                                                                   | row, column, cell, event          |
| cell-dblclick       | Event triggered when a cell is double clicked                                                                                                                                                            | row, column, cell, event          |
| cell-contextmenu    | Event triggered when a cell is right clicked                                                                                                                                                             | row, column, cell, event          |
| row-click           | Event triggered when a row is clicked                                                                                                                                                                    | row, column, event                |
| row-contextmenu     | Event triggered when a row is right clicked                                                                                                                                                              | row, column, event                |
| row-dblclick        | Event triggered when a row is double clicked                                                                                                                                                             | row, column, event                |
| header-click        | Event triggered when a column header is clicked                                                                                                                                                          | column, event                     |
| header-contextmenu  | Event triggered when a column header is right clicked                                                                                                                                                    | column, event                     |
| sort-change         | Event triggered when table sort conditions change                                                                                                                                                        | `{ column, prop, order }`         |
| filter-change       | Column key, if you need to use filter-change event, this attribute is needed to identify which column's filter condition                                                                                | filters                           |
| current-change      | Event triggered when table's current row changes, if you want to highlight current row, please enable table's highlight-current-row attribute                                                          | currentRow, oldCurrentRow         |
| header-dragend      | Event triggered when dragging header changes column width                                                                                                                                                | newWidth, oldWidth, column, event |
| expand-change       | Event triggered when user expands or collapses a row (when expanding rows, second parameter is expandedRows; when tree table, second parameter is expanded)                                           | row, (expandedRows \| expanded)   |

## Column Configuration

| Attribute     | Description                      | Type                            | Default |
| :------------ | :------------------------------- | :------------------------------ | :------ |
| prop          | Field name                       | `string`                        | —       |
| label         | Column label                     | `string`                        | —       |
| width         | Column width                     | `string` / `number`             | —       |
| min-width     | Column minimum width             | `string` / `number`             | —       |
| fixed         | Whether column is fixed          | `string` / `boolean`            | —       |
| render-header | Custom render header function    | `Function`                      | —       |
| sortable      | Whether column is sortable       | `boolean` / `string`            | false   |
| sort-method   | Custom sort method               | `Function`                      | —       |
| sort-by       | Sort by which property           | `string` / `array` / `Function` | —       |
| sort-orders   | Available sort orders            | `array`                         | —       |
| resizable     | Whether column is resizable      | `boolean`                       | true    |
| formatter     | Function for formatting cell content| `Function`                   | —       |
| show-overflow-tooltip| Whether to show tooltip when content overflows| `boolean` / `object`| —       |
| align         | Column alignment                 | `string`                        | center  |
| header-align  | Header alignment                 | `string`                        | —       |
| class-name    | Column className                 | `string`                        | —       |
| label-class-name| Column label className         | `string`                        | —       |
| selectable    | Function for determining if row is selectable| `Function`        | —       |
| reserve-selection| Whether to reserve selection when data changes| `boolean`    | false   |
| filters       | Array of filter options          | `array`                         | —       |
| filter-placement| Placement of filter popup      | `string`                        | —       |
| filter-multiple| Whether filter allows multiple selection| `boolean`          | true    |
| filter-method | Custom filter method             | `Function`                      | —       |
| filtered-value| Filter value for selected filters| `array`                        | —       |

## z-table Methods

| Method Name        | Description                                                                                                    | Parameters                                                |
| :----------------- | :------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| clearSelection     | Clear selection for multi-select table                                                                        | —                                                         |
| getSelectionRows   | Return currently selected rows                                                                                 |                                                           |
| toggleRowSelection | Toggle selection state of a row for multi-select table, can directly set selection state with second parameter | row, selected                                             |
| toggleAllSelection | Toggle select all and deselect all for multi-select table                                                     | —                                                         |
| toggleRowExpansion | Toggle row expansion for expandable table or tree table. Use second parameter to directly set expansion state | row, expanded                                             |
| setCurrentRow      | Set a row as selected for single-select table, call without parameters to cancel current selection            | row                                                       |
| clearSort          | Clear sort conditions, data will restore to unsorted state                                                    | —                                                         |
| clearFilter        | Pass array of `columnKey` to clear filter conditions for specified columns. Clear all filters if no parameters | columnKeys                                                |
| doLayout           | Re-layout Table. You may need to call this method when table visibility changes to get correct layout         | —                                                         |
| sort               | Sort table manually. `prop` parameter specifies sort column, `order` specifies sort order.                    | prop: string, order: string                               |
| scrollTo           | Scroll to specific coordinates                                                                                 | (options: ScrollToOptions \| number, yCoord?: number)    |
| setScrollTop       | Set vertical scroll position                                                                                   | top                                                       |
| setScrollLeft      | Set horizontal scroll position                                                                                 | left                                                      |

## z-table Slots

| Slot Name        | Description                                                                                                                                    | Subtags |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| append           | Content inserted after the last row of table. If table has summary row, this slot will be above summary row.                                 | —       |
| empty            | Custom content when data is empty                                                                                                              | —       |
| tableTop         | Top slot                                                                                                                                       | —       |
| tableBottom      | Bottom slot                                                                                                                                    | —       |
| toolBarTop       | Toolbar top slot                                                                                                                               | —       |
| toolBarBottom    | Toolbar bottom slot                                                                                                                            | —       |
| toolBarRight     | Toolbar right slot                                                                                                                             | —       |
| toolBarLeft      | Toolbar left slot                                                                                                                              | —       |
| tableTitle       | Table title slot                                                                                                                               | —       |
| paginationTop    | Pagination top slot                                                                                                                            | —       |
| paginationBottom | Pagination bottom slot                                                                                                                         | —       |
| paginationLeft   | Pagination left slot                                                                                                                           | —       |
| paginationRight  | Pagination right slot                                                                                                                          | —       |
| footer           | Virtual table footer slot, only available in virtual scroll mode                                                                              | —       |

### pagination Attributes

| Attribute           | Description                                                                                                                                    | Type                   | Default                              |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :----------------------------------- |
| type                | Pagination type                                                                                                                                | `front` / `backbone`   | `backbone`                           |
| page                | Current page                                                                                                                                   | `number`               | —                                    |
| pageSize            | Number of items per page                                                                                                                       | `number`               | —                                    |
| align               | Pagination position                                                                                                                            | `left` / `center` / `right` | `right`                              |
| small               | Whether to use small pagination style                                                                                                          | `boolean`              | true                                 |
| background          | Whether to add background color to pagination buttons                                                                                          | `boolean`              | false                                |
| total               | Total number of items                                                                                                                          | `number`               | —                                    |
| page-count          | Total number of pages, set either `total` or `page-count` to display page numbers; use `total` if you need to support `page-sizes` changes  | `number`               | —                                    |
| pager-count         | Maximum number of page buttons. When total pages exceed this value, they will be collapsed                                                    | `number`               | 7                                    |
| layout              | Component layout, sub-component names separated by commas                                                                                      | `string`               | prev, pager, next, jumper, ->, total |
| page-sizes          | Options for page size selector                                                                                                                 | `object`               | [10, 20, 30, 40, 50, 100]            |
| popper-class        | Class name for page size selector dropdown                                                                                                     | `string`               | ''                                   |
| prev-text           | Text for previous page button instead of icon                                                                                                  | `string`               | ''                                   |
| prev-icon           | Icon for previous page, higher priority than `prev-text`                                                                                      | `string` / `Component` | ArrowLeft                            |
| next-text           | Text for next page button instead of icon                                                                                                     | `string`               | ''                                   |
| next-icon           | Icon for next page, lower priority than `next-text`                                                                                           | `string` / `Component` | ArrowRight                           |
| disabled            | Whether pagination is disabled                                                                                                                 | `boolean`              | false                                |
| teleported          | Whether to teleport dropdown to body                                                                                                           | `boolean`              | true                                 |
| hide-on-single-page | Whether to hide when there's only one page                                                                                                     | `boolean`              | false                                |

## editable Attributes

| Attribute     | Description        | Type                                        | Default  |
| :------------ | :----------------- | :------------------------------------------ | :------- |
| type          | Editable table mode | `single` / `multiple`                       | `single` |
| maxLength     | Maximum quantity   | `number`                                    | —        |
| deleteConfirm | Delete confirmation | `boolean`                                   | `false`  |
| onEdit        | Edit callback      | `({ row, index, column, formRef }) => void` | —        |
| onCancel      | Cancel callback    | `({ row, index, column, formRef }) => void` | —        |
| onSave        | Save callback      | `({ row, index, column, formRef }) => void` | —        |
| onDelete      | Delete callback    | `({ row, index, column, formRef }) => void` | —        |

## buttons Attributes in column

| Attribute         | Description                                                 | Type                                                            | Default |
| :---------------- | :---------------------------------------------------------- | :-------------------------------------------------------------- | :------ |
| type              | Type                                                        | `primary`/ `success`'/ `warning`/ `danger`/ `info` / `dropdown` | —       |
| label             | Button text                                                 | `string`                                                        | —       |
| children          | Dropdown items when `type` is `dropdown`                   | `array`                                                         | —       |
| hide              | Button hide                                                 | `boolean` / `() => boolean`                                     | —       |
| onClick           | Click event                                                 | `({ row, $index, column }) => void`                             | —       |
| plain             | Whether button is plain                                     | `boolean`                                                       | false   |
| disabled          | Whether button is disabled                                  | `boolean` / `({ row, $index, column }) => boolean`              | false   |
| size              | Button size                                                 | `default` / `large` / `small`                                   | —       |
| text              | Whether button is text button                               | `boolean`                                                       | false   |
| bg                | Whether to show background color for text button           | `boolean`                                                       | false   |
| link              | Whether button is link button                               | `boolean`                                                       | false   |
| round             | Whether button is round                                     | `boolean`                                                       | false   |
| circle            | Whether button is circle                                    | `boolean`                                                       | false   |
| loading           | Whether button is in loading state                          | `boolean`                                                       | false   |
| loading-icon      | Custom loading icon component                               | `string` / `Component`                                          | Loading |
| icon              | Icon component                                              | `string` / `Component`                                          | —       |
| autofocus         | Native `autofocus` attribute                                | `boolean`                                                       | false   |
| native-type       | Native type attribute                                       | `button` / `submit` / `reset`                                   | button  |
| auto-insert-space | Automatically insert space between two Chinese characters   | `boolean`                                                       | —       |
| color             | Custom button color, automatically calculate `hover` and `active` colors | `string`                                                        | —       |
| dark              | Dark mode, automatically set `color` for dark mode         | `boolean`                                                       | false   |
| tag               | Custom element tag                                          | `string` / `Component`                                          | button  |

## button type dropdown

| Attribute      | Description                                                                                                      | Type                          | Accepted Values                                                  | Default                                                                    |
| :------------- | :--------------------------------------------------------------------------------------------------------------- | :---------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------- |
| reference      | Reference text                                                                                                   | `string` / `(scope) => VNode` | —                                                                | `More`                                                                     |
| onCommand      | Event callback triggered when menu item is clicked                                                               | `(command) => void`           | —                                                                | —                                                                          |
| type           | Menu button type, same as `Button` component, only effective when `split-button` is true.                       | string                        | —                                                                | —                                                                          |
| size           | Menu size, also affects trigger button when split-button is true.                                               | string                        | `large` / `default` / `small`                                    | default                                                                    |
| max-height     | Maximum height of menu                                                                                           | string / number               | —                                                                | —                                                                          |
| split-button   | Whether dropdown trigger element is presented as button group                                                    | boolean                       | —                                                                | false                                                                      |
| disabled       | Whether disabled                                                                                                 | boolean                       | —                                                                | false                                                                      |
| placement      | Menu popup position                                                                                              | string                        | `top`/`top-start`/`top-end`/`bottom`/`bottom-start`/`bottom-end` | bottom                                                                     |
| trigger        | Behavior to trigger dropdown                                                                                     | string                        | `hover` / `click` /`contextmenu`                                 | hover                                                                      |
| hide-on-click  | Whether to hide menu after clicking menu item                                                                   | boolean                       | —                                                                | true                                                                       |
| show-timeout   | Delay before showing dropdown menu, only effective when trigger is hover                                        | number                        | —                                                                | 250                                                                        |
| hide-timeout   | Delay before hiding dropdown menu (only effective when trigger is hover)                                        | number                        | —                                                                | 150                                                                        |
| role           | ARIA attribute for dropdown menu. You might want to change this to "navigation" based on specific scenarios     | string                        | —                                                                | 'menu'                                                                     |
| tabindex       | [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) for Dropdown component | number                        | —                                                                | 0                                                                          |
| popper-class   | Custom class name for popper                                                                                    | string                        | —                                                                | —                                                                          |
| popper-options | [popper.js](https://popper.js.org/docs/v2/) parameters                                                          | Object                        | See [popper.js](https://popper.js.org/docs/v2/) documentation   | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |
| teleported     | Whether to insert dropdown list to body element                                                                 | boolean                       | —                                                                | true                                                                       |

## dropdown children Attributes

| Attribute | Description           | Type                                             | Accepted Values | Default |
| :-------- | :-------------------- | :----------------------------------------------- | :-------------- | :------ |
| disabled  | Whether disabled      | `boolean / ({ row, $index, column }) => boolean` | —               | false   |
| onClick   | Dropdown item click   | `({ row, $index, column }) => void`              | —               | —       |
| divided   | Whether to show divider | `boolean`                                        | —               | false   |
| icon      | Custom icon           | `string` / `Component`                           | —               | —       |

## toolBar Attributes

| Attribute  | Description                                      | Type      | Accepted Values | Default |
| :--------- | :----------------------------------------------- | :-------- | :-------------- | :------ |
| exclude    | Table item label collection not shown in toolbar | `array`   | —               | —       |
| unCheck    | Default unchecked label collection               | `array`   | —               | —       |
| refresh    | Whether refresh feature is displayed             | `boolean` | —               | `true`  |
| density    | Whether density feature is displayed             | `boolean` | —               | `true`  |
| fullScreen | Whether fullscreen feature is displayed          | `boolean` | —               | `true`  |
| setting    | Whether column setting feature is displayed      | `boolean` | —               | `true`  |
