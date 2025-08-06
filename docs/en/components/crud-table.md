# Crud Table

`z-crud` component table functionality introduction. Table functionality usage is basically equivalent to `z-table`.

## Table Usage

Encapsulated on `z-table`, table attributes can be passed directly.

<preview path="../../demo/crud-table/normal.vue" />

## Table Title

Configure `title` attribute to generate table title, supports string and function types, can also use `tableTitle` slot for customization.

<preview path="../../demo/crud-table/title.vue" />

## Operation Items

Operation items are appended to the end of `columns` by default, with table header as `Operation`, having three operations: `View`, `Edit`, `Delete`.

For specific configuration of operations, please refer to [Create/Edit Configuration](/en/components/crud-cu), [View Configuration](/en/components/crud-view), [Delete Configuration](/en/components/crud-delete) documentation.

Supports dynamic control of specific operation visibility.

<preview path="../../demo/crud-table/operation.vue" />

## Custom Operation Items

Configure `action` to `false` to disable default operation items and customize table operations.

Operation buttons also support dynamic attributes, such as: `disabled`, etc. Pass a method with current row related data as parameter.

<preview path="../../demo/crud-table/operation-custom.vue" />

## Operation Dropdown

> For other specific configurations, refer to `z-table` component

Configure `type` as `dropdown` in `buttons` array, configure dropdown options in `children`

<preview path="../../demo/crud-table/dropdown.vue" />

## Pagination

Configure `pagination`, supports two-way binding to implement pagination effect.

When `pageSize` is `0`, `pagination` is `false` or `pagination` is not passed, pagination will not be displayed.

<preview path="../../demo/crud-table/pagination.vue" />

## Frontend Pagination

Configure `pagination`'s `type` as `front` to enable frontend pagination functionality.

<preview path="../../demo/crud-table/pagination-front.vue" />

## Column Visibility

Configure `hide` field in `column`, supports function or boolean value.

<preview path="../../demo/crud-table/hide.vue" />

## Custom Columns

Configure `slot` or `render` in `column` items to customize column content.

<preview path="../../demo/crud-table/custom-slot.vue" />

## Column Tooltip

Configure `tooltip` in `column` to implement table header tooltip functionality, supports function and string.

<preview path="../../demo/crud-table/tooltip.vue" />

## Column Types

Configure `type` in `column` to implement table column types, supports `expand`, `radio`, `selection`, `input`, `select`.

:::tip
When `type` is `sort`, `type` is `radio` or cross-page selection `checkbox` is needed, it needs to be used with `rowKey` (default `id`).
:::

<preview path="../../demo/crud-table/column-type.vue" />

## Custom Table Header

Configure `label` in `column` as string with `slot` or `Slot` or configure as `render` function to implement custom column header.

<preview path="../../demo/crud-table/custom-header.vue" />

## Editable Table

> For detailed documentation, please refer to `z-table` editable table content.

Set `editable` to `true` to enable table edit mode. This field supports boolean or object type, editable table `type` defaults to `single`.

<preview path="../../demo/crud-table/editable.vue" />

## Sticky

Implement sticky functionality by configuring `sticky` attribute's `top`, `parent (DOM element where scroll bar appears)` and `zIndex`.
`top` defaults to `50px`, `zIndex` defaults to `100`.

<preview path="../../demo/crud-table/sticky.vue" />

## Watermark

Configure `watermark`, supports string and object types. For object type configurable attributes, refer to `el-watermark` configuration.

<preview path="../../demo/crud-table/watermark.vue" />

## Table Methods

`z-crud` table methods can be used according to `el-table`.

<preview path="../../demo/crud-table/methods.vue" />

## z-crud Table Attributes

| Attribute               | Description                                                                                                                                                                                               | Type                                                      | Accepted Values                                                                    | Default                                                                                      |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| modelValue:data         | Display data, supports two-way binding                                                                                                                                                                    | array                                                     | —                                                                                  | —                                                                                            |
| modelValue:formData     | Query form data, supports two-way binding                                                                                                                                                                 | array                                                     | —                                                                                  | —                                                                                            |
| modelValue:pagination   | Pagination configuration, supports two-way binding                                                                                                                                                        | object                                                    | —                                                                                  | —                                                                                            |
| modelValue:loading      | Table loading, supports two-way binding                                                                                                                                                                   | boolean                                                   | —                                                                                  | —                                                                                            |
| modelValue:selection    | Checkbox selected data, supports two-way binding                                                                                                                                                          | array                                                     | —                                                                                  | —                                                                                            |
| columns                 | Table configuration items                                                                                                                                                                                 | array                                                     | —                                                                                  | —                                                                                            |
| toolBar                 | Toolbar configuration                                                                                                                                                                                     | object / boolean                                          | —                                                                                  | —                                                                                            |
| editable                | Editable table configuration                                                                                                                                                                              | object / boolean                                          | —                                                                                  | —                                                                                            |
| options                 | Table internal option data source                                                                                                                                                                         | object                                                    | —                                                                                  | —                                                                                            |
| title                   | Table title                                                                                                                                                                                               | string / function                                         | —                                                                                  | —                                                                                            |
| totalData               | All table data (effective for frontend pagination)                                                                                                                                                       | array                                                     | —                                                                                  | —                                                                                            |
| name                    | Table `key`, configuring `name` enables caching by default                                                                                                                                               | string                                                    | —                                                                                  | —                                                                                            |
| paginationStorage       | Pagination data caching                                                                                                                                                                                   | boolean                                                   | —                                                                                  | false                                                                                        |
| formStorage             | Query form data caching                                                                                                                                                                                   | boolean                                                   | —                                                                                  | false                                                                                        |
| formDecorator           | Form background                                                                                                                                                                                           | object                                                    | —                                                                                  | `{ name: 'el-card' }`                                                                       |
| tableDecorator          | Table background                                                                                                                                                                                          | object                                                    | —                                                                                  | `{ name: 'el-card' }`                                                                       |
| watermark               | Watermark configuration                                                                                                                                                                                   | object (see `el-watermark` documentation for details)    | —                                                                                  | —                                                                                            |
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

## z-crud Table Events

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
