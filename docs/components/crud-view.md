# Crud 增删改查

`z-crud`组件查看功能介绍

## 基础用法

配置`column`的`detail`字段，可以实现详情的配置。

<preview path="../demo/crud-view/normal.vue" />

配置`detail`的`columns`数据，可以实现详情的配置。

<preview path="../demo/crud-view/normal-columns.vue" />

配置`form`的`columns`字段，可以实现详情的配置。

<preview path="../demo/crud-view/normal-form.vue" />

配置`column`项的`form`字段，可以实现详情信息的配置，但会同时配置查询、新增和编辑表单，可以设置`search`、`add`和`edit`为`false`关闭。

<preview path="../demo/crud-view/normal-column.vue" />

## 接口配置

查看详情默认会用行数据展示，如果需要调用接口，请配置`request`的`detailApi`。

<preview path="../demo/crud-view/detail-api.vue" />

## Drawer配置

`el-drawer`组件属性直接通过`drawer`传递。

<preview path="../demo/crud-view/drawer.vue" />

## 自定义查看

支持使用`operate-view`事件或`detail`传入函数自定义点击查看按钮后续逻辑。

<preview path="../demo/crud-view/custom-view.vue" />

## z-crud详情相关属性

| 属性名  | 说明                                     | 类型                 | 默认值 |
| :------ | :--------------------------------------- | :------------------- | :----- |
| detail  | 详情配置                         | `boolean` / `object` / `({ row, tableRef }) => void` | `true` |
| form    | 查询、新增、编辑和查看表单属性配置       | `object`             | —      |
| action  | 操作项是否展示（内置的删除、编辑等按钮） | `boolean`            | `true` |
| edit    | 编辑配置                                 | `boolean` / `object` | `true` |
| add     | 新增配置                                 | `boolean` / `object` | `true` |
| delete  | 删除配置                                 | `boolean` / `({ row, tableRef, getTableData }) => void` / `object` | `true` |
| search  | 查询配置                                 | `boolean` / `object` |
| drawer  | 抽屉配置                                 | `object`             | —      |
| request | 接口配置                                 | `object`             | —      |

## detail属性

| 属性名    | 说明                            | 类型                     | 默认值     |
| :-------- | :------------------------------ | :----------------------- | :--------- |
| columns   | 表单项                          | `array`                  | —          |
| border    | 是否带有边框                    | `boolean`                | true       |
| column    | 一行 `Descriptions Item` 的数量 | `number`                 | 1          |
| direction | 排列的方向                      | `enum`                   | horizontal |
| size      | 列表的尺寸                      | `enum`                   | —          |
| title     | 标题文本，显示在左上方          | `string` / `() => VNode` | ''         |
| extra     | 操作区文本，显示在右上方        | `string` / `() => VNode` | ''         |

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

| 属性名     | 说明                     | 类型                                                                                          | 默认值 |
| :--------- | :----------------------- | :-------------------------------------------------------------------------------------------- | :----- |
| searchApi  | 查询接口                 | `(params: any) => promise`                                                                    | —      |
| submitApi  | 编辑新增确认             | `({ [key: string]: any, row: any, type: 'add' / 'edit' / 'view', formData: any }) => promise` | —      |
| deleteApi  | 删除接口                 | `({ [key: string]?: any, row?: any, selectionData?: any }) => promise`                        | —      |
| addApi     | 新增接口                 | `({ type: 'add' / 'edit' / 'view', formData: any }) => promise`                               | —      |
| editApi    | 编辑接口                 | `({ [key: string]: any, row: any, type: 'add' / 'edit' / 'view', formData: any }) => promise` | —      |
| detailApi  | 详情接口                 | `({ [key: string]: any, row: any }) => promise`                                               | —      |
| alias      | 数据路径自定义           | `object`                                                                                      | —      |
| beforeData | 表格数据接口调用前的回调 | `Function`                                                                                    | —      |
| afterData  | 表格数据接口调用后的回调 | `(res) => void`                                                                               | —      |
| searchFunc | 查询方法重写             | `({ params }) => any`                                                                         | —      |
| tableData  | 表格数据自定义返回       | `(res) => any`                                                                                | —      |

## drawer属性

| 属性名                | 说明                                                                                                                       | 类型        | 默认值   |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------- | :---------- | :------- |
| append-to-body        | Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 **true**                                           | `boolean`   | false    |
| lock-scroll           | 是否在 Drawer 出现时将 body 滚动锁定                                                                                       | `boolean`   | true     |
| before-close          | 关闭前的回调，会暂停 Drawer 的关闭                                                                                         | `Function`  | —        |
| close-on-click-modal  | 是否可以通过点击 modal 关闭 Drawer                                                                                         | `boolean`   | true     |
| close-on-press-escape | 是否可以通过按下 ESC 关闭 Drawer                                                                                           | `boolean`   | true     |
| open-delay            | Drawer 打开的延时时间，单位毫秒                                                                                            | `number`    | 0        |
| close-delay           | Drawer 关闭的延时时间，单位毫秒                                                                                            | `number`    | 0        |
| destroy-on-close      | 控制是否在关闭 Drawer 之后将子元素全部销毁                                                                                 | `boolean`   | false    |
| modal                 | 是否需要遮罩层                                                                                                             | `boolean`   | true     |
| direction             | Drawer 打开的方向                                                                                                          | `enum`      | rtl      |
| show-close            | 是否显示关闭按钮                                                                                                           | `boolean`   | true     |
| size                  | Drawer 窗体的大小, 当使用 `number` 类型时, 以像素为单位, 当使用 `string` 类型时, 请传入 'x%', 否则便会以 `number` 类型解释 | `number` \  | `string` |
| title                 | Drawer 的标题，也可通过具名 slot （见下表）传入                                                                            | `string`    | —        |
| with-header           | 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效                             | `boolean`   | true     |
| modal-class           | 遮罩层的自定义类名                                                                                                         | `string`    | —        |
| z-index               | 设置 z-index                                                                                                               | `number`    | —        |
| header-aria-level     | header 的 `aria-level` 属性                                                                                                | `string`    | 2        |
| onOpen                | Drawer 打开的回调                                                                                                          | `Function`  | —        |
| onOpened              | Drawer 打开动画结束时的回调                                                                                                | `Function`  | —        |
| onClose               | Drawer 关闭的回调                                                                                                          | `Function`  | —        |
| onClosed              | Drawer 关闭动画结束时的回调                                                                                                | `Function`  | —        |

## z-crud查看相关事件

| 事件名         | 说明     | 类型       |
| :------------- | :------- | :--------- |
| operate-view | 查看按钮事件 | `({ tableRef, row }) => void` |
