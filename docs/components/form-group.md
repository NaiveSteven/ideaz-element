# GroupForm 组表单

基于`ZForm`组件和`ElDivider`组件封装。

## 常规使用

表单类型`type`传入`group`，`columns`中配置`children（表单项）`，可以实现分组表单。

<preview path="../demo/form-group/normal.vue" />

## 分割线配置

`column`中配置`borderStyle`实现分割线样式修改，支持`'none' | 'solid' | 'hidden' | 'dashed' | ...`。

<preview path="../demo/form-group/divider.vue" />

## 文案位置

`column`中`contentPosition`属性配置分割线文案位置，支持`'left' | 'right' | 'center'`。

<preview path="../demo/form-group/position.vue" />
## 文案自定义

`label`除了支持字符串，还支持`h函数`、`render函数`和`slot（需带slot字符，无视大小写）`。

<preview path="../demo/form-group/label.vue" />

## 表单属性

请查阅`ZForm`组件常规使用文档。

## column属性（特有）

| 属性名           | 说明                                           | 类型                                           | 默认值   |
| :--------------- | :--------------------------------------------- | :--------------------------------------------- | :------- |
| label            | 分割线内容                                     | `string` / `() => VNode`                       | —        |
| border-style     | 设置分隔符样式                                 | `none` / `solid` / `hidden` / `dashed` / `...` | `solid`  |
| content-position | 自定义分隔线内容的位置                         | `left` / `right` / `center`                    | `center` |
| children         | 当前步骤中的表单项（属性都为通常`column`属性） | `array`                                        | —        |
