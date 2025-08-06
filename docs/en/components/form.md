# Form

Form component encapsulation, generates forms through configuration.

:::tip
If form item components support attributes like `placeholder`, `clearable`, `filterable`, they will be configured by default
:::

## Basic Usage

- Pass `columns` to define the form, `modelValue` for form data, `options` for data configuration items, `component` for form item components, `field` for field names, `fieldProps` for component attribute configuration, `formItemProps` for form item decorator component attribute configuration
- `FormItem` component attributes (form item decorator component) are configured in the `formItemProps` field. For convenience, some fields can also take effect when configured directly in the `column` item (such as: `label`, `required`, `message`, `rule`, etc.)
- Events use `on` + `event name`

<preview path="../../demo/form/normal.vue" />

## Column Layout

Form passes `column`, supports `1 ~ 3` column layout, default is `1` column layout.

<preview path="../../demo/form/layout.vue" />

## Custom Layout

If column layout doesn't meet requirements, you can configure `span`, `offset`, `pull`, `push`, `xs`, `sm`, `md`, `lg`, `xl` in `column` items to achieve custom responsive layout

<preview path="../../demo/form/custom-layout.vue" />

## Tooltip

<preview path="../../demo/form/tooltip.vue" />

## Custom Tooltip

<preview path="../../demo/form/custom-tooltip.vue" />

## Hide

<preview path="../../demo/form/hide.vue" />

## Custom Form Item

<preview path="../../demo/form/custom-form-item.vue" />

## Custom Label

<preview path="../../demo/form/custom-label.vue" />

## Form Table

<preview path="../../demo/form/form-table.vue" />

## Order

<preview path="../../demo/form/order.vue" />

## Validation

<preview path="../../demo/form/validate.vue" />

## z-form Attributes

| Attribute             | Description                              | Type                            | Default |
| :-------------------- | :--------------------------------------- | :------------------------------ | :------ |
| model-value / v-model | Form data object                         | `object`                        | —       |
| columns               | Form configuration                       | `array`                         | —       |
| column                | Number of columns                        | `number`                        | 1       |
| gutter                | Grid spacing                             | `number`                        | 0       |
| rules                 | Form validation rules                    | `object`                        | —       |
| inline                | Whether form is inline                   | `boolean`                       | false   |
| label-position        | Position of label                        | `string`                        | right   |
| label-width           | Width of label                           | `string` / `number`             | —       |
| label-suffix          | Suffix of label                          | `string`                        | —       |
| hide-required-asterisk| Whether to hide required asterisk        | `boolean`                       | false   |
| show-message          | Whether to show validation message       | `boolean`                       | true    |
| inline-message        | Whether to display validation message inline | `boolean`                   | false   |
| status-icon           | Whether to show status icon              | `boolean`                       | false   |
| validate-on-rule-change| Whether to validate when rules change   | `boolean`                       | true    |
| size                  | Size of form components                  | `string`                        | —       |
| disabled              | Whether to disable all form components   | `boolean`                       | false   |

## z-form Events

| Event Name | Description                      | Type       |
| :--------- | :------------------------------- | :--------- |
| validate   | Triggered after form validation  | `Function` |

## z-form Methods

| Method Name    | Description                      | Parameters |
| :------------- | :------------------------------- | :--------- |
| validate       | Validate entire form             | `Function` |
| validateField  | Validate specific form field     | `Function` |
| resetFields    | Reset entire form                | `Function` |
| scrollToField  | Scroll to specific form field    | `Function` |
| clearValidate  | Clear validation message         | `Function` |

## Column Configuration

| Attribute     | Description                      | Type                            | Default |
| :------------ | :------------------------------- | :------------------------------ | :------ |
| field         | Field name                       | `string`                        | —       |
| label         | Label text                       | `string`                        | —       |
| component     | Form component                   | `string` / `Component`          | —       |
| fieldProps    | Component properties             | `object`                        | —       |
| formItemProps | Form item properties             | `object`                        | —       |
| hide          | Whether to hide                  | `boolean` / `Function`          | false   |
| show          | Whether to show                  | `boolean` / `Function`          | true    |
| render        | Custom render function           | `Function`                      | —       |
| slot          | Slot name                        | `string`                        | —       |
