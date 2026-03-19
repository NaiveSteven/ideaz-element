# Input

Input component encapsulation, works better with `z-form`.

## Basic Usage

Basic usage of `z-input`.

<preview path="../../demo/input/normal.vue" />

## Input with Icon

You can simply use `prefix-icon` and `suffix-icon` attributes. Additionally, using `prefix` and `suffix` to pass functions or slots can achieve the same effect.

<preview path="../../demo/input/icon.vue" />

## Composite Input

You can simply use `append` and `prepend` attributes. Additionally, using `append` and `prepend` to pass functions or slots can achieve the same effect.

<preview path="../../demo/input/complex.vue" />

## z-input Attributes

| Attribute             | Description                                                  | Type                                                         | Default   |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :-------- |
| type                  | Type                                                         | `string` [native input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form__types) | text      |
| model-value / v-model | Binding value                                                | `string` / `number`                                          | —         |
| prepend               | Input prepend content                                        | `string` / `() => VNode`                                     | —         |
| append                | Input append content                                         | `string` / `() => VNode`                                     | —         |
| prefix                | Input prefix content                                         | `string` / `() => VNode`                                     | —         |
| suffix                | Input suffix content                                         | `string` / `()=> VNode`                                      | —         |
| maxlength             | Maximum input length                                         | `string` / `number`                                          | —         |
| minlength             | Native attribute, minimum input length                      | `number`                                                     | —         |
| show-word-limit       | Whether to show word count, only works when `type` is 'text' or 'textarea' | `boolean`                                                    | `boolean` |
| placeholder           | Input placeholder text                                       | `string`                                                     | —         |
| clearable             | Whether to show clear button, only works when `type` is not textarea | `boolean`                                                    | false     |
| formatter             | Specifies the format of input value. (Only works when `type` is "text") | `Function`                                                   | —         |
| parser                | Specifies the value extracted from formatter input. (Only works when `type` is "text") | `Function`                                                   | —         |
| show-password         | Whether to show toggle password icon                         | `boolean`                                                    | false     |
| disabled              | Whether disabled                                             | `boolean`                                                    | false     |
| size                  | Input size, only works when `type` is not 'textarea'        | `enum`                                                       | —         |
| prefix-icon           | Custom prefix icon                                           | `string` / `Component`                                       | —         |
| suffix-icon           | Custom suffix icon                                           | `string` / `Component`                                       | —         |
| rows                  | Number of input rows, only works when `type` is 'textarea'  | `number`                                                     | `number`  |
| autosize              | Whether textarea height adapts automatically, only works when `type` is 'textarea'. Can accept an object, e.g: `{ minRows: 2, maxRows: 6 }` | `boolean` / `object`                                         | false     |
| autocomplete          | Native `autocomplete` attribute                              | `string`                                                     | off       |
| name                  | Equivalent to native input `name` attribute                  | `string`                                                     | —         |
| readonly              | Native `readonly` attribute, whether readonly                | `boolean`                                                    | false     |
| max                   | Native `max` attribute, sets maximum value                   | —                                                            | —         |
| min                   | Native attribute, sets minimum value                        | —                                                            | —         |
| step                  | Native attribute, sets legal number intervals for input field | —                                                            | —         |
| resize                | Controls whether user can resize                             | `enum`                                                       | —         |
| autofocus             | Native attribute, auto focus                                 | `boolean`                                                    | false     |
| form                  | Native attribute                                             | `string`                                                     | —         |
| tabindex              | Input tabindex                                               | `string` / `number`                                          | —         |
| validate-event        | Whether to trigger form validation when input                | `boolean`                                                    | true      |
| input-style           | Style of input element or textarea element                   | `string` / `object`                                          | {}        |

### z-input Events

| Event Name | Description                                                  | Type       |
| :--------- | :----------------------------------------------------------- | :--------- |
| blur       | Triggered when selector input loses focus                    | `Function` |
| focus      | Triggered when selector input gains focus                    | `Function` |
| change     | Only triggered when `modelValue` changes, when input loses focus or user presses Enter | `Function` |
| input      | Triggered when `Input` value changes                         | `Function` |
| clear      | Triggered when clicking clear button generated by `clearable` attribute | `Function` |

## z-input Methods

| Name           | Description                | Type       |
| :------------- | :------------------------- | :--------- |
| blur           | Make input lose focus      | `Function` |
| clear          | Clear input value          | `Function` |
| focus          | Make input gain focus      | `Function` |
| resizeTextarea | Resize textarea            | `Function` |
| select         | Select text in input       | `Function` |

## z-input Slots

| Slot Name | Description         | Subtags |
| :-------- | :------------------ | :------ |
| prepend   | Input prepend content | —       |
| append    | Input append content  | —       |
| prefix    | Input prefix content  | —       |
| suffix    | Input suffix content  | —       |
