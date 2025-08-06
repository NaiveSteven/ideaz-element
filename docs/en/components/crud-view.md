# Crud View

`z-crud` component view functionality introduction

## Basic Usage

Configure `detail` field in `column` to implement detail configuration.

<preview path="../../demo/crud-view/normal.vue" />

Configure `columns` data in `detail` to implement detail configuration.

<preview path="../../demo/crud-view/normal-columns.vue" />

Configure `columns` field in `form` to implement detail configuration.

<preview path="../../demo/crud-view/normal-form.vue" />

Configure `form` field in `column` items to implement detail information configuration, but it will also configure query, create and edit forms at the same time. You can set `search`, `add` and `edit` as `false` to disable them.

<preview path="../../demo/crud-view/normal-column.vue" />

## API Configuration

View details will use row data by default. If you need to call API, please configure `detailApi` in `request`.

<preview path="../../demo/crud-view/detail-api.vue" />

## Drawer Configuration

Configure drawer properties through `detail.drawer`.

<preview path="../../demo/crud-view/drawer.vue" />

## Dialog Configuration

Configure dialog properties through `detail.dialog`.

<preview path="../../demo/crud-view/dialog.vue" />

## Custom Dialog/Drawer

Configure `detail.dialog` and `detail.drawer` as `false` to disable built-in dialogs/drawers and customize them.

<preview path="../../demo/crud-view/custom-dialog.vue" />

## Detail Data Processing

If you need to process the detail data returned by the API, you can configure `request.alias.detail`. Passing a function supports custom detail data, passing a string supports custom data path.

<preview path="../../demo/crud-view/transform-detail.vue" />

## Custom Detail Items

We can use `slot` or `render` to customize detail item content.

<preview path="../../demo/crud-view/custom-detail-item.vue" />

## Custom Label

`label` supports passing strings, `render` functions or `concatenated Slot strings`

<preview path="../../demo/crud-view/custom-label.vue" />

## Hide Detail Items

Use `hide` to configure detail item visibility.

<preview path="../../demo/crud-view/hide.vue" />
