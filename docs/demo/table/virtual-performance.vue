<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { TableColumnScopeData } from 'ideaz-element'

interface RowData {
  id: number
  name: string
  gender: string
  age: number
  score: number
  time: string
  status: string
}

const loading = ref(false)
const tableData = ref<RowData[]>([])
const dataSize = ref(10000)
const renderTime = ref(0)

// 性能配置
const virtualConfig = ref({
  enabled: true,
  itemHeight: 48,
  threshold: 100,
  buffer: 5,
  cache: 2,
})

const columns = ref([
  {
    type: 'selection',
  },
  {
    type: 'index',
  },
  {
    prop: 'id',
    label: 'ID',
    sortable: true,
  },
  {
    prop: 'name',
    label: '姓名',
  },
  {
    prop: 'gender',
    label: '性别',
  },
  {
    prop: 'age',
    label: '年龄',
    sortable: true,
  },
  {
    prop: 'score',
    label: '评分',
  },
  {
    prop: 'status',
    label: '状态',
  },
  {
    prop: 'time',
    label: '创建时间',
  },
  {
    type: 'button',
    label: '操作',
    buttons: [
      {
        type: 'primary',
        link: true,
        label: '编辑',
        onClick: ({ row }: TableColumnScopeData<RowData>) => {
          console.log('编辑:', row)
        },
      },
      {
        type: 'success',
        link: true,
        label: '查看',
        onClick: ({ row }: TableColumnScopeData<RowData>) => {
          console.log('查看:', row)
        },
      },
      {
        type: 'danger',
        link: true,
        label: '删除',
        onClick: ({ row }: TableColumnScopeData<RowData>) => {
          console.log('删除:', row)
        },
      },
    ],
  },
])

// 生成大量测试数据
function generateLargeData(count: number): RowData[] {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '冯一', '陈二']
  const genders = ['male', 'female']
  const statuses = ['active', 'inactive', 'pending', 'banned']
  const data: RowData[] = []

  console.time('生成数据')
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      gender: genders[i % genders.length],
      age: 18 + (i % 50),
      score: Math.floor(Math.random() * 5) + 1,
      time: `202${(i % 4) + 0}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')} ${String(i % 24).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
      status: statuses[i % statuses.length],
    })
  }
  console.timeEnd('生成数据')
  return data
}

// 性能测试
function generateData() {
  loading.value = true
  const startTime = performance.now()

  setTimeout(() => {
    tableData.value = generateLargeData(dataSize.value)
    const endTime = performance.now()
    renderTime.value = Math.round(endTime - startTime)
    loading.value = false

    console.log(`生成 ${dataSize.value} 条数据，耗时: ${renderTime.value}ms`)
  }, 100)
}

// 性能指标
const performanceInfo = computed(() => ({
  dataCount: tableData.value.length,
  renderTime: renderTime.value,
  memoryUsage: (performance as any).memory ? {
    used: Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024),
    total: Math.round((performance as any).memory.totalJSHeapSize / 1024 / 1024),
    limit: Math.round((performance as any).memory.jsHeapSizeLimit / 1024 / 1024),
  } : null,
}))

// 初始化
generateData()
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h3>虚拟表格性能测试</h3>
      <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
        <span>数据量:</span>
        <el-input-number
          v-model="dataSize"
          :min="1000"
          :max="100000"
          :step="1000"
          style="width: 150px;"
        />
        <el-button @click="generateData" :loading="loading">生成数据</el-button>
      </div>

      <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
        <span>虚拟滚动配置:</span>
        <el-checkbox v-model="virtualConfig.enabled">启用虚拟滚动</el-checkbox>
        <span>行高:</span>
        <el-input-number
          v-model="virtualConfig.itemHeight"
          :min="30"
          :max="100"
          style="width: 120px;"
        />
        <span>缓冲:</span>
        <el-input-number
          v-model="virtualConfig.buffer"
          :min="1"
          :max="20"
          style="width: 120px;"
        />
      </div>
    </div>

    <div style="padding: 16px; margin-bottom: 16px; background: #f5f5f5; border-radius: 8px;">
      <h4>性能指标</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
        <div>
          <strong>数据量:</strong> {{ performanceInfo.dataCount.toLocaleString() }} 条
        </div>
        <div>
          <strong>渲染耗时:</strong> {{ performanceInfo.renderTime }}ms
        </div>
        <div v-if="performanceInfo.memoryUsage">
          <strong>内存使用:</strong> {{ performanceInfo.memoryUsage.used }}MB / {{ performanceInfo.memoryUsage.total }}MB
        </div>
      </div>
    </div>

    <z-table
      v-model:data="tableData"
      :columns="columns"
      :virtual="virtualConfig"
      :loading="loading"
      height="600px"
      row-key="id"
      stripe
      border
    />
  </div>
</template>
