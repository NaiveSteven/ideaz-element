# Watermark 水印

给页面区域添加水印（参考ant-design-pro）

## 基础用法

基础的按钮用法。

:::demo

```vue
<template>
  <z-watermark content="水印组件">
    <div class="h-500px" />
  </z-watermark>
</template>
```

:::

## 多行文字水印

通过 `content` 设置字符串数组，指定多行文字水印内容

:::demo

```vue
<template>
  <z-watermark :content="['多行文字', '多行文字']">
    <div class="h-500px" />
  </z-watermark>
</template>
```

:::

## 图片水印

通过 `image` 指定图片地址。为保证图片高清且不被拉伸，请传入水印图片的宽高 `width` 和 `height`, 并上传至少两倍的宽高的 `logo` 图片地址

:::demo

```vue
<template>
  <z-watermark height="36" width="36" image="https://avatars.githubusercontent.com/u/42891983?v=4">
    <div class="h-500px">
      <p>
        这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容。
      </p>
      <p>
        这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容。
      </p>
      <p>
        这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容，这是一段文字内容。
      </p>
    </div>
  </z-watermark>
</template>
```

:::

## 自定义配置

除了上面的配置，还可以通过 `rotate`、`fontSize`、`zIndex`、`fontColor`等属性自定义水印的样式

:::demo

```vue
<template>
  <z-watermark content="水印组件" rotate="46" font-color="purple" font-size="20" z-index="20">
    <div class="h-500px" />
  </z-watermark>
</template>
```

:::

## z-watermark 基础属性

| 属性名    | 描述           | 类型      | 默认值  |
| :-------- | :------------- | :-------- | :------ |
| width      | 水印的宽度           | `number` / `string`    | 120 |
| height      | 水印的高度           | `number` / `string`    | 64 |
| rotate      |  水印绘制时，旋转的角度，单位 °           | `number` / `string`    | -22 |
| image      | 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印           | `string`    | — |
| zIndex      | 追加的水印元素的 `z-index`          | `number` / `string`   | 9 |
| content      | 水印文字内容           | `string` / `string[]`    | — |
| fontColor      | 水印文字颜色           | `string`    | rgba(0,0,0,0.15) |
| fontSize      | 文字大小           | `string` / `number`    | 16 |

## z-watermark 高级参数

| 参数          | 说明                                                         | 类型                | 默认值                  |
| ------------- | ------------------------------------------------------------ | ------------------- | ----------------------- |
| markStyle     | 水印层的样式                                                 | `CSSProperties` | -                       |
| markClassName | 水印层的类名                                                 | `string`             | -                       |
| gapX          | 水印之间的水平间距                                           | `number` / `string`             | 212                     |
| gapY          | 水印之间的垂直间距                                           | `number` / `string`              | 222                     |
| offsetLeft    | 水印在 canvas 画布上绘制的水平偏移量, 正常情况下，水印绘制在中间位置, 即 `offsetLeft = gapX / 2` | `number` / `string`              | `offsetLeft = gapX / 2` |
| offsetTop     | 水印在 canvas 画布上绘制的垂直偏移量，正常情况下，水印绘制在中间位置, 即 `offsetTop = gapY / 2` | `number` / `string`              | `offsetTop = gapY / 2`  |
