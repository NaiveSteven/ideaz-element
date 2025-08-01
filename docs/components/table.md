# Table 表格

通过配置生成表格，内置更适合中后台业务的功能。

:::tip
某些属性在`z-table`内部被默认配置，例如：`align` 设置为 `center`
:::

## 基础用法

配置`column`生成表格项。`el-table`相关属性直接在`z-table`组件上传入，`el-table-column`属性在`column`中配置。

<preview path="../demo/table/normal.vue" />

## 表格标题

配置`title`属性生成表格标题，支持字符串和函数类型，也可使用`tableTitle`插槽自定义。

<preview path="../demo/table/title.vue" />

## 操作按钮

`column`中配置操作项，`type`传入`button`，配置`buttons`数组。按钮属性直接在操作项中配置即可。

<preview path="../demo/table/operation.vue" />

操作按钮也支持动态属性，如：`disabled`等。传入一个方法，参数为当前行相关数据。

<preview path="../demo/table/operation-dynamic.vue" />

## 操作项下拉

如需下拉，可以在`buttons`数组中配置`type`为`dropdown`，`children`中配置下拉选项

<preview path="../demo/table/dropdown.vue" />

`reference`字段配置下拉关联文案（默认为`更多`），支持函数和字符串类型。

支持配置`el-dropdown`和`el-dropdown-item`组件属性和方法。

<preview path="../demo/table/reference.vue" />

## 分页

配置`pagination`，支持双向绑定，实现分页效果。`layout`默认配置为`total, sizes, prev, pager, next, jumper`，`pageSizes`默认配置为`[100, 200, 300, 400, 500]`，支持自定义。

<preview path="../demo/table/pagination.vue" />

配置`paginationLeft`、`paginationRight`、`paginationTop`、`paginationBottom`插槽实现分页上下左右内容自定义。

<preview path="../demo/table/pagination-slot.vue" />

## 前端分页

配置`pagination`的`type`为`front`，开启前端分页功能，`totalData`字段传入所有数据。

`pageSize`为`0`、`pagination`为`false`或`pagination`不传，分页不展示。

<preview path="../demo/table/pagination-front.vue" />

## 分页位置

配置`pagination`的`align`字段，支持`left`、`center`、`right`，默认`right`。

<preview path="../demo/table/pagination-align.vue" />

## 列显隐

`column`中配置`hide`字段，支持函数或布尔值，函数返回布尔值，true表示隐藏，false表示显示。

<preview path="../demo/table/hide.vue" />

## 列自定义

`column`中配置`slot`或`render`实现自定义列内容。


<preview path="../demo/table/custom-column.vue" />

## 列类型

`column`中配置`type`实现表格列类型，支持`expand`、`radio`、`selection`、`index`。

支持自定义列组件，配置`component`字段，支持`input`、`select`、`datepicker`、`switch`、任意局部或全局注册组件。

:::tip
`type`为`radio`或者需要跨页选中`checkbox`时，需要配合`rowKey`使用（默认`id`）。
:::

:::tip
`component`直接传入组件，请使用`markRaw`包裹，防止影响性能。
:::

<preview path="../demo/table/column-type.vue" />

## 动态属性

`column`自定义内容支持动态属性，`disabled`、`placeholder`等组件属性支持传入函数（函数属性暂不支持，如：`ElInput`组件的`formatter`属性），参数为当前行`scope`数据。

<preview path="../demo/table/dynamic-attributes.vue" />

## 表格头自定义

`column`中将`label`配置为带`slot`或`Slot`的字符串或配置为`render`函数实现自定义列表头。

<preview path="../demo/table/custom-header.vue" />

## 列提示

`column`中配置`tooltip`实现表头提示功能，支持函数和字符串。

<preview path="../demo/table/tooltip.vue" />

## 相同项合并

表格属性配置`mergeCells`，支持单独配置行或列，支持配置字段。

```ts
interface mergeCells {
  direction: 'row' | 'column' | 'both'  // 合并方向：行、列、或两者都合并
  props?: string[]  // 需要合并的字段，不传则所有列都参与合并
}
```

<preview path="../demo/table/merge.vue" />

## 工具栏

> `toolBar` 配置项，用于配置表格的工具栏。

`toolBar`值为`false`，不展示工具栏。

如果想配置某个功能不展示，配置`toolBar`下的四个字段`refresh`、`density`、`fullScreen`、`setting`为`false`即可。

<preview path="../demo/table/tool-bar.vue" />

`toolBar`支持配置默认不选中，配置`uncheck`字段，值为`column`项的`label`。

<preview path="../demo/table/uncheck.vue" />

`toolBar`支持排除某些表格项，配置`exclude`字段，值为`column`项的`label`。

<preview path="../demo/table/exclude.vue" />

`toolBar`上下左右内容支持自定义，通过`toolBarTop`、`toolBarBottom`、`toolBarRight`、`toolBarLeft`、`tableTitle`插槽配置。

<preview path="../demo/table/tool-bar-slot.vue" />

## 数据拖拽

设置`draggable`为`true`，开启数据拖拽。

:::warning
必须配置`row-key`，否则会出现更新问题。
:::

<preview path="../demo/table/drag.vue" />

支持设置`slot`或`render`自定义拖拽图标。

<preview path="../demo/table/drag-icon.vue" />

## 可编辑表格

`editable`设置为`true`，开启表格编辑模式，该字段支持布尔值或对象类型，可编辑表格`type`默认为`single`。

<preview path="../demo/table/editable.vue" />

`editable`设置为`type`为`multiple`，开启多行编辑模式。

配置`editable`的`maxLength`，可以设置最大新增数量。配置`editable`的`deleteConfirm`为`true`，可开启删除二次确认。

<preview path="../demo/table/editable-multiple.vue" />

配置`editable`的`onSave`、`onDelete`、`onEdit`、`onCancel`。

<preview path="../demo/table/editable-events.vue" />

支持自定义操作按钮。

<preview path="../demo/table/custom-operation.vue" />

## 吸顶

通过配置`sticky`属性的`top`、`parent（会出现滚动条的DOM元素）`和`zIndex`实现吸顶功能。
`top`默认为`50px`，`zIndex`默认为`100`。

<preview path="../demo/table/sticky.vue" />

支持通过`sticky.style`自定义吸顶表格头样式。

<preview path="../demo/table/sticky-style.vue" />

## 水印

配置`watermark`，详情可参考`el-watermark`配置。

<preview path="../demo/table/watermark.vue" />

## 表格方法

`z-table`的表格方法按照`el-table`使用即可。

<preview path="../demo/table/methods.vue" />

## z-table属性

| 属性名                  | 说明                                                                                                                                                                                                          | 类型                                                      | 可选值                                                                             | 默认值                                                                                       |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------- | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| modelValue:data         | 显示的数据，支持双向绑定                                                                                                                                                                                      | array                                                     | —                                                                                  | —                                                                                            |
| modelValue:pagination   | 分页配置，支持双向绑定                                                                                                                                                                                        | object                                                    | —                                                                                  | —                                                                                            |
| loading                 | 表格加载                                                                                                                                                                                                      | boolean                                                   | —                                                                                  | —                                                                                            |
| title                   | 表格标题                                                                                                                                                                                                      | string / function                                         | —                                                                                  | —                                                                                            |
| columns                 | 表格配置项                                                                                                                                                                                                    | array                                                     | —                                                                                  | —                                                                                            |
| toolBar                 | 工具栏配置                                                                                                                                                                                                    | object / boolean                                          | —                                                                                  | —                                                                                            |
| editable                | 可编辑表格配置                                                                                                                                                                                                | object / boolean                                          | —                                                                                  | —                                                                                            |
| options                 | 表格内部选项数据源                                                                                                                                                                                            | object                                                    | —                                                                                  | —                                                                                            |
| watermark               | 水印配置                                                                                                                                                                                                      | object（具体配置可查看`el-watermark`文档）                 | —                                                                                  | —                                                                                            |
| sticky               | 表格头吸顶配置                                                                                                                                                                                                      | object                 | —                                                                                  | —                                                                                            |
| options                 | 表格内部选项数据源                                                                                                                                                                                            | object                                                    | —                                                                                  | —                                                                                            |
| totalData               | 表格所有数据（前端分页生效）                                                                                                                                                                                  | array                                                     | —                                                                                  | —                                                                                            |
| mergeCells               | 表格相同项合并配置                                                                                                                                                                                  | object                                                     | —                                                                                  | —                                                                                            |
| height                  | Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。                                | string / number                                           | —                                                                                  | —                                                                                            |
| max-height              | Table 的最大高度。 合法的值为数字或者单位为 px 的高度。                                                                                                                                                       | string / number                                           | —                                                                                  | —                                                                                            |
| stripe                  | 是否为斑马纹 table                                                                                                                                                                                            | boolean                                                   | —                                                                                  | false                                                                                        |
| border                  | 是否带有纵向边框                                                                                                                                                                                              | boolean                                                   | —                                                                                  | false                                                                                        |
| size                    | Table 的尺寸                                                                                                                                                                                                  | string                                                    | large / default /small                                                             | —                                                                                            |
| fit                     | 列的宽度是否自撑开                                                                                                                                                                                            | boolean                                                   | —                                                                                  | true                                                                                         |
| show-header             | 是否显示表头                                                                                                                                                                                                  | boolean                                                   | —                                                                                  | true                                                                                         |
| highlight-current-row   | 是否要高亮当前行                                                                                                                                                                                              | boolean                                                   | —                                                                                  | false                                                                                        |
| current-row-key         | 当前行的 key，只写属性                                                                                                                                                                                        | string / number                                           | —                                                                                  | —                                                                                            |
| row-class-name          | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。                                                                                                                                 | function({ row, rowIndex }) / string                      | —                                                                                  | —                                                                                            |
| row-style               | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。                                                                                                                                 | function({ row, rowIndex }) / object                      | —                                                                                  | —                                                                                            |
| cell-class-name         | 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。                                                                                                                         | function({ row, column, rowIndex, columnIndex }) / string | —                                                                                  | —                                                                                            |
| cell-style              | 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。                                                                                                                         | function({ row, column, rowIndex, columnIndex }) / object | —                                                                                  | —                                                                                            |
| header-row-class-name   | 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。                                                                                                                         | function({ row, rowIndex }) / string                      | —                                                                                  | —                                                                                            |
| header-row-style        | 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。                                                                                                                         | function({ row, rowIndex }) / object                      | —                                                                                  | —                                                                                            |
| header-cell-class-name  | 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。                                                                                                                 | function({ row, column, rowIndex, columnIndex }) / string | —                                                                                  | —                                                                                            |
| header-cell-style       | 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。                                                                                                                 | function({ row, column, rowIndex, columnIndex }) / object | —                                                                                  | —                                                                                            |
| row-key                 | 行数据的 Key，用来优化 Table 的渲染； 在使用`reserve-selection`功能与显示树形数据时，该属性是必填的。 类型为 String 时，支持多层访问：`user.info.id`，但不支持 `user.info[0].id`，此种情况请使用 `Function`。 | function(row) / string                                    | —                                                                                  | —                                                                                            |
| empty-text              | 空数据时显示的文本内容， 也可以通过 `#empty` 设置                                                                                                                                                             | string                                                    | —                                                                                  | No Data                                                                                      |
| default-expand-all      | 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效                                                                                                                                               | boolean                                                   | —                                                                                  | false                                                                                        |
| expand-row-keys         | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。                                                                                                            | array                                                     | —                                                                                  | —                                                                                            |
| default-sort            | 默认的排序列的 prop 和顺序。 它的 `prop` 属性指定默认的排序的列，`order` 指定默认排序的顺序                                                                                                                   | object                                                    | (order: 'ascending' 'descending')                                                  | 'descending')                                                                                |
| tooltip-effect          | 溢出的 tooltip 的 `effect`                                                                                                                                                                                    | string                                                    | dark / light                                                                       | dark                                                                                         |
| tooltip-options         | 溢出 tooltip 的选项，[参见下述 tooltip 组件](https://element-plus.org/zh-CN/component/tooltip.html#attributes)                                                                                                | `object`                                                  | [请参考 tooltip](https://element-plus.org/zh-CN/component/tooltip.html#attributes) | `object`                                                                                     |
| show-summary            | 是否在表尾显示合计行                                                                                                                                                                                          | boolean                                                   | —                                                                                  | false                                                                                        |
| sum-text                | 显示摘要行第一列的文本                                                                                                                                                                                        | string                                                    | —                                                                                  | Sum                                                                                          |
| summary-method          | 自定义的合计计算方法                                                                                                                                                                                          | function({ columns, data })                               | —                                                                                  | —                                                                                            |
| span-method             | 合并行或列的计算方法                                                                                                                                                                                          | function({ row, column, rowIndex, columnIndex })          | —                                                                                  | —                                                                                            |
| select-on-indeterminate | 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行                                                                                          | boolean                                                   | —                                                                                  | true                                                                                         |
| indent                  | 展示树形数据时，树节点的缩进                                                                                                                                                                                  | number                                                    | —                                                                                  | 16                                                                                           |
| lazy                    | 是否懒加载子节点数据                                                                                                                                                                                          | boolean                                                   | —                                                                                  | —                                                                                            |
| load                    | 加载子节点数据的函数，`lazy` 为 true 时生效                                                                                                                                                                   | function(row, treeNode, resolve)                          | —                                                                                  | —                                                                                            |
| tree-props              | 渲染嵌套数据的配置选项                                                                                                                                                                                        | object                                                    | —                                                                                  | `{ hasChildren: 'hasChildren', children: 'children' }`                                       |
| table-layout            | 设置表格单元、行和列的布局方式                                                                                                                                                                                | string                                                    | fixed / auto                                                                       | fixed                                                                                        |
| scrollbar-always-on     | 总是显示滚动条                                                                                                                                                                                                | boolean                                                   | —                                                                                  | false                                                                                        |
| show-overflow-tooltip   | 是否隐藏额外内容并在单元格悬停时使用 Tooltip 显示它们。这将影响全部列的展示。                                                                                                                                 | boolean \                                                 | [`object`](https://element-plus.org/zh-CN/component/table.html#table-attributes)   | 参考 [tooltip-options](https://element-plus.org/zh-CN/component/table.html#table-attributes) |
| flexible                | 确保主轴的最小尺寸，以便不超过内容                                                                                                                                                            | boolean                                                   | —                                                                                  | false                                                                                        |
| virtual                | 虚拟滚动配置，支持高性能大数据渲染                                                                                                                                                            | boolean / object                                           | 详见[虚拟表格文档](./table-virtual.md)                                                | false                                                                                        |

## z-table事件

| 事件名             | 说明                                                                                                                     | 回调参数                          |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| refresh            | 翻页时触发的事件                                                                                                         | pagination                        |
| radio-change       | 当用户手动勾选数据行的 Radio 时触发的事件                                                                                | row                               |
| select             | 当用户手动勾选数据行的 Checkbox 时触发的事件                                                                             | selection, row                    |
| select-all         | 当用户手动勾选全选 Checkbox 时触发的事件                                                                                 | selection                         |
| selection-change   | 当选择项发生变化时会触发该事件                                                                                           | selection                         |
| cell-mouse-enter   | 当单元格 hover 进入时会触发该事件                                                                                        | row, column, cell, event          |
| cell-mouse-leave   | 当单元格 hover 退出时会触发该事件                                                                                        | row, column, cell, event          |
| cell-click         | 当某个单元格被点击时会触发该事件                                                                                         | row, column, cell, event          |
| cell-dblclick      | 当某个单元格被双击击时会触发该事件                                                                                       | row, column, cell, event          |
| cell-contextmenu   | 当某个单元格被鼠标右键点击时会触发该事件                                                                                 | row, column, cell, event          |
| row-click          | 当某一行被点击时会触发该事件                                                                                             | row, column, event                |
| row-contextmenu    | 当某一行被鼠标右键点击时会触发该事件                                                                                     | row, column, event                |
| row-dblclick       | 当某一行被双击时会触发该事件                                                                                             | row, column, event                |
| header-click       | 当某一列的表头被点击时会触发该事件                                                                                       | column, event                     |
| header-contextmenu | 当某一列的表头被鼠标右键点击时触发该事件                                                                                 | column, event                     |
| sort-change        | 当表格的排序条件发生变化的时候会触发该事件                                                                               | `{ column, prop, order }`         |
| filter-change      | column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件                                | filters                           |
| current-change     | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性                      | currentRow, oldCurrentRow         |
| header-dragend     | 当拖动表头改变了列的宽度的时候会触发该事件                                                                               | newWidth, oldWidth, column, event |
| expand-change      | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded） | row, (expandedRows \| expanded)   |

## z-table方法

| 方法名             | 说明                                                                                                    | 参数                                                  |
| :----------------- | :------------------------------------------------------------------------------------------------------ | :---------------------------------------------------- |
| clearSelection     | 用于多选表格，清空用户的选择                                                                            | —                                                     |
| getSelectionRows   | 返回当前选中的行                                                                                        |                                                       |
| toggleRowSelection | 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否                   | row, selected                                         |
| toggleAllSelection | 用于多选表格，切换全选和全不选                                                                          | —                                                     |
| toggleRowExpansion | 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。 | row, expanded                                         |
| setCurrentRow      | 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。                   | row                                                   |
| clearSort          | 用于清空排序条件，数据会恢复成未排序的状态                                                              | —                                                     |
| clearFilter        | 传入由`columnKey` 组成的数组以清除指定列的过滤条件。 如果没有参数，清除所有过滤器                       | columnKeys                                            |
| doLayout           | 对 Table 进行重新布局。 当表格可见性变化时，您可能需要调用此方法以获得正确的布局                        | —                                                     |
| sort               | 手动排序表格。 参数 `prop` 属性指定排序列，`order` 指定排序顺序。                                       | prop: string, order: string                           |
| scrollTo           | 滚动到一组特定坐标                                                                                      | (options: ScrollToOptions \| number, yCoord?: number) |
| setScrollTop       | 设置垂直滚动位置                                                                                        | top                                                   |
| setScrollLeft      | 设置水平滚动位置                                                                                        | left                                                  |

## z-table插槽

| 插槽名           | 说明                                                                                                                                    | 子标签 |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :----- |
| append           | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 | —      |
| empty            | 当数据为空时自定义的内容                                                                                                                | —      |
| tableTop         | 顶部插槽                                                                                                                                | —      |
| tableBottom      | 底部插槽                                                                                                                                | —      |
| toolBarTop       | 工具栏顶部插槽                                                                                                                          | —      |
| toolBarBottom    | 工具栏底部插槽                                                                                                                          | —      |
| toolBarRight     | 工具栏右部插槽                                                                                                                          | —      |
| toolBarLeft      | 工具栏左侧左部插槽                                                                                                                      | —      |
| tableTitle       | 表格标题插槽                                                                                                                            | —      |
| paginationTop    | 分页顶部插槽                                                                                                                            | —      |
| paginationBottom | 分页底部插槽                                                                                                                            | —      |
| paginationLeft   | 分页左侧插槽                                                                                                                            | —      |
| paginationRight  | 分页右侧插槽                                                                                                                            | —      |
| footer          | 虚拟表格底部插槽，仅虚拟滚动模式下可用                                                                                                          | —      |

## columns属性

| 属性名                | 说明                                                                                                                                                                                   | 类型                                    | 可选值                                                                                               | 默认值                                                                                             |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| type                  | 对应列的类型。                                                                                                                                                                         | string                                  | selection / index / expand/ radio / button                                                           |
| component             | 列组件型。                                                                                                                                                                             | string                                  | input / select / checkbox / radio / 任意局部或全局注册组件                                         | —                                                                                                  |
| index                 | 如果设置了 `type=index`，可以通过传递 `index` 属性来自定义索引                                                                                                                         | number / function(index)                | —                                                                                                    | —                                                                                                  |
| label                 | 显示的标题（建议配置）                                                                                                                                                                 | string / (scope) => VNode                                  | —                                                                                                    | —                                                                                                  |
| buttons               | 按钮配置                                                                                                                                                                               | array                                   | —                                                                                                    | —                                                                                                  |
| options               | 选项组件数据源                                                                                                                                                                         | array                                   | —                                                                                                    |
| tooltip               | 列提示                                                                                                                                                                                 | `string` / `() => VNode`                | —                                                                                                    | —                                                                                                  |
| column-key            | column 的 key， column 的 key， 如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件                                                                              | string                                  | —                                                                                                    | —                                                                                                  |
| prop                  | 字段名称 对应列内容的字段名， 也可以使用 `property`属性                                                                                                                                | string                                  | —                                                                                                    | —                                                                                                  |
| width                 | 对应列的宽度                                                                                                                                                                           | string / number                         | —                                                                                                    | —                                                                                                  |
| min-width             | 对应列的最小宽度， 对应列的最小宽度， 与 `width` 的区别是 `width` 是固定的，`min-width` 会把剩余宽度按比例分配给设置了 `min-width` 的列                                                | string / number                         | —                                                                                                    | —                                                                                                  |
| fixed                 | 列是否固定在左侧或者右侧。 `true` 表示固定在左侧                                                                                                                                       | string / boolean                        | true / 'left' / 'right'                                                                              | —                                                                                                  |
| render-header         | 列标题 Label 区域渲染使用的 Function                                                                                                                                                   | function({ column, $index })            | —                                                                                                    | —                                                                                                  |
| sortable              | 对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件                                                                                   | boolean / string                        | custom                                                                                               | false                                                                                              |
| sort-method           | 指定数据按照哪个属性进行排序，仅当`sortable`设置为`true`的时候有效。 应该如同 Array.sort 那样返回一个 Number                                                                           | function(a, b)                          | —                                                                                                    | —                                                                                                  |
| sort-by               | 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。 如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推 | function(row, index) / string / array   | —                                                                                                    | —                                                                                                  |
| sort-orders           | 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。 需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序                                            | array                                   | 数组中的元素需为以下三者之一：`ascending` 表示升序，`descending` 表示降序，`null` 表示还原为原始顺序 | ['ascending', 'descending', null]                                                                  |
| resizable             | 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）                                                                                                               | boolean                                 | —                                                                                                    | true                                                                                               |
| formatter             | 用来格式化内容                                                                                                                                                                         | function(row, column, cellValue, index) | —                                                                                                    | —                                                                                                  |
| show-overflow-tooltip | 当内容过长被隐藏时显示 tooltip                                                                                                                                                         | boolean \                               | [`object`](https://element-plus.org/zh-CN/component/table.html#table-attributes)                     | 参考表格的 [tooltip-options](https://element-plus.org/zh-CN/component/table.html#table-attributes) |
| align                 | 对齐方式                                                                                                                                                                               | string                                  | left / center / right                                                                                | left                                                                                               |
| header-align          | 表头对齐方式， 若不设置该项，则使用表格的对齐方式                                                                                                                                      | string                                  | left / center / right                                                                                | —                                                                                                  |
| class-name            | 列的 className                                                                                                                                                                         | string                                  | —                                                                                                    | —                                                                                                  |
| label-class-name      | 当前列标题的自定义类名                                                                                                                                                                 | string                                  | —                                                                                                    | —                                                                                                  |
| selectable            | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选                                                                                 | function(row, index)                    | —                                                                                                    | —                                                                                                  |
| reserve-selection     | 数据刷新后是否保留选项，仅对 `type=selection` 的列有效， 请注意， 需指定 `row-key` 来让这个功能生效。                                                                                  | boolean                                 | —                                                                                                    | false                                                                                              |
| filters               | 数据过滤的选项， 数组格式，数组中的元素需要有 text 和 value 属性。 数组中的每个元素都需要有 text 和 value 属性。                                                                       | `Array<{text: string, value: string}>`  | —                                                                                                    | —                                                                                                  |
| filter-placement      | 过滤弹出框的定位                                                                                                                                                                       | string                                  | 与 Tooltip 的 `placement` 属性相同                                                                   | —                                                                                                  |
| filter-multiple       | 数据过滤的选项是否多选                                                                                                                                                                 | boolean                                 | —                                                                                                    | true                                                                                               |
| filter-method         | 数据过滤使用的方法， 如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。                                                                                          | function(value, row, column)            | —                                                                                                    | —                                                                                                  |
| filtered-value        | 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。                                                                                                                 | array                                   | —                                                                                                    | —                                                                                                  |

### pagination属性

| 属性名              | 说明                                                                                                                           | 类型                   | 默认值                               |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :----------------------------------- |
| type                | 分页类型                                                                                                                       | `front` / `backbone`   | `backbone`                           |
| page                | 当前页                                                                                                                         | `number`               | —                                    |
| pageSize            | 每页显示条目个数                                                                                                               | `number`               | —                                    |
| align            | 分页位置                                                                                                               | `left` / `center` / `right`               | `right`                                    |
| small               | 是否使用小型分页样式                                                                                                           | `boolean`              | true                                 |
| background          | 是否为分页按钮添加背景色                                                                                                       | `boolean`              | false                                |
| total               | 总条目数                                                                                                                       | `number`               | —                                    |
| page-count          | 总页数， `total` 和 `page-count` 设置任意一个就可以达到显示页码的功能；如果要支持 `page-sizes` 的更改，则需要使用 `total` 属性 | `number`               | —                                    |
| pager-count         | 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠                                                                  | `number`               | 7                                    |
| layout              | 组件布局，子组件名用逗号分隔                                                                                                   | `string`               | prev, pager, next, jumper, ->, total |
| page-sizes          | 每页显示个数选择器的选项设置                                                                                                   | `object`               | [10, 20, 30, 40, 50, 100]            |
| popper-class        | 每页显示个数选择器的下拉框类名                                                                                                 | `string`               | ''                                   |
| prev-text           | 替代图标显示的上一页文字                                                                                                       | `string`               | ''                                   |
| prev-icon           | 上一页的图标， 比 `prev-text` 优先级更高                                                                                       | `string` / `Component` | ArrowLeft                            |
| next-text           | 替代图标显示的下一页文字                                                                                                       | `string`               | ''                                   |
| next-icon           | 下一页的图标， 比 `next-text` 优先级更低                                                                                       | `string` / `Component` | ArrowRight                           |
| disabled            | 是否禁用分页                                                                                                                   | `boolean`              | false                                |
| teleported          | 是否将下拉菜单teleport至 body                                                                                                  | `boolean`              | true                                 |
| hide-on-single-page | 只有一页时是否隐藏                                                                                                             | `boolean`              | false                                |

## editable属性

| 属性名        | 说明           | 类型                                        | 默认值   |
| :------------ | :------------- | :------------------------------------------ | :------- |
| type          | 可编辑表格模式 | `single` / `multiple`                       | `single` |
| maxLength     | 最大数量       | `number`                                    | —        |
| deleteConfirm | 删除二次确认   | `boolean`                                   | `false`  |
| onEdit        | 编辑回调       | `({ row, index, column, formRef }) => void` | —        |
| onCancel      | 取消回调       | `({ row, index, column, formRef }) => void` | —        |
| onSave        | 保存回调       | `({ row, index, column, formRef }) => void` | —        |
| onDelete      | 删除回调       | `({ row, index, column, formRef }) => void` | —        |

## column中buttons属性

| 属性名            | 说明                                                        | 类型                                                            | 默认值  |
| :---------------- | :---------------------------------------------------------- | :-------------------------------------------------------------- | :------ |
| type              | 类型                                                        | `primary`/ `success`'/ `warning`/ `danger`/ `info` / `dropdown` | —       |
| label             | 文案                                                        | `string`                                                        | —       |
| children          | `type`为`dropdown`生效，下拉项                              | `array`                                                         | —       |
| hide              | 按钮隐藏                                                    | `boolean` / `() => boolean`                                     | —       |
| onClick           | 点击事件                                                    | `({ row, $index, column }) => void`                             | —       |
| plain             | 是否为朴素按钮                                              | `boolean`                                                       | false   |
| disabled          | 按钮是否为禁用状态                                          | `boolean` / `({ row, $index, column }) => boolean`              | false   |
| size              | 尺寸                                                        | `default` / `large` / `small`                                   | —       |
| plain             | 是否为朴素按钮                                              | `boolean`                                                       | false   |
| text              | 是否为文字按钮                                              | `boolean`                                                       | false   |
| bg                | 是否显示文字按钮背景颜色                                    | `boolean`                                                       | false   |
| link              | 是否为链接按钮                                              | `boolean`                                                       | false   |
| round             | 是否为圆角按钮                                              | `boolean`                                                       | false   |
| circle            | 是否为圆形按钮                                              | `boolean`                                                       | false   |
| loading           | 是否为加载中状态                                            | `boolean`                                                       | false   |
| loading-icon      | 自定义加载中状态图标组件                                    | `string` / `Component`                                          | Loading |
| icon              | 图标组件                                                    | `string` / `Component`                                          | —       |
| autofocus         | 原生 `autofocus` 属性                                       | `boolean`                                                       | false   |
| native-type       | 原生 type 属性                                              | `button` / `submit` / `reset`                                   | button  |
| auto-insert-space | 自动在两个中文字符之间插入空格                              | `boolean`                                                       | —       |
| color             | 自定义按钮颜色, 并自动计算 `hover` 和 `active` 触发后的颜色 | `string`                                                        | —       |
| dark              | dark 模式, 意味着自动设置 `color` 为 dark 模式的颜色        | `boolean`                                                       | false   |
| tag               | 自定义元素标签                                              | `string` / `Component`                                          | button  |

## button类型为dropdown

| 属性名         | 说明                                                                                                     | 类型                          | 可选值                                                           | 默认值                                                                     |
| :------------- | :------------------------------------------------------------------------------------------------------- | :---------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------- |
| reference      | 关联文案                                                                                                 | `string` / `(scope) => VNode` | —                                                                | `更多`                                                                     |
| onCommand      | 点击菜单项触发的事件回调                                                                                 | `(command) => void`           | —                                                                | —                                                                          |
| type           | 菜单按钮类型，同 `Button` 组件一样，仅在 `split-button` 为 true 的情况下有效。                           | string                        | —                                                                | —                                                                          |
| size           | 菜单尺寸，在 split-button 为 true 的情况下也对触发按钮生效。                                             | string                        | `large` / `default` / `small`                                    | default                                                                    |
| max-height     | 菜单最大高度                                                                                             | string / number               | —                                                                | —                                                                          |
| split-button   | 下拉触发元素呈现为按钮组                                                                                 | boolean                       | —                                                                | false                                                                      |
| disabled       | 是否禁用                                                                                                 | boolean                       | —                                                                | false                                                                      |
| placement      | 菜单弹出位置                                                                                             | string                        | `top`/`top-start`/`top-end`/`bottom`/`bottom-start`/`bottom-end` | bottom                                                                     |
| trigger        | 触发下拉的行为                                                                                           | string                        | `hover` / `click` /`contextmenu`                                 | hover                                                                      |
| hide-on-click  | 是否在点击菜单项后隐藏菜单                                                                               | boolean                       | —                                                                | true                                                                       |
| show-timeout   | 展开下拉菜单的延时，仅在 trigger 为 hover 时有效                                                         | number                        | —                                                                | 250                                                                        |
| hide-timeout   | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）                                                       | number                        | —                                                                | 150                                                                        |
| role           | 下拉菜单的 ARIA 属性。 根据具体场景，您可能想要将此更改为“navigation”                                    | string                        | —                                                                | 'menu'                                                                     |
| tabindex       | Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number                        | —                                                                | 0                                                                          |
| popper-class   | 自定义浮层类名                                                                                           | string                        | —                                                                | —                                                                          |
| popper-options | [popper.js](https://popper.js.org/docs/v2/) 参数                                                         | Object                        | 请参考 [popper.js](https://popper.js.org/docs/v2/) 文档          | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |
| teleported     | 是否将下拉列表插入至 body 元素                                                                           | boolean                       | —                                                                | true                                                                       |

## button类型为dropdown的children下拉项属性

| 属性名   | 说明           | 类型                                             | 可选值 | 默认值 |
| :------- | :------------- | :----------------------------------------------- | :----- | :----- |
| disabled | 是否禁用       | `boolean / ({ row, $index, column }) => boolean` | —      | false  |
| onClick  | 下拉项点击     | `({ row, $index, column }) => void`              | —      | —      |
| divided  | 是否显示分隔符 | `boolean`                                        | —      | false  |
| icon     | 自定义图标     | `string` / `Component`                           | —      | —      |

## toolBar属性

| 属性名  | 说明                              | 类型    | 可选值 | 默认值 |
| :------ | :-------------------------------- | :------ | :----- | :----- |
| exclude | 不显示在工具栏的表格项 label 集合 | `array` | —      | —      |
| unCheck | 默认不选中的 label 集合           | `array` | —      | —      |
| refresh | 刷新功能是否展示           | `boolean` | —      | `true`      |
| density | 密度功能是否展示           | `boolean` | —      | `true`      |
| fullScreen | 全屏功能是否展示           | `boolean` | —      | `true`      |
| setting | 列配置功能是否展示           | `boolean` | —      | `true`      |
