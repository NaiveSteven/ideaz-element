<template>
  <div>
    <h3>虚拟表格 - 索引列</h3>

    <div style="margin-bottom: 16px;">
      <el-space>
        <el-button @click="togglePagination">
          {{ pagination ? '关闭分页' : '开启分页' }}
        </el-button>
        <el-button @click="changeStartIndex">
          切换起始索引: {{ currentStartIndex }}
        </el-button>
      </el-space>
    </div>

    <el-alert
      title="✅ 索引列功能已完成"
      type="success"
      :closable="false"
      style="margin-bottom: 16px;"
    >
      <template #default>
        <p><strong>✅ 索引列支持</strong>：完全支持 <code>type: 'index'</code> 列配置</p>
        <p><strong>✅ 自定义索引</strong>：支持自定义起始索引和索引函数</p>
        <p><strong>✅ 分页兼容</strong>：支持分页情况下的索引计算</p>
        <p><strong>✅ 函数索引</strong>：支持通过函数自定义索引显示逻辑</p>
      </template>
    </el-alert>

    <z-table
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      :pagination="pagination"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="500px"
      border
      stripe
      row-key="id"
    />

    <div style="margin-top: 16px;">
      <h4>功能说明：</h4>
      <ul>
        <li>默认索引：从1开始递增</li>
        <li>自定义起始索引：可以指定起始数字</li>
        <li>函数索引：可以通过函数自定义索引逻辑</li>
        <li>分页支持：分页时索引会自动考虑页码偏移</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue'

// 生成测试数据
function generateData() {
  const data = []
  for (let i = 1; i <= 2000; i++) {
    data.push({
      id: i,
      name: `用户 ${i}`,
      email: `user${i}@example.com`,
      age: 20 + (i % 50),
      department: ['技术部', '市场部', '产品部', '运营部'][i % 4],
      salary: 5000 + (i % 100) * 100,
      status: i % 3 === 0 ? 'active' : 'inactive',
    })
  }
  return data
}

const tableData = ref(generateData())
const tableRef = ref()
const currentStartIndex = ref(1)
const hasPagination = ref(false)

// 分页配置
const pagination = computed(() => {
  if (!hasPagination.value) return false
  return {
    page: 1,
    pageSize: 50,
    total: tableData.value.length,
    align: 'right'
  }
})

// 列配置 - 包含不同类型的索引列
const columns = computed(() => [
  {
    type: 'index',
    label: '序号',
    width: 80,
    index: currentStartIndex.value // 自定义起始索引
  },
  {
    type: 'index',
    label: '自定义',
    width: 100,
    index: (index: number) => `NO.${String(index + 1).padStart(4, '0')}` // 函数索引
  },
  {
    prop: 'id',
    label: 'ID',
    width: 80
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120
  },
  {
    prop: 'email',
    label: '邮箱',
    width: 200
  },
  {
    prop: 'age',
    label: '年龄',
    width: 80
  },
  {
    prop: 'department',
    label: '部门',
    width: 120
  },
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
    render: ({ row }: any) => `¥${row.salary.toLocaleString()}`
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    render: ({ row }: any) => (
      row.status === 'active'
        ? h('span', { style: { color: '#67C23A' } }, '活跃')
        : h('span', { style: { color: '#E6A23C' } }, '非活跃')
    )
  }
])

// 切换分页
function togglePagination() {
  hasPagination.value = !hasPagination.value
}

// 切换起始索引
function changeStartIndex() {
  const indexes = [1, 10, 100, 1000]
  const currentIndex = indexes.indexOf(currentStartIndex.value)
  const nextIndex = (currentIndex + 1) % indexes.length
  currentStartIndex.value = indexes[nextIndex]
}
</script>

<style scoped>
ul {
  padding-left: 20px;
  margin: 0;
}

li {
  margin: 4px 0;
}
</style>
