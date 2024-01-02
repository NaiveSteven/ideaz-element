# Checkbox 多选框

> 多选框封装，和`z-form`组件配合食用，味道更佳。

## 基础用法

传入`options`自动生成选项

<preview path="../demo/checkbox/normal.vue" />

## 禁用

`option`中的某项设置`disabled`为`true`

<preview path="../demo/checkbox/disabled.vue" />

全部禁用，组件传入`disabled`为`true`

<preview path="../demo/checkbox/disabled-all.vue" />

## 键值对配置

<preview path="../demo/checkbox/kv.vue" />

## 按钮样式

给`option`某项设置`type`或者直接组件传入`type`

<preview path="../demo/checkbox/style.vue" />

## 带有边框

`border`属性或者字段可以渲染为带有边框的多选框。

<preview path="../demo/checkbox/border.vue" />

## z-checkbox 属性

| 属性名                | 说明                               | 类型      | 默认值  |
| :-------------------- | :--------------------------------- | :-------- | :------ |
| model-value / v-model | 绑定值                             | `array`  | []      |
| options | 可配置项                                   | `array` | —       |
| type | checkbox 形式                                   | `string` | el-checkbox       |
| alias | 键值对配置                                   | `object` | `{ label: 'label', value: 'value', disabled: 'disabled' }`       |
| border | 是否显示边框                                   | `boolean` | false       |
| size                  | 多选框组尺寸                       | `enum`    | —       |
| disabled              | 是否禁用                           | `boolean` | false   |
| min                   | 可被勾选的 checkbox 的最小数量     | `number`  | —       |
| max                   | 可被勾选的 checkbox 的最大数量     | `number`  | —       |
| label                 | 为屏幕阅读器准备的标签             | `string`  | —       |
| text-color            | 当按钮为活跃状态时的字体颜色       | `string`  | #ffffff |
| fill                  | 当按钮为活跃状态时的边框和背景颜色 | `string`  | #409EFF |
| tag                   | 复选框组元素标签                   | `string`  | div     |
| validate-event        | 是否触发表单验证                   | `boolean` | true    |

## z-checkbox 事件

| 事件名 | 说明                     | 类型       |
| :----- | :----------------------- | :--------- |
| change | 当绑定值变化时触发的事件 | `Function` |

## Options 项可配置属性

| 属性名                | 说明                                                         | 类型                                       | 默认值 |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------------- | :----- |
| value | 选中项绑定值                                                 | `string` / `number` / `boolean`            | —      |
| label                 | 文案 | `string` | —      |
| trueLabel            | 选中时的值                                                   | `string` / `number`                        | —      |
| falseLabel           | 没有选中时的值                                               | `string` / `number`                        | —      |
| disabled              | 是否禁用                                                     | `boolean`                                  | false  |
| border                | 是否显示边框                                                 | `boolean`                                  | false  |
| size                  | Checkbox 的尺寸                                              | `enum`                                     | —      |
| name                  | 原生 name 属性                                               | `string`                                   | —      |
| id                    | input id                                                     | `string`                                   | —      |
| type                    | Checkbox 形式                                                     | `string`                                   | el-checkbox      |
