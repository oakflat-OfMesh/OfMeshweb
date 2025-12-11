<script setup lang="ts">
import { Search, Skull } from 'lucide-vue-next';
import ModpackSidebar from '@/components/ModpackSidebar.vue';
import ModpackDetail from '@/components/ModpackDetail.vue';

// 未来可以在这里接入 Search 的 v-model，传给 useModpacks 进行过滤
</script>

<template>
  <div class="min-h-screen pt-24 pb-12 px-6 transition-colors duration-500 bg-slate-50 dark:bg-[#09090b] flex flex-col">
    
    <div class="container mx-auto flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <Skull :size="32" class="text-red-600" /> 硬核整合包
        </h1>
        <p class="text-slate-500 mt-2 text-sm">精选社区最顶尖的整合包，一键同步 PCL。</p>
      </div>
      
      <div class="relative w-64 hidden md:block">
        <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="搜索整合包..." class="w-full bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500 transition-all" />
      </div>
    </div>

    <div class="container mx-auto flex-1 flex flex-col lg:flex-row gap-6 lg:h-[600px]">
      
      <div class="w-full lg:w-[35%] h-full">
        <ModpackSidebar />
      </div>

      <div class="w-full lg:w-[65%] h-full">
        <ModpackDetail />
      </div>

    </div>
  </div>
</template>