# Crud 增删改查

> 集成`z-form`和`z-table`组件，实现增删改查功能。

## 表格接口

配置`request`中`searchApi`、`deleteApi`、`addApi`、`editApi`可以直接实现表格数据获取、删除数据、新增和编辑数据操作。

<preview path="../demo/crud-api/request.vue" />

## 表格数据接口配置

配置`request`中`alias`字段可以自定义数据路径，默认为`data.list`和`data.total`。

<preview path="../demo/crud-api/alias.vue" />

支持传入函数自定义返回。

<preview path="../demo/crud-api/alias-function.vue" />

## 表格数据方法自定义

支持通过`request.searchFunc`自定义表格数据方法。

<preview path="../demo/crud-api/search-function.vue" />

## 表格数据处理

支持通过`request.tableData`二次处理表格数据。

<preview path="../demo/crud-api/data.vue" />

## 回调

支持通过`request.beforeData`和`request.afterData`在获取表格数据前后做些事情。

<preview path="../demo/crud-api/data-callback.vue" />

## 内部方法

支持通过表格外部再次调用`getTableData`方法。

<preview path="../demo/crud-api/methods.vue" />

## 操作自定义

如需要自定义操作，可以使用`refresh`、`search`、`reset`、`submit`、`delete`等事件实现刷新、查询、重置和删除等操作。

<preview path="../demo/crud-api/operation.vue" />

## request 属性

| 属性名       | 说明                     | 类型                 | 默认 |
| :----------- | :----------------------- | :------------------- | :--- |
| searchApi    | 表格数据接口             | `Function`           | —    |
| deleteApi    | 删除接口                 | `Function`           | —    |
| submitApi    | 新增编辑接口             | `Function`           | —    |
| addApi       | 新增接口                 | `Function`           | —    |
| editApi      | 编辑接口                 | `Function`           | —    |
| detailApi    | 详情接口                 | `Function`           | —    |
| beforeData   | 表格数据接口调用前的回调 | `Function`           | —    |
| afterData    | 表格数据接口调用后的回调 | `(res) => void`      | —    |
| searchFunc   | 自定义表格数据方法       | `({params}) => void` | —    |
| tableData    | 表格数据二次处理         | `(data) => array`    | —    |
| alias        | 表格数据路径自定义       | `object`             | —    |

## alias 属性

| 属性名 | 说明             | 类型                         | 默认         |
| :----- | :--------------- | :--------------------------- | :----------- |
| list   | 表格数据路径     | `string` / `(res) => array`  | `data.list`  |
| total  | 表格数据总数路径 | `string` / `(res) => number` | `data.total` |
