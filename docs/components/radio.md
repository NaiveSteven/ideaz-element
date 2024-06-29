# Radio 单选框

单选框封装，和`z-form`组件配合食用，风味更佳。

## 基础用法

传入`options`自动生成选项

<preview path="../demo/radio/normal.vue" />

## 禁用

`option`中的某项设置`disabled`为`true`

<preview path="../demo/radio/disabled.vue" />

全部禁用，组件传入`disabled`为`true`

<preview path="../demo/radio/disabled-all.vue" />

## 键值对配置

<preview path="../demo/radio/kv.vue" />

## 取消选中

配置`isCancel`为`true`，可以取消选中

<preview path="../demo/radio/cancel.vue" />

## 按钮样式

给`option`某项设置`type`或者直接组件传入`type`

<preview path="../demo/radio/button.vue" />

## 带有边框

`border`属性或者字段可以渲染为带有边框的多选框。

<preview path="../demo/radio/border.vue" />

## z-radio 属性

| 属性名                | 说明                                     | 类型                            | 默认值  |
| :-------------------- | :--------------------------------------- | :------------------------------ | :------ |
| model-value / v-model | 绑定值                                   | `string` / `number` / `boolean` | —       |
| options | 可配置项                                   | `array` | —       |
| type | Radio 形式                                   | `string` | radio       |
| alias | 键值对配置                                   | `object` | `{ label: 'label', value: 'value', disabled: 'disabled' }`       |
| isCancel | 是否取消选中                                   | `boolean` | false       |
| border | 是否显示边框                                   | `boolean` | false       |
| size                  | 单选框按钮或边框按钮的大小               | `string`                        | default |
| disabled              | 是否禁用                                 | `boolean`                       | false   |
| text-color            | 按钮形式的 Radio 激活时的文本颜色        | `string`                        | #ffffff |
| fill                  | 按钮形式的 Radio 激活时的填充色和边框色  | `string`                        | #409EFF |
| validate-event        | 输入时是否触发表单的校验                 | `boolean`                       | true    |
| name                  | 原生 `name` 属性                         | `string`                        | —       |
| id                    | 原生 `id` 属性                           | `string`                        | —       |

## z-radio 事件

| 事件名 | 说明                     | 类型       |
| :----- | :----------------------- | :--------- |
| change | 当绑定值变化时触发的事件 | `Function` |

## Options 项可配置属性

| 属性名                | 说明             | 类型                            | 默认值 |
| :-------------------- | :--------------- | :------------------------------ | :----- |
| value                 | 单选框的绑定值       | `string` / `number` / `boolean` | —      |
| label                 | 单选框的文案       | `string` | —      |
| disabled              | 是否禁用单选框   | `boolean`                       | false  |
| border                | 是否显示边框     | `boolean`                       | false  |
| size                  | 单选框的尺寸     | `enum`                          | —      |
| name                  | 原始 `name` 属性 | `string`                        | —      |
| type                  | Radio 形式 | `string`                        | el-radio      |
