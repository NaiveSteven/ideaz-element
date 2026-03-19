# GroupForm

Based on `ZForm` component and `ElDivider` component encapsulation.

## Basic Usage

Pass `group` to form type `type`, configure `children (form items)` in `columns` to implement grouped form.

<preview path="../../demo/form-group/normal.vue" />

## Divider Configuration

Configure `borderStyle` in `column` to modify divider style, supports `'none' | 'solid' | 'hidden' | 'dashed' | ...`.

<preview path="../../demo/form-group/divider.vue" />

## Content Position

Configure divider content position with `contentPosition` attribute in `column`, supports `'left' | 'right' | 'center'`.

<preview path="../../demo/form-group/position.vue" />

## Custom Content

`label` supports not only strings, but also `h functions`, `render functions` and `slot (needs slot string, case insensitive)`.

<preview path="../../demo/form-group/label.vue" />

## Form Attributes

Please refer to `ZForm` component basic usage documentation.

## Column Attributes (Specific)

| Attribute        | Description                                    | Type                                           | Default  |
| :--------------- | :--------------------------------------------- | :--------------------------------------------- | :------- |
| label            | Divider content                                | `string` / `() => VNode`                       | —        |
| border-style     | Set divider style                              | `none` / `solid` / `hidden` / `dashed` / `...` | `solid`  |
| content-position | Custom position of divider content             | `left` / `right` / `center`                    | `center` |
| children         | Form items in current group (all normal `column` attributes) | `array`                                        | —        |
