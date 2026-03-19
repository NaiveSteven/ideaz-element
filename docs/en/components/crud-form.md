# Crud Form

Introduction to the form part of the `z-crud` component.

If you only want to use the component's filter form and table features, please refer to the following examples.

## Basic Usage

Configure `search` in the `column` item to generate form items.

- `label` and `field` can be omitted, defaulting to `prop` and `label`
- The component configures `clearable`, `placeholder` and `filterable` by default
- For the specific configuration of the `search` attribute, refer to the `column` items of `z-form`
- The form layout is fixed as `{ xs: 24, sm: 12, md: 8, lg: 8, xl: 6 }`

<preview path="../../demo/crud-form/normal.vue" />

Configuring the `columns` field of `search` can also achieve the same effect. If you want to configure other attributes such as the form's `labelWidth`, you can also put them in `search`.

<preview path="../../demo/crud-form/normal-columns.vue" />

Configuring `form` in `column` can also generate query form items, but it will also generate add, edit, and query form items at the same time. If not needed, you can set the `add` and `edit` fields to `false`.

<preview path="../../demo/crud-form/normal-form.vue" />

If a `column` item does not want a table column and only wants a form item, do not configure fields such as `type`, `slot`, `render`, `label`, `prop`, `component` in `column`, and then configure form-related fields such as `search`, `form` to achieve it.

<preview path="../../demo/crud-form/no-table-column.vue" />

## Condition Caching

Configure the `name` field to enable caching by default. The filter form data and `pagination` data will be cached in `sessionStorage`, and the condition data will be retrieved from the cache first on the next load.

Data retrieval needs to be called in the `onMounted` lifecycle.

<preview path="../../demo/crud-form/storage.vue" />

After configuring `request`, cached conditions will be handled internally.

<preview path="../../demo/crud-form/storage-request.vue" />

## Validation

- Add the `required` field in the `form` field, or set the `required` field in `formItemProps` to set it as required. The validation message will be automatically generated based on the `label` or can be customized.
- Configure the `rules` field in the `search` object passed to `z-crud` to define form validation rules.
- Configure `rules` in the form items in the `form` field to define the validation rules for the current form item.

<preview path="../../demo/crud-form/validate.vue" />

## Custom Form Items

We can use `slot` or `render` to customize the content of form items.

<preview path="../../demo/crud-form/custom-form-item.vue" />

## Custom label and error

`label` and `error` support passing strings, `render` functions, or `concatenated Slot strings`.

<preview path="../../demo/crud-form/custom-label.vue" />

## Linkage

Use `hide` to configure the visibility of form items. When gender `male` is selected, the birth date filter item will be displayed.

<preview path="../../demo/crud-form/hide.vue" />

## Operation Buttons

Button operations will have `search` and `reset` events, with built-in reset and validation operations. Customization is supported.

For details, please refer to the `z-filter-form` component documentation.

<preview path="../../demo/crud-form/operation.vue" />

## Default Collapsed

Configure `collapsed` to `false` in `search`, and the form will be collapsed by default.

<preview path="../../demo/crud-form/expand.vue" />

## Decorator Components

Configure `formDecorator` and `crudDecorator` to set the background of the filter form and table. The `name` field can be tags such as `div`, `span`, or the name of a globally registered component.

<preview path="../../demo/crud-form/decorator.vue" />

## z-crud Search Form Related Attributes

| Attribute              | Description                                                                                 | Type                                                     | Default |
| :--------------------- | :------------------------------------------------------------------------------------------ | :------------------------------------------------------- | :------ |
| modelValue:formData    | Query form data                                                                             | `object`                                                 | —       |
| detail                 | Detail configuration                                                                        | `boolean` / `object` / `({ row, tableRef }) => void`     | `true`  |
| form                   | Configuration of query, add, edit and view form attributes                                  | `object`                                                 | —       |
| action                 | Whether to display action items (built-in delete, edit and other buttons)                   | `boolean`                                                | `true`  |
| edit                   | Edit configuration                                                                          | `boolean` / `object`                                     | `true`  |
| add                    | Add configuration                                                                           | `boolean` / `object`                                     | `true`  |
| delete                 | Delete configuration                                                                        | `boolean` / `({ row, tableRef, getTableData }) => void` / `object` | — |
| search                 | Search configuration                                                                        | `boolean` / `object`                                     | `true`  |
| request                | API configuration                                                                           | `object`                                                 | —       |
| paginationStorage      | Pagination caching                                                                          | `boolean`                                                | `false` |
| formStorage            | Query form data caching                                                                     | `boolean`                                                | `false` |
| formDecorator          | Form background                                                                             | `object`                                                 | `{ name: 'el-card' }` |
| tableDecorator         | Table background                                                                            | `object`                                                 | `{ name: 'el-card' }` |

## search Attributes

| Attribute                 | Description                                                                                     | Type                          | Default |
| :------------------------ | :---------------------------------------------------------------------------------------------- | :---------------------------- | :------ |
| collapsed                 | Default expand/collapse of the form                                                             | `boolean`                     | `true`  |
| searchButtonProps         | Search button attribute configuration                                                            | `object`                      | —       |
| searchButtonLabel         | Search button text                                                                               | `string`                      | `Search` |
| searchButtonLoading       | Search button loading state                                                                      | `boolean`                     | —       |
| resetButtonProps          | Reset button attribute configuration                                                             | `object`                      | —       |
| resetButtonLabel          | Reset button text                                                                                | `string`                      | `Reset` |
| resetButtonLoading        | Reset button loading state                                                                       | `boolean`                     | —       |
| rules                     | Form validation rules                                                                            | `object`                      | —       |
| label-position            | Position of the form field label. When set to `left` or `right`, you also need to set `label-width` | `enum`                        | right   |
| label-width               | Length of the label, e.g. `'50px'`. Form-items that are direct children of Form inherit this value. `auto` can be used. | `string` / `number` | '' |
| label-suffix              | Suffix of the form field label                                                                   | `string`                      | ''      |
| hide-required-asterisk    | Whether to hide the red asterisk next to required field labels                                  | `boolean`                     | false   |
| require-asterisk-position | Position of the asterisk                                                                         | `left` / `right`              | left    |
| show-message              | Whether to display validation error messages                                                     | `boolean`                     | true    |
| inline-message            | Whether to display validation messages inline                                                     | `boolean`                     | false   |
| status-icon               | Whether to display validation result feedback icons in the input box                             | `boolean`                     | false   |
| validate-on-rule-change   | Whether to trigger a validation immediately after the `rules` attribute changes                   | `boolean`                     | true    |
| size                      | Size used to control the components within this form                                             | `large` / `default` / `small` | —       |
| disabled                  | Whether to disable all components in this form. If set to `true`, it overrides internal components' `disabled` | `boolean`           | false |

## z-crud Query Form Methods

| Name          | Description                                                            | Type       |
| :------------ | :---------------------------------------------------------------------- | :--------- |
| validate      | Validate the entire form. Accepts a callback function or returns a `Promise`. | `Function` |
| validateField | Validate a specific field.                                              | `Function` |
| resetFields   | Reset this form item, restore its value to the initial value, and remove the validation result | `Function` |
| scrollToField | Scroll to the specified field                                           | `Function` |
| clearValidate | Clear the validation information of a certain field.                    | `Function` |

## Form Item Attributes

| Attribute     | Description                   | Type                                   | Default |
| :------------ | :---------------------------- | :------------------------------------- | :----- |
| component     | Form item component           | `string` / `() => VNode` / `Component` | —      |
| field         | Field name                    | `string`                               | —      |
| fieldProps    | `component` attributes        | `object`                               | —      |
| formItemProps | `formItem` attributes         | `object`                               | —      |
| label         | Form label name               | `string` / `() => VNode`               | —      |
| hide          | Show / hide                   | `boolean` / `(formData) => boolean`    | —      |
| show          | Show / hide using `v-show`    | `boolean` / `(formData) => boolean`    | —      |
| slot          | Custom content slot of item   | `string`                               | —      |
| render        | Custom content render of item | `() => VNode`                          | —      |
| required      | Whether the field is required | `boolean`                              | —      |
| rules         | Validation rules of the field | `boolean`                              | —      |
| error         | Error message                 | `string` / `() => VNode`               | —      |
| tooltip       | Tooltip message               | `string` / `() => VNode`               | —      |
| extra         | Extra information             | `string` / `() => VNode`               | —      |

## formItemProps Attributes

| Attribute       | Description                                                                                                                                                                            | Type                               | Default |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- | :------ |
| tooltip         | Tooltip text                                                                                                                                                                           | `string` / `() => VNode`           | —       |
| extra           | Extra information                                                                                                                                                                      | `string` / `() => VNode`           | —       |
| colon           | Colon                                                                                                                                                                                  | `boolean`                          | —       |
| label           | Label text                                                                                                                                                                             | `string` / `() => VNode`           | —       |
| label-width     | Label width, e.g. `'50px'`. `auto` can be used.                                                                                                                                        | `string` / `number`                | ''      |
| required        | Whether it is required. If not set, it will be confirmed according to the validation rules                                                                                            | `boolean`                          | —       |
| rules           | Form validation rules. See [table below](https://element-plus.org/zh-CN/component/form.html#formitemrule); more at [async-validator](https://github.com/yiminghe/async-validator)     | `object`                           | —       |
| error           | Prompt information when the form field validation fails. Setting this value will cause the form validation state to become error and display this error message.                       | `string` / `() => VNode`           | —       |
| show-message    | Whether to display validation error messages                                                                                                                                           | `boolean`                          | true    |
| inline-message  | Whether to display validation messages inline                                                                                                                                          | `string` / `boolean`               | ''      |
| size            | Default size of components under this form field                                                                                                                                       | `large` / `default` / `small`      | —       |
| for             | Same capability as the native label                                                                                                                                                    | `string`                           | —       |
| validate-status | Validation status of formItem                                                                                                                                                           | `error` / `validating` / `success` | —       |

### z-crud Query Form Related Events

| Event Name      | Description     | Type       |
| :-------------- | :-------------- | :--------- |
| update:formData | Form item data  | `Function` |
| reset           | Reset           | `Function` |
| search          | Search          | `Function` |

