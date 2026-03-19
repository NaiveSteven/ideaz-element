# Text

Text component with enhanced functionality.

## Basic Usage

<preview path="../../demo/text/normal.vue" />

## Text Truncation

<preview path="../../demo/text/omit.vue" />

## Different Sizes

<preview path="../../demo/text/size.vue" />

## With Tooltip

<preview path="../../demo/text/tooltip.vue" />

## z-text Attributes

| Attribute             | Description                              | Type                            | Default |
| :-------------------- | :--------------------------------------- | :------------------------------ | :------ |
| type                  | Text type                                | `string`                        | —       |
| size                  | Text size                                | `string`                        | default |
| truncated             | Whether to truncate text                 | `boolean`                       | false   |
| line-clamp            | Maximum number of lines                  | `number`                        | —       |
| tooltip               | Whether to show tooltip when truncated   | `boolean`                       | false   |

## z-text Slots

| Slot Name | Description         | Subtags |
| :-------- | :------------------ | :------ |
| default   | Text content        | —       |
