<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Search, Filter, Download, Star, ArrowRight, Tag } from 'lucide-vue-next';
import type { WorkshopMod } from '@/types/mod'; // 引入类型

const router = useRouter();

// ✅ 加上泛型 <WorkshopMod[]>，不仅为了规范，以后接后端 API 时也需要这个类型
const mods = ref<WorkshopMod[]>([
  {
    id: 'create',
    title: '机械动力',
    sub: 'Create',
    desc: '释放工业革命的力量，构建全自动化工厂。拥有极其精致的动力学与机械美学。',
    icon: '⚙️',
    downloads: '12.5M',
    rating: 9.9,
    bg: 'bg-amber-600',
    tags: ['科技', '自动化', 'S级优化']
  },
  {
    id: 'confluence', // 这里记得加上我们的主角
    title: '汇流来世',
    sub: 'Confluence',
    desc: '打破次元壁！将泰拉瑞亚的饰品系统、地牢探险与 Boss 挑战完美融入 Minecraft。',
    icon: '🔮',
    downloads: '7.8M',
    rating: 9.8,
    bg: 'bg-purple-600',
    tags: ['RPG', '冒险', '官方认证']
  },
  {
    id: 'twilight',
    title: '暮色森林',
    sub: 'The Twilight Forest',
    desc: '踏入充满了黄昏光芒的神秘领域，探索巨大的迷宫与城堡，挑战史诗级 Boss。',
    icon: '🌲',
    downloads: '8.4M',
    rating: 9.7,
    bg: 'bg-emerald-600',
    tags: ['冒险', '维度', '魔法']
  },
  // ... 其他数据可以按需添加
]);

const activeFilter = ref<string>('全部');
const filters: string[] = ['全部', '科技', '魔法', '冒险', '辅助', '优化'];

// 跳转逻辑
const goToDetail = (modId: string) => {
  router.push({ name: 'mod-detail', params: { id: modId } });
};
</script>

<template>
  <div class="min-h-screen pt-24 pb-20 px-6 transition-colors duration-500 bg-slate-50 dark:bg-[#09090b]">
    <div class="container mx-auto">
      
      <div class="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 animate-in slide-in-from-bottom-4 fade-in duration-700">
        <div>
          <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Mod 工坊
            <span class="text-indigo-500">.</span>
          </h1>
          <p class="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
            探索由社区驱动的无限可能。这里收录了经过严格测试和性能优化的精品模组。
          </p>
        </div>
        
        <div class="relative w-full md:w-80 group">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-30 transition duration-500 blur"></div>
          <div class="relative flex items-center bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 shadow-sm">
            <Search :size="18" class="text-slate-400 mr-3" />
            <input type="text" placeholder="搜索 Mod 名称或 ID..." class="bg-transparent border-none outline-none text-sm w-full text-slate-800 dark:text-white placeholder:text-slate-400" />
          </div>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-slate-200 dark:border-white/5 animate-in slide-in-from-bottom-6 fade-in duration-700 delay-100">
        <div class="flex items-center gap-2 mr-4 text-slate-400 text-sm font-bold uppercase tracking-wider">
          <Filter :size="16" /> 筛选:
        </div>
        <button 
          v-for="filter in filters" 
          :key="filter"
          @click="activeFilter = filter"
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border"
          :class="activeFilter === filter 
            ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white shadow-lg scale-105' 
            : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-200 dark:hover:bg-white/10 dark:text-slate-400'"
        >
          {{ filter }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
        <div 
          v-for="mod in mods" 
          :key="mod.id" 
          @click="goToDetail(mod.id)" 
          class="group relative bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
        >
          <div class="h-32 relative overflow-hidden" :class="mod.bg">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-4 left-6 flex items-center gap-3">
              <div class="w-12 h-12 bg-white dark:bg-[#18181b] rounded-xl flex items-center justify-center text-2xl shadow-lg">
                {{ mod.icon }}
              </div>
              <div class="text-white">
                <h3 class="font-bold text-lg leading-tight">{{ mod.title }}</h3>
                <div class="text-xs opacity-80 font-mono">{{ mod.sub }}</div>
              </div>
            </div>
          </div>

          <div class="p-6">
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in mod.tags" :key="tag" class="px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded border border-slate-200 dark:border-white/5 flex items-center gap-1">
                <Tag :size="10" /> {{ tag }}
              </span>
            </div>

            <p class="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 h-10">
              {{ mod.desc }}
            </p>

            <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
              <div class="flex gap-4 text-xs font-medium text-slate-400">
                <div class="flex items-center gap-1 group-hover:text-indigo-500 transition-colors">
                  <Download :size="14" /> {{ mod.downloads }}
                </div>
                <div class="flex items-center gap-1 group-hover:text-yellow-500 transition-colors">
                  <Star :size="14" /> {{ mod.rating }}
                </div>
              </div>
              
              <button class="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <ArrowRight :size="16" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <button class="px-8 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors font-bold text-sm">
          加载更多资源...
        </button>
      </div>

    </div>
  </div>
</template>