<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Search, Filter, Globe, Zap, Clock } from 'lucide-vue-next';
import ServerCard from '@/components/server/ServerCard.vue';
import { ServerService } from '@/api/server';
import type { MinecraftServer } from '@/types/server';

const servers = ref<MinecraftServer[]>([]);
const isLoading = ref(true);
const searchQuery = ref('');
const activeFilter = ref('all');

// 模拟筛选逻辑
const filteredServers = computed(() => {
  if (!searchQuery.value) return servers.value;
  const q = searchQuery.value.toLowerCase();
  return servers.value.filter(s => 
    s.name.toLowerCase().includes(q) || 
    s.tags.some(t => t.toLowerCase().includes(q))
  );
});

onMounted(async () => {
  isLoading.value = true;
  try {
    servers.value = await ServerService.getServers();
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen pt-24 pb-20 px-4 sm:px-6 bg-slate-50 dark:bg-[#09090b]">
    <div class="container mx-auto max-w-7xl">
      
      <div class="relative bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 md:p-12 mb-12 overflow-hidden text-white shadow-2xl">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599582236376-7917e3845b4b?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div class="relative z-10 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-bold mb-4 border border-white/20">
            <Globe :size="12" class="text-green-400" />
            <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            全球 12,405 个服务器在线
          </div>
          <h1 class="text-4xl md:text-5xl font-black mb-4 tracking-tight">寻找你的下一个<br/>多人冒险世界</h1>
          <p class="text-indigo-200 text-lg mb-8">OfMesh 严选服务器列表。实时监控，拒绝虚假数据。</p>
          
          <div class="relative max-w-lg">
            <Search :size="20" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="搜索服务器名称、玩法或版本 (e.g. 1.20.1 PVP)..." 
              class="w-full pl-12 pr-4 py-4 bg-white text-slate-900 rounded-xl shadow-lg font-medium outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div class="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
          <button 
            v-for="filter in ['全部', '官方认证', '生存', '创造', '小游戏', 'PVP']" 
            :key="filter"
            class="px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors border"
            :class="filter === '全部' ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black' : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-indigo-500 hover:text-indigo-500'"
          >
            {{ filter }}
          </button>
        </div>
        
        <div class="flex items-center gap-2 text-sm text-slate-500">
          <button class="flex items-center gap-1 hover:text-indigo-500 transition-colors">
            <Zap :size="16" /> 按热度
          </button>
          <span class="text-slate-300">|</span>
          <button class="flex items-center gap-1 hover:text-indigo-500 transition-colors">
            <Clock :size="16" /> 按延迟
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="h-80 bg-white dark:bg-[#121215] rounded-2xl border border-slate-200 dark:border-white/5 animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ServerCard 
          v-for="server in filteredServers" 
          :key="server.id" 
          :server="server" 
        />
      </div>

      <div v-if="!isLoading && filteredServers.length === 0" class="text-center py-20">
        <div class="inline-block p-4 bg-slate-100 dark:bg-white/5 rounded-full mb-4">
          <Filter :size="32" class="text-slate-400" />
        </div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">没有找到相关服务器</h3>
        <p class="text-slate-500">尝试更换搜索词或筛选条件</p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>