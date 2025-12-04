<script setup lang="ts">
import { Cpu } from 'lucide-vue-next';
import type { PerformanceStat } from '@/types/mod'; // ✅ 引入类型

// 定义 Props
defineProps<{
  stats: PerformanceStat[]
}>();

// 状态样式映射 (Record 是 TS 工具类型，规定 key 只能是这三个字符串)
const statusStyles: Record<'good' | 'warning' | 'bad', string> = {
  good: 'bg-green-500/10 text-green-400 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  bad: 'bg-red-500/10 text-red-400 border-red-500/20'
};
</script>

<template>
  <div class="bg-[#161920] border border-slate-800 rounded-2xl p-6 shadow-xl">
    <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
      <Cpu :size="16" class="text-purple-500" /> 平台实验室评测
    </h3>
    
    <div class="space-y-4">
      <div 
        v-for="(stat, idx) in stats" 
        :key="idx" 
        class="flex items-center justify-between group hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors"
      >
        <div>
          <div class="text-xs text-slate-500 mb-0.5 group-hover:text-slate-400 transition-colors">{{ stat.label }}</div>
          <div class="text-sm font-mono font-medium text-slate-200">{{ stat.value }}</div>
        </div>
        
        <div 
          class="text-xs px-2.5 py-1 rounded border font-medium transition-transform group-hover:scale-105"
          :class="statusStyles[stat.status] || statusStyles.good"
        >
          {{ stat.desc }}
        </div>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-slate-800/50">
       <div class="text-[10px] text-slate-600 mb-2 uppercase font-bold tracking-widest">Benchmark Environment</div>
       <div class="text-xs text-slate-500 bg-black/20 p-3 rounded border border-slate-800 font-mono leading-relaxed">
         CPU: i5-12400F &nbsp;|&nbsp; RAM: 16GB (Alloc 4G)<br/>
         MC Ver: 1.20.1 Fabric &nbsp;|&nbsp; Sodium: On
       </div>
    </div>
  </div>
</template>