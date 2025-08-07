# CheckCard

A card that aggregates multiple related information and can be selected.

## Basic Usage

Pass `options` to configure option cards.

<preview path="../../demo/check-card/normal.vue" />

## Multiple Selection

Set `multiple` to `true` to enable multiple selection mode.

<preview path="../../demo/check-card/multiple.vue" />

## Field Path

Set the `alias` attribute to customize field paths.

<preview path="../../demo/check-card/alias.vue" />

## Size

Configure the component's `size` attribute to uniformly configure size. You can also configure the `size` of individual `option` for custom sizing.

<preview path="../../demo/check-card/size.vue" />

## Custom Size

You can also customize card size through `style` or `class`.

<preview path="../../demo/check-card/custom-size.vue" />

## Combination Styles

Avatar, title, and description areas can be freely combined or presented individually. The component will adjust to the most appropriate alignment for you.

<preview path="../../demo/check-card/combination.vue" />

## Custom Avatar

Pass a custom `render function` to the `avatar` attribute.

<preview path="../../demo/check-card/avatar.vue" />

## Custom Title

Pass a custom `render function` to the `title` attribute.

<preview path="../../demo/check-card/title.vue" />

## Custom Description

The description area can be customized through `description`.

<preview path="../../demo/check-card/description.vue" />

## Action Bar

Configure `extra` to add an action bar to the card.

<preview path="../../demo/check-card/extra.vue" />

## Component Loading

Configure the loading attribute to true to show content in loading state.

<preview path="../../demo/check-card/loading.vue" />

## Pure Image Options

<preview path="../../demo/check-card/pic.vue" />

## Disabled Options

Configure the `disabled` attribute to make options unavailable.

<preview path="../../demo/check-card/disabled.vue" />

## z-check-card Attributes

| Attribute  | Description                                                                 | Type                                                                        | Default                                                     |
| :--------- | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------- | :---------------------------------------------------------- |
| modelValue | Two-way binding                                                             | `string / string[]`                                                         | —                                                           |
| alias      | Key-value pair configuration                                                | `object`                                                                    | `{ label: 'label', value: 'value', disabled: 'disabled' }` |
| multiple   | Multiple selection                                                          | `boolean`                                                                   | false                                                       |
| bordered   | Whether to show border                                                      | `boolean`                                                                   | true                                                        |
| disabled   | Disable entire group                                                        | `boolean`                                                                   | false                                                       |
| loading    | When card group content is still loading, loading can be used as placeholder | `boolean`                                                                   | false                                                       |
| options    | Specify available options                                                   | `array`                                                                     | []                                                          |
| size       | Selection box size, options: `large` `small` `default`                     | `string`                                                                    | `default`                                                   |
| onChange   | Callback function when changed                                              | `Function(checkedValue)`                                                    | —                                                           |

## z-check-card Options Configurable Attributes

| Attribute   | Description                                                                                      | Type             | Default   |
| :---------- | :----------------------------------------------------------------------------------------------- | :--------------- | :-------- |
| title       | Title                                                                                            | `string / VNode` | —         |
| value       | Option value                                                                                     | `string`         | —         |
| bordered    | Whether to show border                                                                           | `boolean`        | true      |
| disabled    | Disabled state                                                                                   | `boolean`        | false     |
| size        | Selection box size, options: `large` `small`                                                    | `string`         | `default` |
| description | Description                                                                                      | `string / VNode` | —         |
| avatar      | Image address of option element                                                                  | `link / VNode`   | —         |
| extra       | Action area in the top right corner of the card                                                 | `string / VNode` | —         |
| cover       | Card background image, note that `title`, `description` and `avatar` are disabled when using this option | `VNode`          | —         |

## z-check-card Events

| Event Name | Description                 | Callback Parameters |
| :--------- | :-------------------------- | :------------------ |
| change     | Callback function on change | checked             |
