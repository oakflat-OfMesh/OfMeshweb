<script setup lang="ts">
import { CheckCircle2, ShieldCheck, Download, Play } from 'lucide-vue-next';
import type { ModBaseInfo } from '@/types/mod';

defineProps<{
  info: ModBaseInfo;
  styles?: any; // 接收样式配置，虽然主要靠 CSS 变量，但保留扩展性
}>();
</script>

<template>
  <div class="relative h-[450px] w-full overflow-hidden group">
    
    <div class="absolute inset-0 z-0">
      <img 
        :src="info.bgImage" 
        :alt="info.title" 
        class="w-full h-full object-cover opacity-60 transition-transform duration-[20s] group-hover:scale-110" 
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-transparent dark:from-[#09090b] dark:via-[#09090b]/60 dark:to-transparent mix-blend-normal dark:mix-blend-multiply transition-colors duration-500"></div>
      
      <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-slate-50/80 dark:from-transparent dark:via-[#0f1115]/40 dark:to-[#0f1115] transition-colors duration-500"></div>
    </div>
    
    <div class="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
      
      <div class="flex flex-wrap items-center gap-3 mb-6 animate-in slide-in-from-bottom-4 fade-in duration-700">
        
        <span class="px-3 py-1 text-white text-xs font-bold rounded-full flex items-center gap-1.5 backdrop-blur-sm border border-white/10 bg-[var(--mod-primary)] shadow-[0_0_15px_var(--mod-primary-dim)] transition-colors">
          <CheckCircle2 :size="12" /> 官方认证
        </span>
        
        <span class="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold rounded-full flex items-center gap-1.5 backdrop-blur-md">
          <ShieldCheck :size="12" /> {{ info.tags.includes('S级优化') ? 'S级优化认证' : '常规优化' }}
        </span>
        
        <span class="px-3 py-1 bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/5 text-xs rounded-full flex items-center gap-2 backdrop-blur-md">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span class="font-mono font-bold text-slate-900 dark:text-white">{{ info.onlineCount.toLocaleString() }}</span> 人正在游玩
        </span>
      </div>
      
      <h1 class="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-4 tracking-tight drop-shadow-sm dark:drop-shadow-2xl animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100 transition-colors">
        {{ info.title }}
        
        <span class="block md:inline mt-2 md:mt-0 md:ml-4 text-2xl md:text-3xl font-light opacity-80 text-[var(--mod-primary)] transition-colors">
          {{ info.subtitle }}
        </span>
      </h1>
      
      <p class="text-slate-600 dark:text-slate-300 max-w-3xl text-lg mb-10 leading-relaxed drop-shadow-sm animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200 transition-colors">
        {{ info.description }}
      </p>

      <div class="flex flex-wrap gap-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
        
        <button class="px-8 py-3.5 text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-xl shadow-slate-900/10 dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] bg-[var(--mod-primary)] hover:brightness-110">
          <Download :size="20" /> 安装到 PCL 启动器
        </button>
        
        <button class="px-8 py-3.5 bg-white/50 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-white/80 dark:hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 backdrop-blur-md hover:border-[var(--mod-primary)] hover:text-[var(--mod-primary)]">
          <Play :size="20" /> 一键应用推荐配置
        </button>
      </div>

    </div>
  </div>
</template>