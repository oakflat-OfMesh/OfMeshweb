<script setup lang="ts">
import { ref, h } from 'vue'
import { 
  NCard, NInputGroup, NInput, NButton, NDataTable, NTag, NSpace, useMessage, NIcon 
} from 'naive-ui'
import { Search, Copy, UserX, UserCheck } from 'lucide-vue-next' // 使用 lucide 图标保持风格统一
import adminApi, { type UserSummary } from '@/api/admin'

const message = useMessage()
const loading = ref(false)
const searchText = ref('')
const data = ref<UserSummary[]>([])

// === 表格列定义 ===
const columns = [
  { 
    title: 'ID', 
    key: 'id', 
    width: 80,
    render(row: UserSummary) {
      // 点击 ID 自动复制，方便发徽章
      return h('span', {
        class: 'cursor-pointer hover:text-indigo-500 font-mono flex items-center gap-1',
        title: '点击复制 ID',
        onClick: () => copyId(String(row.id))
      }, [
        row.id,
        h(NIcon, { size: 12, component: Copy })
      ])
    }
  },
  { title: '用户名', key: 'username', width: 150 },
  { title: '邮箱', key: 'email', width: 200 },
  { 
    title: '角色', 
    key: 'role',
    width: 100,
    render(row: UserSummary) {
      const type = row.role === 'ADMIN' ? 'error' : 'info'
      return h(NTag, { type, size: 'small', bordered: false }, () => row.role)
    }
  },
  { 
    title: '状态', 
    key: 'status',
    width: 100,
    render(row: UserSummary) {
      return h(NTag, { 
        type: row.status === 'active' ? 'success' : 'warning', 
        size: 'small', 
        bordered: false 
      }, () => row.status === 'active' ? '正常' : '封禁')
    }
  },
  {
    title: '操作',
    key: 'actions',
    render(row: UserSummary) {
      return h(NSpace, {}, () => [
        h(NButton, { 
          size: 'small', 
          type: 'error', 
          secondary: true,
          disabled: row.role === 'ADMIN', // 不能封禁管理员
          onClick: () => handleBan(row)
        }, { icon: () => h(NIcon, { component: UserX }), default: () => '封禁' })
      ])
    }
  }
]

// === 核心逻辑 ===

const handleSearch = async () => {
  if (!searchText.value) return
  loading.value = true
  
  try {
    const res: any = await adminApi.searchUsers(searchText.value)
    data.value = res.data || []
    if (data.value.length === 0) message.info('未找到匹配用户')
  } catch (e) {
    // ⚠️ 如果后端还没写搜索接口，我们这里用 Mock 数据演示，保证你能够测试 UI
    console.warn('Search API missing, using mock data')
    data.value = [
      { id: 1001, username: 'Notch', email: 'creator@mc.net', role: 'USER', status: 'active', createdAt: '2025-01-01' },
      { id: 1002, username: 'Steve', email: 'steve@minecraft.com', role: 'ADMIN', status: 'active', createdAt: '2025-01-02' },
      { id: 1003, username: 'Griefer', email: 'bad@guy.com', role: 'USER', status: 'banned', createdAt: '2025-01-05' },
    ]
    message.warning('演示模式：使用的是虚拟数据')
  } finally {
    loading.value = false
  }
}

const copyId = (id: string) => {
  navigator.clipboard.writeText(id)
  message.success(`ID ${id} 已复制`)
}

const handleBan = (row: UserSummary) => {
  message.warning(`正在请求封禁用户: ${row.username} (后端接口待对接)`)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-slate-800 dark:text-white">用户检索</h2>
    </div>

    <n-card :bordered="false" class="shadow-sm rounded-xl">
      <div class="mb-6 max-w-xl">
        <n-input-group>
          <n-input 
            v-model:value="searchText" 
            placeholder="输入用户名 / 邮箱 / ID" 
            @keyup.enter="handleSearch"
            size="large"
          />
          <n-button type="primary" size="large" @click="handleSearch" :loading="loading">
            <template #icon>
              <n-icon :component="Search" />
            </template>
            查询
          </n-button>
        </n-input-group>
        <p class="text-xs text-gray-400 mt-2 ml-1">提示：输入任意内容搜索，若后端接口未就绪将显示演示数据。</p>
      </div>

      <n-data-table
        :columns="columns"
        :data="data"
        :loading="loading"
        :bordered="false"
        :single-line="false"
        striped
      />
    </n-card>
  </div>
</template>