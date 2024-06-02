# Crud 增删改查

> `z-crud`组件表单部分功能介绍

## 基础用法

配置`column`项的`search`生成表单项。

- `label`和`field`可以不传，默认取`prop`和`label`
- 组件默认配置`clearable`、`placeholder`和`filterable`
- `search`属性的具体配置可参考`z-form`的`column`项
- 表单布局固定为`{ xs: 24, sm: 12, md: 8, lg: 8, xl: 6 }`

<preview path="../demo/crud-form/normal.vue" />

配置`search`的`columns`字段也能达到相同的效果，如果你想配置表单`labelWidth`等其他属性，也可以放入`search`中

<preview path="../demo/crud-form/normal-columns.vue" />

配置`column`的`form`也能生成查询表单项，但同时也会生成新增、编辑和查询表单项，如不需要，可配置`add`和`edit`字段为`false`。

<preview path="../demo/crud-form/normal-form.vue" />

## 条件缓存

配置`name`字段，会默认开启缓存，筛选表单数据和`pagination`数据会缓存在`sessionStorage`中，下次加载时会优先从缓存中获取条件数据。

数据获取需要在`onMounted`生命周期中调用。

<preview path="../demo/crud-form/storage.vue" />

配置`request`后，缓存条件会在内部处理。

<preview path="../demo/crud-form/storage-request.vue" />

## 校验

- `form`字段中添加`required`字段，或者`formItemProps`中设置`required`字段，即可设置必填，校验信息会根据`label`自动生成也可自定义。
- `z-crud`传入的`search`对象配置`rules`字段，可以定义表单校验规则。
- `form`字段中表单项配置`rules`，可以定义当前表单项校验规则。

<preview path="../demo/crud-form/validate.vue" />

## 表单项自定义

我们可以使用`slot`或`render`自定义表单项内容。

<preview path="../demo/crud-form/custom-form-item.vue" />

## label、error自定义

`label`和`error`支持传入字符串、`render`函数或`拼接Slot的字符串`。

<preview path="../demo/crud-form/custom-label.vue" />

## 联动

使用`hide`配置表单项显隐。性别选择`male`则展示出生日期筛选项。

<preview path="../demo/crud-form/hide.vue" />

## 操作按钮

按钮操作会有`search`和`reset`事件，已经内置重置操作和校验操作。支持自定义。

详情请查看`z-filter-form`组件文档。

<preview path="../demo/crud-form/operation.vue" />

## 默认收起

配置`search`的`collapsed`为`false`，表单会默认收起。

<preview path="../demo/crud-form/expand.vue" />

## z-crud表单相关属性

| 属性名              | 说明                                     | 类型                 | 默认值 |
| :------------------ | :--------------------------------------- | :------------------- | :----- |
| modelValue:formData | 查询表单数据                             | `object`             | —      |
| detail              | 查询表单属性配置                         | `boolean` / `object` | `true` |
| form                | 查询、新增、编辑和查看表单属性配置       | `object`             | —      |
| action              | 操作项是否展示（内置的删除、编辑等按钮） | `boolean`            | `true` |
| edit                | 编辑配置                                 | `boolean` / `object` | `true` |
| add                 | 新增配置                                 | `boolean` / `object` | `true` |
| delete              | 删除配置                                 | `boolean` / `object` |
| search              | 查询配置                                 | `boolean` / `object` | `true` |
| request             | 接口配置                                 | `object`             | —      |

## search属性

| 属性名                    | 说明                                                                                        | 类型                          | 默认值 |
| :------------------------ | :------------------------------------------------------------------------------------------ | :---------------------------- | :----- |
| collapsed                 | 表单默认展开收起                                                                            | `boolean`                     | `true` |
| searchButtonProps         | 查询按钮属性配置                                                                            | `object`                      | —      |
| searchButtonLabel         | 查询按钮文案                                                                                | `string`                      | `查询` |
| searchButtonLoading       | 查询按钮加载状态                                                                            | `boolean`                     | —      |
| resetButtonProps          | 重置按钮属性配置                                                                            | `object`                      | —      |
| resetButtonLabel          | 重置按钮文案                                                                                | `string`                      | `重置` |
| resetButtonLoading        | 重置按钮加载状态                                                                            | `boolean`                     | —      |
| rules                     | 表单验证规则                                                                                | `object`                      | —      |
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

## z-crud查询表单方法

| 名称          | 说明                                                            | 类型       |
| :------------ | :-------------------------------------------------------------- | :--------- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise`。 | `Function` |
| validateField | 验证具体的某个字段。                                            | `Function` |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果                | `Function` |
| scrollToField | 滚动到指定的字段                                                | `Function` |
| clearValidate | 清理某个字段的表单验证信息。                                    | `Function` |

## 表单项属性

| 属性名        | 说明                   | 类型                        | 默认值 |
| :------------ | :--------------------- | :-------------------------- | :----- |
| component     | 表单项组件             | `string` / `() => VNode`    | —      |
| field         | 字段名                 | `string`                    | —      |
| fieldProps    | `component`组件属性    | `object`                    | —      |
| detail        | 详情项                 | `object` / `boolean`        | —      |
| add           | 新增项                 | `object` / `boolean`        | —      |
| search        | 查询项                 | `object` / `boolean`        | —      |
| edit          | 编辑项                 | `object` / `boolean`        | —      |
| formItemProps | `formItem`组件属性     | `object`                    | —      |
| label         | 表单标签名             | `string` / `() => VNode`    | —      |
| hide          | 显隐                   | `boolean` / `() => boolean` | —      |
| hideUseVShow  | 使用`v-show`显隐       | `boolean` / `() => boolean` | —      |
| slot          | 表单项自定义内容插槽   | `string`                    | —      |
| render        | 表单项自定义内容render | `() => VNode`               | —      |
| required      | 表单项是否必填         | `boolean`                   | —      |
| rules         | 该表单项校验规则       | `boolean`                   | —      |
| error         | 错误信息               | `string` / `() => VNode`    | —      |
| tooltip       | 提示信息               | `string` / `() => VNode`    | —      |
| extra         | 额外信息               | `string` / `() => VNode`    | —      |

## formItemProps属性

| 属性名          | 说明                                                                                                                                                                            | 类型                               | Default |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------- | :------ |
| tooltip         | 提示文案                                                                                                                                                                        | `string` / `() => VNode`           | —       |
| extra           | 额外信息                                                                                                                                                                        | `string` / `() => VNode`           | —       |
| colon           | 冒号                                                                                                                                                                            | `boolean`                          | —       |
| label           | 标签文本                                                                                                                                                                        | `string` / `() => VNode`           | —       |
| label-width     | 标签宽度，例如 `'50px'`。 可以使用 `auto`。                                                                                                                                     | `string` / `number`                | ''      |
| required        | 是否为必填项，如不设置，则会根据校验规则确认                                                                                                                                    | `boolean`                          | —       |
| rules           | 表单验证规则, 具体配置见[下表](https://element-plus.org/zh-CN/component/form.html#formitemrule), 更多内容可以参考[async-validator](https://github.com/yiminghe/async-validator) | `object`                           | —       |
| error           | 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。                                                                                            | `string` / `() => VNode`           | —       |
| show-message    | 是否显示校验错误信息                                                                                                                                                            | `boolean`                          | true    |
| inline-message  | 是否在行内显示校验信息                                                                                                                                                          | `string` / `boolean`               | ''      |
| size            | 用于控制该表单域下组件的默认尺寸                                                                                                                                                | `large` / `default` / `small`      | —       |
| for             | 和原生标签相同能力                                                                                                                                                              | `string`                           | —       |
| validate-status | formItem 校验的状态                                                                                                                                                             | `error` / `validating` / `success` | —       |

### z-crud查询表单相关事件

| 事件名          | 说明       | 类型       |
| :-------------- | :--------- | :--------- |
| update:formData | 表单项数据 | `Function` |
| reset           | 重置       | `Function` |
| search          | 查询       | `Function` |
