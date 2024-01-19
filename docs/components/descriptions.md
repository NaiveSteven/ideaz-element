# Descriptions 描述列表

> 基于数据驱动的描述列表封装

## 基础用法

通过配置`column`、传入`detail`数据即可实现描述列表

<preview path="../demo/descriptions/normal.vue" />

## 嵌套键值

对具有嵌套结构的对象或数组进行取值，仅需要配置 `prop`

<preview path="../demo/descriptions/kv.vue" />

## 尺寸、边框、布局和对齐方式

<preview path="../demo/descriptions/style.vue" />

## title、label

`title`和`label`属性支持`string`和`render`函数，当你传入字符类型时，如果包含`Slot`，则会被渲染为`Slot`

<preview path="../demo/descriptions/title.vue" />

## 插槽

在`columns`项目配置`render`，或者在模板中增加带` detail-[prop] `相关的插槽即可使用。
`extra`配置可传入`字符串`、`render函数`和使用`extra插槽`

<preview path="../demo/descriptions/slot.vue" />

## z-descriptions 属性

| 属性名    | 说明                            | 类型    | 可选值                  | 默认值     |
| :-------- | :------------------------------ | :------ | :---------------------- | :--------- |
| columns    | 描述列表配置项                    | `Array` | —                       | —      |
| detail    | 详情数据                    | `Object` | —                       | —      |
| border    | 是否带有边框                    | `boolean` | —                       | false      |
| column    | 一行 `Descriptions Item` 的数量 | `number`  | —                       | 3          |
| direction | 排列的方向                      | `string`  | vertical / horizontal   | horizontal |
| size      | 列表的尺寸                      | `string`  | large / default / small | default    |
| title     | 标题文本，显示在左上方          | `string` / `() => VNode`  | —                       | —          |
| extra     | 操作区文本，显示在右上方        | `string` / `() => VNode`  | —                       | —          |

## column 配置项

| 属性名           | 说明                                                         | 类型            | 可选值                | 默认值 |
| :--------------- | :----------------------------------------------------------- | :-------------- | :-------------------- | :----- |
| prop            | 对应`detail`的字段名                                                     | `string`          | —                     | —      |
| label            | 标签文本                                                     | `string` / `(columnItem) => VNode`          | —                     | —      |
| span             | 列的数量                                                     | `number`          | —                     | 1      |
| width            | 列的宽度，不同行相同列的宽度按最大值设定（如无 `border` ，宽度包含标签与内容） | `string / number` | —                     | —      |
| minWidth        | 列的最小宽度，与 `width` 的区别是 `width` 是固定的，`min-width` 会把剩余宽度按比例分配给设置了 `min-width` 的列（如无 `border`，宽度包含标签与内容） | `string / number` | —                     | —      |
| align            | 列的内容对齐方式（如无 `border`，对标签和内容均生效）        | `string`          | left / center / right | left   |
| labelAlign      | 列的标签对齐方式，若不设置该项，则使用内容的对齐方式（如无 `border`，请使用 `align` 参数） | `string`          | left / center / right | —      |
| className       | 列的内容自定义类名                                           | `string`          | —                     | —      |
| labelClassName | column label custom class name                               | `string`          | —                     | —      |
| render | `render`函数                              | `string`          | —                     | —      |
