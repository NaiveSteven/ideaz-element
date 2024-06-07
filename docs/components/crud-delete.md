# Crud 增删改查

> `z-crud`组件删除功能介绍

## 基础用法

配置`request`的`deleteApi`字段，可以调用接口删除。参数默认为`id`，也可以通过`rowKey`配置。

<preview path="../demo/crud-delete/normal.vue" />

## 自定义删除

配置`operate-delete`事件，可以自定义删除逻辑。

<preview path="../demo/crud-delete/custom-delete.vue" />

`delete`属性传入函数，可以直接覆盖`delete`点击后内置的逻辑。

<preview path="../demo/crud-delete/custom-delete-logic.vue" />

## 多选框

多选狂和删除功能结合，组件内部会有`el-alert`和批量删除等内置功能。

<preview path="../demo/crud-delete/checkbox.vue" />

## Alert配置

传入`alert`对象配置`el-alert`组件属性。

<preview path="../demo/crud-delete/alert.vue" />

## 自定义Alert

如果需要自定义提示内容，`alert`可以直接传入`render`函数。如果**不需要提示**，可以传入`false`。

<preview path="../demo/crud-delete/custom-alert.vue" />

自定义提示内容也可以使用`alert`插槽。

<preview path="../demo/crud-delete/alert-slot.vue" />

`alert.title`和`alert.description`支持传入`render`函数自定义。

<preview path="../demo/crud-delete/alert-props.vue" />

## z-crud删除相关属性

| 属性名  | 说明                                     | 类型                                                    | 默认值 |
| :------ | :--------------------------------------- | :------------------------------------------------------ | :----- |
| delete  | 查询表单属性配置                         | `boolean` / `({ row, tableRef, getTableData }) => void` | `true` |
| action  | 操作项是否展示（内置的删除、编辑等按钮） | `boolean`                                               | `true` |
| edit    | 编辑配置                                 | `boolean` / `object`                                    | `true` |
| add     | 新增配置                                 | `boolean` / `object`                                    | `true` |
| detail  | 详情配置                                 | `boolean` / `object`                                    | `true` |
| search  | 查询配置                                 | `boolean` / `object`                                    |
| alert   | 固定的选中数据提示                       | `object` / `boolean`                                    | `true` |
| request | 接口配置                                 | `object`                                                | —      |

## request属性

| 属性名     | 说明               | 类型                                                                                          | 默认值 |
| :--------- | :----------------- | :-------------------------------------------------------------------------------------------- | :----- |
| searchApi  | 查询接口           | `(params: any) => promise`                                                                    | —      |
| submitApi  | 编辑新增确认       | `({ [key: string]: any, row: any, type: 'add' / 'edit' / 'view', formData: any }) => promise` | —      |
| deleteApi  | 删除接口           | `({ [key: string]?: any, row?: any, selectionData?: any }) => promise`                        | —      |
| addApi     | 新增接口           | `({ type: 'add' / 'edit' / 'view', formData: any }) => promise`                               | —      |
| editApi    | 编辑接口           | `({ [key: string]: any, row: any, type: 'add' / 'edit' / 'view', formData: any }) => promise` | —      |
| detailApi  | 详情接口           | `({ [key: string]: any, row: any }) => promise`                                               | —      |
| alias      | 数据路径自定义     | `object`                                                                                      | —      |
| searchFunc | 查询方法重写       | `({ params }) => any`                                                                         | —      |
| tableData  | 表格数据自定义返回 | `(res) => any`                                                                                | —      |

## alert属性

| 名称        | 说明               | 类型                                            | 默认值    | 必填 |
| :---------- | :----------------- | :---------------------------------------------- | :-------- | :--- |
| title       | Alert 标题。       | `string` / `(selectionData, tableRef) => VNode` | —         | 否   |
| type        | Alert 类型。       | `success` / `warning` / `info` / `error`        | `info`    | 否   |
| description | 描述性文本         | `string` / `() => VNode`                        | —         | 否   |
| closable    | 是否可以关闭       | `boolean`                                       | `true`    | 否   |
| center      | 文字是否居中       | `boolean`                                       | `false`   | 否   |
| close-text  | 自定义关闭按钮文本 | `string`                                        | —         | 否   |
| effect      | 主题样式           | `light` / `dark`                                | `'light'` | 否   |
| onClose     | 关闭 Alert 事件    | `Function`                                      | —         | 否   |

## z-crud删除相关事件

| 事件名         | 说明         | 类型                                               |
| :------------- | :----------- | :------------------------------------------------- |
| operate-delete | 删除表格数据 | `({ selectionData, table, getTableData }) => void` |

## z-crud删除相关插槽

| 插槽名 | 说明                           |
| :----- | :----------------------------- |
| alert  | 选中数据时表格顶部固定提示内容 |
