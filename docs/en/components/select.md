# Select

Select component encapsulation, works better with `z-form` component.

## Basic Usage

Pass in `options` to automatically generate options

<preview path="../../demo/select/normal.vue" />

## Disabled

Set `disabled` to `true` for a certain item in `option`

<preview path="../../demo/select/disabled.vue" />

Disable all, pass `disabled` as `true` to the component

<preview path="../../demo/select/disabled-all.vue" />

## Key-Value Configuration

Configure `alias` to customize the key names for `label`, `value` and `disabled`

<preview path="../../demo/select/kv.vue" />

## Multiple Selection

When `multiple` is `true`, multiple selection is enabled. The bound `model-value` is in array format

<preview path="../../demo/select/multiple.vue" />

## Select All

:::tip
This only takes effect when multiple is true
:::

When `all` is `true`, `options` will be concatenated with `{ label: 'All', value: 'all' }`

<preview path="../../demo/select/select-all.vue" />

## Grouping

Grouping display can be easily generated through the `options` field in `option`

<preview path="../../demo/select/group.vue" />

## Custom Content

Configure `render` function in `option` item to customize content, or pass `custom string + Slot` to the `render` field to use slot functionality

<preview path="../../demo/select/custom-content.vue" />

## Slots

If you want to customize the component header content or the list when there are no options, configure `prefix` or `empty` attributes, or use `prefix` or `empty` slots

<preview path="../../demo/select/slot.vue" />

Supports `tag`, `loading`, `header`, `footer`, `label` and other slots

<preview path="../../demo/select/slot-more.vue" />

## z-select Attributes

| Attribute                        | Description                                                  | Type                                       | Accepted Values                                              | Default          |
| :------------------------------- | :----------------------------------------------------------- | :----------------------------------------- | :----------------------------------------------------------- | :--------------- |
| model-value / v-model            | Binding value of selected item                              | `array / string / number / boolean / object` | —                                                            | —                |
| options                         | Configurable options                                         | `array`                                    |  —                                                 | —            |
| alias                         | Key-value pair configuration                                 | `object`                                    |  —                                                 | `{ label: 'label', value: 'value', disabled: 'disabled' }`            |
| prefix                         | Select component header content                              | `string /function`                                    |  —                                                 | —            |
| empty                         | List when no options                                         | `string / function`                                    |  —                                                 | —            |
| multiple                         | Whether multiple selection                                   | `boolean`                                    | true/false                                                   | false            |
| all                         | Whether all (only effective when `multiple` is `true`)      | `boolean`                                    | true/false                                                   | false            |
| disabled                         | Whether disabled                                             | `boolean`                                    | true / false                                                 | false            |
| value-key                        | Unique identity key name as value, required when binding value is object type | `string`                                     | —                                                            | value            |
| size                             | Input box size                                               | `string`                                     | large/default/small                                          | default          |
| clearable                        | Whether options can be cleared                               | `boolean`                                    | true / false                                                 | false            |
| collapse-tags                    | Whether to display selected values as text when multiple selection | `boolean`                                    | true/false                                                   | false            |
| collapse-tags-tooltip            | Whether to show all selected tags when mouse hovers over collapsed tag text. The `collapse-tags` attribute must be set to true to use this attribute | `boolean`                                    | true / false                                                 | false            |
| multiple-limit                   | Maximum number of options user can select when `multiple` attribute is set to `true`. No limit when set to 0 | `number`                                     | —                                                            | 0                |
| name                             | Native name attribute of Select input                       | `string`                                     | —                                                            | —                |
| effect                           | Tooltip theme, built-in `dark` / `light` themes             | `string`                                     | string                                                       | light            |
| autocomplete                     | Native autocomplete attribute of Select input               | `string`                                     | —                                                            | off              |
| placeholder                      | Placeholder text                                             | `string`                                     | —                                                            | Select           |
| filterable                       | Whether Select component is filterable                       | `boolean`                                    | true / false                                                 | false            |
| allow-create                     | Whether creating new items is allowed. Only effective when `filterable` is set to true. | `boolean`                                    | true/false                                                   | false            |
| filter-method                    | Custom filter method                                         | `function`                                   | —                                                            | —                |
| remote                           | Whether options are loaded remotely from server             | `boolean`                                    | true / false                                                 | false            |
| remote-method                    | Custom remote search method                                  | `function`                                   | —                                                            | —                |
| remote-show-suffix               | Show suffix icon for remote search method                   | `boolean`                                    | true / false                                                 | false            |
| loading                          | Whether loading data remotely                                | `boolean`                                    | true / false                                                 | false            |
| loading-text                     | Text displayed when loading content from server             | `string`                                     | —                                                            | Loading          |
| no-match-text                    | Text displayed when no matching search criteria, can also use `empty` slot | `string`                                     | —                                                            | No matching data |
| no-data-text                     | Text displayed when no options, can also use `empty` slot for custom content | `string`                                     | —                                                            | No data          |
| popper-class                     | Custom class name for Select dropdown menu                  | `string`                                     | —                                                            | —                |
| reserve-keyword                  | When `multiple` and `filter` are set to true, whether to retain current search keywords after selecting an option | `boolean`                                    | true / false                                                 | true             |
| default-first-option             | Whether to select first matching item when pressing Enter in input box. Use with `filterable` or `remote` | `boolean`                                    | true / false                                                 | false            |
| popper-append-to-body deprecated | Whether to insert popup into body element. Try setting to false when popup position issues occur. | `boolean`                                    | true / false                                                 | true             |
| teleported                       | Whether dropdown menu uses teleport to insert into body element | `boolean`                                    | true / false                                                 | true             |
| persistent                       | When dropdown selector is not activated and `persistent` is set to `false`, selector will be deleted. | `boolean`                                    | true / false                                                 | true             |
| automatic-dropdown               | For non-filterable Select components, this attribute determines whether to automatically pop up option menu after input box gains focus | `boolean`                                    | true / false                                                 | false            |
| clear-icon                       | Custom clear icon                                            | `string` | Component                       | —                                                            | CircleClose      |
| fit-input-width                  | Whether dropdown width is same as input box                 | `boolean`                                    | true / false                                                 | false            |
| suffix-icon                      | Custom suffix icon component                                 | `string` | Component                       | —                                                            | ArrowDown        |
| suffix-transition deprecated     | Animation of suffix icon when dropdown menu shows/hides     | `boolean`                                    | true / false                                                 | true             |
| tag-type                         | Tag type                                                     | `string`                                     | success/info/warning/danger                                  | info             |
| validate-event                   | Whether to trigger form validation                           | `boolean`                                    | true / false                                                 | true             |
| placement                        | Position where dropdown appears                              | `string`                                     | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom-start     |
| max-collapse-tags         | Maximum number of Tags to display. Only effective when `collapse-tags` is set to true. | `number`                                     | —                                                            | 1                |

## z-select Events

| Event Name     | Description                              | Callback Parameters                |
| :------------- | :--------------------------------------- | :--------------------------------- |
| change         | Triggered when selected value changes    | val, current selected value        |
| visible-change | Triggered when dropdown appears/hides    | val, true when appears, false when hides |
| remove-tag     | Triggered when removing tag in multiple mode | val, removed tag value          |
| clear          | Triggered when user clicks clear button in clearable single mode | —                                  |
| blur           | Triggered when input loses focus         | (event: FocusEvent)                |
| focus          | Triggered when input gains focus         | (event: FocusEvent)                |

## z-select Slots

| Slot Name | Description             | Subtags               |
| :-------- | :---------------------- | :-------------------- |
| prefix    | Select component header content | —                     |
| empty     | List when no options    | —                     |

## Option Item Configurable Attributes

| Attribute | Description                             | Type                               | Accepted Values | Default |
| :-------- | :-------------------------------------- | :--------------------------------- | :-------------- | :------ |
| value     | Option value                            | `string / number / boolean / object` | —               | —       |
| label     | Option label, defaults to `value` if not set | `string / number`                      | —               | —       |
| disabled  | Whether option is disabled              | `boolean`                            | —               | false   |
| options   | Configurable options (for grouping)    | `array`                            | —               | —       |
| render    | Option customization                    | `string / () => VNode`                            | —               | —       |
