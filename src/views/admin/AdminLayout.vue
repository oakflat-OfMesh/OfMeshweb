<script setup lang="ts">
import { h, ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
// ✅ 关键修复：引入 NIcon
import { 
  NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NMenu, 
  NAvatar, NButton, NIcon 
} from 'naive-ui'
import { 
  DashboardOutlined, 
  SafetyCertificateOutlined, 
  UserOutlined, 
  IdcardOutlined, 
  FileProtectOutlined,
  LogoutOutlined
} from '@vicons/antd'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const activeKey = ref<string>(route.name as string)

watch(() => route.name, (newName) => {
  activeKey.value = newName as string
})

const menuOptions = [
  {
    label: '仪表盘',
    key: 'AdminDashboard',
    icon: () => h(DashboardOutlined),
    onClick: () => router.push({ name: 'AdminDashboard' })
  },
  {
    label: '工单中心',
    key: 'OpsCenter',
    icon: () => h(SafetyCertificateOutlined),
    onClick: () => router.push({ name: 'OpsCenter' })
  },
  {
    label: '用户管理',
    key: 'UserLookup',
    icon: () => h(UserOutlined),
    onClick: () => router.push({ name: 'UserLookup' })
  },
  {
    label: '徽章申请',
    key: 'BadgeOps',
    icon: () => h(IdcardOutlined),
    onClick: () => router.push({ name: 'BadgeOps' })
  },
  {
    label: '审计日志',
    key: 'AuditLog',
    icon: () => h(FileProtectOutlined),
    onClick: () => router.push({ name: 'AuditLog' })
  }
]

const handleLogout = () => {
  userStore.logout()
}
</script>

<template>
  <n-layout has-sider class="h-screen">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      show-trigger
      class="bg-gray-50 dark:bg-gray-900"
    >
      <div class="h-16 flex items-center justify-center font-bold text-xl tracking-wider text-green-600 border-b border-gray-200 dark:border-gray-800">
        OfMesh
      </div>
      <n-menu
        v-model:value="activeKey"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
      />
    </n-layout-sider>

    <n-layout>
      <n-layout-header bordered class="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-900">
        <div class="text-lg font-medium text-gray-700 dark:text-gray-200">
          管理控制台
        </div>
        
        <div class="flex items-center gap-4">
           <span class="text-gray-500 text-sm hidden md:block">管理员</span>
           <n-avatar round size="small" :src="userStore.avatarUrl" />
           <n-button text size="small" @click="handleLogout">
             <template #icon>
               <n-icon><LogoutOutlined /></n-icon>
             </template>
             退出
           </n-button>
        </div>
      </n-layout-header>

      <n-layout-content content-style="padding: 24px;" class="bg-gray-100 dark:bg-black/20">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>