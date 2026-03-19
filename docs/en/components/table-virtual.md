# Z-Table Virtual Scrolling

## 📚 Overview

The Z-Table component now supports virtual scrolling based on Element Plus TableV2, enabling efficient handling of large datasets and providing a smooth user experience.

### 🚀 Key Features

- High-performance rendering: Based on Element Plus TableV2, supports smooth scrolling with 100k+ rows
- Smart switching: Automatically or manually switch between regular and virtual tables
- Full functionality: Supports sorting, fixed columns, selection, etc.
- Consistent styles: Keeps the same visual experience as the original table
- Extreme performance: Constant number of DOM nodes, stable memory usage

### ✅ Compatibility

- Full compatibility: Sorting, filtering, selection, expand, index column, fixed columns, theme styles, column show/hide, column tooltip, watermark
- Advanced features: Editable table, custom column rendering, custom header, slot templates
- API consistency: Same props and events as the regular table
- Progressive enhancement: Can be enabled/disabled dynamically at runtime

## 🚀 Quick Start

### Enable virtual scroll in 3 steps

```vue
<!-- Step 1: Add virtual prop -->
<!-- Step 2: Set a fixed height -->
<!-- Step 3: Configure columns -->
<z-table
  :data="largeData"
  :columns="columns"
  :virtual="true"
  height="400px"
/>
```

### Basic configuration example

```vue
<template>
  <ZTable
    :data="tableData"
    :columns="columns"
    :virtual="true"
    height="600px"
  />
</template>

<script setup>
// No need to specify width for columns, handled automatically
const columns = [
  { prop: 'name', label: 'Name' },
  { prop: 'email', label: 'Email' },
  { prop: 'department', label: 'Department' }
]
</script>
```

### Advanced configuration example

```vue
<template>
  <ZTable
    :data="tableData"
    :columns="columns"
    :virtual="virtualConfig"
    height="600px"
  />
</template>

<script setup>
const virtualConfig = {
  enabled: true,
  itemHeight: 48,        // Row height
  threshold: 100,        // Enable threshold
  footerHeight: 60       // Footer height
}
</script>
```

## 🎯 Basic Features

### Basic table

Basic virtual table functionality. Efficiently renders large data.

<preview path="../../demo/table/virtual-normal.vue" />

### Operation buttons

Verify the full behavior of operation buttons under virtual table, including click events and styles.

<preview path="../../demo/table/virtual-operation.vue" />

## Column Types

Test compatibility of various column types under virtual table: selection column, index column, form components, etc.

<preview path="../../demo/table/virtual-column-type.vue" />

## Selection Column

Test support for `type: 'selection'` column under virtual table.

<preview path="../../demo/table/virtual-selection.vue" />

## Expand Column

Virtual table fully supports expand functionality, leveraging Element Plus TableV2 native capabilities.

Features:
- Expand column config: `{ type: 'expand' }` column config; TableV2 automatically adds expand button for rows with children
- Two-way binding: `v-model:expanded-row-keys` supports two-way binding of expand state
- Events: `@expand-change`, `@row-expand` (native TableV2 events)
- Methods: `toggleRowExpansion`
- Slots: `#expand` slot to customize expand content
- Data structure: Supports nested data structures with children field

<preview path="../../demo/table/virtual-expand.vue" />

## Index Column

Virtual table fully supports index column functionality.

Features:
- Index column config: `{ type: 'index' }`
- Custom start index: Supports numeric `index` prop
- Function index: Supports function-type `index` for custom display logic

<preview path="../../demo/table/virtual-index.vue" />

## Editable Table

Test table editing under large datasets, supporting multiple form components.

<preview path="../../demo/table/virtual-editable.vue" />

## Form Component Support

Virtual table fully supports various form components, including input, select, radio, checkbox, date picker, switch, etc.

<preview path="../../demo/table/virtual-form-components.vue" />

## Column Show/Hide

Test dynamic show/hide of columns, supports functional and static configuration.

Features:
- Dynamic show/hide columns
- Functional config: `hide: () => boolean`
- Static config: `hide: boolean`

<preview path="../../demo/table/virtual-hide.vue" />

## Column Tooltip

Virtual table fully supports header tooltip, consistent with z-table’s regular table tooltip implementation.

Features:
- String tooltip: `tooltip: 'Content'`
- Function tooltip: `tooltip: (scope) => 'Dynamic content'` with scope parameter
- Object config: `tooltip: { content: 'Content', placement: 'top', effect: 'dark' }`

<preview path="../../demo/table/virtual-tooltip.vue" />

## Watermark

Virtual table is fully compatible with z-table’s watermark feature.

Features:
- String watermark: pass a string as watermark content
- Object watermark: pass a config object to customize font, color, angle, spacing, etc.

<preview path="../../demo/table/virtual-watermark.vue" />

## Footer

Virtual table fully supports Element Plus TableV2 footer features.

Features:
- Footer slot: customize footer content via `#footer`
- Height config: configure footer height via `virtual.footerHeight`

<preview path="../../demo/table/virtual-footer.vue" />

## Custom Column Rendering

Validate custom rendering of column content; supports both render function and slot.

<preview path="../../demo/table/virtual-custom-column.vue" />

## Custom Header

Test custom header features including icons, badges, dropdowns, and other interactive elements.

<preview path="../../demo/table/virtual-custom-header.vue" />

## Methods and Events

Test table method calls and event handling.

<preview path="../../demo/table/virtual-methods.vue" />

## 📖 Configuration Reference

### Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `boolean` | `false` | Whether to enable virtual scrolling |
| `itemHeight` | `number` | `48` | Fixed row height (px) |
| `estimatedRowHeight` | `number` | `48` | Estimated row height for dynamic height |
| `threshold` | `number` | `100` | Auto-enable when data exceeds this value |
| `footerHeight` | `number` | `50` | Footer height (px) |

### API Methods

#### Virtual-scroll-specific methods

```javascript
// Scroll to a specific position
tableRef.value.scrollTo({
  scrollTop: 1000,
  scrollLeft: 200
})

// Scroll to a specific row
tableRef.value.scrollToRow(500, 'center')
```

#### General table methods

All original table methods remain available in virtual mode:

```javascript
// Set current row
tableRef.value.setCurrentRow(row)

// Toggle row selection
tableRef.value.toggleRowSelection(row, true)

// Clear selection
tableRef.value.clearSelection()

// Sort
tableRef.value.sort('column', 'ascending')
```

### Usage Recommendations

#### 🎯 When to use virtual scroll

- Data volume > 1000 rows
- Need to display all data at once
- Users need to browse and locate quickly
- Performance-sensitive scenarios

#### ⚠️ Notes

1. Fixed height requirement:
   - Must set the `height` prop
   - Dynamic row height is not supported

2. Performance tips:
   - Enable when data volume > 1000 rows
   - Avoid overly complex components in columns
   - No need to manually specify column width; handled by system
