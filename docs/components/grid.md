# Grid 栅格

element-plus的布局组件，主要用于兼容element-ui

:::tip
组件默认使用 Flex 布局
:::

## 基础布局

使用列创建基础网格布局。

通过 `row` 和 `col` 组件，并通过 `col` 组件的 `span` 属性我们就可以自由地组合布局。

:::demo

```vue
<template>
  <z-row class="mb-5">
    <z-col :span="24">
      <div class="grid-content ep-bg-purple-dark" />
    </z-col>
  </z-row>
  <z-row class="mb-5">
    <z-col :span="12">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="12">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
  </z-row>
  <z-row class="mb-5">
    <z-col :span="8">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="8">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
    <z-col :span="8">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
  <z-row class="mb-5">
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
  </z-row>
  <z-row class="mb-5">
    <z-col :span="4">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="4">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
    <z-col :span="4">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="4">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
    <z-col :span="4">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="4">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
  </z-row>
</template>

<style lang="scss">
.z-row:last-child {
  margin-bottom: 0;
}
.z-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.ep-bg-purple-dark {
  background: #99a8bf;
}
.ep-bg-purple {
  background: #d3dce6;
}
.ep-bg-purple-light {
  background: #e5e9f2;
}
</style>
```

:::

## 分栏间隔

支持列间距。

行提供 gutter 属性来指定列之间的间距，其默认值为0。

:::demo

```vue
<template>
  <z-row :gutter="20">
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
</template>

<style>
.z-row:last-child {
  margin-bottom: 0;
}
.z-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
```

:::

## 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

:::demo

```vue
<template>
  <z-row :gutter="20" class="mb-5">
    <z-col :span="16">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="8">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
  <z-row :gutter="20" class="mb-5">
    <z-col :span="8">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="8">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="4">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="4">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
  <z-row :gutter="20" class="mb-5">
    <z-col :span="4">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="16">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="4">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
</template>

<style>
.z-row:last-child {
  margin-bottom: 0;
}
.z-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
```

:::

## 列偏移

通过制定 col 组件的 offset 属性可以指定分栏偏移的栏数。

:::demo

```vue
<template>
  <z-row :gutter="20" class="mb-5">
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6" :offset="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
  <z-row :gutter="20" class="mb-5">
    <z-col :span="6" :offset="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6" :offset="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
  <z-row :gutter="20" class="mb-5">
    <z-col :span="12" :offset="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
</template>

<style>
.z-row:last-child {
  margin-bottom: 0;
}
.z-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
```

:::

## 对齐方式

默认使用 `flex`布局来对分栏进行灵活的对齐。

可以通过`justify`属性来定义子元素的排版方式，其取值为`start`、`center`、`end`、`space-between`、`space-around`或`space-evenly`。

:::demo

```vue
<template>
  <z-row class="row-bg mb-5">
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
  <z-row class="row-bg mb-5" justify="center">
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
  <z-row class="row-bg mb-5" justify="end">
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
  <z-row class="row-bg mb-5" justify="space-between">
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
  <z-row class="row-bg mb-5" justify="space-around">
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
  <z-row class="row-bg mb-5" justify="space-evenly">
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
    <z-col :span="6">
      <div class="grid-content ep-bg-purple" />
    </z-col>
  </z-row>
</template>

<style>
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.z-row:last-child {
  margin-bottom: 0;
}
.z-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
```

:::

## 响应式布局

参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。

:::demo

```vue
<template>
  <z-row :gutter="10">
    <z-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
    <z-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content ep-bg-purple" />
    </z-col>
    <z-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div class="grid-content ep-bg-purple-light" />
    </z-col>
  </z-row>
</template>

<style>
.z-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
```

:::

## Row 属性

| 属性名  | 说明                      | 类型     | 默认值 |
| :------ | :------------------------ | :------- | :----- |
| gutter  | 栅格间隔                  | `number` | 0      |
| justify | flex 布局下的水平排列方式 | `enum`   | start  |
| align   | flex 布局下的垂直排列方式 | `enum`   | top    |
| tag     | 自定义元素标签            | `string` | div    |

## Col 属性

| 属性名 | 说明                                   | 类型                | 默认值 |
| :----- | :------------------------------------- | :------------------ | :----- |
| span   | 栅格占据的列数                         | `number`            | 24     |
| offset | 栅格左侧的间隔格数                     | `number`            | 0      |
| push   | 栅格向右移动格数                       | `number`            | 0      |
| pull   | 栅格向左移动格数                       | `number`            | 0      |
| xs     | `<768px` 响应式栅格数或者栅格属性对象  | `number` / `object` | —      |
| sm     | `≥768px` 响应式栅格数或者栅格属性对象  | `number` / `object` | —      |
| md     | `≥992px` 响应式栅格数或者栅格属性对象  | `number` / `object` | —      |
| lg     | `≥1200px` 响应式栅格数或者栅格属性对象 | `number` / `object` | —      |
| xl     | `≥1920px` 响应式栅格数或者栅格属性对象 | `number` / `object` | —      |
| tag    | 自定义元素标签                         | `string`            | div    |
