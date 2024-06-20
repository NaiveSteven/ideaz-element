# TagSelect 标签选择

对标签进行筛选，适用于列表查询页。

## 基础用法

传入`options`自动生成选项

<preview path="../demo/tag-select/normal.vue" />

## 标题

传入`title`可配置标题，支持字符串、带`Slot`的字符串插槽和`render函数`

<preview path="../demo/tag-select/title.vue" />

## 多选

`multiple`设置为`true`，即可实现多选功能
默认添加`全部`标签，`all`设置为`false`可关闭（多选模式下才有全部标签）

<preview path="../demo/tag-select/multiple.vue" />

## 展开收起

标签宽度超过父级宽度时，会自动折叠，点击`展开`可展开全部标签

<preview path="../demo/tag-select/expand.vue" />

## 事件

`option`中配置`onClick`和`onClose`可监听标签点击和关闭事件

<preview path="../demo/tag-select/events.vue" />

## 标签组

`options`项中配置`children`，即可生成标签组
`modelValue`传入对象，`option`配置项中的`field`字段为对象的`key`

<preview path="../demo/tag-select/group.vue" />

## 字段路径

`option`配置项中的`field`字段可以配置为字段路径

<preview path="../demo/tag-select/path.vue" />

## 标题宽度

传入`titleWidth`，即可配置标题宽度

<preview path="../demo/tag-select/title-width.vue" />

## 标签样式

可以传入`type`、`round`、`effect`等属性，设置标签样式

<preview path="../demo/tag-select/style.vue" />

## z-tag-select 属性

| 属性名              | 说明             | 类型      | 默认  |
| :------------------ | :--------------- | :-------- | :---- |
| modelValue            | 选中项绑定值       | `array` / `string` / `number` | — |
| options            | 可配置项       | `array` | — |
| alias              | 字段路径自定义      | `object`    | `{ label: 'label', value: 'value' }` |
| multiple | 多选 | `boolean` | false |
| all                 | 全部标签（多选模式下才生效）   | `boolean` | true |
| titleWidth               | 标题宽度           | `string` / `number`  |  —    |
| size                | Tag 的尺寸       | `enum`    |  —    |

## z-tag-select 事件

| 事件名         | 说明                                     | 回调参数                           |
| :------------- | :--------------------------------------- | :--------------------------------- |
| change         | 选中值发生变化时触发                     | val，目前的选中值                  |

## z-tag-select Option 项可配置属性

| 属性名              | 说明             | 类型      | 默认  |
| :------------------ | :--------------- | :-------- | :---- |
| title              | 标题      | `string`    | — |
| field                | 绑定数据字段名       | `string`    | —    |
| children            | 可配置项       | `array` | — |
| multiple | 多选 | `boolean` | false |
| all                 | 全部标签（多选模式下才生效）   | `boolean` | true |
| titleWidth               | 标题宽度           | `string` / `number`  |  —    |
| size                | Tag 的尺寸       | `enum`    |  —    |

## z-tag-select children 项可配置属性

| 属性名              | 说明             | 类型      | 默认  |
| :------------------ | :--------------- | :-------- | :---- |
| label                | 标签内容       | `string`    | ''    |
| value                | 标签绑定值       | `string` / `value`    | ''    |
| closable            | 是否可关闭       | `boolean` | false |
| type                | Tag 的类型       | `enum`    | ''    |
| closable            | 是否可关闭       | `boolean` | false |
| disable-transitions | 是否禁用渐变动画 | `boolean` | false |
| hit                 | 是否有边框描边   | `boolean` | false |
| color               | 背景色           | `string`  | ''    |
| size                | Tag 的尺寸       | `enum`    | ''    |
| effect              | Tag 的主题       | `enum`    | light |
| round               | Tag 是否为圆形   | `boolean` | false |
| onClick               | Tag 点击事件   | `(option) => void` | — |
| onClose               | Tag 关闭事件   | `(option) => void` | — |
