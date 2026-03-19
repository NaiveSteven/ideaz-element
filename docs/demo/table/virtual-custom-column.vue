<template>
  <div>
    <h3>Virtual Table – Column Customization</h3>

    <div style="margin-bottom: 16px;">
      <el-space>
        <el-button @click="toggleCustomMode">
          {{ useSlotMode ? 'Switch to Render mode' : 'Switch to Slot mode' }}
        </el-button>
        <el-text type="info">Current mode: {{ useSlotMode ? 'Slot mode' : 'Render function' }}</el-text>
      </el-space>
    </div>

    <el-alert
      title="✅ Column customization"
      type="success"
      :closable="false"
      style="margin-bottom: 16px;"
    >
      <template #default>
        <p><strong>✅ Render function</strong>: Customize column content via a render function</p>
        <p><strong>✅ Slot mode</strong>: Customize column content via slots</p>
        <p><strong>✅ Parameter passing</strong>: Full scope payload including row, column, cellData, $index, etc.</p>
        <p><strong>✅ Event support</strong>: Bind events and interactions inside custom content</p>
        <p><strong>✅ Component support</strong>: Works with any Element Plus component</p>
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
      <!-- Slot-based column customization -->
      <template #avatar-slot="scope">
        <div style="display: flex; gap: 8px; align-items: center;">
          <el-avatar :size="32" :src="scope.row.avatar" />
          <div>
            <div style="font-weight: bold;">{{ scope.row.name }}</div>
            <div style="font-size: 12px; color: #909399;">{{ scope.row.email }}</div>
          </div>
        </div>
      </template>

      <template #salary-slot="scope">
        <div @click="handleSalaryClick(scope)" style="cursor: pointer;">
          <el-tag
            :type="scope.row.salary > 8000 ? 'success' : scope.row.salary > 6000 ? 'warning' : 'danger'"
            effect="dark"
          >
            <el-icon style="margin-right: 4px;"><Money /></el-icon>
            ¥{{ scope.row.salary.toLocaleString() }}
          </el-tag>
        </div>
      </template>

      <template #status-slot="scope">
        <el-switch
          v-model="scope.row.status"
          active-value="active"
          inactive-value="inactive"
          active-text="Active"
          inactive-text="Inactive"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          @change="handleStatusChange(scope)"
        />
      </template>

      <template #progress-slot="scope">
        <div style="display: flex; gap: 8px; align-items: center;">
          <el-progress
            :percentage="scope.row.progress"
            :stroke-width="8"
            :show-text="false"
            style="min-width: 50px"
          />
          <span style="min-width: 35px; font-size: 12px; color: #606266;">
            {{ scope.row.progress }}%
          </span>
        </div>
      </template>

      <template #actions-slot="scope">
        <el-space size="small">
          <el-button
            size="small"
            type="primary"
            :icon="Edit"
            @click="handleEdit(scope)"
          >
            Edit
          </el-button>
          <el-button
            size="small"
            type="success"
            :icon="View"
            @click="handleView(scope)"
          >
            View
          </el-button>
          <el-popconfirm
            title="Are you sure you want to delete?"
            @confirm="handleDelete(scope)"
          >
            <template #reference>
              <el-button
                size="small"
                type="danger"
                :icon="Delete"
              >
                Delete
              </el-button>
            </template>
          </el-popconfirm>
        </el-space>
      </template>
    </z-table>

    <!-- Parameter logs -->
    <div style="margin-top: 16px;">
      <el-collapse v-model="activeCollapse">
        <el-collapse-item title="Latest parameter logs" name="1">
          <div style="max-height: 200px; padding: 12px; border-radius: 4px; background: #f5f7fa; overflow-y: auto;">
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
import { Delete, Edit, Money, View } from '@element-plus/icons-vue'
import { ElAvatar, ElIcon, ElSwitch, ElProgress, ElSpace, ElButton, ElPopconfirm, ElTag } from 'element-plus'

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
      progress: Math.floor(Math.random() * 100),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`,
    })
  }
  return data
}

const tableData = ref(generateData())
const tableRef = ref()
const useSlotMode = ref(true)
const activeCollapse = ref(['1'])
const paramLogs = ref<any[]>([])

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
    label: 'User Info',
    // Choose render or slot mode
    ...(useSlotMode.value ? {
      slot: 'avatar-slot'
    } : {
      render: (scope: any) => {
        return h('div', {
          style: { display: 'flex', gap: '8px', alignItems: 'center' }
        }, [
          h(ElAvatar, {
            size: 32,
            src: scope.row.avatar
          }),
          h('div', {}, [
            h('div', { style: { fontWeight: 'bold' } }, scope.row.name),
            h('div', {
              style: { fontSize: '12px', color: '#909399' }
            }, scope.row.email)
          ])
        ])
      }
    })
  },
  {
    prop: 'department',
    label: 'Department',
  },
  {
    prop: 'age',
    label: 'Age',
  },
  {
    prop: 'salary',
    label: 'Salary',
    ...(useSlotMode.value ? {
      slot: 'salary-slot'
    } : {
      render: (scope: any) => {
        const getType = (salary: number) => {
          if (salary > 8000) return 'success'
          if (salary > 6000) return 'warning'
          return 'danger'
        }
        return h('div', {
          onClick: () => handleSalaryClick(scope),
          style: { cursor: 'pointer' }
        }, [
          h(ElTag, {
            type: getType(scope.row.salary),
            effect: 'dark'
          }, {
            default: () => [
              h(ElIcon, { style: { marginRight: '4px' } }, {
                default: () => h(Money)
              }),
              `¥${scope.row.salary.toLocaleString()}`
            ]
          })
        ])
      }
    })
  },
  {
    prop: 'status',
    label: 'Status',
    ...(useSlotMode.value ? {
      slot: 'status-slot'
    } : {
      render: (scope: any) => {
        return h(ElSwitch, {
          modelValue: scope.row.status,
          activeValue: 'active',
          inactiveValue: 'inactive',
          activeText: 'Active',
          inactiveText: 'Inactive',
          style: '--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949',
          'onUpdate:modelValue': (value: string) => {
            scope.row.status = value
            handleStatusChange(scope)
          }
        })
      }
    })
  },
  {
    prop: 'progress',
    label: 'Project Progress',
    ...(useSlotMode.value ? {
      slot: 'progress-slot'
    } : {
      render: (scope: any) => {
        return h('div', {
          style: { display: 'flex', gap: '8px', alignItems: 'center' }
        }, [
          h(ElProgress, {
            percentage: scope.row.progress,
            strokeWidth: 8,
            showText: false,
            style: { minWidth: '50px' }
          }),
          h('span', {
            style: { minWidth: '35px', fontSize: '12px', color: '#606266' }
          }, `${scope.row.progress}%`)
        ])
      }
    })
  },
  {
    prop: 'actions',
    label: 'Actions',
    fixed: 'right',
    ...(useSlotMode.value ? {
      slot: 'actions-slot'
    } : {
      render: (scope: any) => {
        return h(ElSpace, { size: 'small' }, {
          default: () => [
            h(ElButton, {
              size: 'small',
              type: 'primary',
              icon: Edit,
              onClick: () => handleEdit(scope)
            }, {
              default: () => 'Edit'
            }),
            h(ElButton, {
              size: 'small',
              type: 'success',
              icon: View,
              onClick: () => handleView(scope)
            }, {
              default: () => 'View'
            }),
            h(ElPopconfirm, {
              title: 'Are you sure you want to delete?',
              onConfirm: () => handleDelete(scope)
            }, {
              reference: () => h(ElButton, {
                size: 'small',
                type: 'danger',
                icon: Delete
              }, {
                default: () => 'Delete'
              })
            })
          ]
        })
      }
    })
  }
])

// Event handlers
function handleSalaryClick(scope: any) {
  addLog('Slot event', `Clicked salary - row ${scope.$index}, user: ${scope.row.name}, salary: ${scope.row.salary}`, scope)
}

function handleStatusChange(scope: any) {
  addLog('Slot event', `Status changed - row ${scope.$index}, user: ${scope.row.name}, new status: ${scope.row.status}`, scope)
}

function handleEdit(scope: any) {
  addLog('Slot event', `Edit user - row ${scope.$index}, user: ${scope.row.name}`, scope)
}

function handleView(scope: any) {
  addLog('Slot event', `View user - row ${scope.$index}, user: ${scope.row.name}`, scope)
}

function handleDelete(scope: any) {
  addLog('Slot event', `Delete user - row ${scope.$index}, user: ${scope.row.name}`, scope)
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
