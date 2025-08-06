# ArrayForm

Based on `ZForm` component encapsulation.

## Array Form

Pass `array` to form type `type`, configure `children (form items)` in `columns` to implement array form.

<preview path="../../demo/form-array/normal.vue" />

## Inline Array Form

Complex inline array form example. To validate form items, you can directly call the form `validate` method.

<preview path="../../demo/form-array/inline.vue" />

## Maximum Quantity

Set maximum quantity through `max` attribute.

<preview path="../../demo/form-array/max.vue" />

## Minimum Quantity

Set minimum quantity through `min` attribute.

<preview path="../../demo/form-array/min.vue" />

## Operations

Configure `action` as `false` to disable operation items.

<preview path="../../demo/form-array/action.vue" />

Configure `action` as `slot` or `render function` to customize operation items.

<preview path="../../demo/form-array/action-custom.vue" />

## Array Form Attributes

| Attribute | Description           | Type                      | Default |
| :-------- | :-------------------- | :------------------------ | :------ |
| max       | Maximum form items    | `number`                  | —       |
| min       | Minimum form items    | `number`                  | —       |
| action    | Operation items       | `boolean` / `() => VNode` | `true`  |
