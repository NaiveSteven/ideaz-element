# Text 文本

集成了常规的文本组件和省略组件功能。

## 基础用法

由 `type` 属性来选择 `Text` 的类型

<preview path="../demo/text/normal.vue" />

## 尺寸

使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`

<preview path="../demo/text/size.vue" />

## 省略

设置`lines`、`length`等属性时，超过限制则展示省略符，超出内容在`tooltip`中展示。

<preview path="../demo/text/omit.vue" />

## tooltip配置

`tooltip`属性配置参考`el-tooltip`组件属性

<preview path="../demo/text/tooltip.vue" />

## z-text 属性

| 属性名    | 描述           | 类型      | 默认值  |
| :-------- | :------------- | :-------- | :------ |
| type      | 类型           | `primary` / `success` /`info` /`warning` /`danger`    | —       |
| size      | 大小           | `large` / `default` /`small`    | default |
| tooltip      | 超出内容提示           | `object`    | — |
| lines      | 行数限制，超出内容省略           | `number`    | — |
| length      | 文字数量限制，超出内容省略           | `number`    | — |
| text      | 展示的文本内容           | `string`    | — |
