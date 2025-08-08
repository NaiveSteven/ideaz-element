# Crud API

Integrates `z-form` and `z-table` components to implement CRUD functionality.

## Table API

Configure `searchApi`, `deleteApi`, `addApi`, `editApi` in `request` to directly implement table data retrieval, data deletion, data creation and editing operations.

<preview path="../../demo/crud-api/request.vue" />

## Table Data API Configuration

Configure the `alias` field in `request` to customize data paths, defaults to `data.list` and `data.total`.

<preview path="../../demo/crud-api/alias.vue" />

Supports passing functions for custom returns.

<preview path="../../demo/crud-api/alias-function.vue" />

## Custom Table Data Method

Supports customizing table data method through `request.searchFunc`.

<preview path="../../demo/crud-api/search-function.vue" />

## Table Data Processing

Supports secondary processing of table data through `request.tableData`.

<preview path="../../demo/crud-api/data.vue" />

## Callbacks

Supports doing things before and after getting table data through `request.beforeData` and `request.afterData`.

<preview path="../../demo/crud-api/data-callback.vue" />

## Internal Methods

Supports calling the `getTableData` method again from outside the table.

<preview path="../../demo/crud-api/methods.vue" />

## Custom Operations

If you need custom operations, you can use events like `refresh`, `search`, `reset`, `submit`, `delete` to implement refresh, query, reset and delete operations.

<preview path="../../demo/crud-api/operation.vue" />

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

## alias Attributes

| Attribute | Description           | Type                         | Default      |
| :-------- | :-------------------- | :--------------------------- | :----------- |
| list      | Table data path       | `string` / `(res) => array`  | `data.list`  |
| total     | Table data total path | `string` / `(res) => number` | `data.total` |
