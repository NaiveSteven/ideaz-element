<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { computed, h, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface RowData {
  id: number
  name: string
  email: string
  department: string
  salary: number
  status: string
}

// 生成测试数据
function generateData(count: number): RowData[] {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '冯一', '陈二']
  const departments = ['技术部', '产品部', '设计部', '运营部', '市场部']
  const statuses = ['在职', '离职', '试用期']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      email: `user${i + 1}@example.com`,
      department: departments[i % departments.length],
      salary: Math.floor(Math.random() * 50000) + 8000,
      status: statuses[i % statuses.length],
    })
  }
  return data
}

const tableData = ref<RowData[]>(generateData(1000))

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
    prop: 'email',
    label: '邮箱',
  },
  {
    prop: 'department',
    label: '部门',
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
  {
    prop: 'operation',
    label: '操作',
    render: ({ row }: any) => {
      return [
        h('el-button', {
          size: 'small',
          type: 'primary',
          onClick: () => handleEdit(row),
        }, '编辑'),
        h('el-button', {
          size: 'small',
          type: 'danger',
          onClick: () => handleDelete(row),
        }, '删除'),
      ]
    },
  },
])

// 虚拟滚动配置
const virtualConfig = computed(() => ({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
}))

function handleEdit(row: RowData) {
  console.log('编辑操作:', row)
  ElMessage.success(`开始编辑: ${row.name}`)
}

function handleDelete(row: RowData) {
  console.log('删除操作:', row)
  ElMessageBox.confirm(`确定要删除 ${row.name} 吗？`, '确认删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    const index = tableData.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      tableData.value.splice(index, 1)
      ElMessage.success('删除成功')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h3>虚拟表格操作按钮演示</h3>
      <p style="margin: 8px 0; color: #666;">
        测试操作按钮在虚拟表格中的兼容性，包括点击事件、样式等。
      </p>
    </div>

    <z-table
      v-model:data="tableData"
      :columns="columns"
      :virtual="virtualConfig"
      height="500px"
      border
      stripe
    />
  </div>
</template>
