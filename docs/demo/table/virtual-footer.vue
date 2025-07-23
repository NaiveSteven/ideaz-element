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

// 生成测试数据
function generateData(count: number): RowData[] {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '冯一', '陈二']
  const departments = ['技术部', '产品部', '设计部', '运营部', '市场部']
  const statuses = ['在职', '离职', '试用期']
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
    label: '姓名',
  },
  {
    prop: 'department',
    label: '部门',
  },
  {
    prop: 'salary',
    label: '基本工资',
    render: ({ row }: any) => `¥${row.salary.toLocaleString()}`,
  },
  {
    prop: 'bonus',
    label: '奖金',
    render: ({ row }: any) => `¥${row.bonus.toLocaleString()}`,
  },
  {
    prop: 'total',
    label: '总收入',
    render: ({ row }: any) => h('span', {
      style: { color: '#67c23a', fontWeight: 'bold' }
    }, `¥${row.total.toLocaleString()}`),
  },
  {
    prop: 'status',
    label: '状态',
    render: ({ row }: any) => h('span', {
      style: {
        color: row.status === '在职' ? '#67c23a' : row.status === '试用期' ? '#e6a23c' : '#f56c6c',
        fontWeight: 'bold'
      }
    }, row.status),
  },
])

// 计算统计数据
const statistics = computed(() => {
  const validData = tableData.value.filter(item => item.status !== '离职')
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
      <h3>虚拟表格 Footer 功能演示</h3>
      <p style="margin: 8px 0; color: #666;">
        虚拟表格支持 footer 插槽，可以在表格底部显示统计信息等内容。
      </p>

      <el-space wrap>
        <el-button @click="showFooter = !showFooter" :type="showFooter ? 'danger' : 'primary'">
          {{ showFooter ? '隐藏' : '显示' }} Footer
        </el-button>
        <el-input-number
          v-model="footerHeight"
          :min="50"
          :max="200"
          :step="10"
          controls-position="right"
          style="width: 150px;"
        />
        <span style="color: #666;">Footer 高度: {{ footerHeight }}px</span>
        <el-button @click="resetData" type="success">
          重新生成数据
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
      <!-- Footer 插槽 - 显示统计信息 -->
      <template #footer v-if="showFooter">
        <div class="table-footer">
          <div class="footer-content">
                        <div class="statistics-section">
              <div class="stat-item">
                <div class="stat-info">
                  <div class="stat-value">{{ statistics.totalEmployees }}</div>
                  <div class="stat-label">在职员工</div>
                </div>
              </div>

              <div class="divider">|</div>

              <div class="stat-item">
                <div class="stat-info">
                  <div class="stat-value">¥{{ statistics.totalSalary.toLocaleString() }}</div>
                  <div class="stat-label">总基本工资</div>
                </div>
              </div>

              <div class="divider">|</div>

              <div class="stat-item">
                <div class="stat-info">
                  <div class="stat-value">¥{{ statistics.totalBonus.toLocaleString() }}</div>
                  <div class="stat-label">总奖金</div>
                </div>
              </div>

              <div class="divider">|</div>

              <div class="stat-item">
                <div class="stat-info">
                  <div class="stat-value">¥{{ statistics.totalIncome.toLocaleString() }}</div>
                  <div class="stat-label">总收入</div>
                </div>
              </div>

              <div class="divider">|</div>

              <div class="stat-item">
                <div class="stat-info">
                  <div class="stat-value">¥{{ statistics.averageSalary.toLocaleString() }}</div>
                  <div class="stat-label">平均工资</div>
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
