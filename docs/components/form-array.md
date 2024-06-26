# ArrayForm 组表单

基于`ZForm`组件封装。

## 数组表单

表单类型`type`传入`array`，`columns`中配置`children（表单项）`，可以实现数组表单。

<preview path="../demo/form-array/normal.vue" />

## 内置数组表单

复杂的内置数组表单案列。想要校验表单项，可以直接调用表单`validate`方法。

<preview path="../demo/form-array/inline.vue" />

## 最大数量

通过`max`属性设置最大数量。

<preview path="../demo/form-array/max.vue" />

## 操作

配置`action`为`false`，可以关闭操作项。

<preview path="../demo/form-array/action.vue" />

## array表单属性

| 属性名 | 说明           | 类型     | 默认值 |
| :----- | :------------- | :------- | :----- |
| max    | 最大表单项数量 | `number` | —      |
| action    | 操作项 | `boolean` | `true`      |
