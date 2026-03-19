# Checkbox

Checkbox component encapsulation, works better with `z-form` component.

## Basic Usage

Pass in `options` to automatically generate options

<preview path="../../demo/checkbox/normal.vue" />

## Disabled

Set `disabled` to `true` for a certain item in `option`

<preview path="../../demo/checkbox/disabled.vue" />

Disable all, pass `disabled` as `true` to the component

<preview path="../../demo/checkbox/disabled-all.vue" />

## Key-Value Configuration

<preview path="../../demo/checkbox/kv.vue" />

## Button Style

Set `type` for a certain item in `option` or pass `type` directly to the component

<preview path="../../demo/checkbox/style.vue" />

## With Border

The `border` attribute or field can be rendered as a checkbox with border.

<preview path="../../demo/checkbox/border.vue" />

## z-checkbox Attributes

| Attribute             | Description                              | Type                            | Default |
| :-------------------- | :--------------------------------------- | :------------------------------ | :------ |
| model-value / v-model | Binding value                            | `array`                         | —       |
| options               | Configurable options                     | `array`                         | —       |
| type                  | Checkbox form                            | `string`                        | checkbox |
| alias                 | Key-value pair configuration             | `object`                        | `{ label: 'label', value: 'value', disabled: 'disabled' }` |
| border                | Whether to show border                   | `boolean`                       | false   |
| size                  | Size of checkbox button or border button | `string`                        | default |
| disabled              | Whether to disable                       | `boolean`                       | false   |
| text-color            | Text color when checkbox button is active | `string`                      | #ffffff |
| fill                  | Fill color and border color when checkbox button is active | `string` | #409EFF |
| validate-event        | Whether to trigger form validation when input | `boolean`                | true    |
| name                  | Native `name` attribute                  | `string`                        | —       |
| id                    | Native `id` attribute                    | `string`                        | —       |

## z-checkbox Events

| Event Name | Description                      | Type       |
| :--------- | :------------------------------- | :--------- |
| change     | Event triggered when binding value changes | `Function` |

## Options Item Configurable Attributes

| Attribute | Description          | Type                            | Default |
| :-------- | :------------------- | :------------------------------ | :------ |
| value     | Binding value of checkbox | `string` / `number` / `boolean` | —      |
| label     | Text of checkbox     | `string`                        | —      |
| disabled  | Whether to disable checkbox | `boolean`                    | false  |
| border    | Whether to show border | `boolean`                     | false  |
| size      | Size of checkbox     | `enum`                          | —      |
| name      | Native `name` attribute | `string`                     | —      |
| type      | Checkbox form        | `string`                        | el-checkbox |
