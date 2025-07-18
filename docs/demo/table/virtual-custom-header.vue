<template>
  <div>
    <h3>虚拟表格 - 表头自定义</h3>

    <div style="margin-bottom: 16px;">
      <el-space>
        <el-button @click="toggleCustomMode">
          {{ useSlotMode ? '切换到Render模式' : '切换到Slot模式' }}
        </el-button>
        <el-text type="info">当前模式: {{ useSlotMode ? 'Slot插槽' : 'Render函数' }}</el-text>
      </el-space>
    </div>

    <el-alert
      title="✅ 表头自定义功能"
      type="success"
      :closable="false"
      style="margin-bottom: 16px;"
    >
      <template #default>
        <p><strong>✅ Render函数</strong>：使用render函数进行表头自定义</p>
        <p><strong>✅ Slot插槽</strong>：使用slot插槽进行表头自定义</p>
        <p><strong>✅ 图标支持</strong>：支持图标、提示、徽章等复杂内容</p>
        <p><strong>✅ 交互支持</strong>：表头中的点击事件和交互元素</p>
        <p><strong>✅ 样式定制</strong>：支持自定义样式和布局</p>
      </template>
    </el-alert>

    <z-table
      ref="tableRef"
      :data="tableData"
      :columns="columns"
      :virtual="{ enabled: true, itemHeight: 48, threshold: 100 }"
      height="500px"
      border
      stripe
      row-key="id"
    >
      <!-- Slot方式的表头自定义 -->
      <template #user-header>
        <div style="display: flex; gap: 6px; align-items: center;">
          <el-icon color="#409eff" size="16"><User /></el-icon>
          <span>用户信息</span>
          <el-tooltip content="包含用户姓名、邮箱等基本信息" placement="top">
            <el-icon color="#909399" size="14" style="cursor: help;"><QuestionFilled /></el-icon>
          </el-tooltip>
        </div>
      </template>

      <template #department-header>
        <div style="display: flex; gap: 6px; align-items: center;">
          <el-icon color="#67c23a" size="16"><OfficeBuilding /></el-icon>
          <span>部门信息</span>
          <el-badge :value="departmentCount" type="primary" :max="99">
            <span></span>
          </el-badge>
        </div>
      </template>

      <template #salary-header>
        <div
          style="display: flex; gap: 6px; align-items: center; cursor: pointer;"
          @click="handleSalaryHeaderClick"
        >
          <el-icon color="#f56c6c" size="16"><Money /></el-icon>
          <span>薪资待遇</span>
          <el-tag size="small" type="warning">¥{{ avgSalary }}</el-tag>
        </div>
      </template>

      <template #status-header>
        <div style="display: flex; gap: 6px; align-items: center;">
          <el-icon color="#909399" size="16"><SwitchButton /></el-icon>
          <span>在职状态</span>
          <div style="display: flex; gap: 4px;">
            <el-tag size="small" type="success">{{ activeCount }}在职</el-tag>
            <el-tag size="small" type="info">{{ inactiveCount }}离职</el-tag>
          </div>
        </div>
      </template>

      <template #actions-header>
        <div style="display: flex; gap: 6px; align-items: center;">
          <el-icon color="#e6a23c" size="16"><Setting /></el-icon>
          <span>操作</span>
          <el-dropdown @command="handleHeaderCommand">
            <el-icon style="cursor: pointer;" color="#409eff"><More /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="export">导出数据</el-dropdown-item>
                <el-dropdown-item command="import">导入数据</el-dropdown-item>
                <el-dropdown-item command="settings">列设置</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </z-table>

    <!-- 参数打印区域 -->
    <div style="margin-top: 16px;">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item title="最近的参数传递日志" name="1">
          <div style="max-height: 200px; padding: 12px; overflow-y: auto; background: #f5f7fa; border-radius: 4px;">
            <div v-for="(log, index) in paramLogs" :key="index" style="margin-bottom: 8px; font-family: monospace; font-size: 12px;">
              <span style="color: #909399;">[{{ log.timestamp }}]</span>
              <span style="font-weight: bold; color: #409eff;">{{ log.type }}:</span>
              <span style="color: #606266;">{{ log.message }}</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from 'vue'
import {
  Money,
  More,
  OfficeBuilding,
  QuestionFilled,
  Setting,
  SwitchButton,
  User
} from '@element-plus/icons-vue'

// 生成测试数据
function generateData() {
  const departments = ['技术部', '市场部', '产品部', '运营部', '设计部']
  const data = []
  for (let i = 1; i <= 2000; i++) {
    data.push({
      id: i,
      name: `用户 ${i}`,
      email: `user${i}@example.com`,
      age: 20 + (i % 50),
      department: departments[i % departments.length],
      salary: 5000 + (i % 100) * 100,
      status: i % 3 === 0 ? 'active' : 'inactive',
    })
  }
  return data
}

const tableData = ref(generateData())
const tableRef = ref()
const useSlotMode = ref(true)
const activeCollapse = ref(['1'])
const paramLogs = ref<any[]>([])

// 计算统计数据
const departmentCount = computed(() => {
  const depts = new Set(tableData.value.map(item => item.department))
  return depts.size
})

const avgSalary = computed(() => {
  const total = tableData.value.reduce((sum, item) => sum + item.salary, 0)
  return Math.round(total / tableData.value.length)
})

const activeCount = computed(() => {
  return tableData.value.filter(item => item.status === 'active').length
})

const inactiveCount = computed(() => {
  return tableData.value.filter(item => item.status === 'inactive').length
})

// 添加日志
function addLog(type: string, message: string, params?: any) {
  const timestamp = new Date().toLocaleTimeString()
  paramLogs.value.unshift({
    timestamp,
    type,
    message,
    params
  })

  // 只保留最近20条日志
  if (paramLogs.value.length > 20) {
    paramLogs.value = paramLogs.value.slice(0, 20)
  }

  // eslint-disable-next-line no-console
  console.log(`[${type}]`, message, params)
}

// 列配置
const columns = computed(() => [
  {
    type: 'index',
    label: '序号',
  },
  {
    prop: 'name',
    // 根据模式选择不同的表头配置
    ...(useSlotMode.value ? {
      label: 'user-header'
    } : {
      label: (scope: any) => {
        addLog('表头Render', `用户信息表头渲染`, scope)
        return h('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' }
        }, [
          h('el-icon', { color: '#409eff', size: 16 }, [h(User)]),
          h('span', {}, () => '用户信息'),
          h('el-tooltip', {
            content: '包含用户姓名、邮箱等基本信息',
            placement: 'top'
          }, {
            default: () => h('el-icon', {
              color: '#909399',
              size: 14,
              style: { cursor: 'help' }
            }, [h(QuestionFilled)])
          })
        ])
      }
    })
  },
  {
    prop: 'email',
    label: '邮箱',
  },
  {
    prop: 'age',
    label: '年龄',
  },
  {
    prop: 'department',
    ...(useSlotMode.value ? {
      label: 'department-header'
    } : {
      label: (scope: any) => {
        addLog('表头Render', `部门信息表头渲染`, scope)
        return h('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' }
        }, [
          h('el-icon', { color: '#67c23a', size: 16 }, [h(OfficeBuilding)]),
          h('span', {}, () => '部门信息'),
          h('el-badge', {
            value: departmentCount.value,
            type: 'primary',
            max: 99
          }, {
            default: () => h('span')
          })
        ])
      }
    })
  },
  {
    prop: 'salary',
    ...(useSlotMode.value ? {
      label: 'salary-header'
    } : {
      label: (scope: any) => {
        addLog('表头Render', `薪资表头渲染`, scope)
        return h('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center', cursor: 'pointer' },
          onClick: handleSalaryHeaderClick
        }, [
          h('el-icon', { color: '#f56c6c', size: 16 }, [h(Money)]),
          h('span', {}, () => '薪资待遇'),
          h('el-tag', {
            size: 'small',
            type: 'warning'
          }, `¥${avgSalary.value}`)
        ])
      }
    })
  },
  {
    prop: 'status',
    ...(useSlotMode.value ? {
      label: 'status-header'
    } : {
      label: (scope: any) => {
        addLog('表头Render', `状态表头渲染`, scope)
        return h('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' }
        }, [
          h('el-icon', { color: '#909399', size: 16 }, [h(SwitchButton)]),
          h('span', {}, () => '在职状态'),
          h('div', {
            style: { display: 'flex', gap: '4px' }
          }, [
            h('el-tag', {
              size: 'small',
              type: 'success'
            }, `${activeCount.value}在职`),
            h('el-tag', {
              size: 'small',
              type: 'info'
            }, `${inactiveCount.value}离职`)
          ])
        ])
      }
    })
  },
  {
    prop: 'actions',
    fixed: 'right',
    ...(useSlotMode.value ? {
      label: 'actions-header'
    } : {
      label: (scope: any) => {
        addLog('表头Render', `操作表头渲染`, scope)
        return h('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' }
        }, [
          h('el-icon', { color: '#e6a23c', size: 16 }, [h(Setting)]),
          h('span', {}, () => '操作'),
          h('el-dropdown', {
            onCommand: handleHeaderCommand
          }, {
            default: () => h('el-icon', {
              style: { cursor: 'pointer' },
              color: '#409eff'
            }, [h(More)]),
            dropdown: () => h('el-dropdown-menu', {}, [
                      h('el-dropdown-item', { command: 'export' }, () => '导出数据'),
        h('el-dropdown-item', { command: 'import' }, () => '导入数据'),
        h('el-dropdown-item', { command: 'settings' }, () => '列设置')
            ])
          })
        ])
      }
    })
  }
])

// 事件处理函数
function handleSalaryHeaderClick() {
  addLog('表头事件', `点击薪资表头 - 平均薪资: ${avgSalary.value}`)
}

function handleHeaderCommand(command: string) {
  addLog('表头事件', `操作表头下拉菜单 - 命令: ${command}`)
}

function toggleCustomMode() {
  useSlotMode.value = !useSlotMode.value
  addLog('模式切换', `切换到${useSlotMode.value ? 'Slot' : 'Render'}模式`)
}
</script>

<style scoped>
:deep(.el-collapse-item__content) {
  padding: 12px !important;
}
</style>
