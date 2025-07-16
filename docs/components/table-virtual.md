# Z-Table 虚拟滚动功能


## 📚 概述

Z-Table 组件现在支持基于 Element Plus TableV2 的虚拟滚动功能，可以高效处理大量数据，提供流畅的用户体验。

### 🚀 核心特性

- **高性能渲染**: 基于 Element Plus TableV2，支持 10 万+ 数据流畅滚动
- **智能切换**: 自动或手动在普通表格和虚拟表格间切换
- **完整功能**: 支持排序、固定列、多选等核心表格功能
- **样式一致**: 保持与原表格相同的视觉体验
- **极致性能**: DOM 节点数量恒定，内存占用稳定

### ✅ 兼容性说明

- **完全兼容**: 排序、筛选、多选、选择功能、展开功能、索引列、固定列、样式主题、列显隐、列提示、水印功能
- **高级功能**: 可编辑表格、自定义列渲染、自定义表头、插槽模板
- **API 一致**: 与普通表格相同的 props 和事件
- **渐进增强**: 可在运行时动态开启/关闭

## 🚀 快速开始

### 三步启用虚拟滚动

```vue
<!-- 步骤1: 添加 virtual 属性 -->
<!-- 步骤2: 设置固定高度 -->
<!-- 步骤3: 配置列信息 -->
<z-table
  :data="largeData"
  :columns="columns"
  :virtual="true"
  height="400px"
/>
```

### 基础配置示例

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
// 列配置无需指定 width，系统会自动处理
const columns = [
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
  { prop: 'department', label: '部门' }
]
</script>
```

### 高级配置示例

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
  itemHeight: 48,        // 行高度
  threshold: 100,        // 启用阈值
  footerHeight: 60       // Footer 高度
}
</script>
```

## 🎯 基础功能

### 基础表格

基础的虚拟表格功能，包含分页、刷新等常用操作。支持大量数据的高效渲染。

<preview path="../demo/table/virtual-normal.vue" />

### 操作按钮

验证操作按钮在虚拟表格中的完整功能，包括点击事件、样式等。

<preview path="../demo/table/virtual-operation.vue" />


## 🏛️ 列类型功能

### 列类型支持

测试各种列类型在虚拟表格中的兼容性：选择列、索引列、表单组件等。

<preview path="../demo/table/virtual-column-type.vue" />

### 选择功能

测试 `type: 'selection'` 列在虚拟表格中的支持情况。

**功能特点：**
- ✅ 多选支持
- ✅ 全选/取消全选
- ✅ 选中状态回调
- ✅ 禁用状态支持

<preview path="../demo/table/virtual-selection.vue" />

### 展开功能

虚拟表格完全支持展开功能，基于Element Plus TableV2原生能力。

**功能特点：**
- ✅ **展开列配置**：`{ type: 'expand' }` 列配置，TableV2自动为有children的行添加展开按钮
- ✅ **双向绑定**：`v-model:expanded-row-keys` 支持双向绑定展开状态
- ✅ **事件支持**：`@expand-change`、`@row-expand` 事件 (TableV2原生事件)
- ✅ **方法支持**：`toggleRowExpansion` 方法
- ✅ **插槽支持**：`#expand` 插槽自定义展开内容
- ✅ **数据结构**：支持children字段的嵌套数据结构

<preview path="../demo/table/virtual-expand.vue" />

### 索引列

虚拟表格完全支持索引列功能。

**功能特点：**
- ✅ **索引列配置**：`{ type: 'index' }` 列配置
- ✅ **自定义起始索引**：支持数字类型的index属性
- ✅ **函数索引**：支持函数类型的index属性自定义显示逻辑
- ✅ **分页兼容**：自动处理分页情况下的索引偏移
- ✅ **高性能**：虚拟滚动下的索引列渲染优化

<preview path="../demo/table/virtual-index.vue" />

## 🔧 高级功能

### 可编辑表格

测试大数据量下的表格编辑功能，支持多种表单组件。

**支持的组件：**
- 📝 输入框 (input)
- 🎯 选择器 (select)
- 🔢 数字输入框 (input-number)
- 📅 日期选择器 (date-picker)

<preview path="../demo/table/virtual-editable.vue" />

### 列显隐功能

测试动态显示和隐藏列的功能，支持函数式和静态配置。

**功能特点：**
- 🔄 动态显示/隐藏列
- 🎯 函数式配置：`hide: () => boolean`
- 🔧 静态配置：`hide: boolean`
- 📊 实时响应状态变化

<preview path="../demo/table/virtual-hide.vue" />

### 列提示功能

虚拟表格完全支持表头tooltip功能，与z-table普通表格的tooltip实现保持一致。

**功能特点：**
- ✅ **字符串提示**：`tooltip: '提示内容'`
- ✅ **函数提示**：`tooltip: (scope) => '动态内容'`，支持传递scope参数
- ✅ **对象配置**：`tooltip: { content: '内容', placement: 'top', effect: 'dark' }`
- ✅ **样式一致**：与普通表格的tooltip样式和交互完全一致
- ✅ **完整兼容**：支持useTableColumnSlots中的所有tooltip配置选项
- ✅ **性能优化**：修复了表头抖动和Vue警告问题

<preview path="../demo/table/virtual-tooltip.vue" />

### 水印功能

虚拟表格完全兼容z-table组件的水印功能。

**功能特点：**
- ✅ **字符串水印**：直接传入字符串作为水印内容
- ✅ **对象水印**：传入配置对象，自定义水印的字体、颜色、角度、间距等
- ✅ **动态切换**：支持运行时动态开启/关闭/修改水印
- ✅ **虚拟滚动兼容**：水印在虚拟滚动表格中正常显示，不影响性能
- ✅ **样式一致**：与普通表格的水印效果完全一致

<preview path="../demo/table/virtual-watermark.vue" />

### Footer 底部功能

虚拟表格完全支持 Element Plus TableV2 的 footer 功能。

**功能特点：**
- ✅ **Footer 插槽**：通过 `#footer` 插槽自定义底部内容
- ✅ **高度配置**：通过 `virtual.footerHeight` 配置 footer 区域高度
- ✅ **动态控制**：支持运行时动态显示/隐藏 footer
- ✅ **样式自定义**：完全支持 CSS 样式自定义，支持渐变背景等
- ✅ **统计功能**：适合展示数据统计、汇总信息等
- ✅ **操作区域**：可放置导出、生成报告等操作按钮

<preview path="../demo/table/virtual-footer.vue" />

## 🎨 自定义功能

### 自定义列渲染

验证列内容的自定义渲染，支持render函数和slot插槽两种方式。

**支持方式：**
- 🎯 **Render 函数**：灵活的渲染函数支持
- 🎰 **Slot 插槽**：Vue 原生插槽支持
- 🎨 **复杂组件**：支持嵌套复杂组件
- 🖱️ **交互功能**：支持点击、悬浮等交互

<preview path="../demo/table/virtual-custom-column.vue" />

### 自定义表头

测试表头的自定义功能，包括图标、徽章、下拉菜单等交互元素。

**支持功能：**
- 🎯 **图标支持**：表头图标展示
- 🏷️ **徽章支持**：动态徽章展示
- 📝 **提示信息**：表头提示支持
- 🎛️ **下拉菜单**：表头操作菜单
- 🎨 **样式自定义**：完整的样式定制能力

<preview path="../demo/table/virtual-custom-header.vue" />

## 🔍 开发调试

### 方法和事件测试

测试表格的各种方法调用和事件处理。

**测试内容：**
- 📞 **方法调用**：包括虚拟滚动专用的 `scrollToRow` 方法
- 📡 **事件处理**：完整的事件处理测试
- 🎯 **滚动定位**：精确的滚动定位功能
- 🔄 **状态管理**：表格状态管理测试

<preview path="../demo/table/virtual-methods.vue" />

### 性能测试

提供可配置的性能测试工具，可以测试不同数据量下的表现。

**测试功能：**
- 📊 **数据量测试**：可配置不同数据量进行测试
- 🖥️ **内存监控**：监控内存使用情况
- ⚡ **渲染性能**：测试渲染性能指标
- 📈 **性能对比**：虚拟滚动与普通表格的性能对比

<preview path="../demo/table/virtual-performance.vue" />

### 综合功能测试

集成所有高级功能的综合测试示例。

<preview path="../demo/table/virtual-advanced.vue" />

## 📖 配置参考

### 配置选项

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enabled` | `boolean` | `false` | 是否启用虚拟滚动 |
| `itemHeight` | `number` | `48` | 每行固定高度(px) |
| `estimatedRowHeight` | `number` | `48` | 动态高度时的预估行高 |
| `threshold` | `number` | `100` | 数据量超过此值自动启用 |
| `footerHeight` | `number` | `50` | Footer 区域高度(px) |

### API 方法

#### 虚拟滚动专用方法

```javascript
// 滚动到指定位置
tableRef.value.scrollTo({
  scrollTop: 1000,
  scrollLeft: 200
})

// 滚动到指定行
tableRef.value.scrollToRow(500, 'center')
```

#### 通用表格方法

所有原有的表格方法在虚拟模式下依然可用：

```javascript
// 设置当前行
tableRef.value.setCurrentRow(row)

// 切换行选择
tableRef.value.toggleRowSelection(row, true)

// 清空选择
tableRef.value.clearSelection()

// 排序
tableRef.value.sort('column', 'ascending')
```

### 性能对比

| 数据量 | 普通表格 | 虚拟表格 | 性能提升 |
|-------|---------|---------|---------|
| 1,000 行 | 正常 | 正常 | - |
| 10,000 行 | 较慢 | 流畅 | 10x |
| 50,000 行 | 卡顿 | 流畅 | 50x |
| 100,000 行 | 不可用 | 流畅 | 100x+ |

### 使用建议

#### 🎯 何时使用虚拟滚动

- ✅ 数据量 > 1000 条
- ✅ 需要一次性展示所有数据
- ✅ 用户需要快速浏览和定位
- ✅ 性能敏感的应用场景

#### ⚠️ 注意事项

1. **固定高度要求**:
   - ✅ 必须设置 `height` 属性
   - ❌ 不支持动态行高

2. **数据结构要求**:
   - ✅ 支持普通对象数组
   - ✅ 支持嵌套属性访问
   - ❌ 不支持复杂树形数据结构

3. **功能兼容性**:
   - ✅ 完全兼容: 排序、分页、操作按钮、列显隐、列提示、可编辑表格、选择功能、展开功能、索引列、水印功能、Footer 底部区域
   - ✅ 自定义功能: 列内容渲染、表头渲染、插槽模板
   - ⚠️ 部分兼容: 复杂的嵌套组件、动态行高
   - ❌ 不支持: 行合并、复杂树形数据

4. **性能优化建议**:
   - 💡 数据量 > 1000 条时启用
   - 💡 避免在列中使用过于复杂的组件
   - 💡 建议配合分页使用
   - 💡 列配置无需手动指定 width，系统自动处理

## 🎉 完整示例

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <ElSpace>
        <ElButton @click="toggleVirtual">
          {{ virtualEnabled ? '禁用' : '启用' }}虚拟滚动
        </ElButton>
        <ElButton @click="generateData(50000)">
          生成 50,000 条数据
        </ElButton>
        <ElButton @click="scrollToMiddle">
          滚动到中间
        </ElButton>
      </ElSpace>
    </div>

    <ZTable
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      :virtual="virtualEnabled ? virtualConfig : false"
      height="600px"
      stripe
      border
      @sort-change="handleSort"
    >
      <!-- Footer 插槽示例 -->
      <template #footer>
        <div style="
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          color: white;
        ">
          <div>总计：{{ tableData.length }} 条数据</div>
          <div>
            <ElButton type="primary" size="small">导出数据</ElButton>
            <ElButton type="success" size="small">生成报告</ElButton>
          </div>
        </div>
      </template>
    </ZTable>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const tableRef = ref()
const virtualEnabled = ref(true)
const tableData = ref([])

const virtualConfig = reactive({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
  footerHeight: 60  // 设置 footer 高度
})

// 列配置 - 无需手动指定 width
const columns = [
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' },
  { prop: 'email', label: '邮箱' },
  { prop: 'department', label: '部门' }
]

function generateData(count) {
  const data = []
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `用户${i}`,
      email: `user${i}@example.com`,
      department: '技术部'
    })
  }
  tableData.value = data
}

function toggleVirtual() {
  virtualEnabled.value = !virtualEnabled.value
}

function scrollToMiddle() {
  const middleIndex = Math.floor(tableData.value.length / 2)
  tableRef.value?.scrollToRow(middleIndex)
}

function handleSort(sortInfo) {
  console.log('排序:', sortInfo)
}

// 初始化数据
generateData(50000)
</script>
```

## 🔧 技术实现

虚拟滚动基于 Element Plus 的 TableV2 组件实现：

1. **条件渲染**: 根据 `virtual` 配置自动切换渲染模式
2. **列配置转换**: 自动将普通表格列配置转换为 TableV2 格式
3. **事件桥接**: 统一表格事件，保证 API 一致性
4. **方法代理**: 透明代理所有表格方法到对应实现
5. **样式继承**: 继承原表格的主题和样式配置
6. **自适应布局**: 自动处理列宽分配，无需手动指定 width

这种设计确保了最大的兼容性和最小的迁移成本，同时提供了优秀的开发体验。
