# FilterForm

Filter form component, based on `z-form` encapsulation.

:::tip

1. If form item components support attributes like `placeholder`, `clearable`, `filterable`, they will be configured by default
2. Form responsive default configuration is `{ xl: 6, lg: 8, md: 8, sm: 12, xs: 24 }`
:::

## Basic Usage

+ Pass `columns` to define the form, `modelValue` for form data, `options` for data configuration items
+ Events use `on` + `event name`
+ Form item component attributes can be configured directly in the `column` item
+ `FormItem` component attributes (form item decorator component) are configured in the `formItemProps` field. For convenience, some fields can also take effect when configured directly in the `column` item (such as: `label`, `required`, `message`, etc.)

<preview path="../../demo/filter-form/normal.vue" />

## Validation

+ Add `required` field in `columns` form items, or set `required` field in `formItemProps` to set required fields. Validation messages will be automatically generated based on `label` or can be customized.
+ Pass `rules` field to `z-filter-form` to define form validation rules.
+ Configure `rules` in `columns` form items to define validation rules for current form item.

<preview path="../../demo/filter-form/validate.vue" />

## Custom Form Items

We can use `slot` or `render` to customize form item content.

Custom content also uses `hide` to change visibility state.

<preview path="../../demo/filter-form/custom-form-item.vue" />

## Custom Label and Error

`label` and `error` support passing strings, `render` functions or `concatenated Slot strings`

<preview path="../../demo/filter-form/custom-label.vue" />

## Linkage

Use `hide` to configure form item visibility.
:::tip
If `hide` is configured in `column`, the data passed by `search` event will filter hidden form items (custom form items need to pass `field`).
You can configure `filterHiddenFields` to `false` to turn it off, default is `true`.
:::

<preview path="../../demo/filter-form/hide.vue" />

## Operation Buttons

Button operations will have `search` and `reset` events, with built-in reset and validation operations

<preview path="../../demo/filter-form/operation.vue" />

Set `searchButtonLabel`, `resetButtonLabel`, `searchButtonLoading`, `resetButtonLoading` to set button text and loading state.

<preview path="../../demo/filter-form/operation-props.vue" />

Set `searchButtonProps`, `resetButtonProps` to set button text and loading state.

<preview path="../../demo/filter-form/operation-attrs.vue" />

Customize operation buttons through `formOperation` slot or `render function`.

<preview path="../../demo/filter-form/operation-slot.vue" />

## Default Collapsed

Configure `collapsed` to `false`, the form will be collapsed by default

<preview path="../../demo/filter-form/expand.vue" />

## z-filter-form Attributes

| Attribute                      | Description                                                  | Type                 | Default |
| :----------------------------- | :----------------------------------------------------------- | :------------------- | :------ |
| modelValue                     | Form data object                                             | `object`             | —       |
| collapsed                      | Form default expand/collapse                                 | `boolean`            | `true`  |
| searchButtonProps              | Search button attribute configuration                        | `object`             | —       |
| searchButtonLabel              | Search button text                                           | `string`             | `Search`|
| searchButtonLoading            | Search button loading state                                  | `boolean`            | —       |
| resetButtonProps               | Reset button attribute configuration                         | `object`             | —       |
| resetButtonLabel               | Reset button text                                            | `string`             | `Reset` |
| resetButtonLoading             | Reset button loading state                                   | `boolean`            | —       |
| rules                          | Form validation rules                                        | `object`             | —       |
| label-position                 | Position of form field labels. When set to `left` or `right`, `label-width` property is also required | `enum`               | right   |
| label-width                    | Width of labels, e.g. `'50px'`. Form items that are direct children of Form will inherit this value. Can use `auto`. | `string` / `number`  | ''      |
| label-suffix                   | Suffix for form field labels                                | `string`             | ''      |
| hide-required-asterisk         | Whether to hide red asterisk next to required field labels  | `boolean`            | false   |
| require-asterisk-position      | Position of asterisk                                         | `left` / `right`     | left    |
| show-message                   | Whether to show validation error messages                    | `boolean`            | true    |
| inline-message                 | Whether to display validation messages inline                | `boolean`            | false   |
| status-icon                    | Whether to display validation result feedback icons in input boxes | `boolean`            | false   |
| validate-on-rule-change        | Whether to trigger validation immediately after `rules` property changes | `boolean`            | true    |
| size                           | Size for controlling components within this form             | `large` / `default` / `small` | —       |
| disabled                       | Whether to disable all components in this form. If set to `true`, it will override the `disabled` property of internal components | `boolean`            | false   |
| scroll-to-error                | When validation fails, scroll to the first error form item  | `boolean`            | false   |
| scroll-into-view-options       | When validation has failed results, scroll to the first failed form item | `object` / `boolean` | —       |

## z-filter-form Methods

| Name          | Description                                                  | Type       |
| :------------ | :----------------------------------------------------------- | :--------- |
| validate      | Validate the entire form content. Accepts a callback function or returns `Promise`. | `Function` |
| validateField | Validate a specific field                                    | `Function` |
| resetFields   | Reset this form item, reset its value to initial value and remove validation result | `Function` |
| scrollToField | Scroll to specified field                                    | `Function` |
| clearValidate | Clear validation information for a specific field           | `Function` |

## Column Attributes

| Attribute     | Description                                                  | Type                 | Default |
| :------------ | :----------------------------------------------------------- | :------------------- | :------ |
| component     | Form item component                                          | `string` / `() => VNode` | —       |
| field         | Field name                                                   | `string`             | —       |
| fieldProps    | `component` component attributes                             | `object`             | —       |
| formItemProps | `formItem` component attributes                              | `object`             | —       |
| label         | Form label name                                              | `string` / `() => VNode` | —       |
| hide          | Show/hide                                                    | `boolean` / `(formData) => boolean` | —       |
| show          | Show/hide using `v-show`                                     | `boolean` / `(formData) => boolean` | —       |
| slot          | Form item custom content slot                                | `string`             | —       |
| render        | Form item custom content render                              | `() => VNode`        | —       |
| required      | Whether form item is required                                | `boolean`            | —       |
| rules         | Validation rules for this form item                          | `boolean`            | —       |
| error         | Error message                                                | `string` / `() => VNode` | —       |
| tooltip       | Tooltip information                                          | `string` / `() => VNode` | —       |
| extra         | Extra information                                            | `string` / `() => VNode` | —       |
| children      | Effective in form collapse mode, column array               | `array`              | —       |
| span          | Number of grid cells occupied                                | `number`             | —       |
| offset        | Number of spacing grids on the left                         | `number`             | —       |
| pull          | Number of grids to move left                                 | `number`             | —       |
| push          | Number of grids to move right                                | `boolean`            | —       |
| xs            | `<768px` responsive grid number or grid attribute object     | `number` / `object`  | —       |
| sm            | `≥768px` responsive grid number or grid attribute object     | `number` / `object`  | —       |
| md            | `≥992px` responsive grid number or grid attribute object     | `number` / `object`  | —       |
| lg            | `≥1200px` responsive grid number or grid attribute object    | `number` / `object`  | —       |
| xl            | `≥1920px` responsive grid number or grid attribute object    | `number` / `object`  | —       |

## formItemProps Attributes

| Attribute       | Description                                                  | Type                  | Default |
| :-------------- | :----------------------------------------------------------- | :-------------------- | :------ |
| tooltip         | Tooltip text                                                 | `string` / `() => VNode` | —       |
| extra           | Extra information                                            | `string` / `() => VNode` | —       |
| colon           | Colon                                                        | `boolean`             | —       |
| label           | Label text                                                   | `string` / `() => VNode` | —       |
| label-width     | Label width, e.g. `'50px'`. Can use `auto`.                 | `string` / `number`   | ''      |
| required        | Whether it's a required field. If not set, it will be determined based on validation rules | `boolean`             | —       |
| rules           | Form validation rules. For specific configuration see [table below](https://element-plus.org/en-US/component/form.html#formitemrule), more content can refer to [async-validator](https://github.com/yiminghe/async-validator) | `object`              | —       |
| error           | Error message when form field validation fails. Setting this value will cause form validation status to become error and display this error message. | `string` / `() => VNode` | —       |
| show-message    | Whether to show validation error messages                    | `boolean`             | true    |
| inline-message  | Whether to display validation messages inline                | `string` / `boolean`  | ''      |
| size            | Default size for controlling components under this form field | `large` / `default` / `small` | —       |
| for             | Same capability as native label                              | `string`              | —       |
| validate-status | Validation status of formItem                                | `error` / `validating` / `success` | —       |
