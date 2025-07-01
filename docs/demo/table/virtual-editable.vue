<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

// 生成大量测试数据
function generateLargeData(count: number) {
  const names = ['Steven', 'Helen', 'Nancy', 'Jack', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
  const genders = ['1', '2']
  const data = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      gender: genders[i % genders.length],
      age: 18 + (i % 50),
      time: `202${(i % 4) + 0}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      salary: Math.floor(Math.random() * 50000) + 5000,
      department: ['技术部', '产品部', '设计部'][i % 3],
    })
  }
  return data
}

const tableData = ref(generateLargeData(800))

const columns = ref([
  {
    prop: 'id',
    label: 'ID',
    width: 100,
  },
  {
    component: 'input',
    prop: 'name',
    label: '姓名',
    width: 150,
    fieldProps: {
      placeholder: '请输入姓名',
    },
  },
  {
    component: 'select',
    prop: 'gender',
    label: '性别',
    width: 120,
    fieldProps: {
      placeholder: '请选择性别',
    },
  },
  {
    component: 'input-number',
    prop: 'age',
    label: '年龄',
    width: 120,
    fieldProps: {
      min: 18,
      max: 65,
    },
  },
  {
    component: 'input-number',
    prop: 'salary',
    label: '薪资',
    width: 120,
    fieldProps: {
      min: 0,
      controls: false,
    },
  },
  {
    component: 'select',
    prop: 'department',
    label: '部门',
    width: 120,
  },
  {
    component: 'el-date-picker',
    prop: 'time',
    label: '入职日期',
    width: 200,
    fieldProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: '选择日期',
    },
  },
])

const options = {
  gender: [
    { label: '男', value: '1' },
    { label: '女', value: '2' },
  ],
  department: [
    { label: '技术部', value: '技术部' },
    { label: '产品部', value: '产品部' },
    { label: '设计部', value: '设计部' },
    { label: '运营部', value: '运营部' },
    { label: '市场部', value: '市场部' },
  ],
}

function handleSave() {
  console.log('保存数据:', tableData.value)
}

function handleReset() {
  tableData.value = generateLargeData(800)
  console.log('重置数据完成')
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h4>可编辑表格功能测试 (800条数据)</h4>
      <el-space>
        <el-button type="primary" @click="handleSave">
          保存数据
        </el-button>
        <el-button @click="handleReset">
          重置数据
        </el-button>
      </el-space>
    </div>

    <z-table
      v-model:data="tableData"
      :columns="columns"
      :options="options"
      :editable="true"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="500px"
      border
      stripe
    />

    <div style="margin-top: 16px; color: #666; font-size: 14px;">
      <p>💡 提示：</p>
      <ul>
        <li>支持多种表单组件：输入框、选择器、数字输入框、日期选择器</li>
        <li>所有修改会实时同步到数据模型</li>
        <li>虚拟滚动确保大数据量下的编辑性能</li>
      </ul>
    </div>
  </div>
</template>
