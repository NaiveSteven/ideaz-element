<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { computed, ref } from 'vue'

interface RowData {
  id: number
  name: string
  email: string
  department: string
  position: string
  salary: number
  status: string
}

// 生成测试数据
function generateData(count: number): RowData[] {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '冯一', '陈二']
  const departments = ['技术部', '产品部', '设计部', '运营部', '市场部']
  const positions = ['工程师', '产品经理', '设计师', '运营专员', '市场专员']
  const statuses = ['在职', '离职', '试用期']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      email: `user${i + 1}@example.com`,
      department: departments[i % departments.length],
      position: positions[i % positions.length],
      salary: Math.floor(Math.random() * 50000) + 8000,
      status: statuses[i % statuses.length],
    })
  }
  return data
}

const tableData = ref<RowData[]>(generateData(2000))
const selectedRows = ref<RowData[]>([])

const columns = ref([
  {
    type: 'selection',
    label: '选择',
  },
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'email',
    label: '邮箱',
  },
  {
    prop: 'department',
    label: '部门',
  },
  {
    prop: 'position',
    label: '职位',
  },
  {
    prop: 'salary',
    label: '薪资',
    render: ({ row }: any) => `¥${row.salary.toLocaleString()}`,
  },
  {
    prop: 'status',
    label: '状态',
  },
])

// 虚拟滚动配置
const virtualConfig = computed(() => ({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
}))

const tableRef = ref()

function handleSelectionChange(selection: RowData[]) {
  console.log('选择变化:', selection)
  selectedRows.value = selection
}

function selectAll() {
  tableRef.value?.toggleAllSelection()
}

function clearSelection() {
  tableRef.value?.clearSelection()
  selectedRows.value = []
}

function selectFirst10() {
  clearSelection()
  for (let i = 0; i < Math.min(10, tableData.value.length); i++) {
    tableRef.value?.toggleRowSelection(tableData.value[i], true)
  }
}

function selectHighSalary() {
  clearSelection()
  const highSalaryRows = tableData.value.filter(row => row.salary > 30000)
  highSalaryRows.forEach(row => {
    tableRef.value?.toggleRowSelection(row, true)
  })
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h3>虚拟表格选择功能演示</h3>
      <p style="margin: 8px 0; color: #666;">
        虚拟表格完全支持多选功能，支持全选、清空选择、以及各种选择操作。
      </p>

      <el-space wrap>
        <el-button @click="selectAll" type="primary">
          全选
        </el-button>
        <el-button @click="clearSelection" type="warning">
          清空选择
        </el-button>
        <el-button @click="selectFirst10" type="success">
          选择前10条
        </el-button>
        <el-button @click="selectHighSalary" type="info">
          选择高薪人员(>3万)
        </el-button>
        <span style="color: #666;">已选择: {{ selectedRows.length }} 项</span>
      </el-space>
    </div>

    <z-table
      ref="tableRef"
      v-model:data="tableData"
      :columns="columns"
      :virtual="virtualConfig"
      height="500px"
      border
      stripe
      @selection-change="handleSelectionChange"
    />

         <div v-if="selectedRows.length > 0" style="padding: 16px; margin-top: 16px; background: #f5f7fa; border-radius: 4px;">
       <h4 style="margin: 0 0 8px; color: #303133;">已选择的数据 ({{ selectedRows.length }}条):</h4>
       <div style="max-height: 200px; overflow-y: auto;">
         <div
           v-for="row in selectedRows"
           :key="row.id"
           style="
             display: flex;
             align-items: center;
             justify-content: space-between;
             padding: 8px;
             margin-bottom: 4px;
             background: white;
             border: 1px solid #e4e7ed;
             border-radius: 4px;
           "
        >
          <span><strong>{{ row.name }}</strong> ({{ row.email }})</span>
          <span style="color: #67c23a;">¥{{ row.salary.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
