<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

interface RowData {
  id: number
  name: string
  age: number
  email: string
}

const loading = ref(false)
const tableData = ref<RowData[]>([])
const virtualEnabled = ref(true)

const columns = ref([
  {
    prop: 'id',
    label: 'ID',
    width: 80,
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 80,
  },
  {
    prop: 'email',
    label: '邮箱',
    width: 200,
  },
])

// 生成测试数据
function generateData(count: number) {
  const data: RowData[] = []
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `用户${i}`,
      age: Math.floor(Math.random() * 40) + 20,
      email: `user${i}@example.com`,
    })
  }
  tableData.value = data
}

// 初始化数据
generateData(1000)

// 切换虚拟滚动
function toggleVirtual() {
  virtualEnabled.value = !virtualEnabled.value
}
</script>

<template>
  <div class="virtual-scroll-demo">
    <div style="margin-bottom: 16px;">
      <ElSpace>
        <ElButton @click="toggleVirtual" :type="virtualEnabled ? 'success' : 'info'">
          {{ virtualEnabled ? '禁用虚拟滚动' : '启用虚拟滚动' }}
        </ElButton>
        <ElButton @click="generateData(1000)">
          生成 1,000 条数据
        </ElButton>
      </ElSpace>
    </div>

    <div style="margin-bottom: 16px;">
      <ElAlert
        :title="`当前数据量: ${tableData.length.toLocaleString()} 条`"
        :description="`虚拟滚动: ${virtualEnabled ? '已启用' : '已禁用'}`"
        type="info"
        show-icon
        :closable="false"
      />
    </div>

    <ZTable
      :data="tableData"
      :columns="columns"
      :virtual="virtualEnabled"
      :loading="loading"
      height="400px"
      stripe
      border
    />
  </div>
</template>

<style scoped>
.virtual-scroll-demo {
  padding: 20px;
}
</style>
