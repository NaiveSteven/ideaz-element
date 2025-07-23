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
}

// 生成测试数据
function generateData(count: number): RowData[] {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '冯一', '陈二']
  const departments = ['技术部', '产品部', '设计部', '运营部', '市场部']
  const positions = ['工程师', '产品经理', '设计师', '运营专员', '市场专员']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      email: `user${i + 1}@example.com`,
      department: departments[i % departments.length],
      position: positions[i % positions.length],
      salary: Math.floor(Math.random() * 50000) + 8000,
    })
  }
  return data
}

const tableData = ref<RowData[]>(generateData(2000))
const indexType = ref('number')

const columns = computed(() => [
  {
    type: 'index',
    label: '序号',
    index: indexType.value === 'number' ? 1 :
           indexType.value === 'function' ? (index: number) => `No.${index + 1}` :
           undefined,
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
])

// 虚拟滚动配置
const virtualConfig = computed(() => ({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
}))

function changeIndexType(type: string) {
  indexType.value = type
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h3>虚拟表格索引列演示</h3>
      <p style="margin: 8px 0; color: #666;">
        虚拟表格完全支持索引列功能，支持数字索引和自定义函数索引。
      </p>

      <el-space wrap>
        <span>索引类型:</span>
        <el-radio-group v-model="indexType" @change="changeIndexType">
          <el-radio-button value="number">数字索引</el-radio-button>
          <el-radio-button value="function">函数索引</el-radio-button>
          <el-radio-button value="default">默认索引</el-radio-button>
        </el-radio-group>
      </el-space>
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

<style scoped>
ul {
  padding-left: 20px;
  margin: 0;
}

li {
  margin: 4px 0;
}
</style>
