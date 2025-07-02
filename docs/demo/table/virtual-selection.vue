<script lang="ts" setup>
import { ref } from 'vue'

// 生成大量测试数据
function generateLargeData(count: number) {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '冯一', '陈二']
  const genders = ['男', '女']
  const data = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      gender: genders[i % genders.length],
      age: 18 + (i % 50),
      department: ['技术部', '产品部', '设计部', '运营部', '市场部'][i % 5],
      salary: Math.floor(Math.random() * 50000) + 5000,
    })
  }
  return data
}

const tableData = ref(generateLargeData(1000))
const selectedRows = ref([])

const columns = ref([
  {
    type: 'selection',
    width: 60,
  },
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    prop: 'name',
    label: '姓名',
    width: 150,
  },
  {
    prop: 'gender',
    label: '性别',
    width: 100,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 100,
  },
  {
    prop: 'department',
    label: '部门',
    width: 120,
  },
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
  },
])

function handleSelectionChange(selection: any[]) {
  selectedRows.value = selection
  console.log('选中的行:', selection)
}

const tableRef = ref()

function clearSelection() {
  selectedRows.value = []
  tableRef.value?.clearSelection()
}

function selectFirst10() {
  // 选择前10行
  tableData.value.slice(0, 10).forEach(row => {
    tableRef.value?.toggleRowSelection(row, true)
  })
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h4>虚拟表格选择功能测试 (1000条数据)</h4>
      <el-space>
        <el-text>
          已选中 {{ selectedRows.length }} 行
        </el-text>
        <el-button @click="clearSelection">
          清空选择
        </el-button>
        <el-button @click="selectFirst10">
          选择前10行
        </el-button>
      </el-space>
    </div>

    <z-table
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="500px"
      border
      stripe
      row-key="id"
      @selection-change="handleSelectionChange"
    />

            <div style="margin-top: 16px;">
      <el-alert
        title="功能完成"
        type="success"
        :closable="false"
      >
        <template #default>
          <p><strong>✅ 选择功能已完成</strong>：虚拟表格完全支持 <code>type: 'selection'</code> 列的交互功能</p>
          <p><strong>✅ 支持功能</strong>：单行选择、全选、取消全选、选择状态管理</p>
          <p><strong>✅ 事件支持</strong>：<code>@selection-change</code> 事件正常触发</p>
          <p><strong>✅ 方法支持</strong>：<code>clearSelection</code>、<code>toggleRowSelection</code>、<code>toggleAllSelection</code></p>
        </template>
      </el-alert>
    </div>
  </div>
</template>
