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

<preview path="../../demo/crud-cu/custom-submit.vue" />

## Form Validation

- Add `required` field in `form` field, or set `required` field in `formItemProps` to set required fields. Validation messages will be automatically generated based on `label` or can be customized.
- Configure `rules` field in `add` or `edit` object passed to `z-crud` to define form validation rules.
- Configure `rules` in form items in `form` field to define validation rules for current form item.

<preview path="../../demo/crud-cu/validate.vue" />

## Custom Form Items

We can use `slot` or `render` to customize form item content.

Custom content also uses `hide` to change visibility state.

<preview path="../../demo/crud-cu/custom-form-item.vue" />

## Custom Label and Error

`label` and `error` support passing strings, `render` functions or `concatenated Slot strings`

<preview path="../../demo/crud-cu/custom-label.vue" />

## Linkage

Use `hide` to configure form item visibility.

<preview path="../../demo/crud-cu/hide.vue" />

## Dialog Configuration

Configure dialog properties through `add.dialog` and `edit.dialog`.

<preview path="../../demo/crud-cu/dialog.vue" />

## Custom Dialog

Configure `add.dialog` and `edit.dialog` as `false` to disable built-in dialogs and customize dialogs.

<preview path="../../demo/crud-cu/custom-dialog.vue" />
