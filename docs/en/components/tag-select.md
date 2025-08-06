# TagSelect

Filter tags, suitable for list query pages.

## Basic Usage

Pass in `options` to automatically generate options

<preview path="../../demo/tag-select/normal.vue" />

## Title

Pass `title` to configure title, supports string, string with `Slot` and `render function`

<preview path="../../demo/tag-select/title.vue" />

## Multiple Selection

Set `multiple` to `true` to enable multiple selection functionality
By default adds `All` tag, set `all` to `false` to disable (All tag only exists in multiple mode)

<preview path="../../demo/tag-select/multiple.vue" />

## Expand/Collapse

When tag width exceeds parent width, it will automatically collapse. Click `Expand` to expand all tags

<preview path="../../demo/tag-select/expand.vue" />

## Events

Configure `onClick` and `onClose` in `option` to listen to tag click and close events

<preview path="../../demo/tag-select/events.vue" />

## Tag Groups

Configure `children` in `options` items to generate tag groups
Pass object to `modelValue`, `field` field in `option` configuration is the `key` of the object

<preview path="../../demo/tag-select/group.vue" />

## Field Path

The `field` field in `option` configuration can be configured as field path

<preview path="../../demo/tag-select/path.vue" />

## Title Width

Pass `titleWidth` to configure title width

<preview path="../../demo/tag-select/title-width.vue" />

## Tag Style

You can pass `type`, `round`, `effect` and other attributes to set tag style

<preview path="../../demo/tag-select/style.vue" />

## z-tag-select Attributes

| Attribute     | Description                              | Type                            | Default |
| :------------ | :--------------------------------------- | :------------------------------ | :------ |
| modelValue    | Binding value of selected items          | `array` / `string` / `number`   | —       |
| options       | Configurable options                     | `array`                         | —       |
| alias         | Field path customization                 | `object`                        | `{ label: 'label', value: 'value' }` |
| multiple      | Multiple selection                       | `boolean`                       | false   |
| all           | All tag (only effective in multiple mode) | `boolean`                       | true    |
| titleWidth    | Title width                              | `string` / `number`             | —       |
| size          | Tag size                                 | `enum`                          | —       |

## z-tag-select Events

| Event Name | Description                      | Callback Parameters |
| :--------- | :------------------------------- | :------------------ |
| change     | Triggered when selected value changes | val, current selected value |

## z-tag-select Option Item Configurable Attributes

| Attribute  | Description                              | Type                | Default |
| :--------- | :--------------------------------------- | :------------------ | :------ |
| title      | Title                                    | `string`            | —       |
| field      | Binding data field name                  | `string`            | —       |
| children   | Configurable options                     | `array`             | —       |
| multiple   | Multiple selection                       | `boolean`           | false   |
| all        | All tag (only effective in multiple mode) | `boolean`           | true    |
| titleWidth | Title width                              | `string` / `number` | —       |
| size       | Tag size                                 | `enum`              | —       |

## z-tag-select children Item Configurable Attributes

| Attribute           | Description                    | Type                | Default |
| :------------------ | :----------------------------- | :------------------ | :------ |
| label               | Tag content                    | `string`            | ''      |
| value               | Tag binding value              | `string` / `value`  | ''      |
| closable            | Whether closable               | `boolean`           | false   |
| type                | Tag type                       | `enum`              | ''      |
| disable-transitions | Whether to disable transition animations | `boolean`           | false   |
| hit                 | Whether has border stroke      | `boolean`           | false   |
| color               | Background color               | `string`            | ''      |
| size                | Tag size                       | `enum`              | ''      |
| effect              | Tag theme                      | `enum`              | light   |
| round               | Whether Tag is round           | `boolean`           | false   |
| onClick             | Tag click event                | `(option) => void`  | —       |
| onClose             | Tag close event                | `(option) => void`  | —       |
