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
const pagination = ref({
  page: 1,
  pageSize: 2,
  total: 0,
  layout: 'total, prev, pager, next',
})

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

function mockApi(params: { page: number, pageSize: number }): Promise<{ result: { page: number, pageSize: number, total: number, list: RowData[] } }> {
  console.log(params, 'params')
  return new Promise((resolve) => {
    setTimeout(() => {
      const dataFirstPage = [
        {
          name: 'Steven',
          gender: 'male',
          age: 22,
          time: '2020-01-01',
        },
        {
          name: 'Helen',
          gender: 'male',
          age: 12,
          time: '2012-01-01',
        },
      ]
      const dataSecondPage = [
        {
          name: 'Nancy',
          gender: 'female',
          age: 18,
          time: '2018-01-01',
        },
        {
          name: 'Jack',
          gender: 'male',
          age: 28,
          time: '2028-01-01',
        },
      ]
      resolve({
        result: {
          page: 1,
          pageSize: 10,
          total: 4,
          list: pagination.value.page === 1 ? dataFirstPage : dataSecondPage,
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
    @refresh="getTableData"
  >
    <template #toolBarTop>
      <div class="slot-demo">
        toolBarTop
      </div>
    </template>
    <template #toolBarBottom>
      <div class="slot-demo">
        toolBarBottom
      </div>
    </template>
    <template #toolBarRight>
      <div class="slot-demo">
        toolBarRight
      </div>
    </template>
    <template #toolBarLeft>
      <div class="slot-demo">
        toolBarLeft
      </div>
    </template>
    <template #tableTitle>
      <div class="slot-demo">
        tableTitle
      </div>
    </template>
  </z-table>
</template>

<style lang="scss">
.slot-demo {
  padding: 10px;
  border: 1px solid var(--el-card-border-color);
  border-radius: var(--el-card-border-radius);
  box-shadow: var(--el-box-shadow-light);
}
</style>
