# Crud Form

`z-crud` component form functionality introduction.

If you only want to use the component's filter form and table functionality, you need to check the following examples.

## Basic Usage

Configure `search` in `column` items to generate form items.

- `label` and `field` can be omitted, defaults to `prop` and `label`
- Component defaults configure `clearable`, `placeholder` and `filterable`
- Specific configuration of `search` attribute can refer to `column` items of `z-form`
- Form layout is fixed as `{ xs: 24, sm: 12, md: 8, lg: 8, xl: 6 }`

<preview path="../../demo/crud-form/normal.vue" />

Configuring `columns` field in `search` can achieve the same effect. If you want to configure form `labelWidth` and other attributes, you can also put them in `search`

<preview path="../../demo/crud-form/normal-columns.vue" />

Configuring `form` in `column` can also generate query form items, but it will also generate add, edit and query form items at the same time. If not needed, you can configure `add` and `edit` fields as `false`.

<preview path="../../demo/crud-form/normal-form.vue" />

If a `column` item doesn't want table columns and only wants form items, don't configure fields like `type`, `slot`, `render`, `label`, `prop`, `component` in `column`, then configure form configuration fields like `search`, `form` to achieve this

<preview path="../../demo/crud-form/no-table-column.vue" />

## Condition Caching

Configure `name` field to enable caching by default. Filter form data and `pagination` data will be cached in `sessionStorage`, and condition data will be retrieved from cache first when loading next time.

Data retrieval needs to be called in `onMounted` lifecycle.

<preview path="../../demo/crud-form/storage.vue" />

After configuring `request`, cached conditions will be handled internally.

<preview path="../../demo/crud-form/storage-request.vue" />

## Validation

- Add `required` field in `form` field, or set `required` field in `formItemProps` to set required fields. Validation messages will be automatically generated based on `label` or can be customized.
- Configure `rules` field in `search` object passed to `z-crud` to define form validation rules.
- Configure `rules` in form items in `form` field to define validation rules for current form item.

<preview path="../../demo/crud-form/validate.vue" />

## Custom Form Items

We can use `slot` or `render` to customize form item content.

Custom content also uses `hide` to change visibility state.

<preview path="../../demo/crud-form/custom-form-item.vue" />

## Custom Label and Error

`label` and `error` support passing strings, `render` functions or `concatenated Slot strings`

<preview path="../../demo/crud-form/custom-label.vue" />

## Linkage

Use `hide` to configure form item visibility.
:::tip
If `hide` is configured in `column`, the data passed by `search` event will filter hidden form items (custom form items need to pass `field`).
You can configure `filterHiddenFields` to `false` to turn it off, default is `true`.
:::

<preview path="../../demo/crud-form/hide.vue" />

## Operation Buttons

Button operations will have `search` and `reset` events, with built-in reset and validation operations

<preview path="../../demo/crud-form/operation.vue" />

Set `searchButtonLabel`, `resetButtonLabel`, `searchButtonLoading`, `resetButtonLoading` to set button text and loading state.

<preview path="../../demo/crud-form/operation-props.vue" />

Set `searchButtonProps`, `resetButtonProps` to set button text and loading state.

<preview path="../../demo/crud-form/operation-attrs.vue" />

Customize operation buttons through `formOperation` slot or `render function`.

<preview path="../../demo/crud-form/operation-slot.vue" />

## Default Collapsed

Configure `collapsed` to `false`, the form will be collapsed by default

<preview path="../../demo/crud-form/expand.vue" />
