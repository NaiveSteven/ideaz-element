# Watermark

Watermark component for adding watermarks to content.

## Basic Usage

Basic watermark functionality.

## z-watermark Attributes

| Attribute             | Description                              | Type                            | Default |
| :-------------------- | :--------------------------------------- | :------------------------------ | :------ |
| content               | Watermark content                        | `string` / `array`              | —       |
| font                  | Font configuration                       | `object`                        | —       |
| gap                   | Gap between watermarks                   | `array`                         | [100, 100] |
| offset                | Offset of watermarks                     | `array`                         | [0, 0] |
| width                 | Width of watermark                       | `number`                        | 120     |
| height                | Height of watermark                      | `number`                        | 64      |
| rotate                | Rotation angle                           | `number`                        | -22     |
| zIndex                | Z-index of watermark                     | `number`                        | 9       |
| image                 | Image source for watermark               | `string`                        | —       |

## z-watermark Slots

| Slot Name | Description         | Subtags |
| :-------- | :------------------ | :------ |
| default   | Content to be watermarked | —       |
