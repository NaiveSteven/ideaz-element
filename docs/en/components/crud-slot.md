# Crud Slots

> `z-crud` component slot introduction

## Basic Usage

- Filter form top and bottom content customization can use `formTop`, `formBottom` slots.

- `toolBar` component top, bottom, left, right content customization can use `toolBarTop`, `toolBarBottom`, `toolBarLeft`, `tableTitle`, `toolBarRight` slots.

- `pagination` component top, bottom, left, right content customization can use `paginationTop`, `paginationRight`, `paginationBottom`, `paginationLeft` slots.

<preview path="../../demo/crud-slot/normal.vue" />

- When `toolBar` and `pagination` are hidden, table top and bottom content customization can use `tableTop`, `tableBottom` slots.

<preview path="../../demo/crud-slot/table-slot.vue" />

## z-crud Slots

| Slot Name        | Description                                                                                                                                    |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| append           | Content inserted after the last row of table. If table has summary row, this slot will be above summary row.                                 |
| empty            | Custom content when data is empty                                                                                                              |
| tableTop         | Top slot                                                                                                                                       |
| tableBottom      | Bottom slot                                                                                                                                    |
| toolBarTop       | Toolbar top slot                                                                                                                               |
| toolBarBottom    | Toolbar bottom slot                                                                                                                            |
| toolBarRight     | Toolbar right slot                                                                                                                             |
| toolBarLeft      | Toolbar left slot                                                                                                                              |
| tableTitle       | Table title slot                                                                                                                               |
| paginationTop    | Pagination top slot                                                                                                                            |
| paginationBottom | Pagination bottom slot                                                                                                                         |
| paginationLeft   | Pagination left slot                                                                                                                           |
| paginationRight  | Pagination right slot                                                                                                                          |
| formTop          | Form top slot                                                                                                                                  |
| formBottom       | Form bottom slot                                                                                                                               |
| crudMiddle       | Middle content slot                                                                                                                            |
