# Crud Delete

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

## Delete Confirmation

Configure delete confirmation dialog properties.

<preview path="../../demo/crud-delete/confirm.vue" />

## Custom Delete Button

Customize delete button properties and behavior.

<preview path="../../demo/crud-delete/custom-button.vue" />

## Batch Operations

Configure batch operations for selected items.

<preview path="../../demo/crud-delete/batch.vue" />
