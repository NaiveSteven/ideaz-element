# Crud

Integrates `z-form` and `z-table` components to implement CRUD functionality.

## Basic Usage

Configure `column` to generate table items.

:::tip
This is a comprehensive component that combines form and table functionality. For detailed configuration, please refer to the individual component documentation for z-form and z-table.
:::

## Key Features

- **Integrated CRUD Operations**: Create, Read, Update, Delete functionality in one component
- **Form Integration**: Built-in form for data entry and editing
- **Table Display**: Automatic table generation with sorting, filtering, and pagination
- **Search Functionality**: Built-in search form for data filtering
- **Customizable Actions**: Configurable action buttons and operations
- **Validation**: Form validation support
- **API Integration**: Easy integration with backend APIs

## Basic Configuration

```javascript
const columns = [
  {
    prop: 'name',
    label: 'Name',
    form: {
      component: 'input',
      label: 'Name',
      field: 'name'
    }
  },
  {
    prop: 'email',
    label: 'Email',
    form: {
      component: 'input',
      label: 'Email',
      field: 'email'
    }
  }
]
```

## z-crud Attributes

| Attribute             | Description                              | Type                            | Default |
| :-------------------- | :--------------------------------------- | :------------------------------ | :------ |
| columns               | Column configuration                     | `array`                         | —       |
| data                  | Table data                               | `array`                         | —       |
| loading               | Loading state                            | `boolean`                       | false   |
| search                | Whether to show search form              | `boolean`                       | true    |
| action                | Whether to show action buttons           | `boolean`                       | true    |
| add                   | Whether to show add button               | `boolean`                       | true    |
| edit                  | Whether to show edit button              | `boolean`                       | true    |
| delete                | Whether to show delete button            | `boolean`                       | true    |
| view                  | Whether to show view button              | `boolean`                       | true    |

## z-crud Events

| Event Name | Description                      | Type       |
| :--------- | :------------------------------- | :--------- |
| search     | Triggered when search is performed | `Function` |
| add        | Triggered when add button is clicked | `Function` |
| edit       | Triggered when edit button is clicked | `Function` |
| delete     | Triggered when delete button is clicked | `Function` |
| view       | Triggered when view button is clicked | `Function` |

## Column Configuration

For detailed column configuration, please refer to:
- [Table Column Configuration](/en/components/table#column-configuration)
- [Form Column Configuration](/en/components/form#column-configuration)

The CRUD component combines both table and form column configurations, allowing you to define how data is displayed in the table and how forms are rendered for data entry.
