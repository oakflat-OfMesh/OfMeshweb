<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next';
import { useModpacks } from '@/composables/useModpacks';

// 直接使用 Composable，逻辑更解耦
const { modpacks, activePackId, setActivePack } = useModpacks();
</script>

<template>
  <div class="flex flex-col gap-3 overflow-y-auto p-2 custom-scrollbar h-full">
    <div 
      v-for="pack in modpacks" 
      :key="pack.id" 
      @mouseenter="setActivePack(pack.id)"
      class="relative p-4 rounded-xl cursor-pointer transition-all duration-200 border group mx-1"
      :class="activePackId === pack.id 
        ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white shadow-lg transform scale-[1.02]' 
        : 'bg-white dark:bg-[#121215] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20'"
    >
      <div class="flex items-center gap-4">
        <div class="text-3xl filter drop-shadow-sm">{{ pack.icon }}</div>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold text-lg leading-tight truncate"
            :class="activePackId === pack.id ? 'text-white dark:text-black' : 'text-slate-900 dark:text-white'">
            {{ pack.title }}
          </h3>
          <p class="text-xs truncate mt-0.5"
            :class="activePackId === pack.id ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500'">
            {{ pack.sub }}
          </p>
        </div>
        <ChevronRight :size="16" class="transition-transform duration-300"
          :class="activePackId === pack.id ? 'text-white dark:text-black translate-x-1' : 'text-slate-300 opacity-0 group-hover:opacity-100'" 
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 滚动条样式保留在这里，因为只对这个列表生效 */
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(156, 163, 175, 0.3); border-radius: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(156, 163, 175, 0.5); }
</style>