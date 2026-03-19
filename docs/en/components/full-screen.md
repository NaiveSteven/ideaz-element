# FullScreen

Full screen component

:::tip
Please pay attention to `z-index` when elements are not displayed as expected.
:::

## Basic Usage

:::warning
We need to set background color, otherwise there will be large black areas.
:::

Pass `el` attribute with value of `HTMLElement` or function type, indicating the element that needs to be full screen, default is `body`.

<preview path="../../demo/full-screen/normal.vue" />

## Slots

You can use `enter` and `exit` slots to customize the entry and exit points when entering and exiting

<preview path="../../demo/full-screen/slot.vue" />

## z-full-screen Attributes

| Attribute    | Description                              | Type                                    | Default |
| :----------- | :--------------------------------------- | :-------------------------------------- | :------ |
| el           | Element that needs to be full screen     | `HTMLElement` / `() => HTMLElement`     | 'body'  |
| renderEnter  | Custom entry                             | `() => VNode`                           | ''      |
| renderExit   | Custom exit                              | `() => VNode`                           | ''      |

## z-full-screen Slots

| Slot Name | Description           |
| :-------- | :-------------------- |
| —         | FullScreen content    |
| enter     | Entry                 |
| exit      | Exit                  |

## z-full-screen Events

| Event Name | Description                    | Type                              |
| :--------- | :----------------------------- | :-------------------------------- |
| change     | Callback when entering and exiting | `(isFullScreen: boolean) => void` |
