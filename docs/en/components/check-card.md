# CheckCard

Multi-select card component with enhanced functionality.

## Basic Usage

<preview path="../../demo/check-card/normal.vue" />

## Multiple Selection

<preview path="../../demo/check-card/multiple.vue" />

## Disabled

<preview path="../../demo/check-card/disabled.vue" />

## Custom Size

<preview path="../../demo/check-card/custom-size.vue" />

## With Avatar

<preview path="../../demo/check-card/avatar.vue" />

## With Description

<preview path="../../demo/check-card/description.vue" />

## With Picture

<preview path="../../demo/check-card/pic.vue" />

## Loading State

<preview path="../../demo/check-card/loading.vue" />

## z-check-card Attributes

| Attribute             | Description                              | Type                            | Default |
| :-------------------- | :--------------------------------------- | :------------------------------ | :------ |
| model-value / v-model | Binding value                            | `array` / `string` / `number`   | —       |
| options               | Card options                             | `array`                         | —       |
| multiple              | Whether multiple selection               | `boolean`                       | false   |
| disabled              | Whether disabled                         | `boolean`                       | false   |
| size                  | Card size                                | `string`                        | default |

## z-check-card Events

| Event Name | Description                      | Type       |
| :--------- | :------------------------------- | :--------- |
| change     | Triggered when selection changes | `Function` |
