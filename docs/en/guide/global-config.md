# Global Configuration

Ideaz Element provides powerful global configuration functionality that allows you to set default properties for components, reducing repetitive code and maintaining application consistency.

## Configuration Methods

There are two ways to set global configuration (currently supports setting global default configurations for `ZTable`, `ZForm`, and `ZCrud` components):

1. **Recommended**: Pass configuration object directly when using `app.use()` (recommended for application initialization)
2. **Dynamic**: Use `setGlobalConfig()` method (suitable for runtime dynamic updates)

## Basic Usage

### Setting Global Configuration

```js
// main.ts
import { createApp } from 'vue'
import IdeazElement from 'ideaz-element'
import zhCn from 'ideaz-element/es/locale/lang/zh-cn'
import 'ideaz-element/theme-chalk/index.css'
import App from './App.vue'

const app = createApp(App)

// Set global configuration using app.use
app.use(IdeazElement, {
  // Common configuration
  locale: zhCn,
  size: 'small',

  // Table component global configuration
  table: {
    stripe: true,
    border: true,
  },

  // Form component global configuration
  form: {
    labelPosition: 'left',
    labelWidth: '100px',
    colon: true
  },

  // CRUD component global configuration
  crud: {
    action: true,
    search: true
  }
})

app.mount('#app')
```

### Using in Components

After setting global configuration, all components will automatically apply these default values:

```vue
<template>
  <!-- Table will automatically apply global configuration for stripe, border, data, etc. -->
  <z-table :columns="columns" />

  <!-- Form will automatically apply global configuration for labelWidth, colon, etc. -->
  <z-form :columns="formColumns" v-model="formData" />

  <!-- CRUD will automatically apply global configuration for size, action, etc. -->
  <z-crud :columns="crudColumns" />
</template>

<script setup>
const columns = [
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: 'Name' },
  { prop: 'status', label: 'Status' }
]

const formColumns = [
  { prop: 'name', label: 'Name', component: 'input' },
  { prop: 'email', label: 'Email', component: 'input' }
]

const crudColumns = [
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: 'Name', component: 'input' },
  { prop: 'status', label: 'Status', component: 'select' }
]

const formData = ref({})
</script>
```

## Configuration Priority

Global configuration follows the following priority rules:

1. **User explicitly passed properties** - Highest priority
2. **Global configuration properties** - Medium priority
3. **Component default values** - Lowest priority

```vue
<template>
  <!-- Even if stripe: true is globally configured, explicitly setting false here will override global config -->
  <z-table :columns="columns" :stripe="false" />

  <!-- Without explicitly passing stripe, will use global configuration stripe: true -->
  <z-table :columns="columns" />
</template>
```

## Dynamic Global Configuration Updates

While it's recommended to set initial configuration in `app.use()`, you can still dynamically update global configuration at runtime:

```js
import { getGlobalConfig, setGlobalConfig  } from 'ideaz-element'

// Get current global configuration
const currentConfig = getGlobalConfig()
console.log(currentConfig)

// Dynamically update global configuration at runtime
setGlobalConfig({
  table: {
    ...currentConfig.table,
    stripe: false,  // Turn off striping
    pagination: { pageSize: 50 }  // Change default page size
  }
})

// You can also update only partial configuration
setGlobalConfig({
  size: 'large'  // Only update global size
})
```

**Note**: Dynamically updated configuration will override the configuration set through `app.use()` during initialization.

## Best Practices

### 1. Unified Configuration at Application Entry

```js
// main.ts
import { createApp } from 'vue'
import IdeazElement from 'ideaz-element'

const app = createApp(App)

// Set global defaults based on project requirements
app.use(IdeazElement, {
  size: 'small',
  table: {
    stripe: true,
    border: true,
  },
  form: {
    labelPosition: 'left',
    labelWidth: '120px',
    colon: true
  }
})
```

### 2. Different Configurations by Module

```js
// Admin panel configuration
const adminConfig = {
  size: 'small',
  table: {
    stripe: true,
    toolBar: true
  },
  form: {
    labelPosition: 'left',
    labelWidth: '100px'
  }
}

// Mobile configuration
const mobileConfig = {
  size: 'large',
  table: {
    border: false
  },
  form: {
    labelPosition: 'top',
    labelWidth: '80px'
  }
}

// Apply different configurations based on environment
app.use(IdeazElement, isMobile ? mobileConfig : adminConfig)
```

### 3. Proper Use of Priority

```vue
<template>
  <!-- Most tables use global configuration -->
  <z-table :columns="columns" />

  <!-- Special tables override global configuration -->
  <z-table
    :columns="columns"
    :stripe="false"
    :pagination="false"
  />
</template>
```

## Notes

1. **Reactive Updates**: Changes to global configuration will automatically apply to all components using that configuration
2. **Type Safety**: Configuration items must conform to the corresponding component's props type definitions
3. **Performance Considerations**: Set reasonable default data, avoid setting overly large default datasets
4. **Configuration Isolation**: Different pages or modules can set different global configurations

## API Reference

### app.use(IdeazElement, config)

Recommended global configuration method, set during application initialization.

- **Parameters**:
  - `IdeazElement`: Component library instance
  - `config` (GlobalComponentConfig): Global configuration object

### setGlobalConfig(config)

Dynamically set global configuration at runtime.

- **Parameters**:
  - `config` (GlobalComponentConfig): Global configuration object

### getGlobalConfig()

Get current global configuration.

- **Returns**: GlobalComponentConfig

### Type Definitions

```typescript
interface GlobalComponentConfig {
  // Common configuration
  size?: 'small' | 'default' | 'large'
  locale?: string

  // Component configuration
  table?: Partial<ITableProps>
  form?: Partial<FormProps>
  crud?: Partial<CrudProps>
}
```
