<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

interface RowData {
  name: string
  gender: string
  age: number
  time: string
}

const loading = ref(false)
const tableData = ref<RowData[]>([])
const columns = ref([
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
  },
  {
    prop: 'time',
    label: '出生日期',
  },
])
const pagination = ref({
  page: 1,
  pageSize: 50,
  total: 0,
})

// 生成大量测试数据
function generateLargeData(count: number): RowData[] {
  const names = ['Steven', 'Helen', 'Nancy', 'Jack', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
  const genders = ['male', 'female']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    data.push({
      name: `${names[i % names.length]}-${i + 1}`,
      gender: genders[i % genders.length],
      age: 18 + (i % 50),
      time: `202${(i % 4) + 0}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    })
  }
  return data
}

function mockApi(params: { page: number, pageSize: number }): Promise<{ result: { page: number, pageSize: number, total: number, list: RowData[] } }> {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      const total = 10000 // 大数据量测试
      const start = (params.page - 1) * params.pageSize
      const allData = generateLargeData(total)
      const list = allData.slice(start, start + params.pageSize)

      resolve({
        result: {
          page: params.page,
          pageSize: params.pageSize,
          total,
          list,
        },
      })
    }, 100)
  })
}

async function getTableData() {
  loading.value = true
  try {
    const res = await mockApi({ ...pagination.value })
    tableData.value = res.result.list
    pagination.value.total = res.result.total
  }
  catch (error) {
    console.log(error)
  }
  loading.value = false
}

getTableData()
</script>

<template>
  <z-table
    v-model:pagination="pagination"
    v-model:data="tableData"
    :columns="columns"
    :loading="loading"
    :virtual="{ enabled: true, itemHeight: 48, threshold: 50 }"
    height="400px"
    @refresh="getTableData"
  >
    <template #expand="row">
      {{ row.$index }}
    </template>
  </z-table>
</template>
