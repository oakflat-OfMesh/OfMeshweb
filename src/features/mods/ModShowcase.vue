<script setup>
import { Download, Star, ArrowRight } from 'lucide-vue-next';

// 模拟数据 - 实际开发中这里会调用 API
const mods = [
  {
    id: 'create',
    title: '机械动力 (Create)',
    desc: '释放工业革命的力量，构建全自动化工厂。',
    tags: ['S级优化', '工业', '必玩'],
    downloads: '12.5M',
    rating: 9.8,
    image: 'https://placehold.co/600x350/252525/FFF?text=Create+Mod' // 替换为真实图片
  },
  {
    id: 'confluence',
    title: '汇流来世',
    desc: '打破次元壁，将泰拉瑞亚完美融入 Minecraft。',
    tags: ['官方认证', '冒险', '独家'],
    downloads: '8.2M',
    rating: 9.9,
    image: 'https://placehold.co/600x350/3b0764/FFF?text=Confluence'
  }
];
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8">
    <div v-for="mod in mods" :key="mod.id" class="group relative h-[350px] rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
      <div class="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/50 to-transparent z-10"></div>
      <img :src="mod.image" :alt="mod.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      
      <div class="absolute inset-0 z-20 p-8 flex flex-col justify-end">
        <div class="flex gap-2 mb-3">
          <span v-for="tag in mod.tags" :key="tag" class="px-2 py-1 rounded bg-white/10 backdrop-blur text-xs font-bold text-white border border-white/10">
            {{ tag }}
          </span>
        </div>
        <h3 class="text-3xl font-black text-white mb-2 group-hover:text-indigo-400 transition-colors drop-shadow-lg">
          {{ mod.title }}
        </h3>
        <p class="text-slate-300 mb-6 max-w-md line-clamp-2">{{ mod.desc }}</p>
        
        <div class="flex items-center gap-6 border-t border-white/10 pt-4">
          <div class="flex items-center gap-2">
            <Download :size="16" class="text-slate-500" />
            <span class="text-white font-bold">{{ mod.downloads }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Star :size="16" class="text-yellow-500 fill-yellow-500" />
            <span class="text-white font-bold">{{ mod.rating }}</span>
          </div>
          <button class="ml-auto px-4 py-2 bg-white text-black font-bold rounded-lg text-sm hover:bg-slate-200 transition-colors flex items-center gap-2">
            查看专版 <ArrowRight :size="14" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>