# FilterForm 筛选表单

筛选表单，基于`z-form`封装。

:::tip

1. 如果表单项组件支持`placeholder`、`clearable`、`filterable`等属性，会被默认配置
2. 表单响应式默认配置为`{ xl: 6, lg: 8, md: 8, sm: 12, xs: 24 }`
:::

## 基础用法

+ 传入`columns`定义表单，`modelValue`为表单数据，`options`为数据配置项
+ 事件使用`on`+`事件名`
+ 表单项组件属性直接在`column`项中配置即可
+ `FormItem`组件属性（表单项装饰组件）属性配置在`formItemProps`字段中，有些字段为了方便使用，直接配置在`column`项中也可生效（如：`label`、`required`、`message`等）

<preview path="../demo/filter-form/normal.vue" />

## 校验

+ `columns`表单项中添加`required`字段，或者`formItemProps`中设置`required`字段，即可设置必填，校验信息会根据`label`自动生成也可自定义。
+ `z-filter-form`传入`rules`字段，可以定义表单校验规则。
+ `columns`表单项配置`rules`，可以定义当前表单项校验规则。

<preview path="../demo/filter-form/validate.vue" />

## 表单项自定义

我们可以使用`slot`或`render`自定义表单项内容。

自定义内容也是使用`hide`改变显隐状态。

<preview path="../demo/filter-form/custom-form-item.vue" />

## label、error自定义

`label`和`error`支持传入字符串、`render`函数或`拼接Slot的字符串`

<preview path="../demo/filter-form/custom-label.vue" />

## 联动

使用`hide`配置表单项显隐。
:::tip
如果`column`中配置了`hide`，`search`事件传递的数据会过滤隐藏的表单项（自定义表单项需要传入`field`）。
可以配置`filterHiddenFields`为`false`关闭，默认为`true`。
:::

<preview path="../demo/filter-form/hide.vue" />

## 操作按钮

按钮操作会有`search`和`reset`事件，已经内置重置操作和校验操作

<preview path="../demo/filter-form/operation.vue" />

设置`searchButtonLabel`、`resetButtonLabel`、`searchButtonLoading`、`resetButtonLoading`来设置按钮文字、加载状态。

<preview path="../demo/filter-form/operation-props.vue" />

设置`searchButtonProps`、`resetButtonProps`来设置按钮文字、加载状态。

<preview path="../demo/filter-form/operation-attrs.vue" />

通过`formOperation`插槽或`render函数`自定义操作按钮。

<preview path="../demo/filter-form/operation-slot.vue" />

## 默认收起

配置`collapsed`为`false`，表单会默认收起

<preview path="../demo/filter-form/expand.vue" />

## z-filter-form属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| modelValue                          | 表单数据对象                                                 | `object`             | —      |
| collapsed                      | 表单默认展开收起                                  | `boolean`             |  `true`      |
| searchButtonProps                          | 查询按钮属性配置                                                 | `object`             | —      |
| searchButtonLabel                          | 查询按钮文案                                                 | `string`             | `查询`      |
| searchButtonLoading                          | 查询按钮加载状态                                                 | `boolean`             | —      |
| resetButtonProps                          | 重置按钮属性配置                                                 | `object`             | —      |
| resetButtonLabel                          | 重置按钮文案                                                 | `string`             | `重置`      |
| resetButtonLoading                          | 重置按钮加载状态                                                 | `boolean`             | —      |
| rules                          | 表单验证规则                                                 | `object`             | —      |
| label-position                 | 表单域标签的位置， 当设置为 `left` 或 `right` 时，则也需要设置 `label-width` 属性 | `enum`               | right  |
| label-width                    | 标签的长度，例如 `'50px'`。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 `auto`。 | `string` / `number`  | ''     |
| label-suffix                   | 表单域标签的后缀                                             | `string`             | ''     |
| hide-required-asterisk         | 是否隐藏必填字段标签旁边的红色星号。                         | `boolean`            | false  |
| require-asterisk-position      | 星号的位置。                                                 | `left` / `right`               | left   |
| show-message                   | 是否显示校验错误信息                                         | `boolean`            | true   |
| inline-message                 | 是否以行内形式展示校验信息                                   | `boolean`            | false  |
| status-icon                    | 是否在输入框中显示校验结果反馈图标                           | `boolean`            | false  |
| validate-on-rule-change        | 是否在 `rules` 属性改变后立即触发一次验证                    | `boolean`            | true   |
| size                           | 用于控制该表单内组件的尺寸                                   | `large` / `default` / `small`               | —      |
| disabled                       | 是否禁用该表单内的所有组件。 如果设置为 `true`, 它将覆盖内部组件的 `disabled` 属性 | `boolean`            | false  |
| scroll-to-error                | 当校验失败时，滚动到第一个错误表单项                         | `boolean`            | false  |
| scroll-into-view-options | 当校验有失败结果时，滚动到第一个失败的表单项目               | `object` / `boolean` | —      |

## z-filter-form方法

| 名称          | 说明                                                         | 类型       |
| :------------ | :----------------------------------------------------------- | :--------- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise`。 | `Function` |
| validateField | 验证具体的某个字段。                                         | `Function` |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果             | `Function` |
| scrollToField | 滚动到指定的字段                                             | `Function` |
| clearValidate | 清理某个字段的表单验证信息。                                 | `Function` |

## column属性

| 属性名                         | 说明                                                         | 类型                 | 默认值 |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :----- |
| component                      | 表单项组件                                  | `string` / `() => VNode`             |  —      |
| field                      | 字段名                                  | `string`             |  —      |
| fieldProps                      | `component`组件属性                                  | `object`             |  —      |
| formItemProps                      | `formItem`组件属性                                  | `object`             |  —      |
| label                      | 表单标签名                                  | `string` / `() => VNode`             |  —      |
| hide                      | 显隐                                  | `boolean` / `(formData) => boolean`             |  —      |
| show                      | 使用`v-show`显隐                                  | `boolean` / `(formData) => boolean`             |  —      |
| slot                      | 表单项自定义内容插槽                                  | `string`             |  —      |
| render                      | 表单项自定义内容render                                  | `() => VNode`             |  —      |
| required                      |  表单项是否必填                                 | `boolean`             |  —      |
| rules                      | 该表单项校验规则                                  | `boolean`             |  —      |
| error                      | 错误信息                                  | `string` / `() => VNode`             |  —      |
| tooltip                      | 提示信息                                  | `string` / `() => VNode`             |  —      |
| extra                      | 额外信息                                  | `string` / `() => VNode`             |  —      |
| children                      | 表单折叠模式下生效，column数组                                  | `array`             |  —      |
| span                      | 占据的单元格                                  | `number`             |  —      |
| offset                      | 左侧的间隔格数                                  | `number`             |  —      |
| pull                      | 向左移动格数                                  | `number`             |  —      |
| push                      | 向右移动格数                                  | `boolean`             |  —      |
| xs                      | `<768px` 响应式栅格数或者栅格属性对象                | `number` / `object`             |  —      |
| sm                      | `≥768px` 响应式栅格数或者栅格属性对象                       | `number` / `object`             |  —      |
| md                      | `≥992px` 响应式栅格数或者栅格属性对象                         | `number` / `object`             |  —      |
| lg                      | `≥1200px` 响应式栅格数或者栅格属性对象                        | `number` / `object`            |  —      |
| xl                      | `≥1920px` 响应式栅格数或者栅格属性对象                        | `number` / `object`            |  —      |

## formItemProps属性

| 属性名          | 说明                                                         | 类型                  | Default |
| :-------------- | :----------------------------------------------------------- | :-------------------- | :------ |
| tooltip           | 提示文案                                                     | `string` / `() => VNode`              | —       |
| extra           | 额外信息                                                     | `string` / `() => VNode`              | —       |
| colon           | 冒号                                                     | `boolean`              | —       |
| label           | 标签文本                                                     | `string` / `() => VNode`              | —       |
| label-width     | 标签宽度，例如 `'50px'`。 可以使用 `auto`。                  | `string` / `number`   | ''      |
| required        | 是否为必填项，如不设置，则会根据校验规则确认                 | `boolean`             | —       |
| rules           | 表单验证规则, 具体配置见[下表](https://element-plus.org/zh-CN/component/form.html#formitemrule), 更多内容可以参考[async-validator](https://github.com/yiminghe/async-validator) | `object`              | —       |
| error           | 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。 | `string` / `() => VNode`              | —       |
| show-message    | 是否显示校验错误信息                                         | `boolean`             | true    |
| inline-message  | 是否在行内显示校验信息                                       | `string` / `boolean`  | ''      |
| size            | 用于控制该表单域下组件的默认尺寸                             | `large` / `default` / `small`                | —       |
| for             | 和原生标签相同能力                                           | `string`              | —       |
| validate-status | formItem 校验的状态                                          | `error` / `validating` / `success`               | —       |
