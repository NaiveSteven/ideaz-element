# Dialog

Encapsulated based on element-plus dialog component, more suitable for rapid business development.

:::tip

+ Clicking cancel button closes dialog by default
+ Dialog is draggable by default, does not support closing by clicking mask layer (can be customized)
:::

## Basic Dialog

<preview path="../../demo/dialog/Normal.vue" />

## Info, Warning, Error Dialog

Pass `info`, `warning`, `danger` to `type`

<preview path="../../demo/dialog/type.vue" />

## Import Usage

Supports opening dialog through method calls, with default title configuration internally.
We can pass strings through `title`, `message` or function parameters to customize title and content.

:::tip
Due to documentation rendering reasons, `ZDialogTip` function is directly bound to `window`. If you use it in your project, you can import it directly from the `ideaz-element` package.
:::

<preview path="../../demo/dialog/import.vue" />

## Operation Buttons

+ Use `confirmButtonLabel`, `confirmButtonLoading`, `cancelButtonLabel`, `cancelButtonLoading` attributes to configure button text and loading state
+ Use `confirmButtonProps`, `cancelButtonProps` attributes to configure all dialog button properties
+ In function mode, `onConfirm`, `onCancel` receive an object containing `done` method and button `state`. Calling `done` method can close dialog, modifying `button state` can achieve button `loading` effect

<preview path="../../demo/dialog/operation.vue" />

## Custom Title

You can use `title` slot or `render` function to customize title

<preview path="../../demo/dialog/title.vue" />

## Custom Footer Buttons

Pass `footer` slot or `render` function to customize footer buttons. Setting `footer` to `false` can disable footer buttons.

<preview path="../../demo/dialog/button.vue" />

## before-close

Callback before closing

<preview path="../../demo/dialog/before-close.vue" />

## z-dialog Attributes

| Attribute                | Description                                                  | Type                   | Default   |
| :----------------------- | :----------------------------------------------------------- | :--------------------- | :-------- |
| model-value / v-model    | Whether to show Dialog                                       | `boolean`              | —         |
| title                    | Dialog title                                                 | `string` / `() => VNode` | ''        |
| type                     | Dialog type                                                  | `normal` / `info` / `warning` / `danger` | 'normal'  |
| footer                   | Custom Dialog footer                                         | `() => VNode`          | ''        |
| confirmButtonLabel       | Confirm button text                                          | `string`               | 'Confirm' |
| confirmButtonLoading     | Confirm button loading state                                 | `boolean`              | false     |
| confirmButtonProps       | Confirm button properties                                    | `object`               | —         |
| cancelButtonLabel        | Cancel button text                                           | `string`               | 'Cancel'  |
| cancelButtonLoading      | Cancel button loading state                                  | `boolean`              | false     |
| cancelButtonProps        | Cancel button properties                                     | `object`               | —         |
| width                    | Dialog width, default value is 50%                          | `string` / `number`    | ''        |
| fullscreen               | Whether Dialog is fullscreen                                 | `boolean`              | false     |
| top                      | Dialog CSS margin-top value, default is 15vh                | `string`               | ''        |
| modal                    | Whether to show modal                                        | `boolean`              | true      |
| modal-class              | Custom class name for modal                                  | `string`               | —         |
| append-to-body           | Whether Dialog itself is inserted into body element. Nested Dialog must specify this attribute and assign it to `true` | `boolean`              | false     |
| lock-scroll              | Whether to lock body scroll when Dialog appears             | `boolean`              | true      |
| custom-class deprecated  | Custom class name for Dialog                                 | `string`               | ''        |
| open-delay               | Dialog opening delay time in milliseconds                    | `number`               | 0         |
| close-delay              | Dialog closing delay time in milliseconds                    | `number`               | 0         |
| close-on-click-modal     | Whether Dialog can be closed by clicking modal              | `boolean`              | true      |
| close-on-press-escape    | Whether Dialog can be closed by pressing ESC                | `boolean`              | true      |
| show-close               | Whether to show close button                                 | `boolean`              | true      |
| before-close             | Callback before closing, will pause Dialog closing. Dialog will only close when done parameter method is executed in callback function. | `Function`             | —         |
| draggable                | Enable draggable feature for Dialog                         | `boolean`              | false     |
| center                   | Whether to center align Dialog header and footer            | `boolean`              | false     |
| align-center 2.2.16      | Whether to horizontally and vertically align dialog         | `boolean`              | false     |
| destroy-on-close         | Destroy elements in Dialog when closing                     | `boolean`              | false     |
| close-icon               | Custom close icon, default Close                            | `string` / `Component` | —         |
| z-index                  | Same as native CSS z-index, changes z-axis order            | `number`               | —         |
| header-aria-level a11y   | `aria-level` attribute for header                           | `string`               | 2         |

## z-dialog Slots

| Slot Name | Description                                                  |
| :-------- | :----------------------------------------------------------- |
| —         | Dialog content                                               |
| header    | Content for dialog title; replaces title section but does not remove close button. |
| footer    | Content for Dialog button operation area                     |

## z-dialog Events

| Event Name       | Description                                    | Type       |
| :--------------- | :--------------------------------------------- | :--------- |
| open             | Callback when Dialog opens                     | `Function` |
| opened           | Callback when Dialog opening animation ends    | `Function` |
| close            | Callback when Dialog closes                    | `Function` |
| closed           | Callback when Dialog closing animation ends    | `Function` |
| open-auto-focus  | Callback when input focus is on Dialog content | `Function` |
| close-auto-focus | Callback when input focus leaves Dialog content | `Function` |
| confirm          | Callback when confirm button is clicked        | `Function` |
| cancel           | Callback when cancel button is clicked         | `Function` |
