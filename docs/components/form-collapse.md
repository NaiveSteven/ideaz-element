# CollapseForm 折叠表单

基于`ZForm`组件和`ElCollapse`封装。

## 常规使用

表单类型`type`传入`collapse`，`column`项中配置`children（表单项）`，可以实现可折叠表单。

`activeCollapse`绑定展开的折叠项`label`，如不想绑定`label`，请在`column`项中配置字段`key`。

<preview path="../demo/form-collapse/normal.vue" />
## 标题

默认`column`项的`label`字段为折叠项的`name`，如果`label`为函数或不想将`label`作为折叠项`name`，请额外传入`key`字段。支持`slot`插槽自定义标题。

<preview path="../demo/form-collapse/label.vue" />

## 折叠属性

`accordion`属性直接传入`ZForm`组件。`disabled`属性传入`column`项中，可以禁用折叠项。

<preview path="../demo/form-collapse/collapse.vue" />

## 自定义内容

当`ZForm`组件`type`属性为`collapse`时，`column`项可配置`slot`或`render`自定义折叠内容。

<preview path="../demo/form-collapse/custom.vue" />
## 折叠展开事件

`collapse-change`事件返回当前展开的折叠项`label`，直接绑定`ZForm`组件即可。

<preview path="../demo/form-collapse/event.vue" />

## 折叠表单属性

| 属性名                 | 说明                                         | 类型               | 默认值  |
| :--------------------- | :------------------------------------------- | :----------------- | :------ |
| v-model:activeCollapse | 展开的`collapse`项（`type`为`collapse`生效） | `array` / `string` | —       |
| accordion              | 手风琴模式                                   | `boolean`          | `false` |

### 事件

| 事件名                | 说明                     | 类型       |
| :-------------------- | :----------------------- | :--------- |
| update:modelValue     | 表单项数据               | `Function` |
| update:activeCollapse | 折叠表单的展开项         | `Function` |
| collapse-change       | 折叠表单折叠项改变时触发 | `Function` |
