# CheckCard 多选卡片

集合多种相关联说明信息，并且可被选择的卡片。

## 常规使用

传入`options`，配置选项卡

<preview path="../demo/check-card/normal.vue" />

## 多选模式

设置`multiple`为`true`开启多选模式。

<preview path="../demo/check-card/multiple.vue" />

## 字段路径

设置`alias`属性，即可自定义字段路径。

<preview path="../demo/check-card/alias.vue" />

## 尺寸

通过配置组件的`size`的属性，统一配置尺寸。也可以配置`option`的`size`，单个定制。

<preview path="../demo/check-card/size.vue" />

## 自定义尺寸

也可以通过 `style` 或 `class` 自定义卡片大小。

<preview path="../demo/check-card/custom-size.vue" />

## 组合样式

头像，标题，描述区域可以自由组合或者单独呈现，组件会为你调整为最合适的对齐方式。

<preview path="../demo/check-card/combination.vue" />

## 自定义头像

`avatar` 属性传入自定义`render函数`。

<preview path="../demo/check-card/avatar.vue" />

## 自定义标题

`title` 属性传入自定义`render函数`。

<preview path="../demo/check-card/title.vue" />

## 自定义描述

描述区域可通过 `description` 自定义。

<preview path="../demo/check-card/description.vue" />

## 操作栏

配置 `extra` 为卡片添加操作栏。

<preview path="../demo/check-card/extra.vue" />

## 组件 Loading

通过配置 loading 属性为 true 来配置内容在加载中。

<preview path="../demo/check-card/loading.vue" />

## 纯图片选项

<preview path="../demo/check-card/pic.vue" />

## 选项不可用

通过配置 `disabled` 属性配置选项不可用。

<preview path="../demo/check-card/disabled.vue" />

## z-check-card属性

| 属性名         | 说明                                                  | 类型                                                         | 默认值    |
| ------------ | ----------------------------------------------------- | ------------------------------------------------------------ | --------- |
| modelValue | 双向绑定                                        | `string / string[]`                                           | -         |
| alias | 键值对配置                                   | `object` | `{ label: 'label', value: 'value', disabled: 'disabled' }`       |
| multiple     | 多选                                                  | `boolean`                                                      | false     |
| bordered     | 是否显示边框                                          | `boolean`                                                      | true      |
| disabled     | 整组失效                                              | `boolean`                                                      | false     |
| loading      | 当卡片组内容还在加载中时，可以用 loading 展示一个占位 | `boolean`                                                      | false     |
| options      | 指定可选项                                            | `array` | []        |
| size         | 选择框大小，可选 `large` `small` `default`                      | `string`                                                       | `default` |
| onChange     | 变化时回调函数                                        | `Function(checkedValue)`                                       | -         |

## z-check-card Options项可配置属性

| 属性名           | 说明                                                         | 类型                 | 默认值    |
| -------------- | ------------------------------------------------------------ | -------------------- | --------- |
| title          | 标题                                                         | `string / VNode`  | -         |
| value          | 选项值                                                       | `string`               | -         |
| bordered       | 是否显示边框                                                 | `boolean`              | true      |
| disabled       | 失效状态                                                     | `boolean`              | false     |
| size           | 选择框大小，可选 `large` `small`                             | `string`               | `default` |
| description    | 描述                                                         | `string / VNode`            | -         |
| avatar         | 选项元素的图片地址                                           | `link / VNode`    | -         |
| extra          | 卡片右上角操作区域                                                     | `string / VNode` | -         |
| cover          | 卡片背景图片, 注意使用该选项后`title`，`description`和`avatar`失效 | `VNode`            | -         |

## z-check-card事件

| 事件名           | 说明                                                         | 回调参数                 |
| -------------- | ------------------------------------------------------------ | -------------------- |
| change        |     变化时回调函数                                         | checked              |
