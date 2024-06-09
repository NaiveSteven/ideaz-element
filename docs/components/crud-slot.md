# Crud 增删改查

> `z-crud`组件插槽介绍

## 基础用法

- 筛选表达上下部分内容自定义可用`formTop`、`formBottom`插槽。

- `toolBar`组件上下左右内容自定义可用`toolBarTop`、`toolBarBottom`、`toolBarLeft`、`tableTitle`、`toolBarBottom`插槽。

- `pagination`组件上下左右内容自定义可用`paginationTop`、`paginationRight`、`paginationBottom`、`paginationLeft`插槽。

<preview path="../demo/crud-slot/normal.vue" />

- 当`toolBar`和`pagination`隐藏时，表格上下内容自定义可用`tableTop`、`tableBottom`插槽。

<preview path="../demo/crud-slot/table-slot.vue" />

## z-crud插槽

| 插槽名           | 说明                                                                                                                                    | 子标签 |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :----- | --- | --- |
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
| paginationRight  | 分页右侧插槽                                                                                                                            | —      |     | —   |
| formTop          | 表单顶部插槽                                                                                                                            | —      |     | —   |
| formBottom       | 表单底部插槽                                                                                                                            | —      |     | —   |
| crudMiddle       | 中间内容插槽                                                                                                                            | —      |     | —   |
