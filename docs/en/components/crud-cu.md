# Crud Create/Update

`z-crud` component create and edit form functionality introduction.

## Basic Usage

Configure `add` or `edit` fields in `column` to implement create or edit form configuration.

<preview path="../../demo/crud-cu/normal.vue" />

Configure `columns` field in `add` and `edit` to implement create and edit form configuration.

<preview path="../../demo/crud-cu/normal-columns.vue" />

Configure `columns` field in `form` to implement both create and edit form configuration, but it will also configure query and detail information at the same time. You can configure `search` and `detail` as `false` to disable them.

<preview path="../../demo/crud-cu/normal-form.vue" />

Configure `form` field in `column` items to implement create and edit form configuration, but it will also configure query form at the same time. You can set `search` as `false` to disable it.

<preview path="../../demo/crud-cu/normal-column.vue" />

## Confirm API

Configure `addApi` and `editApi` in `request`.

`editApi` will pass an additional `rowKey` parameter, default is `id`.

<preview path="../../demo/crud-cu/add-edit-api.vue" />

If create and edit APIs are the same, you can configure `submitApi`. When editing, it will also include `rowKey`.

<preview path="../../demo/crud-cu/submit-api.vue" />

## Edit Detail Data

Configure `detailApi` in `request` to get default data for edit dialog from API.

<preview path="../../demo/crud-cu/edit-detail-api.vue" />

## Detail Data Processing

If you need to process the detail data returned by the API, you can configure `request.alias.detail`. Passing a function supports custom detail data, passing a string supports custom data path.

<preview path="../../demo/crud-cu/transform-edit-detail.vue" />

## Custom Confirmation

When `request` doesn't configure `submitApi`, `addApi` and `editApi`, there will be `operate-submit` event.

<preview path="../../demo/crud-cu/operate-submit.vue" />

## Custom Cancel

`operate-cancel` custom cancel event. If the component is not configured, clicking cancel will close by default.

<preview path="../../demo/crud-cu/operate-submit.vue" />

## Form Properties

Use `add` and `edit` objects to configure create and edit form properties. The `form` property can uniformly configure create and edit.

<preview path="../../demo/crud-cu/form-props.vue" />

## Dialog Properties

You can use the `dialog` object to uniformly configure create and edit dialog properties, or use `add.dialog` and `edit.dialog` to configure dialog properties separately.

<preview path="../../demo/crud-cu/dialog-props.vue" />

## z-crud Detail Related Attributes

| Attribute | Description                                                                                 | Type                                                                      | Default |
| :-------- | :------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------ | :------ |
| detail    | Detail configuration                                                                        | `boolean` / `object` / `({ row, tableRef }) => void`                     | `true`  |
| form      | Search, add, edit and view form attribute configuration                                     | `object`                                                                  | —       |
| action    | Whether to show action items (built-in delete, edit buttons)                               | `boolean`                                                                 | `true`  |
| edit      | Edit configuration                                                                          | `boolean` / `object`                                                      | `true`  |
| add       | Add configuration                                                                           | `boolean` / `object`                                                      | `true`  |
| delete    | Delete configuration                                                                        | `boolean` / `({ row, tableRef, getTableData }) => void` / `object`       | —       |
| search    | Search configuration                                                                        | `boolean` / `object`                                                      | `true`  |
| request   | API configuration                                                                           | `object`                                                                  | —       |

## add and edit Attributes

| Attribute                 | Description                                                                                                                                                                     | Type                          | Default |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------- | :------ |
| dialog                    | `el-dialog` component attributes                                                                                                                                                | `object`                      | —       |
| rules                     | Form validation rules                                                                                                                                                           | `object`                      | —       |
| columns                   | Form items                                                                                                                                                                      | `array`                       | —       |
| options                   | Form option data source                                                                                                                                                         | `object`                      | —       |
| colon                     | Form item colon                                                                                                                                                                 | `boolean`                     | false   |
| align                     | Vertical alignment under `flex` layout                                                                                                                                         | `top` / `middle` /`bottom`    | —       |
| label-position            | Position of form field labels. When set to `left` or `right`, you also need to set the `label-width` attribute                                                               | `enum`                        | right   |
| label-width               | Width of labels, e.g. `'50px'`. Form items that are direct children of Form will inherit this value. `auto` can be used.                                                     | `string` / `number`           | ''      |
| label-suffix              | Suffix for form field labels                                                                                                                                                   | `string`                      | ''      |
| hide-required-asterisk    | Whether to hide the red asterisk next to required field labels.                                                                                                                | `boolean`                     | false   |
| require-asterisk-position | Position of asterisk.                                                                                                                                                           | `left` / `right`              | left    |
| show-message              | Whether to show validation error messages                                                                                                                                       | `boolean`                     | true    |
| inline-message            | Whether to display validation messages inline                                                                                                                                   | `boolean`                     | false   |
| status-icon               | Whether to display validation result feedback icons in input boxes                                                                                                             | `boolean`                     | false   |
| validate-on-rule-change   | Whether to trigger validation immediately after the `rules` attribute changes                                                                                                  | `boolean`                     | true    |
| size                      | Size for controlling components within this form                                                                                                                                | `large` / `default` / `small` | —       |
| disabled                  | Whether to disable all components in this form. If set to `true`, it will override the `disabled` attribute of internal components                                            | `boolean`                     | false   |
| scroll-to-error           | When validation fails, scroll to the first error form item                                                                                                                     | `boolean`                     | false   |
| scroll-into-view-options  | When validation has failed results, scroll to the first failed form item                                                                                                       | `object` / `boolean`          | —       |

## form Attributes

| Attribute                 | Description                                                                                                                                                                     | Type                          | Default |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------- | :------ |
| rules                     | Form validation rules                                                                                                                                                           | `object`                      | —       |
| columns                   | Form items                                                                                                                                                                      | `array`                       | —       |
| options                   | Form option data source                                                                                                                                                         | `object`                      | —       |
| colon                     | Form item colon                                                                                                                                                                 | `boolean`                     | false   |
| align                     | Vertical alignment under `flex` layout                                                                                                                                         | `top` / `middle` /`bottom`    | —       |
| label-position            | Position of form field labels. When set to `left` or `right`, you also need to set the `label-width` attribute                                                               | `enum`                        | right   |
| label-width               | Width of labels, e.g. `'50px'`. Form items that are direct children of Form will inherit this value. `auto` can be used.                                                     | `string` / `number`           | ''      |
| label-suffix              | Suffix for form field labels                                                                                                                                                   | `string`                      | ''      |
| hide-required-asterisk    | Whether to hide the red asterisk next to required field labels.                                                                                                                | `boolean`                     | false   |
| require-asterisk-position | Position of asterisk.                                                                                                                                                           | `left` / `right`              | left    |
| show-message              | Whether to show validation error messages                                                                                                                                       | `boolean`                     | true    |
| inline-message            | Whether to display validation messages inline                                                                                                                                   | `boolean`                     | false   |
| status-icon               | Whether to display validation result feedback icons in input boxes                                                                                                             | `boolean`                     | false   |
| validate-on-rule-change   | Whether to trigger validation immediately after the `rules` attribute changes                                                                                                  | `boolean`                     | true    |
| size                      | Size for controlling components within this form                                                                                                                                | `large` / `default` / `small` | —       |
| disabled                  | Whether to disable all components in this form. If set to `true`, it will override the `disabled` attribute of internal components                                            | `boolean`                     | false   |
| scroll-to-error           | When validation fails, scroll to the first error form item                                                                                                                     | `boolean`                     | false   |
| scroll-into-view-options  | When validation has failed results, scroll to the first failed form item                                                                                                       | `object` / `boolean`          | —       |

## request Attributes

| Attribute  | Description                                      | Type                                                                                          | Default |
| :--------- | :----------------------------------------------- | :-------------------------------------------------------------------------------------------- | :------ |
| searchApi  | Search API                                       | `(params: any) => promise`                                                                    | —       |
| submitApi  | Edit and create confirmation                     | `({ [key: string]: any, row: any, type: 'add' / 'edit' / 'view', formData: any }) => promise` | —       |
| deleteApi  | Delete API                                       | `({ [key: string]?: any, row?: any, selectionData?: any }) => promise`                        | —       |
| addApi     | Create API                                       | `({ type: 'add' / 'edit' / 'view', formData: any }) => promise`                               | —       |
| editApi    | Edit API                                         | `({ [key: string]: any, row: any, type: 'add' / 'edit' / 'view', formData: any }) => promise` | —       |
| detailApi  | Detail API                                       | `({ [key: string]: any, row: any }) => promise`                                               | —       |
| alias      | Custom data path                                 | `object`                                                                                      | —       |
| beforeData | Callback before table data API call             | `Function`                                                                                    | —       |
| afterData  | Callback after table data API call              | `(res) => void`                                                                               | —       |
| searchFunc | Search method override                           | `({ params }) => any`                                                                         | —       |
| tableData  | Custom table data return                         | `(res) => any`                                                                                | —       |

## z-crud Create/Edit Related Events

| Event Name     | Description      | Type                                                                                                     |
| :------------- | :--------------- | :------------------------------------------------------------------------------------------------------- |
| operate-submit | Dialog confirm   | `({ done, formRef, formData, type, confirmButtonLoading, row, invalidFields }) => void`                 |
| operate-cancel | Dialog cancel    | `({ done, formRef, formData, type, confirmButtonLoading, row }) => void`                                 |
