<template>
  <div>
    <h3>Virtual Table – Watermark Support</h3>

    <div style="margin-bottom: 16px;">
      <el-space>
        <el-button @click="toggleWatermark">
          {{ currentWatermarkType === 'none' ? 'Enable string watermark' : currentWatermarkType === 'string' ? 'Switch to object watermark' : 'Disable watermark' }}
        </el-button>
        <el-text type="info">Current mode: {{ watermarkModeText }}</el-text>
      </el-space>
    </div>

    <el-alert
      title="✅ Watermarks work with virtual tables"
      type="success"
      :closable="false"
      style="margin-bottom: 16px;"
    >
      <template #default>
        <p><strong>✅ String watermark</strong>: Provide a simple string as the watermark.</p>
        <p><strong>✅ Object watermark</strong>: Configure font, color, angle, spacing, and more.</p>
        <p><strong>✅ Dynamic switching</strong>: Toggle or update the watermark at runtime.</p>
        <p><strong>✅ Virtual scroll compatible</strong>: Watermarks render correctly over virtualized content.</p>
      </template>
    </el-alert>

    <z-table
      :data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      :watermark="currentWatermark"
      height="500px"
      border
      stripe
      row-key="id"
    />

    <div style="margin-top: 16px;">
      <h4>Feature notes:</h4>
      <ul>
        <li><strong>String watermark</strong>: Supply a literal string.</li>
        <li><strong>Object watermark</strong>: Provide a configuration object.</li>
        <li><strong>Virtual scroll</strong>: Watermarks render above table rows.</li>
        <li><strong>Performance</strong>: Watermarks do not impact scrolling performance.</li>
      </ul>
    </div>

    <div style="margin-top: 16px;">
      <h4>Current configuration:</h4>
      <pre style="padding: 12px; font-size: 12px; background: #f5f7fa; border-radius: 4px;">{{ JSON.stringify(currentWatermark, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Generate mock data
function generateLargeData(count: number) {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia']
  const departments = ['Engineering', 'Product', 'Design', 'Operations', 'Marketing', 'Sales', 'HR', 'Finance']
  const data = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]} ${Math.floor(i / names.length) + 1}`,
      email: `user${i + 1}@company.com`,
      age: 22 + (i % 40),
      department: departments[i % departments.length],
      salary: 5000 + Math.floor(Math.random() * 10000),
      status: i % 3 === 0 ? 'active' : 'inactive',
      joinDate: `2023-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`
    })
  }
  return data
}

const tableData = ref(generateLargeData(2000))

const columns = ref([
  {
    type: 'selection',
  },
  {
    type: 'index',
    label: 'Index',
  },
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'email',
    label: 'Email',
  },
  {
    prop: 'age',
    label: 'Age',
  },
  {
    prop: 'department',
    label: 'Department',
  },
  {
    prop: 'salary',
    label: 'Salary',
    render: ({ row }: any) => `¥${row.salary.toLocaleString()}`
  },
  {
    prop: 'status',
    label: 'Status',
    render: ({ row }: any) => row.status === 'active' ? 'Active' : 'Inactive'
  },
  {
    prop: 'joinDate',
    label: 'Hire Date',
  }
])

// Watermark state
const currentWatermarkType = ref<'none' | 'string' | 'object'>('none')

const currentWatermark = computed(() => {
  switch (currentWatermarkType.value) {
    case 'string':
      return 'ideaz-element virtual table watermark'
    case 'object':
      return {
        content: 'ideaz-element',
        fontColor: 'rgba(0, 0, 0, 0.15)',
        rotate: -20,
        gap: [100, 100],
        offset: [50, 50]
      }
    default:
      return false
  }
})

const watermarkModeText = computed(() => {
  switch (currentWatermarkType.value) {
    case 'string':
      return 'String watermark'
    case 'object':
      return 'Object watermark'
    default:
      return 'No watermark'
  }
})

function toggleWatermark() {
  if (currentWatermarkType.value === 'none') {
    currentWatermarkType.value = 'string'
  } else if (currentWatermarkType.value === 'string') {
    currentWatermarkType.value = 'object'
  } else {
    currentWatermarkType.value = 'none'
  }
}
</script>
