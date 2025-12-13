<script setup lang="ts">
import { ref, onMounted } from 'vue';
// ❌ 删除: import { useAuth } from '@/composables/useAuth';
// ✅ 新增: Pinia Store
import { useUserStore } from '@/stores/user';
import UserBadgeList from '@/components/UserBadgeList.vue';
import { 
  MapPin, Calendar, Edit3, Settings, Share2, Box, Heart 
} from 'lucide-vue-next';

// 1. 初始化 Store
const userStore = useUserStore();
const activeTab = ref('overview');

// 2. 挂载时刷新数据 (确保是最新的用户信息)
onMounted(() => {
  userStore.fetchCurrentUser();
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-black pt-20 pb-12 transition-colors duration-500">
    
    <div class="h-60 w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 20px 20px;"></div>
      <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-black to-transparent"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
      
      <div class="bg-white dark:bg-[#111] rounded-2xl shadow-xl border border-slate-200 dark:border-white/5 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-end">
        
        <div v-if="!userStore.user" class="w-full py-10 text-center text-slate-500">
          <div class="animate-pulse flex flex-col items-center">
             <div class="h-32 w-32 bg-slate-200 dark:bg-white/10 rounded-2xl mb-4"></div>
             <div class="h-8 w-48 bg-slate-200 dark:bg-white/10 rounded mb-2"></div>
             <div class="h-4 w-64 bg-slate-200 dark:bg-white/10 rounded"></div>
             <p class="mt-4 text-xs">正在连接 OfMesh 神经元...</p>
          </div>
        </div>

        <template v-else>
          <div class="relative group">
            <div class="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 p-1 shadow-lg ring-4 ring-slate-50 dark:ring-black">
               <div class="w-full h-full bg-slate-800 rounded-xl flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
                 <img :src="userStore.avatarUrl" class="w-full h-full object-cover" />
               </div>
            </div>
            <button class="absolute bottom-2 right-2 bg-slate-900 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer">
              <Edit3 :size="14" />
            </button>
          </div>

          <div class="flex-1 space-y-2 mb-1">
            <div class="flex flex-wrap items-center gap-3">
               <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                 {{ userStore.user.username }}
               </h1>
               
               <span class="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-500/30">
                 {{ userStore.displayRole }}
               </span>
               
               <span class="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-500/30">
                 Lv.{{ userStore.user.level || 0 }}
               </span>

               <UserBadgeList :badges="userStore.user.badges || []" mode="full" />
            </div>

            <p class="text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
               {{ userStore.user.bio || '这个人很懒，什么都没写。' }}
            </p>

            <div class="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium pt-1">
               <span class="flex items-center gap-1"><MapPin :size="12" /> Minecraft Server: NA</span>
               <span class="flex items-center gap-1">
                 <Calendar :size="12" /> 
                 加入于 {{ new Date(userStore.user.createdAt || Date.now()).toLocaleDateString() }}
               </span>
               <span class="font-mono text-slate-300 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded">
                 {{ userStore.displayId }}
               </span>
            </div>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <button class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors">
              <Share2 :size="16" /> 分享
            </button>
            <button class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
              <Settings :size="16" /> 编辑资料
            </button>
          </div>
        </template>
      </div>

      <div class="mt-8 border-b border-slate-200 dark:border-white/10">
        <nav class="flex gap-8" aria-label="Tabs">
          <button 
             v-for="tab in ['Overview', 'Projects', 'Collections']" 
             :key="tab"
             @click="activeTab = tab.toLowerCase()"
             class="pb-4 px-1 border-b-2 font-bold text-sm transition-all"
             :class="activeTab === tab.toLowerCase() 
               ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400' 
               : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
          >
            {{ tab }}
          </button>
        </nav>
      </div>

      <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div class="lg:col-span-2 space-y-6">
            <div class="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 rounded-2xl p-8 text-center py-20">
               <div class="mx-auto w-16 h-16 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 text-slate-300">
                  <Box :size="32" />
               </div>
               <h3 class="text-lg font-bold text-slate-900 dark:text-white">暂无动态</h3>
            </div>
         </div>
         <div class="space-y-6">
            <div class="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 rounded-2xl p-5">
               <h3 class="font-bold text-slate-900 dark:text-white mb-4 text-sm">创造者数据</h3>
               <div class="space-y-4">
                  <div class="flex justify-between items-center text-sm">
                     <span class="text-slate-500 flex items-center gap-2"><Box :size="14" /> 发布作品</span>
                     <span class="font-mono font-bold dark:text-white">0</span>
                  </div>
                  <div class="flex justify-between items-center text-sm">
                     <span class="text-slate-500 flex items-center gap-2"><Heart :size="14" /> 获得赞</span>
                     <span class="font-mono font-bold dark:text-white">0</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>
  </div>
</template>