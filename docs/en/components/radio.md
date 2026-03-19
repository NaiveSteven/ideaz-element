# Radio

Radio component encapsulation, works better with `z-form` component.

## Basic Usage

Pass in `options` to automatically generate options

<preview path="../../demo/radio/normal.vue" />

## Disabled

Set `disabled` to `true` for a certain item in `option`

<preview path="../../demo/radio/disabled.vue" />

Disable all, pass `disabled` as `true` to the component

<preview path="../../demo/radio/disabled-all.vue" />

## Key-Value Configuration

<preview path="../../demo/radio/kv.vue" />

## Cancel Selection

Configure `isCancel` to `true` to cancel selection

<preview path="../../demo/radio/cancel.vue" />

## Button Style

Set `type` for a certain item in `option` or pass `type` directly to the component

<preview path="../../demo/radio/button.vue" />

## With Border

The `border` attribute or field can be rendered as a radio with border.

<preview path="../../demo/radio/border.vue" />

## z-radio Attributes

| Attribute             | Description                              | Type                            | Default |
| :-------------------- | :--------------------------------------- | :------------------------------ | :------ |
| model-value / v-model | Binding value                            | `string` / `number` / `boolean` | —       |
| options               | Configurable options                     | `array`                         | —       |
| type                  | Radio form                               | `string`                        | radio   |
| alias                 | Key-value pair configuration             | `object`                        | `{ label: 'label', value: 'value', disabled: 'disabled' }` |
| isCancel              | Whether to cancel selection              | `boolean`                       | false   |
| border                | Whether to show border                   | `boolean`                       | false   |
| size                  | Size of radio button or border button   | `string`                        | default |
| disabled              | Whether to disable                       | `boolean`                       | false   |
| text-color            | Text color when radio button is active  | `string`                        | #ffffff |
| fill                  | Fill color and border color when radio button is active | `string` | #409EFF |
| validate-event        | Whether to trigger form validation when input | `boolean`                | true    |
| name                  | Native `name` attribute                  | `string`                        | —       |
| id                    | Native `id` attribute                    | `string`                        | —       |

## z-radio Events

| Event Name | Description                      | Type       |
| :--------- | :------------------------------- | :--------- |
| change     | Event triggered when binding value changes | `Function` |

## Options Item Configurable Attributes

| Attribute | Description          | Type                            | Default |
| :-------- | :------------------- | :------------------------------ | :------ |
| value     | Binding value of radio | `string` / `number` / `boolean` | —      |
| label     | Text of radio        | `string`                        | —      |
| disabled  | Whether to disable radio | `boolean`                    | false  |
| border    | Whether to show border | `boolean`                     | false  |
| size      | Size of radio        | `enum`                          | —      |
| name      | Native `name` attribute | `string`                     | —      |
| type      | Radio form           | `string`                        | el-radio |
