# Crud

Introduction to the view feature of the `z-crud` component

## Basic Usage

Configure the `detail` field of `column` to configure the detail view.

<preview path="../../demo/crud-view/normal.vue" />

Configure the `columns` of `detail` to configure the detail view.

<preview path="../../demo/crud-view/normal-columns.vue" />

Configure the `columns` field of `form` to configure the detail view.

<preview path="../../demo/crud-view/normal-form.vue" />

Configure the `form` field of a `column` item to configure the detail information, but this will also configure the query, add, and edit forms at the same time. You can set `search`, `add`, and `edit` to `false` to disable them.

<preview path="../../demo/crud-view/normal-column.vue" />

## API Configuration

By default, the detail view uses the row data. If you need to call an API, please configure `request.detailApi`.

<preview path="../../demo/crud-view/detail-api.vue" />

## Drawer Configuration

`el-drawer` component attributes are passed directly through `drawer`.

<preview path="../../demo/crud-view/drawer.vue" />

## Custom View

Supports using the `operate-view` event or passing a function to `detail` to customize the follow-up logic after clicking the view button.

<preview path="../../demo/crud-view/custom-view.vue" />

## z-crud Detail Related Attributes

| Attribute | Description                                                                  | Type                                                      | Default |
| :-------- | :--------------------------------------------------------------------------- | :-------------------------------------------------------- | :------ |
| detail    | Detail configuration                                                         | `boolean` / `object` / `({ row, tableRef }) => void`      | `true`  |
| form      | Configuration for query, add, edit, and view form attributes                 | `object`                                                  | —       |
| action    | Whether to display action items (built-in delete, edit and other buttons)    | `boolean`                                                 | `true`  |
| edit      | Edit configuration                                                           | `boolean` / `object`                                      | `true`  |
| add       | Add configuration                                                            | `boolean` / `object`                                      | `true`  |
| delete    | Delete configuration                                                         | `boolean` / `({ row, tableRef, getTableData }) => void` / `object` | `true`  |
| search    | Search configuration                                                         | `boolean` / `object`                                      |         |
| drawer    | Drawer configuration                                                          | `object`                                                  | —       |
| request   | API configuration                                                             | `object`                                                  | —       |

## detail Attributes

| Attribute | Description                                     | Type                     | Default    |
| :-------- | :---------------------------------------------- | :----------------------- | :--------- |
| columns   | Form items                                      | `array`                  | —          |
| border    | Whether with border                             | `boolean`                | true       |
| column    | Number of `Descriptions Item` in a row          | `number`                 | 1          |
| direction | Direction of arrangement                         | `enum`                   | horizontal |
| size      | Size of the list                                 | `enum`                   | —          |
| title     | Title text, displayed in the upper left          | `string` / `() => VNode` | ''         |
| extra     | Action area text, displayed in the upper right   | `string` / `() => VNode` | ''         |

## form Attributes

| Attribute                 | Description                                                                                                                                                              | Type                          | Default |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- | :------ |
| rules                     | Form validation rules                                                                                                                                                    | `object`                      | —       |
| columns                   | Form items                                                                                                                                                               | `array`                       | —       |
| options                   | Data source of form options                                                                                                                                            | `object`                      | —       |
| colon                     | Colon of form item                                                                                                                                                       | `boolean`                     | false   |
| align                     | Vertical alignment under `flex` layout                                                                                                                                  | `top` / `middle` /`bottom`    | —       |
| label-position            | Position of form field labels. When set to `left` or `right`, you also need to set the `label-width` attribute                                                          | `enum`                        | right   |
| label-width               | Length of the label, e.g. `'50px'`. Form-items that are direct children of Form inherit this value. `auto` can be used.                                                | `string` / `number`           | ''      |
| label-suffix              | Suffix of the form field label                                                                                                                                            | `string`                      | ''      |
| hide-required-asterisk    | Whether to hide the red asterisk next to required field labels                                                                                                           | `boolean`                     | false   |
| require-asterisk-position | Position of the asterisk                                                                                                                                                  | `left` / `right`              | left    |
| show-message              | Whether to display validation error messages                                                                                                                              | `boolean`                     | true    |
| inline-message            | Whether to display validation messages inline                                                                                                                              | `boolean`                     | false   |
| status-icon               | Whether to display validation result feedback icons in the input box                                                                                                      | `boolean`                     | false   |
| validate-on-rule-change   | Whether to trigger a validation immediately after the `rules` attribute changes                                                                                            | `boolean`                     | true    |
| size                      | Size used to control the components within this form                                                                                                                      | `large` / `default` / `small` | —       |
| disabled                  | Whether to disable all components in this form. If set to `true`, it overrides internal components' `disabled`                                                             | `boolean`                     | false   |
| scroll-to-error           | Scroll to the first erroneous form item when validation fails                                                                                                              | `boolean`                     | false   |
| scroll-into-view-options  | When there are failed validation results, scroll to the first failed form item                                                                                             | `object` / `boolean`          | —       |

## request Attributes

| Attribute  | Description                  | Type                                                                                          | Default |
| :--------- | :--------------------------- | :-------------------------------------------------------------------------------------------- | :------ |
| searchApi  | Search API                   | `(params: any) => promise`                                                                    | —       |
| submitApi  | Edit and add confirmation    | `({ [key: string]: any, row: any, type: 'add' / 'edit' / 'view', formData: any }) => promise` | —       |
| deleteApi  | Delete API                   | `({ [key: string]?: any, row?: any, selectionData?: any }) => promise`                        | —       |
| addApi     | Add API                      | `({ type: 'add' / 'edit' / 'view', formData: any }) => promise`                               | —       |
| editApi    | Edit API                     | `({ [key: string]: any, row: any, type: 'add' / 'edit' / 'view', formData: any }) => promise` | —       |
| detailApi  | Detail API                   | `({ [key: string]: any, row: any }) => promise`                                               | —       |
| alias      | Custom data path             | `object`                                                                                      | —       |
| beforeData | Callback before table data API call | `Function`                                                                            | —       |
| afterData  | Callback after table data API call  | `(res) => void`                                                                       | —       |
| searchFunc | Override of search method    | `({ params }) => any`                                                                         | —       |
| tableData  | Custom return of table data  | `(res) => any`                                                                                | —       |

## drawer Attributes

| Attribute              | Description                                                                                                                                                             | Type        | Default |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- | :------ |
| append-to-body        | Whether the Drawer itself is inserted into the body element. Nested Drawers must specify this property and set it to **true**                                           | `boolean`   | false   |
| lock-scroll           | Whether to lock body scrolling when Drawer appears                                                                                                                       | `boolean`   | true    |
| before-close          | Callback before closing; will pause Drawer closing                                                                                                                       | `Function`  | —       |
| close-on-click-modal  | Whether the Drawer can be closed by clicking the modal                                                                                                                   | `boolean`   | true    |
| close-on-press-escape | Whether the Drawer can be closed by pressing ESC                                                                                                                         | `boolean`   | true    |
| open-delay            | Delay time for Drawer opening, in milliseconds                                                                                                                           | `number`    | 0       |
| close-delay           | Delay time for Drawer closing, in milliseconds                                                                                                                           | `number`    | 0       |
| destroy-on-close      | Controls whether to destroy all child elements after closing Drawer                                                                                                      | `boolean`   | false   |
| modal                 | Whether a mask layer is needed                                                                                                                                           | `boolean`   | true    |
| direction             | Opening direction of the Drawer                                                                                                                                          | `enum`      | rtl     |
| show-close            | Whether to show the close button                                                                                                                                         | `boolean`   | true    |
| size                  | Size of the Drawer window. When using `number`, it's in px; when using `string`, pass 'x%'; otherwise it will be interpreted as `number`                                | `number` / `string` | — |
| title                 | Title of the Drawer. Can also be passed via named slot (see below)                                                                                                      | `string`    | —       |
| with-header           | Controls whether to show the header bar. Default is true. When false, both the title attribute and title slot are ineffective                                            | `boolean`   | true    |
| modal-class           | Custom class name of the mask layer                                                                                                                                      | `string`    | —       |
| z-index               | Set z-index                                                                                                                                                               | `number`    | —       |
| header-aria-level     | The `aria-level` attribute of the header                                                                                                                                 | `string`    | 2       |
| onOpen                | Callback when Drawer opens                                                                                                                                                | `Function`  | —       |
| onOpened              | Callback when Drawer opening animation ends                                                                                                                               | `Function`  | —       |
| onClose               | Callback when Drawer closes                                                                                                                                                | `Function`  | —       |
| onClosed              | Callback when Drawer closing animation ends                                                                                                                               | `Function`  | —       |

## z-crud View Related Events

| Event Name   | Description       | Type                                 |
| :----------- | :---------------- | :----------------------------------- |
| operate-view | View button event | `({ tableRef, row }) => void`        |
