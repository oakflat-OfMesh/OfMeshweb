<script setup lang="ts">
import { CheckCircle2, ShieldCheck, Download, Play } from 'lucide-vue-next';
import type { ModBaseInfo } from '@/types/mod'; // ✅ 引入类型

defineProps<{
  info: ModBaseInfo
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
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/60 to-purple-900/20 mix-blend-multiply"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]"></div>
    </div>
    
    <div class="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
      
      <div class="flex flex-wrap items-center gap-3 mb-6 animate-in slide-in-from-bottom-4 fade-in duration-700">
        <span class="px-3 py-1 bg-purple-600/90 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg shadow-purple-500/20 flex items-center gap-1.5 backdrop-blur-sm border border-white/10">
          <CheckCircle2 :size="12" /> 官方认证
        </span>
        <span class="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold rounded-full flex items-center gap-1.5 backdrop-blur-md">
          <ShieldCheck :size="12" /> {{ info.tags.includes('S级优化') ? 'S级优化认证' : '常规优化' }}
        </span>
        <span class="px-3 py-1 bg-slate-900/60 text-slate-300 border border-white/5 text-xs rounded-full flex items-center gap-2 backdrop-blur-md">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span class="font-mono font-bold text-white">{{ info.onlineCount.toLocaleString() }}</span> 人正在游玩
        </span>
      </div>
      
      <h1 class="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-2xl animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100">
        {{ info.title }}
        <span class="block md:inline mt-2 md:mt-0 md:ml-4 text-2xl md:text-3xl font-light text-purple-300 opacity-80">
          {{ info.subtitle }}
        </span>
      </h1>
      
      <p class="text-slate-300 max-w-3xl text-lg mb-10 leading-relaxed drop-shadow-md animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
        {{ info.description }}
      </p>

      <div class="flex flex-wrap gap-4 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
        <button class="px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
          <Download :size="20" /> 安装到 PCL 启动器
        </button>
        <button class="px-8 py-3.5 bg-white/10 border border-white/10 text-white font-bold rounded-xl hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 backdrop-blur-md">
          <Play :size="20" /> 一键应用推荐配置
        </button>
      </div>

    </div>
  </div>
</template>