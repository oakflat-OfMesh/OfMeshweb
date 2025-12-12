<script setup lang="ts">
import { ref, computed } from 'vue';
import { Copy, Check, Signal, Users, ShieldCheck } from 'lucide-vue-next';
import type { MinecraftServer } from '@/types/server';

const props = defineProps<{
  server: MinecraftServer;
}>();

const copied = ref(false);

// 复制 IP 功能
const copyIp = () => {
  navigator.clipboard.writeText(props.server.ip);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};

// 计算 Ping 颜色
const pingColor = computed(() => {
  if (props.server.status !== 'online') return 'text-slate-500';
  if (props.server.ping < 50) return 'text-green-500';
  if (props.server.ping < 150) return 'text-yellow-500';
  return 'text-red-500';
});

// 计算人数百分比
const playerPercent = computed(() => {
  return Math.min(100, (props.server.players.current / props.server.players.max) * 100) + '%';
});
</script>

<template>
  <div class="group relative bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-xl hover:border-indigo-500/30 transition-all duration-300 flex flex-col h-full">
    
    <div class="relative h-32 overflow-hidden">
      <div class="absolute inset-0 bg-slate-900/10 z-10"></div>
      <img :src="server.cover" alt="cover" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      
      <div class="absolute top-2 right-2 z-20 flex items-center gap-2">
        <span v-if="server.isVerified" class="bg-indigo-600/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <ShieldCheck :size="10" /> 官方认证
        </span>
        <span 
          class="text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur border"
          :class="server.status === 'online' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'"
        >
          {{ server.status === 'online' ? 'Online' : 'Offline' }}
        </span>
      </div>
    </div>

    <div class="p-4 flex-1 flex flex-col">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-500 transition-colors">
          {{ server.name }}
        </h3>
      </div>

      <p class="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 h-8">
        {{ server.motd }}
      </p>

      <div class="flex flex-wrap gap-1.5 mb-auto">
        <span class="px-1.5 py-0.5 bg-slate-100 dark:bg-white/5 text-[10px] text-slate-500 rounded border border-slate-200 dark:border-white/5">
          {{ server.version }}
        </span>
        <span v-for="tag in server.tags.slice(0, 3)" :key="tag" class="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-500/10 text-[10px] text-indigo-600 dark:text-indigo-400 rounded border border-indigo-100 dark:border-indigo-500/20">
          {{ tag }}
        </span>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500">
        
        <div class="flex items-center gap-1.5 flex-1 mr-4">
          <Users :size="14" />
          <div class="flex-1 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-indigo-500 rounded-full" :style="{ width: playerPercent }"></div>
          </div>
          <span class="font-mono">{{ server.players.current }}</span>
        </div>

        <div class="flex items-center gap-1" :class="pingColor">
          <Signal :size="14" />
          <span class="font-mono">{{ server.ping }}ms</span>
        </div>
      </div>
    </div>

    <div class="absolute inset-0 bg-indigo-900/90 backdrop-blur-sm z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer" @click="copyIp">
      <div class="text-center">
        <div class="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 text-white">
          <Check v-if="copied" :size="24" />
          <Copy v-else :size="24" />
        </div>
        <p class="text-white font-bold text-lg">{{ copied ? '已复制!' : '点击复制 IP' }}</p>
        <p class="text-indigo-200 text-xs font-mono mt-1">{{ server.ip }}</p>
      </div>
    </div>

  </div>
</template>