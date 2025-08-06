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

## Custom Operation

<preview path="../../demo/table/custom-operation.vue" />

## Column Types

<preview path="../../demo/table/column-type.vue" />

## Custom Column

<preview path="../../demo/table/custom-column.vue" />

## Custom Header

<preview path="../../demo/table/custom-header.vue" />

## Hide Columns

<preview path="../../demo/table/hide.vue" />

## Pagination

<preview path="../../demo/table/pagination.vue" />

## Front-end Pagination

<preview path="../../demo/table/pagination-front.vue" />

## Pagination Alignment

<preview path="../../demo/table/pagination-align.vue" />

## Pagination Slot

<preview path="../../demo/table/pagination-slot.vue" />

## Toolbar

<preview path="../../demo/table/tool-bar.vue" />

## Toolbar Slot

<preview path="../../demo/table/tool-bar-slot.vue" />

## Multiple Selection

<preview path="../../demo/table/multiple.vue" />

## Editable

<preview path="../../demo/table/editable.vue" />

## Editable Multiple

<preview path="../../demo/table/editable-multiple.vue" />

## Editable Events

<preview path="../../demo/table/editable-events.vue" />

## Drag Sort

<preview path="../../demo/table/drag.vue" />

## Drag Icon

<preview path="../../demo/table/drag-icon.vue" />

## Sticky

<preview path="../../demo/table/sticky.vue" />

## Sticky Style

<preview path="../../demo/table/sticky-style.vue" />

## Tooltip

<preview path="../../demo/table/tooltip.vue" />

## Methods

<preview path="../../demo/table/methods.vue" />

## z-table Attributes

| Attribute             | Description                              | Type                            | Default |
| :-------------------- | :--------------------------------------- | :------------------------------ | :------ |
| data                  | Table data                               | `array`                         | —       |
| columns               | Table column configuration               | `array`                         | —       |
| height                | Table height                             | `string` / `number`             | —       |
| max-height            | Table max height                         | `string` / `number`             | —       |
| stripe                | Whether table is striped                 | `boolean`                       | false   |
| border                | Whether table has border                 | `boolean`                       | false   |
| size                  | Table size                               | `string`                        | —       |
| fit                   | Whether column width fits content        | `boolean`                       | true    |
| show-header           | Whether to show table header             | `boolean`                       | true    |
| highlight-current-row | Whether to highlight current row         | `boolean`                       | false   |
| current-row-key       | Key of current row                       | `string` / `number`             | —       |
| row-class-name        | Function/String for row className        | `Function` / `string`           | —       |
| row-style             | Function/Object for row style            | `Function` / `object`           | —       |
| cell-class-name       | Function/String for cell className       | `Function` / `string`           | —       |
| cell-style            | Function/Object for cell style           | `Function` / `object`           | —       |
| header-row-class-name | Function/String for header row className | `Function` / `string`           | —       |
| header-row-style      | Function/Object for header row style     | `Function` / `object`           | —       |
| header-cell-class-name| Function/String for header cell className| `Function` / `string`           | —       |
| header-cell-style     | Function/Object for header cell style    | `Function` / `object`           | —       |
| row-key               | Key for row data                         | `Function` / `string`           | —       |
| empty-text            | Text when data is empty                  | `string`                        | No Data |
| default-expand-all    | Whether to expand all rows by default    | `boolean`                       | false   |
| expand-row-keys       | Keys of expanded rows                    | `array`                         | —       |
| default-sort          | Default sort order                       | `object`                        | —       |
| tooltip-effect        | Tooltip effect                           | `string`                        | dark    |
| show-summary          | Whether to show summary row              | `boolean`                       | false   |
| sum-text              | Summary row first column text            | `string`                        | Sum     |
| summary-method        | Custom summary method                    | `Function`                      | —       |
| span-method           | Method for merging cells                 | `Function`                      | —       |
| select-on-indeterminate| Whether to select on indeterminate      | `boolean`                       | true    |
| indent                | Horizontal indentation of tree data      | `number`                        | 16      |
| lazy                  | Whether to lazy load tree data           | `boolean`                       | false   |
| load                  | Method for loading child nodes           | `Function`                      | —       |
| tree-props            | Configuration for tree data             | `object`                        | —       |

## z-table Events

| Event Name | Description                      | Type       |
| :--------- | :------------------------------- | :--------- |
| select     | Triggered when selection changes | `Function` |
| select-all | Triggered when select all        | `Function` |
| selection-change| Triggered when selection changes| `Function` |
| cell-mouse-enter| Triggered when mouse enters cell| `Function` |
| cell-mouse-leave| Triggered when mouse leaves cell| `Function` |
| cell-click | Triggered when cell is clicked   | `Function` |
| cell-dblclick| Triggered when cell is double clicked| `Function` |
| row-click  | Triggered when row is clicked    | `Function` |
| row-contextmenu| Triggered when row is right clicked| `Function` |
| row-dblclick| Triggered when row is double clicked| `Function` |
| header-click| Triggered when header is clicked | `Function` |
| header-contextmenu| Triggered when header is right clicked| `Function` |
| sort-change| Triggered when sort changes      | `Function` |
| filter-change| Triggered when filter changes   | `Function` |
| current-change| Triggered when current row changes| `Function` |
| header-dragend| Triggered when header drag ends | `Function` |
| expand-change| Triggered when expand changes   | `Function` |

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
