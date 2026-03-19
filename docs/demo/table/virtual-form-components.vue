<!-- eslint-disable no-console -->
<template>
  <div class="virtual-form-components-demo">
    <h2>Virtual Table Form Components Demo</h2>

    <div style="margin-bottom: 16px;">
      <ElSpace>
        <ElButton @click="generateData(1000)">Generate 1,000 rows</ElButton>
        <ElButton @click="generateData(5000)">Generate 5,000 rows</ElButton>
        <ElButton @click="validateData">Validate data</ElButton>
        <ElButton @click="showSelected">Show selected data</ElButton>
      </ElSpace>
    </div>

    <ZTable
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      :virtual="true"
      :options="formOptions"
      height="600px"
      @update:data="handleDataUpdate"
      @selection-change="handleSelectionChange"
    />

    <div style="margin-top: 16px;">
      <h3>Form component mapping:</h3>
      <ul>
        <li><strong>Name</strong>: input field</li>
        <li><strong>Gender</strong>: select dropdown</li>
        <li><strong>Age</strong>: input-number</li>
        <li><strong>Department</strong>: multi-select</li>
        <li><strong>Rating</strong>: radio group</li>
        <li><strong>Skills</strong>: checkbox group</li>
        <li><strong>Hire date</strong>: date picker</li>
        <li><strong>Status</strong>: switch</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElButton, ElMessage, ElSpace } from 'element-plus'

const tableRef = ref()
const tableData = ref<any[]>([])

// Form option config
const formOptions = computed(() => ({
  gender: [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ],
  department: [
    { label: 'Engineering', value: 'tech' },
    { label: 'Product', value: 'product' },
    { label: 'Design', value: 'design' },
    { label: 'Operations', value: 'operation' },
    { label: 'Marketing', value: 'marketing' }
  ],
  rating: [
    { label: 'Level A', value: 'A' },
    { label: 'Level B', value: 'B' },
    { label: 'Level C', value: 'C' },
    { label: 'Level D', value: 'D' }
  ],
  skills: [
    { label: 'JavaScript', value: 'js' },
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Python', value: 'python' }
  ]
}))

// Table column config
const columns = ref([
  {
    type: 'selection',
    label: 'Selection',
  },
  {
    type: 'index',
    label: 'Index',
    index: 1,
  },
  {
    prop: 'name',
    label: 'Name',
    component: 'input',
    required: true,
    fieldProps: {
      placeholder: 'Please enter a name',
    },
  },
  {
    prop: 'gender',
    label: 'Gender',
    component: 'select',
    fieldProps: {
      placeholder: 'Please select a gender',
    },
  },
  {
    prop: 'age',
    label: 'Age',
    component: 'el-input-number',
    fieldProps: {
      min: 18,
      max: 100,
      placeholder: 'Please enter an age',
    },
  },
  // {
  //   prop: 'department',
  //   label: 'Department',
  //   component: 'select',
  //   fieldProps: {
  //     placeholder: 'Please select departments',
  //     multiple: true,
  //     appendToBody: true,
  //   },
  // },
  {
    prop: 'rating',
    label: 'Rating',
    component: 'radio',
    fieldProps: {
      placeholder: 'Please select a rating',
    },
  },
  {
    prop: 'skills',
    label: 'Skills',
    component: 'checkbox',
    fieldProps: {
      placeholder: 'Please select skills',
    },
  },
  // {
  //   prop: 'joinDate',
  //   label: 'Hire date',
  //   component: 'el-date-picker',
  //   fieldProps: {
  //     type: 'date',
  //     placeholder: 'Please select a hire date',
  //     format: 'YYYY-MM-DD',
  //     valueFormat: 'YYYY-MM-DD',
  //   },
  // },
  {
    prop: 'status',
    label: 'Status',
    component: 'el-switch',
    fieldProps: {
      activeText: 'Active',
      inactiveText: 'Inactive',
    },
  },
])

// Generate mock data
function generateData(count: number) {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah']
  const genders = ['male', 'female', 'other']
  const departments = ['tech', 'product', 'design', 'operation', 'marketing']
  const ratings = ['A', 'B', 'C', 'D']
  const skills = ['js', 'vue', 'react', 'nodejs', 'python']

  const data = []
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}_${i + 1}`,
      gender: genders[i % genders.length],
      age: Math.floor(Math.random() * 40) + 20,
      department: [departments[i % departments.length], departments[(i + 1) % departments.length]],
      rating: ratings[i % ratings.length],
      skills: [skills[i % skills.length], skills[(i + 1) % skills.length]],
      joinDate: `2020-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      status: Math.random() > 0.5,
      __isEdit: false,
    })
  }

  tableData.value = data
}

// Handle data updates
function handleDataUpdate(newData: any[]) {
  tableData.value = newData
  // console.log('Data updated:', newData)
}

// Validate data
function validateData() {
  const invalidData = tableData.value.filter(item =>
    !item.name || !item.gender || !item.age || !item.joinDate
  )

  if (invalidData.length > 0) {
    ElMessage.error(`Found ${invalidData.length} invalid rows`)
    // console.log('Invalid rows:', invalidData)
  } else {
    ElMessage.success('All rows passed validation')
  }
}

// Show selected data
function showSelected() {
  // eslint-disable-next-line no-console
  console.log('Table data', tableData.value)
}

function handleSelectionChange(selection: any[]) {
  // eslint-disable-next-line no-console
  console.log('Selected rows', selection)
}

// Initialize data
generateData(1000)
</script>

<style scoped>
.virtual-form-components-demo {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

h3 {
  margin-bottom: 10px;
  color: #666;
}

ul {
  padding-left: 20px;
  margin: 0;
}

li {
  margin-bottom: 5px;
  color: #666;
}
</style>
