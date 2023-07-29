# PLAN

## FEATURE（new component）

1. ~~添加公共组件`z-row`、`z-col`~~
2. 添加布局组件`z-layout`、`z-menu`
3. ~~添加导航栏组件`z-guide`（基于`tag`组件，可以参考`iview-plus` [https://github.com/view-design/ViewUIPlus] [https://www.iviewui.com/view-ui-plus/component/form/tag-select]）~~
4. 大数据表格
5. ~~添加`z-filter-form`组件~~
6. ~~添加`z-check-card`组件~~
7. 添加`z-tree-select`组件（可以参考 [https://tolking.github.io/element-pro-components/zh-CN/components/tree-select] ，上述方案无法实现）

## FEATURE（new function）

1. 表格数据源可以添加`status`字段，判断状态
2. 表单支持拖拽
3. 表单支持接口配置
4. 表格数据和表格头支持拖拽
5. 表格项`column`中可以直接配置`编辑、新增`表单（可以参考`iview-crud` [https://icrud.iviewui.com/]）
6. `z-form-filter`组件可以支持`colSize`，（可以参考`pro components` [https://procomponents.ant.design/components/query-filter]）
7. ~~`z-tag-select`组件`title`优化~~
8. `z-form`组件结合操作按钮和接口
9. ~~`z-check-card`支持`v-model`~~
10. ~~`z-tag-select`组件支持配置多条配置（思路：`modelValue`传入`object`，`options`传入`object`时，走多条配置逻辑）~~
11. ~~`z-form`、`z-form-item`组件支持`provide`组件属性~~
12. ~~`z-tag-select`组件`option.label option.value field`支持路径配置~~
13. ~~`z-radio`组件`option.label option.value`支持路径配置~~
14. ~~`z-checkbox`组件`option.label option.value`支持路径配置~~
15. ~~`z-select`组件`option.label option.value`支持路径配置~~
16. ~~`z-check-card`组件`option.label option.value`支持路径配置~~
17. ~~`z-select`支持拼接`全部`~~
18. ~~`z-form`组件不再使用`z-col`和`z-row`组件布局，而是采用内置方案~~
19. ~~`z-form`组件`class`使用`useNameSpace`~~
20. ~~`z-form`和`z-filter-form`组件使用`v-model`~~
21. ~~`z-form`支持`type`为`group`~~
22. ~~`z-form`支持`type`为`collapse`~~
23. ~~`z-form`支持`type`为`array`~~
24. `z-input`支持`copy`
25. `z-table`支持`editable`
26. ~~`z-table`表格头支持`tooltip`~~
27. ~~`z-table`的`editable`支持保存时校验配置~~
28. ~~`z-table`的`editable`支持新增~~
29. ~~`z-table`的`editable`支持全量编辑~~
30. ~~`z-table`的`editable`支持操作项自定义~~
31. ~~`z-table`的`button`支持`dropdown`~~
32. ~~`z-table`的`button`点击事件都改为`onClick`~~
33. ~~`z-table`的`isDisabled`改为`disabled`~~
34. `TableButton`组件代码优化
35. `z-table`组件的`toolbar`更改（代码重写，功能修改和新增）
36. `z-table`的`disabled`、`onClick`事件传递参数统一
37. `z-table`支持`watermark`

## FEATURE（docs and dts）

1. ~~`check-card`组件文档、`dts`文件~~
2. ~~`checkbox`组件文档、`dts`文件~~
3. ~~`col`、`row`组件文档、`dts`文件~~
4. ~~`description`组件文档、`dts`文件~~
5. `form`组件文档、`dts`文件
6. ~~`input`组件文档、`dts`文件~~
7. ~~`radio`组件文档、`dts`文件~~
8. ~~`select`组件文档、`dts`文件~~
9. `table`组件文档、`dts`文件
10. ~~`tag-select`组件文档、`dts`文件~~
11. ~~`text`组件文档、`dts`文件~~
12. ~~`watermark`组件文档、`dts`文件~~

## FIX

1. `Vue2`中日期组件`icon`会造成排序错乱问题
2. `z-text`组件在`vitepress`文档中的折行不正确问题
3. ~~`z-check-card`组件修复`inject`报错问题~~

## Long Time

1. 统一`slot`和`render`参数问题
2. 引入路径问题，将`element`包中的所有东西都导出

## design

```js
// z-form
const config = {
  type: 'array' | 'group' | 'collapse', // form type
  gutter: number, // form gutter
  justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between', // form justify
  align: 'top' | 'middle' | 'bottom', // form align
  modelValue: {},
  columns: [
    {
      component: string, // component name
      field: string,
      label: string | (() => VNode), // formItem
      tooltip: string | (() => VNode), // formItem
      colon: boolean, // formItem
      extra: string | (() => VNode), // formItem
      fieldProps: {}, // component props
      formItemProps: {}, // formItem props
      span: number, // col span
      offset: number, // col offset
      pull: number, // col pull
      push: number, // col push
      xs: number | object, // <576px
      sm: number | object, // ≥576px
      md: number | object, // ≥768px
      lg: number | object, // ≥992px
      xl: number | object, // ≥1200px
      xxl: number | object, // ≥1600px
      // colProps: {}, // col props
      // rowProps: {}, // row props
      render: () => {}, // custom
      // renderFormItem or formItem: () => {}
      ref: (c: any) => {}, // v-ref
      rules: [] | object, // form rules
      modifier: string | ((val: any) => any),
      onClick: () => {}, // event
      // default set prop slot
    }
  ],
  options: {},
}
```

```js
// z-table
const config = {
  searchFormModel: {},
  tableColumns: [
    {
      label: string,
      prop: string, // support path set
      searchForm: {}, // form column
    }
  ],
  options: {}, // options
  pagination: {}, // pagination component
  request: {}, // async request
}
```

```js
// z-crud
const config = {
  searchFormData: {},
  operateFormData: {},
  tableColumns: [
    {
      label: string,
      prop: string, // support path set
      searchForm: {}, // form column
    }
  ],
  operate: {
    columns: []
  },
  add: {
    columns: [],
  },
  edit: {
    columns: []
  },
  detail: {
    columns: []
  },
  options: {}, // options
  pagination: {}, // pagination component
  request: {}, // async request
}
```
