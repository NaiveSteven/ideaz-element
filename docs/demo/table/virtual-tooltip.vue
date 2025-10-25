<script lang="ts" setup>
import { ref } from 'vue'

// Generate mock data
function generateData() {
  const departments = ['Engineering', 'Marketing', 'Product', 'Operations', 'Design']
  const levels = ['Junior', 'Mid-level', 'Senior', 'Principal']
  const data = []
  for (let i = 1; i <= 2000; i++) {
    data.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      age: 20 + (i % 50),
      department: departments[i % departments.length],
      salary: 5000 + (i % 100) * 100,
      level: levels[i % levels.length],
      status: i % 3 === 0 ? 'Active' : 'Departed',
      joinDate: new Date(2020 + (i % 4), (i % 12), (i % 28) + 1).toLocaleDateString(),
      performance: Math.floor(Math.random() * 100),
    })
  }
  return data
}

const tableData = ref(generateData())

// Aggregated stats
const totalUsers = tableData.value.length
const avgSalary = Math.round(tableData.value.reduce((sum, item) => sum + item.salary, 0) / totalUsers)
const departmentCount = new Set(tableData.value.map(item => item.department)).size

// Column config
const columns = [
  {
    type: 'index',
    label: 'Index',
    tooltip: 'Displays the row index starting from 1.'
  },
  {
    prop: 'name',
    label: 'User Name',
    tooltip: 'The user’s display name for identification.'
  },
  {
    prop: 'email',
    label: 'Email Address',
    tooltip: {
      content: 'User email address used for contact and notifications.',
      placement: 'bottom',
      effect: 'light'
    }
  },
  {
    prop: 'age',
    label: 'Age',
    tooltip: (scope: any) => {
      const minAge = Math.min(...tableData.value.map(item => item.age))
      const maxAge = Math.max(...tableData.value.map(item => item.age))
      return `Age range: ${minAge} - ${maxAge} (column index: ${scope.$index})`
    }
  },
  {
    prop: 'department',
    label: 'Department',
    tooltip: {
      content: (scope: any) => {
        return `There are ${departmentCount} departments (column: ${scope.column.prop}).`
      },
      placement: 'top-start',
      effect: 'dark'
    }
  },
  {
    prop: 'salary',
    label: 'Salary',
    tooltip: (scope: any) => {
      return `Average salary: ¥${avgSalary.toLocaleString()} (column index: ${scope.$index})`
    }
  },
  {
    prop: 'level',
    label: 'Level',
    tooltip: {
      content: 'Employee seniority level: junior, mid-level, senior, or principal.',
      placement: 'right',
      showAfter: 500,
      hideAfter: 100
    }
  },
  {
    prop: 'status',
    label: 'Employment Status',
    tooltip: {
      content: (scope: any) => {
        const activeCount = tableData.value.filter(item => item.status === 'Active').length
        const inactiveCount = totalUsers - activeCount
        return `Active: ${activeCount} · Departed: ${inactiveCount} (column: ${scope.column.label})`
      },
      placement: 'left',
      effect: 'light'
    }
  },
  {
    prop: 'joinDate',
    label: 'Hire Date',
    tooltip: 'Date the employee joined the company.'
  },
  {
    prop: 'performance',
    label: 'Performance Score',
    tooltip: {
      content: (scope: any) => {
        const avgPerformance = Math.round(
          tableData.value.reduce((sum, item) => sum + item.performance, 0) / totalUsers
        )
        return `Average performance: ${avgPerformance} (column index: ${scope.$index})`
      },
      placement: 'bottom-end',
      effect: 'dark',
      showAfter: 300
    }
  }
]
</script>

<template>
  <div>
    <h3>Virtual Table – Column Tooltip Demo</h3>

    <el-alert
      title="✅ Column tooltip support"
      type="success"
      :closable="false"
      style="margin-bottom: 16px;"
    >
      <template #default>
        <p><strong>✅ String tooltips</strong>: Provide a literal string as tooltip content.</p>
        <p><strong>✅ Function tooltips</strong>: Generate tooltip text dynamically with full scope access.</p>
        <p><strong>✅ Object config</strong>: Configure placement, theme, delay, and more.</p>
        <p><strong>✅ Scope payload</strong>: Functions receive <code>scope.column</code> and <code>scope.$index</code>.</p>
      </template>
    </el-alert>

    <z-table
      :data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="500px"
      border
      stripe
      row-key="id"
    />
  </div>
</template>

<style scoped>
:deep(.el-collapse-item__content) {
  padding: 12px !important;
}
</style>
