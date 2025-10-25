<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { computed, h, ref } from 'vue'

interface RowData {
  id: number
  name: string
  department: string
  salary: number
  bonus: number
  total: number
  status: string
}

// Generate mock data
function generateData(count: number): RowData[] {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia']
  const departments = ['Engineering', 'Product', 'Design', 'Operations', 'Marketing']
  const statuses = ['Active', 'Departed', 'Probation']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    const salary = Math.floor(Math.random() * 30000) + 8000
    const bonus = Math.floor(Math.random() * 5000) + 1000
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      department: departments[i % departments.length],
      salary,
      bonus,
      total: salary + bonus,
      status: statuses[i % statuses.length],
    })
  }
  return data
}

const tableData = ref<RowData[]>(generateData(1000))
const footerHeight = ref(80)
const showFooter = ref(true)

const columns = ref([
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'department',
    label: 'Department',
  },
  {
    prop: 'salary',
    label: 'Base Salary',
    render: ({ row }: any) => `¥${row.salary.toLocaleString()}`,
  },
  {
    prop: 'bonus',
    label: 'Bonus',
    render: ({ row }: any) => `¥${row.bonus.toLocaleString()}`,
  },
  {
    prop: 'total',
    label: 'Total Income',
    render: ({ row }: any) => h('span', {
      style: { color: '#67c23a', fontWeight: 'bold' }
    }, `¥${row.total.toLocaleString()}`),
  },
  {
    prop: 'status',
    label: 'Status',
    render: ({ row }: any) => h('span', {
      style: {
        color: row.status === 'Active' ? '#67c23a' : row.status === 'Probation' ? '#e6a23c' : '#f56c6c',
        fontWeight: 'bold'
      }
    }, row.status),
  },
])

// Aggregate stats
const statistics = computed(() => {
  const validData = tableData.value.filter(item => item.status !== 'Departed')
  return {
    totalEmployees: validData.length,
    totalSalary: validData.reduce((sum, item) => sum + item.salary, 0),
    totalBonus: validData.reduce((sum, item) => sum + item.bonus, 0),
    totalIncome: validData.reduce((sum, item) => sum + item.total, 0),
    averageSalary: Math.round(validData.reduce((sum, item) => sum + item.salary, 0) / validData.length),
  }
})

function resetData() {
  tableData.value = generateData(1000)
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h3>Virtual Table Footer Demo</h3>
      <p style="margin: 8px 0; color: #666;">
        The virtual table exposes a footer slot so you can display aggregated statistics or any custom content.
      </p>

      <el-space wrap>
        <el-button @click="showFooter = !showFooter" :type="showFooter ? 'danger' : 'primary'">
          {{ showFooter ? 'Hide' : 'Show' }} footer
        </el-button>
        <el-input-number
          v-model="footerHeight"
          :min="50"
          :max="200"
          :step="10"
          controls-position="right"
          style="width: 150px;"
        />
        <span style="color: #666;">Footer height: {{ footerHeight }}px</span>
        <el-button @click="resetData" type="success">
          Regenerate data
        </el-button>
      </el-space>
    </div>

    <z-table
      v-model:data="tableData"
      :columns="columns"
      :virtual="{
        enabled: true,
        itemHeight: 48,
        threshold: 50,
        footerHeight: showFooter ? footerHeight : 0
      }"
      height="500px"
      border
      stripe
    >
      <!-- Footer slot - statistics -->
      <template #footer v-if="showFooter">
        <div class="table-footer">
          <div class="footer-content">
                        <div class="statistics-section">
              <div class="stat-item">
                <div class="stat-info">
                  <div class="stat-value">{{ statistics.totalEmployees }}</div>
                  <div class="stat-label">Active employees</div>
                </div>
              </div>

              <div class="divider">|</div>

              <div class="stat-item">
                <div class="stat-info">
                  <div class="stat-value">¥{{ statistics.totalSalary.toLocaleString() }}</div>
                  <div class="stat-label">Total base salary</div>
                </div>
              </div>

              <div class="divider">|</div>

              <div class="stat-item">
                <div class="stat-info">
                  <div class="stat-value">¥{{ statistics.totalBonus.toLocaleString() }}</div>
                  <div class="stat-label">Total bonus</div>
                </div>
              </div>

              <div class="divider">|</div>

              <div class="stat-item">
                <div class="stat-info">
                  <div class="stat-value">¥{{ statistics.totalIncome.toLocaleString() }}</div>
                  <div class="stat-label">Total income</div>
                </div>
              </div>

              <div class="divider">|</div>

              <div class="stat-item">
                <div class="stat-info">
                  <div class="stat-value">¥{{ statistics.averageSalary.toLocaleString() }}</div>
                  <div class="stat-label">Average salary</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </z-table>
  </div>
</template>

<style scoped>
.table-footer {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.statistics-section {
  display: flex;
  gap: 16px;
  align-items: center;
}

.stat-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.divider {
  margin: 0 8px;
  font-size: 16px;
  color: rgba(255, 255, 255, 60%);
}

.stat-info {
  text-align: left;
}

.stat-value {
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
}

.stat-label {
  margin-top: 2px;
  font-size: 12px;
  opacity: 80%;
}

.action-section {
  display: flex;
  gap: 8px;
}


</style>
