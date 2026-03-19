<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { ref } from 'vue'

// Generate a large dataset
function generateLargeData(count: number) {
  const names = ['Steven', 'Helen', 'Nancy', 'Jack', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank']
  const genders = ['1', '2']
  const departments = ['Engineering', 'Product', 'Design', 'Operations', 'Marketing']
  const data = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      gender: genders[i % genders.length],
      age: 18 + (i % 50),
      time: `202${(i % 4) + 0}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      salary: Math.floor(Math.random() * 50000) + 5000,
      department: departments[i % departments.length],
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
    label: 'Name',
    fieldProps: {
      placeholder: 'Please enter a name',
    },
  },
  {
    component: 'select',
    prop: 'gender',
    label: 'Gender',
    fieldProps: {
      placeholder: 'Please select a gender',
    },
  },
  {
    component: 'el-input-number',
    prop: 'age',
    label: 'Age',
    fieldProps: {
      min: 18,
      max: 65,
    },
  },
  {
    component: 'el-input-number',
    prop: 'salary',
    label: 'Salary',
    fieldProps: {
      min: 0,
      controls: false,
    },
  },
  {
    component: 'select',
    prop: 'department',
    label: 'Department',
  },
  {
    component: 'el-date-picker',
    prop: 'time',
    label: 'Hire Date',
    fieldProps: {
      valueFormat: 'YYYY-MM-DD',
      placeholder: 'Select date',
    },
  },
])

const options = {
  gender: [
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
  ],
  department: [
    { label: 'Engineering', value: 'Engineering' },
    { label: 'Product', value: 'Product' },
    { label: 'Design', value: 'Design' },
    { label: 'Operations', value: 'Operations' },
    { label: 'Marketing', value: 'Marketing' },
  ],
}

function handleSave() {
  console.log('Save table data:', tableData.value)
}

function handleReset() {
  tableData.value = generateLargeData(800)
  console.log('Data reset complete')
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h4>Editable table demo (800 rows)</h4>
      <el-space>
        <el-button type="primary" @click="handleSave">
          Save data
        </el-button>
        <el-button @click="handleReset">
          Reset data
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
      <p>💡 Hint:</p>
      <ul>
        <li>Supports numerous form components: input, select, number input, date picker, etc.</li>
        <li>All edits sync to the data model in real time.</li>
        <li>Virtual scrolling keeps editing smooth with large datasets.</li>
      </ul>
    </div>
  </div>
</template>
