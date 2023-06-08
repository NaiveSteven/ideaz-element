# Text 文本

常用的操作按钮。

## 基础用法

由 `type` 属性来选择 `Text` 的类型

:::demo

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
```

:::

## 尺寸

使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`

:::demo

```vue
<template>
  <z-text class="mx-1" size="large">
    Large
  </z-text>
  <z-text class="mx-1">
    Default
  </z-text>
  <z-text class="mx-1" size="small">
    Small
  </z-text>
</template>
```

:::

## 省略

通过 `truncated` 属性，在文本超过视图或最大宽度设置时展示省略符。

:::demo

```vue
<template>
  <z-text class="w-100px" truncated>
    Self element set width 100px
  </z-text>
  <el-row>
    <el-col :span="4">
      <z-text truncated>
        Squeezed by parent element
      </z-text>
    </el-col>
  </el-row>
</template>
```

:::
