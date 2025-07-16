<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { computed, ref } from 'vue'

// 生成测试数据
function generateData(count: number) {
  const data = []
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `用户${i}`,
      email: `user${i}@example.com`,
      phone: `138${String(i).padStart(8, '0')}`,
      department: ['技术部', '产品部', '设计部', '运营部'][i % 4],
      position: ['工程师', '产品经理', '设计师', '运营专员'][i % 4],
      status: ['在职', '离职', '试用期'][i % 3],
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
    label: '姓名',
  },
  {
    prop: 'email',
    label: '邮箱',
  },
  {
    prop: 'phone',
    label: '手机号',
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
    prop: 'status',
    label: '状态',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
])

// 虚拟滚动配置
const virtualConfig = computed(() => ({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
}))

function updateData() {
  tableData.value = generateData(dataCount.value)
}

function handleRefresh() {
  console.log('刷新数据')
  updateData()
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <el-space wrap>
        <span>数据量:</span>
        <el-input-number
          v-model="dataCount"
          :min="100"
          :max="50000"
          :step="1000"
          controls-position="right"
          style="width: 150px;"
        />
        <el-button @click="updateData" type="primary">
          更新数据
        </el-button>
        <span style="color: #666;">当前: {{ tableData.length.toLocaleString() }} 条</span>
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
