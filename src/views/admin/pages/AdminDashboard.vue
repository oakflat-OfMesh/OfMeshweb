<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  NGrid, NGi, NCard, NStatistic, NIcon, NSkeleton, NSpace, NButton 
} from 'naive-ui'
import { 
  UserOutlined, 
  CloudServerOutlined, 
  AuditOutlined, 
  ArrowUpOutlined 
} from '@vicons/antd'
import adminApi from '@/api/admin'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(true)

// 默认数据结构
const stats = ref({
  userCount: 0,
  serverCount: 0,
  pendingTickets: 0,
  serverGrowth: 0 // 假设后端返回了增长率
})

// 初始化获取数据
onMounted(async () => {
  try {
    // 真实请求（如果后端还没写好这个接口，这行可能会报错，先用 catch 兜底）
    const res = await adminApi.getDashboardStats()
    stats.value = res.data || res // 根据你的 axios 拦截器调整
  } catch (e) {
    console.warn('Dashboard stats fetch failed, using mock data for UI preview')
    // === Mock 数据 (演示用，后端好了删掉这块) ===
    setTimeout(() => {
      stats.value = {
        userCount: 12580,
        serverCount: 42,
        pendingTickets: 5,
        serverGrowth: 12
      }
    }, 500)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
        仪表盘
      </h2>
      <span class="text-gray-500 text-sm">上次登录: 刚刚</span>
    </div>

    <n-grid x-gap="12" y-gap="12" cols="1 s:2 m:4" responsive="screen">
      <n-gi>
        <n-card :bordered="false" class="shadow-sm rounded-xl">
          <n-skeleton v-if="loading" text :repeat="2" />
          <n-statistic v-else label="注册用户">
            <template #prefix>
              <n-icon :component="UserOutlined" color="#10b981" />
            </template>
            {{ stats.userCount.toLocaleString() }}
          </n-statistic>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card :bordered="false" class="shadow-sm rounded-xl">
          <n-skeleton v-if="loading" text :repeat="2" />
          <n-statistic v-else label="在线服务器">
            <template #prefix>
              <n-icon :component="CloudServerOutlined" color="#3b82f6" />
            </template>
            {{ stats.serverCount }}
            <template #suffix>
              <span class="text-xs text-green-500 flex items-center">
                <n-icon :component="ArrowUpOutlined" /> {{ stats.serverGrowth }}%
              </span>
            </template>
          </n-statistic>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card :bordered="false" class="shadow-sm rounded-xl">
          <n-skeleton v-if="loading" text :repeat="2" />
          <n-statistic v-else label="待审核工单">
            <template #prefix>
              <n-icon :component="AuditOutlined" color="#f59e0b" />
            </template>
            {{ stats.pendingTickets }}
          </n-statistic>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card :bordered="false" class="shadow-sm rounded-xl bg-green-50 dark:bg-green-900/20">
          <div class="h-full flex flex-col justify-center">
            <div class="text-gray-500 text-sm">系统状态</div>
            <div class="text-xl font-bold text-green-600 flex items-center gap-2">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              运行正常
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
        <n-card title="开发公告" :bordered="false" class="shadow-sm rounded-xl h-full">
          <ul class="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
            <li>后端接口 /admin/stats 尚未完全就绪，目前显示 Mock 数据。</li>
            <li>审计日志模块正在开发中。</li>
            <li>请勿在生产环境随意操作“删除用户”按钮。</li>
          </ul>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>