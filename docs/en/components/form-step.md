# StepForm

Based on `ZForm` component and `ElStep` component encapsulation.

## Step Form

Pass `step` to form type `type`, configure `children (form items)` in `columns` to implement step form. Current step is bound through `activeStep` two-way binding.

Configure `label`, `description`, `icon` and `status` in `column` to set step text, description, icon and status.

<preview path="../../demo/form-step/normal.vue" />

## Step Attributes

`el-step` component attributes, such as: `process-status`, `finish-status`, `align-center`, etc., are passed directly through `z-form`.

<preview path="../../demo/form-step/step-attribute.vue" />

## Customization

Supports customizing `label`, `description`, `icon` content of `column` items. As usual, supports passing `render` or strings with `slot (case insensitive)`.

<preview path="../../demo/form-step/custom.vue" />

Configure `footer` slot or `render` function to customize step bottom content.

<preview path="../../demo/form-step/footer.vue" />

## Step Form Attributes

| Attribute              | Description                | Type                                                | Default   |
| :--------------------- | :------------------------- | :-------------------------------------------------- | :-------- |
| modelValue:activeStep  | Current step               | `number`                                            | 0         |
| process-status         | Set current step status    | `wait` / `process` / `finish` / `error` / `success` | `process` |
| finish-status          | Set finish step status     | `wait` / `process` / `finish` / `error` / `success` | `finish`  |
| align-center           | Center alignment           | `boolean`                                           | `true`    |
