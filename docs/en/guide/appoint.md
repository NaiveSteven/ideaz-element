# Convention

The design philosophy of `data-driven view` achieves requirements through simple configuration of data items.

## Version

Currently supports `element-plus` version `2.7.6`, and will continue to maintain compatibility.

## Usage Convention

### Field Naming

In form and table components, the configuration of `column` items is similar.

+ `component`: Configure display component
+ `fieldProps`: Configure component properties
+ `formItemProps`: Decorator component properties
+ `field`: Component field name
+ `label`: Title
+ `on + event`: Component event configuration
+ `slot`: Slot
+ `render`: `h function` or `render function`
+ `hide`: Show/hide display configuration (based on `v-if`)
+ `show`: Show/hide display configuration (based on `v-show`)

### Built-in Components

For the `column` items in forms or tables, the `component` field supports `local components (controlled components)`, `global components (controlled components)`, and built-in components.

Built-in components include: `input`, `select`, `radio`, `checkbox`, which will be processed internally in form and table components as `z-input`, `z-select`, etc.

Usage example:

```js
import { ElInput } from 'element-plus'

const columns = [
  {
    component: ElInput
  },
  {
    component: 'el-input'
  },
  {
    component: 'input'
  },
]
```

### Slots

For components or `column` items that support fields like `label` or `title`, you can pass strings with `Slot` suffix like `labelSlot`, `titleSlot`, which will be processed as slots internally by the component.

All customizable properties or configurations support `h function`, `slots`, and `render function`.

## Default Configuration

Components like `ZForm`, `ZFilterForm`, `ZCrud` will default configure properties like `placeholder`, `clearable`, `filterable`, and support customization.

`ZFilterForm` responsive default configuration is `{ xl: 6, lg: 8, md: 8, sm: 12, xs: 24 }`
