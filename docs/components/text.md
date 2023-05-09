# Text 文本

常用的操作按钮。

## 基础用法

基础的按钮用法。

:::demo 使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

```vue
<template>
  <z-text class="mx-1">
    Default
  </z-text>
  <z-text class="mx-1" type="primary">
    Primary
  </z-text>
  <z-text class="mx-1" type="success">
    Success
  </z-text>
  <z-text class="mx-1" type="info">
    Info
  </z-text>
  <z-text class="mx-1" type="warning">
    Warning
  </z-text>
  <z-text class="mx-1" type="danger">
    Danger
  </z-text>
</template>

<style>
.mx-1 {
  margin-left: 4px;
  margin-right: 4px;
}
</style>
```

:::

## 省略

通过 `truncated` 属性，在文本超过视图或最大宽度设置时展示省略符。

:::demo

```vue
<template>
  <el-text class="w-100px" truncated>
    Self element set width 100px
  </el-text>
  <el-row>
    <el-col :span="4">
      <el-text truncated>
        Squeezed by parent element
      </el-text>
    </el-col>
  </el-row>
</template>

<style>
.w-100px {
  width: 100px;
}
</style>
```

:::

## 覆盖

使用属性 `tag` 覆盖元素

:::demo

```vue
<template>
  <el-space direction="vertical">
    <el-text>span</el-text>
    <el-text tag="p">
      This is a paragraph.
    </el-text>
    <el-text tag="b">
      Bold
    </el-text>

    <el-text tag="i">
      Ital
      ic
    </el-text>
    <el-text>
      This is
      <el-text tag="sub" size="small">
        subscript
      </el-text>
    </el-text>

    <el-text>
      This is
      <el-text tag="sup" size="small">
        superscript
      </el-text>
    </el-text>

    <el-text tag="ins">
      Inserted
    </el-text>
    <el-text tag="del">
      Deleted<
      /el-text>
      <el-text tag="mark">
        Marked
      </el-text>
    </el-text>
  </el-space>
</template>
```

:::
