# VitePress 侧边栏版本标签使用指南

## 功能介绍

此功能为 VitePress 侧边栏菜单项添加版本标签，用于标识组件在不同版本中的支持情况。

## 标签类型

目前支持以下四种类型的版本标签：

### 1. 新功能标签 (version-new)
- **样式**: 绿色背景
- **用途**: 标识新添加的组件或功能
- **示例**: `<span class="version-tag version-new">v1.0.0+</span>`

### 2. Beta 版本标签 (version-beta)
- **样式**: 橙色背景
- **用途**: 标识处于测试阶段的组件或功能
- **示例**: `<span class="version-tag version-beta">v1.1.0+</span>`

### 3. 更新功能标签 (version-updated)
- **样式**: 蓝色背景
- **用途**: 标识已更新或增强的组件
- **示例**: `<span class="version-tag version-updated">v1.0.2+</span>`

### 4. 已废弃标签 (version-deprecated)
- **样式**: 红色背景
- **用途**: 标识即将废弃或已废弃的组件
- **示例**: `<span class="version-tag version-deprecated">v1.2.0+</span>`

## 使用方法

在 `docs/.vitepress/config.ts` 文件的侧边栏配置中，直接在组件名称后添加版本标签：

```typescript
{
  text: 'Checkbox 多选框 <span class="version-tag version-new">v1.0.0+</span>',
  link: '/components/checkbox',
}
```

## 样式特性

1. **右上角显示**: 版本标签会自动浮动到菜单项的右上角位置
2. **渐变背景**: 使用现代化的渐变色背景，更加美观显眼
3. **响应式设计**: 标签在不同屏幕尺寸下都能正常显示
4. **暗色模式支持**: 自动适配 VitePress 的明暗主题切换
5. **交互效果**: 鼠标悬停时标签会有缩放和透明度变化效果
6. **阴影效果**: 添加了微妙的阴影，提升立体感

## 管理建议

1. **版本号格式**: 建议使用 `vX.X.X+` 格式，表示从该版本开始支持
2. **标签选择**:
   - 新增组件使用 `version-new`
   - 实验性功能使用 `version-beta`
   - 功能更新使用 `version-updated`
   - 即将废弃使用 `version-deprecated`
3. **定期维护**: 建议定期清理过时的版本标签，避免侧边栏过于冗余

## 自定义扩展

如需添加新的标签类型，可以在 `docs/.vitepress/theme/styles/index.scss` 中添加新的样式类：

```scss
.version-tag.version-custom {
  color: #your-color;
  background-color: #your-bg-color;
  border-color: #your-border-color;
}

/* 暗色模式 */
html.dark .version-tag.version-custom {
  color: #your-dark-color;
  background-color: #your-dark-bg-color;
  border-color: #your-dark-border-color;
}
```

## 注意事项

1. HTML 标签会被 VitePress 正确解析和渲染
2. 标签不会影响链接的正常跳转功能
3. 版本标签现在显示在菜单项的右上角，更加显眼醒目
4. 标签使用绝对定位，侧边栏项会自动预留右侧空间
5. 搜索功能仍然可以正常工作，但会包含标签文本
6. 标签在移动端会自动适配显示，保持可读性
7. 鼠标悬停时标签会有动态效果，提升用户体验
