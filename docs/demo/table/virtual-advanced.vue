<!-- eslint-disable no-console -->
<script lang="ts" setup>
import { h, ref } from 'vue'
import type { TableColumnScopeData } from 'ideaz-element'

interface RowData {
  id: number
  name: string
  gender: string
  age: number
  department: string
  salary: number
  time: string
  status: string
  score: number
}

// 生成大量测试数据
function generateLargeData(count: number): RowData[] {
  const names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '冯一', '陈二']
  const genders = ['1', '2']
  const departments = ['技术部', '产品部', '设计部', '运营部', '市场部']
  const statuses = ['active', 'inactive', 'pending']
  const data: RowData[] = []

  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `${names[i % names.length]}-${i + 1}`,
      gender: genders[i % genders.length],
      age: 18 + (i % 50),
      department: departments[i % departments.length],
      salary: Math.floor(Math.random() * 50000) + 5000,
      time: `202${(i % 4) + 0}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
      status: statuses[i % statuses.length],
      score: Math.floor(Math.random() * 100) + 1,
    })
  }
  return data
}

const tableData = ref<RowData[]>(generateLargeData(2000))
const isEditable = ref(false)
const hideGender = ref(false)
const hideSalary = ref(true) // 默认隐藏薪资

const columns = ref([
  {
    type: 'selection',
  },
  {
    prop: 'id',
    label: 'ID',
    tooltip: '员工唯一标识',
  },
  {
    component: 'input',
    prop: 'name',
    label: () => h('div', { style: { color: '#409eff' } }, [
      h('i', { class: 'el-icon-user', style: { marginRight: '4px' } }),
      '姓名'
    ]),
    tooltip: () => h('div', ['员工姓名', h('br'), '可编辑']),
    fieldProps: {
      placeholder: '请输入姓名',
    },
  },
  {
    component: 'select',
    prop: 'gender',
    label: 'genderHeader',
    hide: () => hideGender.value,
    tooltip: '员工性别信息',
    slot: 'gender',
  },
  {
    component: 'input-number',
    prop: 'age',
    label: () => h('el-tag', { type: 'warning', size: 'small' }, () => '年龄'),
    tooltip: '员工年龄范围18-67',
    fieldProps: {
      min: 18,
      max: 67,
    },
  },
  {
    component: 'select',
    prop: 'department',
    label: '部门',
    tooltip: '所属部门',
  },
  {
    component: 'input-number',
    prop: 'salary',
    label: 'salaryHeader',
    hide: () => hideSalary.value,
    tooltip: () => h('el-tag', { type: 'danger', size: 'small' }, () => '敏感信息'),
    fieldProps: {
      min: 0,
      controls: false,
    },
  },
  {
    prop: 'status',
    label: '状态',
    slot: 'status',
    tooltip: '员工当前状态',
  },
  {
    prop: 'score',
    label: '评分',
    render: ({ row }: TableColumnScopeData<RowData>) => {
      const color = row.score >= 80 ? '#67c23a' : row.score >= 60 ? '#e6a23c' : '#f56c6c'
      return h('div', { style: { color, fontWeight: 'bold' } }, `${row.score}分`)
    },
  },
  {
    component: 'el-date-picker',
    prop: 'time',
    label: () => h('div', { style: { textAlign: 'center' } }, [
      h('div', '入职'),
      h('div', { style: { fontSize: '12px', color: '#999' } }, '日期')
    ]),
    fieldProps: {
      valueFormat: 'YYYY-MM-DD',
      size: 'small',
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

function toggleEditable() {
  isEditable.value = !isEditable.value
}

function toggleGender() {
  hideGender.value = !hideGender.value
}

function toggleSalary() {
  hideSalary.value = !hideSalary.value
}

function handleSave() {
  console.log('保存数据:', tableData.value)
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px;">
      <h3>虚拟表格高级功能综合测试 (2000条数据)</h3>
      <el-space wrap>
        <el-button :type="isEditable ? 'danger' : 'primary'" @click="toggleEditable">
          {{ isEditable ? '退出编辑' : '进入编辑' }}
        </el-button>
        <el-button @click="toggleGender">
          {{ hideGender ? '显示' : '隐藏' }}性别列
        </el-button>
        <el-button @click="toggleSalary">
          {{ hideSalary ? '显示' : '隐藏' }}薪资列
        </el-button>
        <el-button type="success" @click="handleSave" :disabled="!isEditable">
          保存数据
        </el-button>
      </el-space>
    </div>

    <z-table
      v-model:data="tableData"
      :columns="columns"
      :options="options"
      :editable="isEditable"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="600px"
      border
      stripe
      row-key="id"
    >
      <!-- 性别表头插槽 -->
      <template #genderHeader>
        <el-tooltip content="员工性别信息" placement="top">
          <span>
            <i class="el-icon-male" style="margin-right: 4px;"></i>
            性别
          </span>
        </el-tooltip>
      </template>

      <!-- 薪资表头插槽 -->
      <template #salaryHeader>
        <el-tooltip content="敏感信息，请谨慎查看" placement="top">
          <span style="color: #f56c6c;">
            <i class="el-icon-lock" style="margin-right: 4px;"></i>
            薪资
          </span>
        </el-tooltip>
      </template>

      <!-- 性别列内容插槽 -->
      <template #gender="{ row }">
        <el-tag :type="row.gender === '1' ? 'primary' : 'success'" size="small">
          {{ row.gender === '1' ? '男' : '女' }}
        </el-tag>
      </template>

      <!-- 状态列内容插槽 -->
      <template #status="{ row }">
        <el-badge
          :value="row.status === 'active' ? '●' : row.status === 'pending' ? '▲' : '✕'"
          :type="row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'"
        >
          {{ row.status }}
        </el-badge>
      </template>
    </z-table>

    <div style="margin-top: 16px; padding: 16px; background: #f5f7fa; border-radius: 8px;">
      <h4>功能特性说明</h4>
      <ul style="margin: 0; padding-left: 20px;">
        <li>✅ <strong>列显隐</strong>: 支持动态显示/隐藏列</li>
        <li>✅ <strong>自定义表头</strong>: 支持render函数和slot两种方式</li>
        <li>✅ <strong>列提示</strong>: 悬停查看列说明信息</li>
        <li>✅ <strong>自定义列内容</strong>: render函数和slot自定义渲染</li>
        <li>✅ <strong>可编辑表格</strong>: 支持多种表单组件的在线编辑</li>
        <li>✅ <strong>虚拟滚动</strong>: 2000条数据流畅渲染</li>
        <li>✅ <strong>多选功能</strong>: 支持行选择和批量操作</li>
      </ul>
    </div>
  </div>
</template>
