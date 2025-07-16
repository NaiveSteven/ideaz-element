<script lang="ts" setup>
import { ref } from 'vue'

// 生成测试数据
function generateData() {
  const departments = ['技术部', '市场部', '产品部', '运营部', '设计部']
  const levels = ['初级', '中级', '高级', '专家']
  const data = []
  for (let i = 1; i <= 2000; i++) {
    data.push({
      id: i,
      name: `用户 ${i}`,
      email: `user${i}@example.com`,
      age: 20 + (i % 50),
      department: departments[i % departments.length],
      salary: 5000 + (i % 100) * 100,
      level: levels[i % levels.length],
      status: i % 3 === 0 ? '在职' : '离职',
      joinDate: new Date(2020 + (i % 4), (i % 12), (i % 28) + 1).toLocaleDateString(),
      performance: Math.floor(Math.random() * 100),
    })
  }
  return data
}

const tableData = ref(generateData())

// 计算统计数据
const totalUsers = tableData.value.length
const avgSalary = Math.round(tableData.value.reduce((sum, item) => sum + item.salary, 0) / totalUsers)
const departmentCount = new Set(tableData.value.map(item => item.department)).size

// 列配置
const columns = [
  {
    type: 'index',
    label: '序号',
    tooltip: '显示数据行的序号，从1开始计数'
  },
  {
    prop: 'name',
    label: '用户姓名',
    tooltip: '用户的真实姓名，用于标识用户身份'
  },
  {
    prop: 'email',
    label: '邮箱地址',
    tooltip: {
      content: '用户的电子邮箱地址，用于联系和通知',
      placement: 'bottom',
      effect: 'light'
    }
  },
  {
    prop: 'age',
    label: '年龄',
    tooltip: (scope: any) => {
      const minAge = Math.min(...tableData.value.map(item => item.age))
      const maxAge = Math.max(...tableData.value.map(item => item.age))
      return `年龄范围：${minAge} - ${maxAge} 岁 (列索引: ${scope.$index})`
    }
  },
  {
    prop: 'department',
    label: '所属部门',
    tooltip: {
      content: (scope: any) => {
        return `共有 ${departmentCount} 个部门 (列: ${scope.column.prop})`
      },
      placement: 'top-start',
      effect: 'dark'
    }
  },
  {
    prop: 'salary',
    label: '薪资待遇',
    tooltip: (scope: any) => {
      return `平均薪资：¥${avgSalary.toLocaleString()} (列索引: ${scope.$index})`
    }
  },
  {
    prop: 'level',
    label: '职级',
    tooltip: {
      content: '员工的职业等级，分为初级、中级、高级、专家四个级别',
      placement: 'right',
      showAfter: 500,
      hideAfter: 100
    }
  },
  {
    prop: 'status',
    label: '在职状态',
    tooltip: {
      content: (scope: any) => {
        const activeCount = tableData.value.filter(item => item.status === '在职').length
        const inactiveCount = totalUsers - activeCount
        return `在职：${activeCount} 人，离职：${inactiveCount} 人 (列: ${scope.column.label})`
      },
      placement: 'left',
      effect: 'light'
    }
  },
  {
    prop: 'joinDate',
    label: '入职日期',
    tooltip: '员工加入公司的日期'
  },
  {
    prop: 'performance',
    label: '绩效得分',
    tooltip: {
      content: (scope: any) => {
        const avgPerformance = Math.round(
          tableData.value.reduce((sum, item) => sum + item.performance, 0) / totalUsers
        )
        return `平均绩效得分：${avgPerformance} 分 (列索引: ${scope.$index})`
      },
      placement: 'bottom-end',
      effect: 'dark',
      showAfter: 300
    }
  }
]
</script>

<template>
  <div>
    <h3>虚拟表格 - 列提示功能</h3>

    <el-alert
      title="✅ 表头Tooltip功能"
      type="success"
      :closable="false"
      style="margin-bottom: 16px;"
    >
      <template #default>
        <p><strong>✅ 字符串提示</strong>：直接使用字符串作为tooltip内容</p>
        <p><strong>✅ 函数提示</strong>：使用函数动态生成tooltip内容，支持scope参数传递</p>
        <p><strong>✅ 对象配置</strong>：使用对象配置tooltip的各种属性（位置、主题等）</p>
        <p><strong>✅ Scope参数</strong>：函数tooltip正确接收scope.column和scope.$index参数</p>
      </template>
    </el-alert>

    <z-table
      :data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="500px"
      border
      stripe
      row-key="id"
    />
  </div>
</template>

<style scoped>
:deep(.el-collapse-item__content) {
  padding: 12px !important;
}
</style>
