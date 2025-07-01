<script lang="ts" setup>
import { h, ref } from 'vue'
import type { TableColumnScopeData } from 'ideaz-element'

interface RowData {
  id: number
  name: string
  gender: string
  age: number
  time: string
  status: string
}

// 生成大量测试数据
function generateLargeData(count: number): RowData[] {
  const names = ['Steven', 'Helen', 'Nancy', 'Jack', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
  const genders = ['male', 'female']
  const statuses = ['active', 'inactive', 'pending']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      gender: genders[i % genders.length],
      age: 18 + (i % 50),
      time: `202${(i % 4) + 0}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      status: statuses[i % statuses.length],
    })
  }
  return data
}

const tableData = ref<RowData[]>(generateLargeData(1500))

const columns = ref([
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'name',
    label: '姓名',
    width: 150,
    render: ({ row }: TableColumnScopeData<RowData>) => {
      return h('el-tag', { type: 'primary', size: 'small' }, () => row.name)
    },
  },
  {
    prop: 'gender',
    label: '性别',
    width: 120,
    slot: 'gender',
  },
  {
    prop: 'age',
    label: '年龄',
    width: 120,
    render: ({ row }: TableColumnScopeData<RowData>) => {
      const color = row.age > 30 ? '#f56c6c' : '#67c23a'
      return h('span', { style: { color } }, `${row.age}岁`)
    },
  },
  {
    prop: 'status',
    label: '状态',
    width: 120,
    slot: 'status',
  },
  {
    prop: 'time',
    label: '出生日期',
    width: 200,
  },
])
</script>

<template>
  <div>
    <h4>列自定义功能测试 (1500条数据)</h4>
    <p>支持 render 函数和 slot 两种自定义方式</p>

    <z-table
      :data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="400px"
      border
      stripe
    >
      <!-- 性别列自定义插槽 -->
      <template #gender="{ row }">
        <el-tag :type="row.gender === 'male' ? 'primary' : 'success'">
          {{ row.gender === 'male' ? '男性' : '女性' }}
        </el-tag>
      </template>

      <!-- 状态列自定义插槽 -->
      <template #status="{ row }">
        <el-badge
          :value="row.status === 'active' ? '✓' : row.status === 'pending' ? '?' : '✗'"
          :type="row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'"
        >
          {{ row.status }}
        </el-badge>
      </template>
    </z-table>
  </div>
</template>
