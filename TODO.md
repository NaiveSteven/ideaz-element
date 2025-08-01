# PLAN

## FEATURE（new component）

1. ~~添加公共组件`z-row`、`z-col`~~
2. 添加布局组件`z-layout`
3. ~~添加导航栏组件`z-guide`（基于`tag`组件~~
4. 大数据表格
5. ~~添加`z-filter-form`组件~~
6. ~~添加`z-check-card`组件~~
7. 添加`z-tree-select`组件
8. 添加`z-menu`组件
9. 添加`z-breadcrumb`组件
10. 添加`z-status`组件，支持`success`、`error`、`warning`、`info`等状态，结合`z-table`组件

## FEATURE（new function）

1. 表格数据源可以添加`status`字段，判断状态
2. 表单支持拖拽
3. 表单支持接口配置
4. ~~表格数据和表格头支持拖拽~~
5. 表格项`column`中可以直接配置`编辑、新增`表单
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
25. ~~`z-table`支持`editable`~~
26. ~~`z-table`表格头支持`tooltip`~~
27. ~~`z-table`的`editable`支持保存时校验配置~~
28. ~~`z-table`的`editable`支持新增~~
29. ~~`z-table`的`editable`支持全量编辑~~
30. ~~`z-table`的`editable`支持操作项自定义~~
31. ~~`z-table`的`button`支持`dropdown`~~
32. ~~`z-table`的`button`点击事件都改为`onClick`~~
33. ~~`z-table`的`isDisabled`改为`disabled`~~
34. ~~`TableButton`组件代码优化~~
35. ~~`z-table`组件的`toolbar`更改（代码重写，功能修改和新增）~~
36. ~~`z-table`的`disabled`、`onClick`事件传递参数统一~~
37. ~~`z-table`支持`watermark`~~
38. ~~`z-crud`支持缓存~~
39. ~~`z-crud`支持`request`~~
40. ~~`z-crud`支持编辑、新增、查看和删除配置~~
41. ~~`z-table`支持数据项排列~~
42. ~~`z-crud`支持`selection`提示~~
43. `z-crud`编辑、新增、查看和删除支持接口和非接口配置
44. `z-crud`事件梳理，例如：`editable`下的事件和`crud`的事件
45. ~~添加`z-dialog`组件~~
46. ~~`z-dialog`组件支持`info`、`danger`、`warning`等`type`~~
47. ~~`z-dialog`组件`loading`等`props`命名~~
48. ~~`z-crud`组件`editable`事件内置~~
49. `z-crud`、`z-table`等组件`size`统一规划
50. ~~`z-crud`、`z-table`等组件按钮加上`icon`~~
51. `z-crud`增删改查支持自定义
52. ~~`z-table`全屏提示切换~~
53. ~~`z-crud`支持`alert`配置~~
54. ~~`z-crud`的`pagination`优化~~
55. ~~`z-crud`的`tableData`优化~~
56. ~~`z-crud`支持外部让表格`loading`~~
57. `z-form`支持逻辑联动，例如：被`hide`隐藏起来的元素，接口提交时不提交
58. ~~`z-form`的`hide`等内置功能，支持`formData`传入~~
59. `z-crud`纯前端分页和筛选
60. `z-crud`前端分页未向上抛出数据，`v-model:data`此时会失效
61. `z-table`的`pagination`支持位置调整
62. ~~`z-form`的`OperationCard`组件`size`适配~~
63. ~~`z-table`数据项拖拽添加把手~~
64. ~~`z-filter-form`操作按钮逻辑内置~~
65. ~~`z-filter-form`的查询和重置按钮支持属性配置~~
66. ~~`z-filter-form`的操作按钮支持`render`函数自定义~~
67. ~~`z-form`的`colon`支持`column`中直接配置~~
68. ~~`z-form`的`type`为`group`时，支持在`column`中配置`content-position`和`border-style`等属性~~
69. ~~`z-form`的`type`为`group`时，支持`label`自定义`slot`和`render`函数配置~~
70. ~~`z-form`的`type`为`step`时，按钮支持自定义~~
71. ~~`z-table`的`reference`支持`render`函数自定义`~~
72. ~~`z-table`的`column`的`type`为`expand`时，支持`render`函数和默认配置`expand`插槽~~
73. ~~`z-table`支持`renderHeader`自定义表格头~~
74. ~~`z-table`的`draggable`添加事件~~
75. ~~`z-table`的`editable`支持布尔值~~
76. ~~`z-table`的`editable`删除时添加二次确认~~
77. ~~`z-table`的`maxLength`放到`editable`中~~
78. `z-table`的`hide`文档需要添加复杂的`slots`示例和`render`函数示例
79. `z-table`的可编辑表格校验示例，表格配置
80. ~~`z-dialog`的`import`导入`ts`提示优化~~
81. 所有组件的`label`、`tittle`等属性都通过方法支持`slot`和`render`函数
82. ~~`z-form`的`form`去除无用`attributes`~~
83. ~~`z-table`支持`columns`动态导入~~
84. ~~`z-tag-select`支持`title`自定义~~
85. `z-tag-select`支持不展开
86. ~~`z-radio`支持取消选中~~
87. ~~`z-form`的`column`支持直接配置`class`和`style`~~
88. ~~`z-form`可折叠支持配置默认展开~~
89. ~~`z-form`文档优化（事件、`step`等）~~
90. ~~优化`z-form`的`array`表单类型，操作按钮类名~~
91. ~~`z-table`的`header`自定义处理~~
92. ~~`z-table`的`options`报错问题~~
93. ~~`z-dialog`的`footer`优化~~
94. ~~`z-table`数据翻页处理，如：`editable`~
95. ~~修复`z-table`动态导入，`checkbox`没有选中的问题~~
96. ~~`z-table`在`editable`模式下，输入会频繁刷新问题~~
97. ~~`z-table`行拖拽添加条件~~
98. ~~`z-dialog`的`onConfirm`等方法的`confirmBtnLoading`等参数名优化~~
99. `z-crud`的表单校验规则配置
100. ~~`z-crud`操作按钮权限~~
101. ~~`z-crud`接口支持参数自定义~~
102. ~~`z-table`前端分页优化~~
103. ~~`z-table`的`row-key`处理，`editApi`等~~
104. `z-crud`表单数据处理，`addFormData`和`editFormData`
105. ~~`z-crud`编辑查看处理~~
106. ~~`z-crud`水印问题~~
107. `z-crud`操作项`action`和`add`等属性逻辑关联处理问题
108. ~~`z-crud`的`editDetail`支持自定义参数（已移除）~~
109. ~~`z-crud`的`transformEditDetail`优化（已移除）~~
110. ~~`z-crud`的`add`、`edit`等属性为`false`时，关闭操作列~~
111. ~~`vite`打包配置~~
112. 多语言配置（切换等）
113. `z-form`的`id`和`class`属性配置
114. 组件的`size`问题处理
115. ~~`z-crud`组件插槽布局优化：`form-top`、`form-bottom`、`crud-mid`、`toolbar-top`、`toolbar-right`、`toolbar-bottom`、`toolbar-left`、`table-top`、`table-bottom`、`pagination-top`、`pagination-right`、`pagination-bottom`、`pagination-left`~~
116. `z-table`支持默认插槽、支持模板配置
117. ~~`z-form`组件代码优化，抽取组件（暂不抽取）~~
118. ~~`z-form`组件`component`字段支持直接传入组件~~
119. ~~`z-table`组件`column`项的`click`、`hide`、`disabled`、`render`等属性支持参数统一~~
120. `z-crud`组件文档优化，添加普通属性文档、插槽文档等
121. 组件内部写法`-`改为大驼峰
122. `z-table`的按钮类型操作项支持按钮单个自定义
123. 组件插槽都支持`slot`和`render`函数
124. ~~`z-table`等组件查询时，表单禁用（暂时不添加）~~
125. ~~`z-table`支持`title`~~
126. ~~`z-table`组件`column`配置项优化（目前仍是使用`type`、`attrs`等属性）~~
127. ~~`z-input`和`z-select`组件方法按官方更新~~
128. ~~`z-select`组件`props`优化~~
129. ~~`z-form`组件`extra`和`error`冲突问题（`z-crud`和`z-filter-form`组件不允许使用`extra`，优化`errorMessage`位置）~~
130. ~~`z-form`组件数组表单表单项无法配置`tooltip`等属性问题~~
131. ~~`z-table`按钮`onClick`、`disabled`等属性参数统一~~
132. ~~`z-table`的`column`项的`component`支持传入组件~~
133. ~~`z-table`的`editable`模式下，清空选择或输入框数据，行数据未更新~~
134. ~~`z-crud`文档同步更新（参数、类型等`z-table`修改）~~
135. ~~`z-form`组件数组表单插槽配置问题~~
136. `z-form`的`form item`支持`help`字段
137. ~~`z-table`操作列配置固定格式，如：`width`、`fixed`等，且`width`根据操作按钮个数动态计算~~
138. ~~`z-crud`新增按钮和批量删除按钮不显示问题~~
139. ~~`z-crud`和`z-table`文档表格翻页使用接口数据真实翻页~~
140. ~~`z-crud`支持删除确认后步骤自定义~~
141. ~~`z-crud`弹窗打开，执行自定义方法，如果是编辑，需要传递`rowData`、`form`等参数，如果是新增，需要传递`form`等参数~~
142. ~~`z-crud`弹窗关闭，执行自定义方法，需要传递`form`等参数~~
143. ~~`z-crud`弹窗打开，数据未清空问题~~
144. ~~`z-crud`删除事件参数优化~~
145. ~~`z-crud`的`editDetail Api`命名~~
146. ~~`z-crud`的`deleteApi`、`addApi`等接口方法，方法参数和自定义`params`功能重复~~
147. ~~`z-crud`和`z-table`文档`Api`参数使用详细类型而不是`any`~~
148. ~~`z-select`、`z-checkbox`等组件`render`方法参数统一优化~~
149. ~~修复`z-crud`最后一个数据`hide`时，重置会失效的问题~~
150. ~~`z-table`的`tableCol`类型优化~~
151. ~~`z-table`的`editable`模式`onCancel`、`onSave`等参数和文档优化~~
152. ~~`z-table`的`editable`的`multiple`模式问题~~
153. ~~`z-table`的`slot`处理以及相关文档和测试文件~~
154. ~~`z-crud`的`cancel`事件处理~~
155. ~~`z-table`的全屏修复~~
156. ~~`z-table`的`toolBar`支持单个不展示~~
157. ~~`row`和`col`的样式文件删除~~
158. ~~`column`项支持使用`v-show`显隐~~
159. ~~数组表单操作项支持自定义~~
160. `z-table`支持合并同类项
161. ~~`z-crud`默认操作项支持禁用~~
162. `z-crud`删除支持删除弹窗内容自定义
163. ~~`z-crud`查看抽屉支持查看按钮后续逻辑自定义~~
164. ~~`z-crud`查看抽屉文档优化~~
165. `z-table`和`z-form`的提示支持关联内容自定义
166. `z-form`表单提交过滤`hide`和`show`等配置不展示的字段
167. `array-form`表单结构思考是否可以优化
168. 打包样式分包问题
169. `z-table`虚拟滚动
     1201_3z0x8etu5vvckcr

## FEATURE

## LONG_TERM FEATURE

1. ~~更换`vitepress`模板，目前的`vitepress`模板问题较多~~
2. ~~`z-crud`的`default-key`相关处理~~
3. ~~样式文件包含过多不需要的`element-plus`的样式代码，需要精简~~
4. 文档`mock`数据内容修改
5. `ToolBar`组件重构

## FIX

1. `Vue2`中日期组件`icon`会造成排序错乱问题
2. `z-text`组件在`vitepress`文档中的折行不正确问题
3. ~~`z-check-card`组件修复`inject`报错问题~~
4. ~~`z-crud`表单输入一个字符，刷新两次问题~~
5. ~~`z-crud`表单底部和顶部高度不对称问题~~
6. ~~`z-dialog`导入方式组件关闭销毁问题~~
7. ~~修复`z-crud`全屏问题~~
8. ~~修复`z-filter-form`的`placeholder`问题~~
9. ~~修复`z-filter-form`校验`message`错误问题~~
10. ~~修复`z-filter-form`的`hide`导致布局错误问题~~
11. ~~修复`z-form`的`type`为`collapse`时，点击跳转问题（等待`element-plus`修复）~~
12. ~~修复`z-table`的`z-table-tool-bar--top-bottom`多余`margin-bottom`~~
13. ~~优化`z-table`的操作按钮和`dropdown`同时出现时的布局问题~~
14. ~~修复`z-table`的`editable`模式和`type`冲突问题~~
15. ~~修复`z-table`的`selection-change`和`radio-change`持续调用问题~~
16. ~~修复`z-table`的`editable`选择器无法编辑问题~~
17. ~~`z-crud`刷新未重置`checkbox`等选中状态~~

## Long Time

1. 统一`slot`和`render`参数问题
2. 引入路径问题，将`element`包中的所有东西都导出

## FEATURE（docs and dts）

1. ~~`check-card`组件文档、`dts`文件~~
2. ~~`checkbox`组件文档、`dts`文件~~
3. ~~`col`、`row`组件文档、`dts`文件~~
4. ~~`description`组件文档、`dts`文件~~
5. ~~`form`组件文档、`dts`文件~~
6. ~~`input`组件文档、`dts`文件~~
7. ~~`radio`组件文档、`dts`文件~~
8. ~~`select`组件文档、`dts`文件~~
9. ~~`table`组件文档、`dts`文件~~
10. ~~`tag-select`组件文档、`dts`文件~~
11. ~~`text`组件文档、`dts`文件~~
12. ~~`watermark`组件文档、`dts`文件~~
13. `crud`组件文档、`dts`文件
14. ~~`dialog`组件文档、`dts`文件~~
15. ~~`full-screen`组件文档~~

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
      ref: (c) => {}, // v-ref
      rules: [] | object, // form rules
      modifier: string | (val => any),
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
      search: {},
      form: {}, // add , edit and search common config
      add: {},
      edit: {},
      detail: true, // true or false
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
