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
11. `z-form`、`z-form-item`组件支持`provide`组件属性
12. `z-tag-select`组件`options.prop`支持路径配置

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
