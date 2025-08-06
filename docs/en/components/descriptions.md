# Descriptions

Data-driven description list encapsulation.

## Basic Usage

Implement description list by configuring `column` and passing `detail` data

<preview path="../../demo/descriptions/normal.vue" />

## Nested Key-Value

For objects or arrays with nested structure, just configure `prop`

<preview path="../../demo/descriptions/kv.vue" />

## Size, Border, Layout and Alignment

<preview path="../../demo/descriptions/style.vue" />

## Title and Label

`title` and `label` attributes support `string` and `render` functions. When you pass string type, if it contains `Slot`, it will be rendered as `Slot`

<preview path="../../demo/descriptions/title.vue" />

## Slots

Configure `render` in `columns` items, or add slots with ` detail-[prop] ` in template to customize content.
`extra` configuration can pass `string`, `render function` or use `extra slot`.

<preview path="../../demo/descriptions/slot.vue" />

## z-descriptions Attributes

| Attribute | Description                     | Type    | Accepted Values         | Default    |
| :-------- | :------------------------------ | :------ | :---------------------- | :--------- |
| columns   | Description list configuration items | `Array` | —                       | —          |
| detail    | Detail data                     | `Object` | —                       | —          |
| border    | Whether to display with border  | `boolean` | —                       | false      |
| column    | Number of `Descriptions Item` in one row | `number`  | —                       | 3          |
| direction | Direction of arrangement        | `string`  | vertical / horizontal   | horizontal |
| size      | Size of the list                | `string`  | large / default / small | default    |
| title     | Title text, displayed in the upper left | `string` / `() => VNode`  | —                       | —          |
| extra     | Operation area text, displayed in the upper right | `string` / `() => VNode`  | —                       | —          |

## Column Configuration

| Attribute       | Description                                                  | Type            | Accepted Values       | Default |
| :-------------- | :----------------------------------------------------------- | :-------------- | :-------------------- | :------ |
| prop            | Corresponding field name in `detail`                        | `string`        | —                     | —       |
| label           | Label text                                                   | `string` / `(columnItem) => VNode` | —                     | —       |
| span            | Number of columns                                            | `number`        | —                     | 1       |
| width           | Column width, width of same column in different rows is set by maximum value (if no `border`, width includes label and content) | `string / number` | —                     | —       |
| minWidth        | Minimum column width, difference from `width` is that `width` is fixed, `min-width` will distribute remaining width proportionally to columns with `min-width` set (if no `border`, width includes label and content) | `string / number` | —                     | —       |
| align           | Column content alignment (if no `border`, affects both label and content) | `string`        | left / center / right | left    |
| labelAlign      | Column label alignment, if not set, uses content alignment (if no `border`, use `align` parameter) | `string`        | left / center / right | —       |
| className       | Column content custom class name                             | `string`        | —                     | —       |
| labelClassName  | Column label custom class name                               | `string`        | —                     | —       |
| render          | `render` function                                            | `string`        | —                     | —       |
