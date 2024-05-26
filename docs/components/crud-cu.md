# Crud 增删改查

> `z-crud`组件新增编辑表单部分功能介绍

## 基础用法

配置`column`的`add`或`edit`字段，可以实现新增或编辑表单的配置。

<preview path="../demo/crud-cu/normal.vue" />

配置`add`和`edit`的`columns`字段，可以实现新增和编辑表单的配置。

<preview path="../demo/crud-cu/normal-columns.vue" />

配置`form`的`columns`字段，可以同时实现新增和编辑表单的配置，但也会同时配置查询和详情信息，可以配置`search`和`detail`为`false`来关闭。

<preview path="../demo/crud-cu/normal-form.vue" />

配置`column`项的`form`字段，可以实现新增、编辑表单的配置，但会同时配置查询表单，可以设置`search`为`false`关闭。

<preview path="../demo/crud-cu/normal-column.vue" />

## 确认接口

配置`request`的`addApi`和`editApi`。

`editApi`会多传一个`rowKey`参数，默认为`id`。

<preview path="../demo/crud-cu/add-edit-api.vue" />

如果新增和编辑接口相同，可以配置`submitApi`，编辑的时候也会带上`rowKey`。

<preview path="../demo/crud-cu/submit-api.vue" />

## 编辑详情数据

配置`request`的`detailApi`可以实现编辑弹窗默认数据从接口中获取。

<preview path="../demo/crud-cu/edit-detail-api.vue" />

## 详情数据二次处理

如果需要对接口返回的详情数据二次梳理，可以配置`request.alias.detail`。传入函数支持自定义详情数据，传入字符串支持自定义数据路径。

<preview path="../demo/crud-cu/transform-edit-detail.vue" />

## 自定义确认

`request`不配置`submitApi`、`addApi`和`editApi`，此时会有`operate-submit`事件。

<preview path="../demo/crud-cu/operate-submit.vue" />

## 表单属性

使用`add`和`edit`对象配置表单属性。

<preview path="../demo/crud-cu/form-props.vue" />

## 弹窗属性

可以使用`dialog`对象统一配置新增和编辑弹窗属性，也可以使用`add.dialog`和`edit.dialog`分别配置弹窗属性。

<preview path="../demo/crud-cu/dialog-props.vue" />

## z-crud详情相关属性

| 属性名  | 说明                                     | 类型                 | 默认值 |
| :------ | :--------------------------------------- | :------------------- | :----- |
| detail  | 查询表单属性配置                         | `boolean` / `object` | `true` |
| form    | 查询、新增、编辑和查看表单属性配置       | `object`             | —      |
| action  | 操作项是否展示（内置的删除、编辑等按钮） | `boolean`            | `true` |
| edit    | 编辑配置                                 | `boolean` / `object` | `true` |
| add     | 新增配置                                 | `boolean` / `object` | `true` |
| delete  | 删除配置                                 | `boolean` / `object` |
| search  | 查询配置                                 | `boolean` / `object` | `true` |
| request | 接口配置                                 | `object`             | —      |

## add和edit属性

| 属性名                    | 说明                                                                                        | 类型                          | 默认值 |
| :------------------------ | :------------------------------------------------------------------------------------------ | :---------------------------- | :----- |
| dialog                    | `el-dialog`组件属性                                                                         | `object`                      | —      |
| rules                     | 表单验证规则                                                                                | `object`                      | —      |
| columns                   | 表单项                                                                                      | `array`                       | —      |
| options                   | 表单选择项数据源                                                                            | `object`                      | —      |
| colon                     | 表单项冒号                                                                                  | `boolean`                     | false  |
| align                     | `flex`布局下的垂直排列方式                                                                  | `top` / `middle` /`bottom`    | —      |
| label-position            | 表单域标签的位置， 当设置为 `left` 或 `right` 时，则也需要设置 `label-width` 属性           | `enum`                        | right  |
| label-width               | 标签的长度，例如 `'50px'`。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 `auto`。 | `string` / `number`           | ''     |
| label-suffix              | 表单域标签的后缀                                                                            | `string`                      | ''     |
| hide-required-asterisk    | 是否隐藏必填字段标签旁边的红色星号。                                                        | `boolean`                     | false  |
| require-asterisk-position | 星号的位置。                                                                                | `left` / `right`              | left   |
| show-message              | 是否显示校验错误信息                                                                        | `boolean`                     | true   |
| inline-message            | 是否以行内形式展示校验信息                                                                  | `boolean`                     | false  |
| status-icon               | 是否在输入框中显示校验结果反馈图标                                                          | `boolean`                     | false  |
| validate-on-rule-change   | 是否在 `rules` 属性改变后立即触发一次验证                                                   | `boolean`                     | true   |
| size                      | 用于控制该表单内组件的尺寸                                                                  | `large` / `default` / `small` | —      |
| disabled                  | 是否禁用该表单内的所有组件。 如果设置为 `true`, 它将覆盖内部组件的 `disabled` 属性          | `boolean`                     | false  |
| scroll-to-error           | 当校验失败时，滚动到第一个错误表单项                                                        | `boolean`                     | false  |
| scroll-into-view-options  | 当校验有失败结果时，滚动到第一个失败的表单项目                                              | `object` / `boolean`          | —      |

## form属性

| 属性名                    | 说明                                                                                        | 类型                          | 默认值 |
| :------------------------ | :------------------------------------------------------------------------------------------ | :---------------------------- | :----- |
| rules                     | 表单验证规则                                                                                | `object`                      | —      |
| columns                   | 表单项                                                                                      | `array`                       | —      |
| options                   | 表单选择项数据源                                                                            | `object`                      | —      |
| colon                     | 表单项冒号                                                                                  | `boolean`                     | false  |
| align                     | `flex`布局下的垂直排列方式                                                                  | `top` / `middle` /`bottom`    | —      |
| label-position            | 表单域标签的位置， 当设置为 `left` 或 `right` 时，则也需要设置 `label-width` 属性           | `enum`                        | right  |
| label-width               | 标签的长度，例如 `'50px'`。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 `auto`。 | `string` / `number`           | ''     |
| label-suffix              | 表单域标签的后缀                                                                            | `string`                      | ''     |
| hide-required-asterisk    | 是否隐藏必填字段标签旁边的红色星号。                                                        | `boolean`                     | false  |
| require-asterisk-position | 星号的位置。                                                                                | `left` / `right`              | left   |
| show-message              | 是否显示校验错误信息                                                                        | `boolean`                     | true   |
| inline-message            | 是否以行内形式展示校验信息                                                                  | `boolean`                     | false  |
| status-icon               | 是否在输入框中显示校验结果反馈图标                                                          | `boolean`                     | false  |
| validate-on-rule-change   | 是否在 `rules` 属性改变后立即触发一次验证                                                   | `boolean`                     | true   |
| size                      | 用于控制该表单内组件的尺寸                                                                  | `large` / `default` / `small` | —      |
| disabled                  | 是否禁用该表单内的所有组件。 如果设置为 `true`, 它将覆盖内部组件的 `disabled` 属性          | `boolean`                     | false  |
| scroll-to-error           | 当校验失败时，滚动到第一个错误表单项                                                        | `boolean`                     | false  |
| scroll-into-view-options  | 当校验有失败结果时，滚动到第一个失败的表单项目                                              | `object` / `boolean`          | —      |

## request属性

| 属性名        | 说明                               | 类型                                                                                            | 默认值 |
| :------------ | :--------------------------------- | :---------------------------------------------------------------------------------------------- | :----- |
| searchApi     | 查询接口                           | `(params: any) => promise`                                                                      | —      |
| submitApi     | 编辑新增确认                       | `({ [key: string]?: any, row?: any, type: 'add' / 'edit' / 'view', formData: any }) => promise` | —      |
| deleteApi     | 删除接口                           | `({ [key: string]?: any, row?: any, selectionData?: any }) => promise`                          | —      |
| addApi        | 新增接口                           | `({ type: 'add' / 'edit' / 'view', formData: any }) => promise`                                 | —      |
| editApi       | 编辑接口                           | `({ [key: string]: any, row: any, type: 'add' / 'edit' / 'view', formData: any }) => promise`   | —      |
| detailApi     | 详情接口                           | `({ [key: string]: any, row: any }) => promise`                                                 | —      |
| editDetailApi | 编辑详情接口（编辑弹窗打开时调用） | `() => promise`                                                                                 | —      |
| alias         | 数据路径自定义                     | `object`                                                                                        | —      |
| searchFunc    | 查询方法重写                       | `({ params }) => any`                                                                           | —      |
| tableData     | 表格数据自定义返回                 | `(res) => any`                                                                                  | —      |

## z-crud新增编辑相关事件

| 事件名         | 说明     | 类型       |
| :------------- | :------- | :--------- |
| operate-submit | 弹窗确认 | `Function` |
