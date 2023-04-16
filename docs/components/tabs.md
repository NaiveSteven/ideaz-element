# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

基础的、简洁的标签页。

:::demo

```vue
<template>
  <xl-button>默认按钮</xl-button>
  <xl-button type="primary">主要按钮</xl-button>
  <xl-button type="success">成功按钮</xl-button>
  <xl-button type="info">信息按钮</xl-button>
  <xl-button type="warning">警告按钮</xl-button>
  <xl-button type="danger">危险按钮</xl-button>
</template>
```

:::

## Attributes

| 参数            | 说明                      | 类型    | 可选值                | 默认值              |
| --------------- | ------------------------- | ------- | --------------------- | ------------------- |
| value / v-model | 绑定值，选中选项卡的 name | string  | —                     | 第一个选项卡的 name |
| type            | 风格类型                  | string  | card/border-card      | —                   |
| closable        | 标签是否可关闭            | boolean | —                     | false               |
| addable         | 标签是否可增加            | boolean | —                     | false               |
| editable        | 标签是否同时可增加和关闭  | boolean | —                     | false               |
| tab-position    | 选项卡所在位置            | string  | top/right/bottom/left | top                 |
| stretch         | 标签的宽度是否自撑开      | boolean | -                     | false               |

