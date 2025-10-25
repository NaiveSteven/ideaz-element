<template>
  <div>
    <h3>Virtual Table – Header Customization</h3>

    <div style="margin-bottom: 16px;">
      <el-space>
        <el-button @click="toggleCustomMode">
          {{ useSlotMode ? 'Switch to Render mode' : 'Switch to Slot mode' }}
        </el-button>
        <el-text type="info">Current mode: {{ useSlotMode ? 'Slot mode' : 'Render function' }}</el-text>
      </el-space>
    </div>

    <el-alert
      title="✅ Header customization"
      type="success"
      :closable="false"
      style="margin-bottom: 16px;"
    >
      <template #default>
        <p><strong>✅ Render function</strong>: Customize headers via render functions</p>
        <p><strong>✅ Slot mode</strong>: Customize headers via slots</p>
        <p><strong>✅ Icon support</strong>: Icons, hints, badges, and other rich content</p>
        <p><strong>✅ Interaction support</strong>: Click handlers and interactive elements in headers</p>
        <p><strong>✅ Style customization</strong>: Full control over layout and styling</p>
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
      <!-- Slot-based header customization -->
      <template #user-header>
        <div style="display: flex; gap: 6px; align-items: center;">
          <el-icon color="#409eff" size="16"><User /></el-icon>
          <span>User info</span>
          <el-tooltip content="Includes user name, email, and other basic information" placement="top">
            <el-icon color="#909399" size="14" style="cursor: help;"><QuestionFilled /></el-icon>
          </el-tooltip>
        </div>
      </template>

      <template #department-header>
        <div style="display: flex; gap: 6px; align-items: center;">
          <el-icon color="#67c23a" size="16"><OfficeBuilding /></el-icon>
          <span>Department info</span>
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
          <span>Salary</span>
          <el-tag size="small" type="warning">¥{{ avgSalary }}</el-tag>
        </div>
      </template>

      <template #status-header>
        <div style="display: flex; gap: 6px; align-items: center;">
          <el-icon color="#909399" size="16"><SwitchButton /></el-icon>
          <span>Employment status</span>
          <div style="display: flex; gap: 4px;">
            <el-tag size="small" type="success">{{ activeCount }} active</el-tag>
            <el-tag size="small" type="info">{{ inactiveCount }} inactive</el-tag>
          </div>
        </div>
      </template>

      <template #actions-header>
        <div style="display: flex; gap: 6px; align-items: center;">
          <el-icon color="#e6a23c" size="16"><Setting /></el-icon>
          <span>Actions</span>
          <el-dropdown @command="handleHeaderCommand">
            <el-icon style="cursor: pointer;" color="#409eff"><More /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="export">Export data</el-dropdown-item>
                <el-dropdown-item command="import">Import data</el-dropdown-item>
                <el-dropdown-item command="settings">Column settings</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </template>
    </z-table>

    <!-- Parameter logs -->
    <div style="margin-top: 16px;">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item title="Latest parameter logs" name="1">
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

// Generate mock data
function generateData() {
  const departments = ['Engineering', 'Marketing', 'Product', 'Operations', 'Design']
  const data = []
  for (let i = 1; i <= 2000; i++) {
    data.push({
      id: i,
      name: `User ${i}`,
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

// Derived statistics
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

// Append log entry
function addLog(type: string, message: string, params?: any) {
  const timestamp = new Date().toLocaleTimeString()
  paramLogs.value.unshift({
    timestamp,
    type,
    message,
    params
  })

  // Keep only the latest 20 logs
  if (paramLogs.value.length > 20) {
    paramLogs.value = paramLogs.value.slice(0, 20)
  }

  // eslint-disable-next-line no-console
  console.log(`[${type}]`, message, params)
}

// Column config
const columns = computed(() => [
  {
    type: 'index',
    label: 'Index',
  },
  {
    prop: 'name',
    // Choose header behavior based on mode
    ...(useSlotMode.value ? {
      label: 'user-header'
    } : {
      label: (scope: any) => {
        addLog('Header render', 'User info header render', scope)
        return h('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' }
        }, [
          h('el-icon', { color: '#409eff', size: 16 }, [h(User)]),
          h('span', {}, () => 'User info'),
          h('el-tooltip', {
            content: 'Includes user name, email, and other core details',
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
    label: 'Email',
  },
  {
    prop: 'age',
    label: 'Age',
  },
  {
    prop: 'department',
    ...(useSlotMode.value ? {
      label: 'department-header'
    } : {
      label: (scope: any) => {
        addLog('Header render', 'Department header render', scope)
        return h('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' }
        }, [
          h('el-icon', { color: '#67c23a', size: 16 }, [h(OfficeBuilding)]),
          h('span', {}, () => 'Department info'),
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
        addLog('Header render', 'Salary header render', scope)
        return h('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center', cursor: 'pointer' },
          onClick: handleSalaryHeaderClick
        }, [
          h('el-icon', { color: '#f56c6c', size: 16 }, [h(Money)]),
          h('span', {}, () => 'Salary'),
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
        addLog('Header render', 'Status header render', scope)
        return h('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' }
        }, [
          h('el-icon', { color: '#909399', size: 16 }, [h(SwitchButton)]),
          h('span', {}, () => 'Employment status'),
          h('div', {
            style: { display: 'flex', gap: '4px' }
          }, [
            h('el-tag', {
              size: 'small',
              type: 'success'
            }, `${activeCount.value} active`),
            h('el-tag', {
              size: 'small',
              type: 'info'
            }, `${inactiveCount.value} inactive`)
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
        addLog('Header render', 'Actions header render', scope)
        return h('div', {
          style: { display: 'flex', gap: '6px', alignItems: 'center' }
        }, [
          h('el-icon', { color: '#e6a23c', size: 16 }, [h(Setting)]),
          h('span', {}, () => 'Actions'),
          h('el-dropdown', {
            onCommand: handleHeaderCommand
          }, {
            default: () => h('el-icon', {
              style: { cursor: 'pointer' },
              color: '#409eff'
            }, [h(More)]),
            dropdown: () => h('el-dropdown-menu', {}, [
              h('el-dropdown-item', { command: 'export' }, () => 'Export data'),
              h('el-dropdown-item', { command: 'import' }, () => 'Import data'),
              h('el-dropdown-item', { command: 'settings' }, () => 'Column settings')
            ])
          })
        ])
      }
    })
  }
])

// Event handlers
function handleSalaryHeaderClick() {
  addLog('Header event', `Clicked salary header – average salary: ${avgSalary.value}`)
}

function handleHeaderCommand(command: string) {
  addLog('Header event', `Actions header dropdown – command: ${command}`)
}

function toggleCustomMode() {
  useSlotMode.value = !useSlotMode.value
  addLog('Mode toggle', `Switched to ${useSlotMode.value ? 'Slot' : 'Render'} mode`)
}
</script>

<style scoped>
:deep(.el-collapse-item__content) {
  padding: 12px !important;
}
</style>
