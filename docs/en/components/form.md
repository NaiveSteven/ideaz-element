# Form

Form encapsulation, generates forms through configuration.

:::tip
If form item components support `placeholder`, `clearable`, `filterable`, these attributes are configured by default
:::

## Basic Usage

- Pass `columns` to define the form, `modelValue` for form data, `options` for data option sources, `component` for form item component, `field` for field name, `fieldProps` for component attribute configuration, `formItemProps` for form item decorator component attribute configuration
- `FormItem` component attributes (form item decorator component) are configured in the `formItemProps` field. For convenience, some fields can also take effect when configured directly in the `column` item (e.g.: `label`, `required`, `message`, `rule`, etc.)
- Events use `on` + `event name`

<preview path="../../demo/form/normal.vue" />

## Column Layout

Pass `column` to the form to support `1 ~ 3` column layout, default is `1` column layout.

<preview path="../../demo/form/layout.vue" />

## Custom Layout

If the column layout does not meet the requirements, you can configure `span`, `offset`, `pull`, `push`, `xs`, `sm`, `md`, `lg`, `xl` in the `column` item to achieve a custom responsive layout

<preview path="../../demo/form/custom-layout.vue" />

## Tooltip

Pass `tooltip`, `extra`, and `colon` in `column` to configure tooltip, extra info, and colon. `tooltip` and `extra` support string and `render` function.
The form can pass `colon` to uniformly configure colons for all form items.

<preview path="../../demo/form/tooltip.vue" />

`tooltip` supports passing a `render function` and slot customization.

<preview path="../../demo/form/custom-tooltip.vue" />

## Validation

- Add `required` in `columns` form items, or set `required` in `formItemProps` to make it required. The validation message will be automatically generated based on `label` or can be customized.
- Pass `rules` in `form` to define form validation rules.
- Configure `rules` in `columns` form items to define the validation rules for the current form item.

<preview path="../../demo/form/validate.vue" />

## Linkage

Pass `hide` (supports boolean or function type) to `column` form items to configure linkage hide/show for form items.

Some business scenarios require using `v-show` to determine component visibility. Pass the `show` field (supports boolean or function type) to `column` form items.

If the name input has a value, the gender select box will show. Then try selecting gender; the age form item will appear.

<preview path="../../demo/form/hide.vue" />

## Custom Form Items

We can use `slot` or `render` to customize form item content. Please still pass the `field` field; otherwise, reset cannot clear the data (`field` not passed will default to `slot`).

<preview path="../../demo/form/custom-form-item.vue" />

## Custom label and error

`label` and `error` support strings, `render` functions, or `concatenated Slot strings`.

<preview path="../../demo/form/custom-label.vue" />

## Form Item Order

Pass `order` to form items to support custom order. If not passed, it defaults to placing at the end in order.

<preview path="../../demo/form/order.vue" />

## Combine with Table

<preview path="../../demo/form/form-table.vue" />

## z-form Attributes

| Attribute                | Description                                                                                 | Type                   | Default  |
| :----------------------- | :------------------------------------------------------------------------------------------ | :--------------------- | :------- |
| modelValue               | Form data object                                                                            | `object`               | —        |
| type                     | Form type                                                                                   | `normal` / `group` / `collapse` / `array` / `step` | `normal` |
| rules                    | Form validation rules                                                                       | `object`               | —        |
| columns                  | Form items                                                                                  | `array`                | —        |
| options                  | Data source of form options                                                                  | `object`               | —        |
| column                   | Number of form columns (convenient layout)                                                  | `number`               | `1`      |
| colon                    | Colon of form item                                                                           | `boolean`              | false    |
| max                      | Maximum number of array items (effective when `type` is `array`)                             | `number`               | —        |
| gutter                   | Grid spacing                                                                                 | `number`               | 0        |
| justify                  | Horizontal alignment under `flex` layout                                                     | `start` / `end` / `center` / `space-around` / `space-between` / `space-evenly` | — |
| align                    | Vertical alignment under `flex` layout                                                       | `top` / `middle` /`bottom` | —        |
| v-model:activeCollapse   | Expanded `collapse` items (effective when `type` is `collapse`)                              | `array`                | —        |
| label-position           | Position of form field labels. When set to `left` or `right`, you also need to set `label-width` | `enum`              | right    |
| label-width              | Label width, e.g. `'50px'`. Form-items that are direct children of Form inherit this value. `auto` can be used. | `string` / `number` | ''       |
| label-suffix             | Suffix of the form field label                                                               | `string`               | ''       |
| hide-required-asterisk   | Whether to hide the red asterisk next to required field labels                               | `boolean`              | false    |
| require-asterisk-position| Position of the asterisk                                                                      | `left` / `right`       | left     |
| show-message             | Whether to display validation error messages                                                  | `boolean`              | true     |
| inline-message           | Whether to display validation messages inline                                                 | `boolean`              | false    |
| status-icon              | Whether to display validation result feedback icons in the input box                          | `boolean`              | false    |
| validate-on-rule-change  | Whether to trigger a validation immediately after the `rules` attribute changes                | `boolean`              | true     |
| size                     | Size used to control the components within this form                                          | `large` / `default` / `small` | —        |
| disabled                 | Whether to disable all components in this form. If set to `true`, it overrides internal components' `disabled` | `boolean` | false    |
| scroll-to-error          | Scroll to the first erroneous form item when validation fails                                 | `boolean`              | false    |
| scroll-into-view-options | When there are failed validation results, scroll to the first failed form item                | `object` / `boolean`   | —        |

## group Form Attributes

| Attribute        | Description                          | Type                                   | Default  |
| :--------------- | :----------------------------------- | :------------------------------------- | :------- |
| border-style     | Set separator style                   | `none` / `solid` / `hidden` / `dashed` | `solid`  |
| content-position | Position of the separator content     | `left` / `right` / `center`            | `center` |

## array Form Attributes

| Attribute | Description              | Type     | Default |
| :-------- | :----------------------- | :------- | :------ |
| max       | Maximum number of form items | `number` | —       |

## step Form Attributes

| Attribute       | Description                              | Type                                                | Default   |
| :-------------- | :--------------------------------------- | :-------------------------------------------------- | :-------- |
| process-status  | Set the status of the current step       | `wait` / `process` / `finish` / `error` / `success` | `process` |
| finish-status   | Set the status of the finish step        | `wait` / `process` / `finish` / `error` / `success` | `finish`  |
| align-center    | Center alignment                         | `boolean`                                           | `true`    |

## z-form Methods

| Name          | Description                                                            | Type       |
| :------------ | :---------------------------------------------------------------------- | :--------- |
| validate      | Validate the entire form. Accepts a callback function or returns a `Promise`. | `Function` |
| validateField | Validate a specific field.                                              | `Function` |
| resetFields   | Reset this form item, restore its value to the initial value, and remove the validation result | `Function` |
| scrollToField | Scroll to the specified field                                           | `Function` |
| clearValidate | Clear the validation information of a certain field.                    | `Function` |

### z-form Events

| Event Name            | Description                       | Type       |
| :-------------------- | :-------------------------------- | :--------- |
| update:modelValue     | Form item data                    | `Function` |
| update:activeCollapse | Expanded items of collapse form   | `Function` |
| update:activeStep     | Current step of step form         | `Function` |
| collapse-change       | Triggered when collapse changes   | `Function` |
| next-step             | Triggered when clicking next step | `Function` |
| previous-step         | Triggered when clicking prev step | `Function` |

## Common Form Column Attributes

| Attribute     | Description                                   | Type                        | Default |
| :------------ | :---------------------------------------------| :-------------------------- | :------ |
| component     | Form item component                            | `input` / `checkbox` / `select` / `radio` / `Any locally or globally registered component` | — |
| field         | Field name                                     | `string`                    | —      |
| fieldProps    | `component` attributes                         | `object`                    | —      |
| formItemProps | `formItem` attributes                          | `object`                    | —      |
| label         | Form label name                                | `string` / `() => VNode`    | —      |
| order         | Form order                                     | `number`                    | —      |
| hide          | Show / hide                                    | `boolean` / `(formData) => boolean` | — |
| show          | Show / hide using `v-show`                     | `boolean` / `(formData) => boolean` | — |
| slot          | Custom content slot of form item               | `string`                    | —      |
| render        | Custom content render of form item             | `() => VNode`               | —      |
| required      | Whether the field is required                  | `boolean`                   | —      |
| rules         | Validation rules of the field                  | `boolean`                   | —      |
| error         | Error message                                  | `string` / `() => VNode`    | —      |
| tooltip       | Tooltip message                                | `string` / `() => VNode`    | —      |
| extra         | Extra information                              | `string` / `() => VNode`    | —      |
| children      | Effective in form collapse mode, column array  | `array`                     | —      |
| span          | Number of grid spaces occupied                 | `number`                    | —      |
| offset        | Number of grid spaces to the left              | `number`                    | —      |
| pull          | Number of grid spaces moved to the left        | `number`                    | —      |
| push          | Number of grid spaces moved to the right       | `boolean`                   | —      |
| xs            | `<768px` responsive grid or grid props object  | `number` / `object`         | —      |
| sm            | `≥768px` responsive grid or grid props object  | `number` / `object`         | —      |
| md            | `≥992px` responsive grid or grid props object  | `number` / `object`         | —      |
| lg            | `≥1200px` responsive grid or grid props object | `number` / `object`         | —      |
| xl            | `≥1920px` responsive grid or grid props object | `number` / `object`         | —      |

## array Form Column Attributes

| Attribute | Description                                           | Type                     | Default |
| :-------- | :---------------------------------------------------- | :----------------------- | :-----  |
| label     | Label name                                            | `string` / `() => VNode` | —       |
| field     | Field name                                            | `string`                 | —       |
| max       | Maximum number of form items                          | `number`                 | —       |
| children  | Form items in the current step (all are common column attributes) | `array`      | —       |

## step Form Column Attributes

| Attribute  | Description                                           | Type                                                | Default |
| :--------- | :---------------------------------------------------- | :-------------------------------------------------- | :------ |
| label      | Step title                                            | `string` / `() => VNode`                            | —       |
| icon       | Icon for `step` mode                                  | `string` / `Component`                              | —       |
| description| Description for `step` mode                            | `boolean`                                           | —       |
| status     | Step status for `step` mode                            | `wait` / `process` / `finish` / `error` / `success` | —       |
| children   | Form items in the current step (all are common column attributes) | `array`     | —       |

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

