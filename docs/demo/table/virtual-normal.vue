<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { TableV2FixedDir } from 'element-plus'

// Generate mock data
function generateData(count: number) {
  const data = []
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      phone: `138${String(i).padStart(8, '0')}`,
      department: ['Engineering', 'Product', 'Design', 'Operations'][i % 4],
      position: ['Engineer', 'Product Manager', 'Designer', 'Operations Specialist'][i % 4],
      status: ['Active', 'Departed', 'Probation'][i % 3],
      createTime: new Date(2024, 0, 1 + (i % 365)).toLocaleDateString(),
    })
  }
  return data
}

const tableData = ref(generateData(5000))
const dataCount = ref(5000)

const columns = ref([
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'name',
    label: 'Name',
    fixed: TableV2FixedDir.LEFT
  },
  {
    prop: 'email',
    label: 'Email',
  },
  {
    prop: 'phone',
    label: 'Phone',
  },
  {
    prop: 'department',
    label: 'Department',
  },
  {
    prop: 'position',
    label: 'Position',
  },
  {
    prop: 'status',
    label: 'Status',
  },
  {
    prop: 'createTime',
    label: 'Created At',
    fixed: TableV2FixedDir.RIGHT,
  },
])

// Virtual scrolling config
const virtualConfig = computed(() => ({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
}))

function updateData() {
  tableData.value = generateData(dataCount.value)
}

function handleRefresh() {
  console.log('Refresh data')
  updateData()
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <el-space wrap>
        <span>Row count:</span>
        <el-input-number
          v-model="dataCount"
          :min="100"
          :max="50000"
          :step="1000"
          controls-position="right"
          style="width: 150px;"
        />
        <el-button @click="updateData" type="primary">
          Update data
        </el-button>
        <span style="color: #666;">Current: {{ tableData.length.toLocaleString() }} rows</span>
      </el-space>
    </div>

    <z-table
      v-model:data="tableData"
      :columns="columns"
      :virtual="virtualConfig"
      height="500px"
      border
      stripe
      @refresh="handleRefresh"
    />
  </div>
</template>
