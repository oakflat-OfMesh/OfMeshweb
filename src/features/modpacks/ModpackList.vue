<script setup>
import { Cpu } from 'lucide-vue-next';

const packs = [
  { id: 1, title: 'RLCraft: 硬核重制', author: 'Shivaxi', score: 9.5, labels: ['高难', 'RPG'], performance: '需 8G 内存', image: 'https://placehold.co/400x250/1a1a1a/FFF' },
  { id: 2, title: 'DawnCraft: 黎明时代', author: 'Bstylia14', score: 9.2, labels: ['魂类', '冒险'], performance: '优化良好', image: 'https://placehold.co/400x250/1a1a1a/FFF' },
  { id: 3, title: '机械飞升 v3.0', author: 'OfMesh Official', score: 9.7, labels: ['科技', '自动化'], performance: '极佳', image: 'https://placehold.co/400x250/1a1a1a/FFF' }
];
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8">
    <div v-for="pack in packs" :key="pack.id" class="bg-[#121215] border border-white/5 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-colors group cursor-pointer">
      <div class="h-40 bg-[#1a1a1e] relative overflow-hidden">
        <img :src="pack.image" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
        <div class="absolute top-2 right-2 bg-black/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-green-400 border border-green-500/30">
          {{ pack.score }} 分
        </div>
      </div>
      <div class="p-5">
        <h4 class="text-lg font-bold text-white mb-1">{{ pack.title }}</h4>
        <div class="text-xs text-slate-500 mb-4">by {{ pack.author }}</div>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span v-for="label in pack.labels" :key="label" class="text-[10px] px-2 py-1 bg-white/5 rounded text-slate-400 border border-white/5">
            {{ label }}
          </span>
        </div>

        <div class="flex items-center justify-between text-xs text-slate-500 bg-[#09090b] p-3 rounded-lg border border-white/5">
          <span class="flex items-center gap-1"><Cpu :size="12"/> 性能需求:</span>
          <span class="text-slate-300">{{ pack.performance }}</span>
        </div>
      </div>
    </div>
  </div>
</template>