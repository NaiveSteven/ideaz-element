# CollapseForm

Based on `ZForm` component and `ElCollapse` component encapsulation.

## Basic Usage

Pass `collapse` to form type `type`, configure `children (form items)` in `column` items to implement collapsible form.

`activeCollapse` binds the expanded collapse item `label`. If you don't want to bind `label`, please configure field `key` in `column` item.

<preview path="../../demo/form-collapse/normal.vue" />

## Title

By default, the `label` field of `column` item is the `name` of collapse item. If `label` is a function or you don't want to use `label` as collapse item `name`, please pass additional `key` field. Supports `slot` for custom title.

<preview path="../../demo/form-collapse/label.vue" />

## Collapse Attributes

`accordion` attribute is passed directly to `ZForm` component. `disabled` attribute is passed in `column` item to disable collapse item.

<preview path="../../demo/form-collapse/collapse.vue" />

## Custom Content

When `ZForm` component `type` attribute is `collapse`, `column` item can configure `slot` or `render` to customize collapse content.

:::tip

When `column` item passes `children` field (regardless of array length), it will render `ElCollapse` collapse item

:::

<preview path="../../demo/form-collapse/custom.vue" />

## Collapse Expand Event

`collapse-change` event returns currently expanded collapse item `label`, bind directly to `ZForm` component.

<preview path="../../demo/form-collapse/event.vue" />

## Collapse Form Attributes

| Attribute              | Description                                                    | Type               | Default |
| :--------------------- | :------------------------------------------------------------- | :----------------- | :------ |
| v-model:activeCollapse | Expanded `collapse` items (effective when `type` is `collapse`) | `array` / `string` | —       |
| accordion              | Accordion mode                                                 | `boolean`          | `false` |

### Events

| Event Name            | Description                           | Type       |
| :-------------------- | :------------------------------------ | :--------- |
| update:modelValue     | Form item data                        | `Function` |
| update:activeCollapse | Expanded items of collapse form       | `Function` |
| collapse-change       | Triggered when collapse item changes  | `Function` |
