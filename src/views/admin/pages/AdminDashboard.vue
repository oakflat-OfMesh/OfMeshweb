<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  NGrid, NGi, NCard, NStatistic, NIcon, NSkeleton, NSpace, NButton, NTag 
} from 'naive-ui'
import { 
  UserOutlined, 
  WifiOutlined, // 替换之前的服务器图标，改用 Wifi 表示在线
  SafetyCertificateOutlined, 
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined
} from '@vicons/antd'
import adminApi from '@/api/admin'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(true)
let refreshTimer: number | null = null

// 数据模型 (对应后端 4.1 接口结构)
const stats = ref({
  users: {
    total: 0,
    newLast24h: 0,
    roles: { ADMIN: 0, MODERATOR: 0, USER: 0 }
  },
  online: {
    now: 0,
    windowSec: 120
  },
  privileged: {
    total: 0
  }
})

// 系统健康状态 (对应后端 2.1 接口)
const health = ref({
  status: 'UNKNOWN', // UP, DOWN
  db: { ok: false, latencyMs: 0 },
  redis: { ok: false, latencyMs: 0 }
})

const fetchData = async () => {
  try {
    // 并行请求两个接口
    const [statsRes, healthRes]: any = await Promise.all([
      adminApi.getOverviewStats(),
      adminApi.getSystemHealth()
    ])
    
    stats.value = statsRes.data || statsRes
    health.value = healthRes.data || healthRes
  } catch (e) {
    console.error('Dashboard data fetch failed', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
  // 每 30 秒自动刷新一次数据
  refreshTimer = setInterval(fetchData, 30000)
})

onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
        仪表盘
      </h2>
      <n-button size="small" secondary circle @click="fetchData">
        <template #icon><n-icon><SyncOutlined /></n-icon></template>
      </n-button>
    </div>

    <n-grid x-gap="12" y-gap="12" cols="1 s:2 m:4" responsive="screen">
      
      <n-gi>
        <n-card :bordered="false" class="shadow-sm rounded-xl">
          <n-skeleton v-if="loading" text :repeat="2" />
          <n-statistic v-else label="注册用户">
            <template #prefix>
              <n-icon :component="UserOutlined" color="#8b5cf6" />
            </template>
            {{ stats.users.total.toLocaleString() }}
            <template #suffix>
              <span class="text-xs text-gray-400 block mt-1">
                今日新增 +{{ stats.users.newLast24h }}
              </span>
            </template>
          </n-statistic>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card :bordered="false" class="shadow-sm rounded-xl">
          <n-skeleton v-if="loading" text :repeat="2" />
          <n-statistic v-else label="在线用户 (2min)">
            <template #prefix>
              <n-icon :component="WifiOutlined" color="#10b981" />
            </template>
            {{ stats.online.now }}
            <template #suffix>
              <span class="relative flex h-2 w-2 ml-1 mt-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </template>
          </n-statistic>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card :bordered="false" class="shadow-sm rounded-xl">
          <n-skeleton v-if="loading" text :repeat="2" />
          <n-statistic v-else label="拥有权限">
            <template #prefix>
              <n-icon :component="SafetyCertificateOutlined" color="#f59e0b" />
            </template>
            {{ stats.privileged.total }}
            <template #suffix>
              <span class="text-xs text-gray-400">人</span>
            </template>
          </n-statistic>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card :bordered="false" class="shadow-sm rounded-xl" 
          :class="health.status === 'UP' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'">
          <div class="h-full flex flex-col justify-center">
            <div class="text-gray-500 text-sm mb-1">系统状态</div>
            
            <n-skeleton v-if="loading" text />
            <div v-else class="flex items-center gap-2">
              <n-icon size="24" :color="health.status === 'UP' ? '#10b981' : '#ef4444'">
                <CheckCircleOutlined v-if="health.status === 'UP'" />
                <CloseCircleOutlined v-else />
              </n-icon>
              <span class="text-xl font-bold" :class="health.status === 'UP' ? 'text-green-600' : 'text-red-600'">
                {{ health.status === 'UP' ? '运行正常' : '系统异常' }}
              </span>
            </div>

            <div v-if="!loading" class="flex gap-2 mt-2">
              <n-tag size="small" :type="health.db.ok ? 'success' : 'error'" :bordered="false">
                DB {{ health.db.latencyMs }}ms
              </n-tag>
              <n-tag size="small" :type="health.redis.ok ? 'success' : 'error'" :bordered="false">
                Redis {{ health.redis.latencyMs }}ms
              </n-tag>
            </div>
          </div>
        </n-card>
      </n-gi>
    </n-grid>

    <n-grid x-gap="12" cols="1 m:2">
      <n-gi>
        <n-card title="快捷入口" :bordered="false" class="shadow-sm rounded-xl h-full">
          <n-space>
            <n-button secondary type="primary" @click="router.push({name: 'UserLookup'})">
              查询用户
            </n-button>
            <n-button secondary type="warning" @click="router.push({name: 'BadgeOps'})">
              徽章审批
            </n-button>
            <n-button secondary @click="router.push({name: 'AuditLog'})">
              查看日志
            </n-button>
          </n-space>
        </n-card>
      </n-gi>
      
      <n-gi>
        <n-card title="角色分布" :bordered="false" class="shadow-sm rounded-xl h-full">
           <n-space>
             <n-tag type="info">普通用户: {{ stats.users.roles.USER }}</n-tag>
             <n-tag type="warning">版主: {{ stats.users.roles.MODERATOR }}</n-tag>
             <n-tag type="error">管理员: {{ stats.users.roles.ADMIN }}</n-tag>
           </n-space>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>