<script setup>
import { ref } from 'vue';
import { Search, ArrowUpRight, Zap, Users, Box, Coffee } from 'lucide-vue-next';
import BackgroundRipple from '@/components/BackgroundRipple.vue';

const trendingMods = [
  { name: '机械动力', desc: 'Create', color: 'bg-orange-500' },
  { name: '农夫乐事', desc: 'Farmer\'s Delight', color: 'bg-emerald-500' },
  { name: '光影核心', desc: 'Iris Shaders', color: 'bg-indigo-500' }
];

const searchQuery = ref('');
</script>

<template>
  <div class="relative w-full overflow-hidden pt-32 pb-12 lg:pt-48 lg:pb-20">
    
    <div class="absolute inset-0 z-0">
      <BackgroundRipple />
    </div>

    <div class="relative z-10 container mx-auto px-4 lg:px-8">
      
      <div class="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        
        <div class="lg:col-span-8 bg-white/60 dark:bg-[#111]/60 backdrop-blur-xl rounded-[2rem] p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 border border-white/40 dark:border-white/5">
           <div class="relative z-10">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-white/10 text-xs font-semibold text-slate-500 dark:text-slate-300 mb-6 border border-slate-200/50 dark:border-transparent">
                <Zap :size="14" class="text-yellow-500" fill="currentColor" />
                OfMesh 2.0 正式上线
              </div>
              <h1 class="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-slate-900 dark:text-white">
                构建想象，<br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  触手可及。
                </span>
              </h1>
              <p class="text-xl text-slate-600 dark:text-slate-400 max-w-lg mb-10">
                不仅是模组库。这是一个由 240 万创造者共同编织的方块宇宙。
              </p>
              
              <div class="max-w-xl relative group/search">
                 <div class="relative flex items-center bg-white/80 dark:bg-black/50 backdrop-blur-md border border-slate-200/60 dark:border-white/10 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all">
                    <Search class="ml-3 text-slate-400" />
                    <input v-model="searchQuery" type="text" placeholder="搜索模组、整合包..." class="w-full bg-transparent border-none focus:ring-0 text-lg px-4 h-10 placeholder:text-slate-400 text-slate-900 dark:text-white" />
                    <button class="bg-indigo-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">Go</button>
                 </div>
              </div>
           </div>
        </div>

        <div class="lg:col-span-4 bg-black dark:bg-[#161616] rounded-[2rem] p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-sm border border-slate-200/50 dark:border-white/5 group">
           <div class="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-purple-600/20 mix-blend-overlay z-0"></div>
           <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
           <div class="relative z-10 flex justify-between items-start">
             <div class="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">本周精选</div>
             <ArrowUpRight class="opacity-50 group-hover:opacity-100 transition-opacity" />
           </div>
           <div class="relative z-10">
             <h3 class="text-3xl font-bold mb-2">机械动力</h3>
             <p class="text-white/60 text-sm line-clamp-2">感受齿轮转动的魅力。自动化从未如此优雅。</p>
           </div>
        </div>

        <div class="lg:col-span-4 bg-white/60 dark:bg-[#111]/60 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 flex flex-col justify-center items-center text-center shadow-sm border border-white/40 dark:border-white/5 hover:-translate-y-1 transition-transform">
           <div class="w-16 h-16 bg-blue-50/80 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4"><Users :size="32" /></div>
           <div class="text-4xl font-bold mb-1 text-slate-900 dark:text-white">2.4M+</div>
           <div class="text-slate-500 dark:text-slate-400 text-sm font-medium">活跃创造者正在构建</div>
        </div>

        <div class="lg:col-span-5 bg-white/60 dark:bg-[#111]/60 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 shadow-sm border border-white/40 dark:border-white/5 flex flex-col">
           <div class="flex items-center gap-2 mb-6 text-slate-500"><Box :size="18" /><span class="text-sm font-bold uppercase tracking-wider">热门分类</span></div>
           <div class="flex flex-wrap gap-3">
              <button v-for="(mod, i) in trendingMods" :key="i" class="flex items-center gap-3 pr-4 pl-1 py-1 rounded-full bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-200/50 dark:border-white/5 transition-colors group">
                <div :class="`w-8 h-8 rounded-full ${mod.color} flex items-center justify-center text-white font-bold text-xs shadow-sm`">{{ mod.name[0] }}</div>
                <div class="text-left"><div class="text-sm font-bold text-slate-900 dark:text-white">{{ mod.name }}</div><div class="text-[10px] text-slate-400">{{ mod.desc }}</div></div>
              </button>
              <button class="w-10 h-10 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-400 transition-colors">+</button>
           </div>
        </div>

        <div class="lg:col-span-3 bg-indigo-600 text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-colors cursor-pointer group">
           <Coffee :size="32" class="opacity-50 group-hover:scale-110 transition-transform" />
           <div><div class="font-bold text-lg mb-1 group-hover:translate-x-1 transition-transform">开发者入驻 &rarr;</div><div class="text-indigo-200 text-xs">让世界看到你的作品</div></div>
        </div>

      </div>
    </div>
  </div>
</template>