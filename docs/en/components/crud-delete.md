# Crud CRUD

`z-crud` component delete functionality introduction.

## Basic Usage

Configure `deleteApi` field in `request` to call API for deletion. Parameter defaults to `id`, can also be configured through `rowKey`.

<preview path="../../demo/crud-delete/normal.vue" />

## Custom Delete

Configure `operate-delete` event to customize delete logic.

<preview path="../../demo/crud-delete/custom-delete.vue" />

Pass function to `delete` attribute to directly override built-in logic after `delete` click.

<preview path="../../demo/crud-delete/custom-delete-logic.vue" />

Pass object to `delete` attribute to directly customize delete dialog properties (see dialog documentation for property details).

<preview path="../../demo/crud-delete/custom-delete-dialog.vue" />

## Multi-select Delete

Combining checkbox and delete functionality, the component will have built-in features like `el-alert` and batch delete.

<preview path="../../demo/crud-delete/checkbox.vue" />

Customize multi-select delete dialog content.
<preview path="../../demo/crud-delete/custom-multiple-delete.vue" />

## Alert Configuration

Pass `alert` object to configure `el-alert` component attributes.

<preview path="../../demo/crud-delete/alert.vue" />

## Custom Alert

If you need to customize alert content, `alert` can directly pass `render` function. If **no alert is needed**, you can pass `false`.

<preview path="../../demo/crud-delete/custom-alert.vue" />

Custom alert content can also use `alert` slot.

<preview path="../../demo/crud-delete/alert-slot.vue" />

`alert.title` and `alert.description` support passing `render` functions for customization.

<preview path="../../demo/crud-delete/alert-props.vue" />

## z-crud Delete Related Attributes

| Attribute | Description                                                                                 | Type                                                                      | Default |
| :-------- | :------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------ | :------ |
| delete    | Delete configuration                                                                        | `boolean` / `({ row, tableRef, getTableData }) => void` / `object`       | `true`  |
| action    | Whether to show action items (built-in delete, edit buttons)                               | `boolean`                                                                 | `true`  |
| edit      | Edit configuration                                                                          | `boolean` / `object`                                                      | `true`  |
| add       | Add configuration                                                                           | `boolean` / `object`                                                      | `true`  |
| detail    | Detail configuration                                                                        | `boolean` / `object` / `({ row, tableRef }) => void`                     | `true`  |
| search    | Search configuration                                                                        | `boolean` / `object`                                                      | —       |
| alert     | Fixed selected data alert                                                                   | `object` / `boolean`                                                      | `true`  |
| request   | API configuration                                                                           | `object`                                                                  | —       |

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

## alert Attributes

| Name        | Description                                                                                 | Type                                            | Default   | Required |
| :---------- | :------------------------------------------------------------------------------------------ | :---------------------------------------------- | :-------- | :------- |
| title       | Alert title.                                                                                | `string` / `(selectionData, tableRef) => VNode` | —         | No       |
| type        | Alert type.                                                                                 | `success` / `warning` / `info` / `error`        | `info`    | No       |
| description | Descriptive text                                                                            | `string` / `() => VNode`                        | —         | No       |
| closable    | Whether closable                                                                            | `boolean`                                       | `true`    | No       |
| center      | Whether text is centered                                                                    | `boolean`                                       | `false`   | No       |
| close-text  | Custom close button text                                                                    | `string`                                        | —         | No       |
| effect      | Theme style                                                                                 | `light` / `dark`                                | `'light'` | No       |
| onClose     | Close Alert event                                                                           | `Function`                                      | —         | No       |

## z-crud Delete Related Events

| Event Name     | Description      | Type                                                       |
| :------------- | :--------------- | :--------------------------------------------------------- |
| operate-delete | Delete table data | `({ selectionData, row, table, getTableData }) => void`   |

## z-crud Delete Related Slots

| Slot Name | Description                                                                                 |
| :-------- | :------------------------------------------------------------------------------------------ |
| alert     | Fixed alert content at the top of table when data is selected                              |
