<!-- eslint-disable no-console -->
<template>
  <div class="virtual-form-components-demo">
    <h2>虚拟表格表单组件功能测试</h2>

    <div style="margin-bottom: 16px;">
      <ElSpace>
        <ElButton @click="generateData(1000)">生成 1000 条数据</ElButton>
        <ElButton @click="generateData(5000)">生成 5000 条数据</ElButton>
        <ElButton @click="validateData">验证数据</ElButton>
        <ElButton @click="showSelected">显示选中数据</ElButton>
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
      <h3>表单组件类型说明：</h3>
      <ul>
        <li><strong>姓名</strong>：input 输入框</li>
        <li><strong>性别</strong>：select 下拉选择</li>
        <li><strong>年龄</strong>：input-number 数字输入框</li>
        <li><strong>部门</strong>：select 多选下拉</li>
        <li><strong>评级</strong>：radio 单选框</li>
        <li><strong>技能</strong>：checkbox 多选框</li>
        <li><strong>入职日期</strong>：date-picker 日期选择</li>
        <li><strong>状态</strong>：switch 开关</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElButton, ElMessage, ElSpace } from 'element-plus'

const tableRef = ref()
const tableData = ref<any[]>([])

// 表单选项配置
const formOptions = computed(() => ({
  gender: [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' },
    { label: '其他', value: 'other' }
  ],
  department: [
    { label: '技术部', value: 'tech' },
    { label: '产品部', value: 'product' },
    { label: '设计部', value: 'design' },
    { label: '运营部', value: 'operation' },
    { label: '市场部', value: 'marketing' }
  ],
  rating: [
    { label: 'A级', value: 'A' },
    { label: 'B级', value: 'B' },
    { label: 'C级', value: 'C' },
    { label: 'D级', value: 'D' }
  ],
  skills: [
    { label: 'JavaScript', value: 'js' },
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Python', value: 'python' }
  ]
}))

// 表格列配置
const columns = ref([
  {
    type: 'selection',
    label: '选择',
  },
  {
    type: 'index',
    label: '序号',
    index: 1,
  },
  {
    prop: 'name',
    label: '姓名',
    component: 'input',
    required: true,
    fieldProps: {
      placeholder: '请输入姓名',
    },
  },
  {
    prop: 'gender',
    label: '性别',
    component: 'select',
    fieldProps: {
      placeholder: '请选择性别',
    },
  },
  {
    prop: 'age',
    label: '年龄',
    component: 'el-input-number',
    fieldProps: {
      min: 18,
      max: 100,
      placeholder: '请输入年龄',
    },
  },
  // {
  //   prop: 'department',
  //   label: '部门',
  //   component: 'select',
  //   fieldProps: {
  //     placeholder: '请选择部门',
  //     multiple: true,
  //     appendToBody: true,
  //   },
  // },
  {
    prop: 'rating',
    label: '评级',
    component: 'radio',
    fieldProps: {
      placeholder: '请选择评级',
    },
  },
  {
    prop: 'skills',
    label: '技能',
    component: 'checkbox',
    fieldProps: {
      placeholder: '请选择技能',
    },
  },
  // {
  //   prop: 'joinDate',
  //   label: '入职日期',
  //   component: 'el-date-picker',
  //   fieldProps: {
  //     type: 'date',
  //     placeholder: '请选择入职日期',
  //     format: 'YYYY-MM-DD',
  //     valueFormat: 'YYYY-MM-DD',
  //   },
  // },
  {
    prop: 'status',
    label: '状态',
    component: 'el-switch',
    fieldProps: {
      activeText: '在职',
      inactiveText: '离职',
    },
  },
])

// 生成测试数据
function generateData(count: number) {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十']
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

// 处理数据更新
function handleDataUpdate(newData: any[]) {
  tableData.value = newData
  // console.log('数据更新:', newData)
}

// 验证数据
function validateData() {
  const invalidData = tableData.value.filter(item =>
    !item.name || !item.gender || !item.age || !item.joinDate
  )

  if (invalidData.length > 0) {
    ElMessage.error(`发现 ${invalidData.length} 条无效数据`)
    // console.log('无效数据:', invalidData)
  } else {
    ElMessage.success('所有数据验证通过')
  }
}

// 显示选中数据
function showSelected() {
  // eslint-disable-next-line no-console
  console.log('数据打印', tableData.value)
}

function handleSelectionChange(selection: any[]) {
  // eslint-disable-next-line no-console
  console.log('选中数据', selection)
}

// 初始化数据
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
