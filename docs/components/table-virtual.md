# Z-Table 虚拟滚动功能

## 概述

Z-Table 组件现在支持基于 Element Plus TableV2 的虚拟滚动功能，可以高效处理大量数据，提供流畅的用户体验。

## 特性

### 核心功能
- 🚀 **高性能渲染**: 基于 Element Plus TableV2，支持 10 万+ 数据流畅滚动
- 🔄 **智能切换**: 自动或手动在普通表格和虚拟表格间切换
- 📊 **完整功能**: 支持排序、固定列、多选等核心表格功能
- 🎨 **样式一致**: 保持与原表格相同的视觉体验
- ⚡ **极致性能**: DOM 节点数量恒定，内存占用稳定

## 示例演示

> 💡 **使用提示**: 以下示例展示了虚拟表格的各种功能。每个示例都是独立的，可以直接复制代码使用。

### 基础虚拟滚动功能

这是最基础的虚拟滚动示例，展示了如何启用虚拟滚动并处理大数据量。

<preview path="../demo/table/virtual-scroll.vue" />

### 兼容性
- ✅ **完全兼容**: 排序、筛选、多选、选择功能、展开功能、固定列、样式主题、列显隐、列提示
- ✅ **高级功能**: 可编辑表格、自定义列渲染、自定义表头、插槽模板
- ✅ **API 一致**: 与普通表格相同的 props 和事件
- ✅ **渐进增强**: 可在运行时动态开启/关闭

### 基础功能示例

演示基础的虚拟表格功能，包含分页、刷新等常用操作。

<preview path="../demo/table/virtual-normal.vue" />

### 操作按钮兼容性

验证操作按钮在虚拟表格中的完整功能，包括点击事件、样式等。

<preview path="../demo/table/virtual-operation.vue" />

### 列类型支持

测试各种列类型在虚拟表格中的兼容性：选择列、索引列、表单组件等。

<preview path="../demo/table/virtual-column-type.vue" />

### 分页功能结合

展示分页功能与虚拟滚动的完美结合，支持大数据量的高效分页。

<preview path="../demo/table/virtual-pagination.vue" />

### 多选功能测试

验证多选、全选、选择事件等功能在虚拟表格中的正常工作。

<preview path="../demo/table/virtual-multiple.vue" />

### 选择列功能

测试 `type: 'selection'` 列在虚拟表格中的支持情况。

<preview path="../demo/table/virtual-selection.vue" />

### 展开功能

虚拟表格完全支持展开功能，基于Element Plus TableV2原生能力：

- **✅ 展开列配置**：`{ type: 'expand' }` 列配置，TableV2自动为有children的行添加展开按钮
- **✅ 双向绑定**：`v-model:expanded-row-keys` 支持双向绑定展开状态
- **✅ 事件支持**：`@expand-change`、`@row-expand` 事件 (TableV2原生事件)
- **✅ 方法支持**：`toggleRowExpansion` 方法
- **✅ 插槽支持**：`#expand` 插槽自定义展开内容
- **✅ 数据结构**：支持children字段的嵌套数据结构

<preview path="../demo/table/virtual-expand.vue" />

### 方法和事件测试

测试表格的各种方法调用和事件处理，包括虚拟滚动专用的 `scrollToRow` 方法。

<preview path="../demo/table/virtual-methods.vue" />

### 性能测试和监控

提供可配置的性能测试工具，可以测试不同数据量下的表现并监控内存使用。

<preview path="../demo/table/virtual-performance.vue" />

### 高级功能测试

#### 列显隐功能

测试动态显示和隐藏列的功能，支持函数式和静态配置。

<preview path="../demo/table/virtual-hide.vue" />

#### 列自定义渲染

验证列内容的自定义渲染，支持 render 函数和插槽两种方式。

<preview path="../demo/table/virtual-custom-column.vue" />

#### 表格头自定义

测试表头的自定义功能，包括图标、样式和交互元素。

<preview path="../demo/table/virtual-custom-header.vue" />

#### 列提示功能

验证列标题的提示信息功能，支持字符串和复杂内容。

<preview path="../demo/table/virtual-tooltip.vue" />

#### 可编辑表格

测试大数据量下的表格编辑功能，支持多种表单组件。

<preview path="../demo/table/virtual-editable.vue" />

#### 高级功能综合

集成所有高级功能的综合测试示例。

<preview path="../demo/table/virtual-advanced.vue" />

## 快速开始

> 🚀 **3步开启虚拟滚动**: 只需添加 `:virtual="true"` 和 `height` 属性即可启用虚拟滚动！

```vue
<!-- 步骤1: 添加 virtual 属性 -->
<!-- 步骤2: 设置固定高度 -->
<!-- 步骤3: 确保列配置有 width -->
<z-table
  :data="largeData"
  :columns="columns"
  :virtual="true"
  height="400px"
/>
```

## 基本用法

### 启用虚拟滚动

```vue
<template>
  <ZTable
    :data="tableData"
    :columns="columns"
    :virtual="true"
    height="600px"
  />
</template>
```

### 自定义配置

```vue
<template>
  <ZTable
    :data="tableData"
    :columns="columns"
    :virtual="virtualConfig"
    height="600px"
  />
</template>

<script>
const virtualConfig = {
  enabled: true,
  itemHeight: 48,        // 行高度
  buffer: 5,             // 缓冲区行数
  threshold: 100,        // 启用阈值
  cache: 2               // 缓存倍数
}
</script>
```

## 配置选项

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enabled` | `boolean` | `false` | 是否启用虚拟滚动 |
| `itemHeight` | `number` | `48` | 每行固定高度(px) |
| `estimatedRowHeight` | `number` | `48` | 动态高度时的预估行高 |
| `buffer` | `number` | `5` | 上下缓冲区行数 |
| `threshold` | `number` | `100` | 数据量超过此值自动启用 |
| `cache` | `number` | `2` | 缓存倍数，提升滚动性能 |

## API 方法

### 虚拟滚动专用方法

```javascript
// 滚动到指定位置
tableRef.value.scrollTo({
  scrollTop: 1000,
  scrollLeft: 200
})

// 滚动到指定行
tableRef.value.scrollToRow(500, 'center')
```

### 通用表格方法

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

## 性能对比

| 数据量 | 普通表格 | 虚拟表格 | 性能提升 |
|-------|---------|---------|---------|
| 1,000 行 | 正常 | 正常 | - |
| 10,000 行 | 较慢 | 流畅 | 10x |
| 50,000 行 | 卡顿 | 流畅 | 50x |
| 100,000 行 | 不可用 | 流畅 | 100x+ |

## 使用建议

### 何时使用虚拟滚动

- ✅ 数据量 > 1000 条
- ✅ 需要一次性展示所有数据
- ✅ 用户需要快速浏览和定位
- ✅ 性能敏感的应用场景

### 注意事项

> ⚠️ **重要提醒**: 请在使用前仔细阅读以下注意事项以确保最佳体验

1. **固定高度**:
   - ✅ 必须设置 `height` 属性
   - ✅ 建议为列设置 `width` 属性
   - ❌ 不支持动态行高

2. **数据结构**:
   - ✅ 支持普通对象数组
   - ✅ 支持嵌套属性访问
   - ❌ 不支持树形数据结构

3. **功能兼容**:
        - ✅ 完全兼容: 排序、分页、操作按钮、列显隐、列提示、可编辑表格、选择功能、展开功能
   - ✅ 自定义功能: 列内容渲染、表头渲染、插槽模板
   - ⚠️ 部分兼容: 复杂的嵌套组件、动态行高
   - ❌ 不支持: 行合并、树形数据

4. **性能优化**:
   - 💡 数据量 > 1000 条时启用
   - 💡 避免在列中使用复杂组件
   - 💡 建议配合分页使用

## 完整示例

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
    />
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
  buffer: 5,
  threshold: 100,
  cache: 2
})

const columns = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'email', label: '邮箱', width: 200 },
  { prop: 'department', label: '部门', width: 100 }
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

## 技术实现

虚拟滚动基于 Element Plus 的 TableV2 组件实现：

1. **条件渲染**: 根据 `virtual` 配置自动切换渲染模式
2. **列配置转换**: 自动将普通表格列配置转换为 TableV2 格式
3. **事件桥接**: 统一表格事件，保证 API 一致性
4. **方法代理**: 透明代理所有表格方法到对应实现
5. **样式继承**: 继承原表格的主题和样式配置

这种设计确保了最大的兼容性和最小的迁移成本。
