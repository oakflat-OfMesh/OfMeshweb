<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
// ❌ 删除: import { useAuth } from '@/composables/useAuth';
// ✅ 新增: Pinia Store
import { useUserStore } from '@/stores/user';
import { LayoutDashboard, Box, Settings, LogOut, Bell } from 'lucide-vue-next';

// 初始化 Store
const userStore = useUserStore();

const menuItems = [
  { name: '总览', path: '/dashboard', icon: LayoutDashboard },
  { name: '我的模组', path: '/dashboard/mods', icon: Box },
  { name: '账号设置', path: '/dashboard/settings', icon: Settings },
];

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    userStore.logout();
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#050505] flex">
    
    <aside class="w-64 bg-white dark:bg-[#09090b] border-r border-slate-200 dark:border-white/5 flex flex-col fixed h-full z-20">
      
      <div class="p-6 flex items-center justify-start">
        <RouterLink to="/" class="hover:opacity-80 transition-opacity" title="返回主页">
          <img src="@/assets/logoAI.png" alt="Logo" class="h-8 w-auto" />
        </RouterLink>
      </div>

      <nav class="flex-1 px-4 space-y-1">
        <RouterLink 
          v-for="item in menuItems" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-white"
          active-class="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold"
        >
          <component :is="item.icon" :size="18" />
          {{ item.name }}
        </RouterLink>
      </nav>

      <div class="p-4 border-t border-slate-200 dark:border-white/5">
        <button 
          @click="handleLogout"
          class="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
        >
          <LogOut :size="18" /> 退出登录
        </button>
      </div>
    </aside>

    <main class="flex-1 ml-64 min-w-0">
      
      <header class="h-16 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 sticky top-0 z-10 px-8 flex items-center justify-between">
        <h2 class="text-lg font-bold text-slate-800 dark:text-white">控制台</h2>
        
        <div class="flex items-center gap-4">
          <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full relative">
            <Bell :size="20" />
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <div class="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10">
            
            <div class="text-right hidden sm:block">
              <div class="text-sm font-bold text-slate-700 dark:text-white">
                {{ userStore.user?.username || '加载中...' }}
              </div>
              <div class="text-xs text-slate-400">
                <span class="text-indigo-500">Lv.{{ userStore.user?.level ?? 0 }}</span> 
                {{ userStore.displayRole }}
              </div>
            </div>

            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white dark:border-black flex items-center justify-center text-white font-bold text-sm overflow-hidden">
               <img :src="userStore.avatarUrl" class="w-full h-full object-cover" />
            </div>

          </div>
        </div>
      </header>

      <div class="p-8">
        <RouterView />
      </div>
    </main>

  </div>
</template>