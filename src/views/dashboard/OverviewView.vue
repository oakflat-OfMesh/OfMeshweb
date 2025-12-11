<script setup>
import { ref } from 'vue';
import { 
  Download, 
  MessageSquare, 
  Star, 
  MoreHorizontal, 
  ArrowUpRight,
  Plus,
  Layers,       // ✅ 替换 TrendingUp，用于代表整合包
  Trophy        // ✅ 用于代表荣誉
} from 'lucide-vue-next';

// 1. 统计数据：移除“收益”，改为“被整合包收录”
// 这是 MC 圈子衡量一个模组是否成功的硬核指标
const stats = [
  { label: '总下载量', value: '12,450', change: '+12%', icon: Download, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  { label: '获得收藏', value: '3,820', change: '+5%', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-500/10' },
  { label: '收到反馈', value: '482', change: '+24%', icon: MessageSquare, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
  // ✅ 核心变更：成就感指标
  { label: '被整合包收录', value: '85', change: '+3', icon: Layers, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-500/10' },
];

// 2. 项目列表 (保持不变，状态流转很清晰)
const projects = [
  { id: 1, name: '更好的末地 (Better End)', version: 'v2.4.1', status: 'Active', downloads: '4.2k', updated: '2小时前' },
  { id: 2, name: '机械动力附属：核心', version: 'v1.0.2', status: 'Review', downloads: '850', updated: '1天前' },
  { id: 3, name: '赛博朋克材质包', version: 'v0.9.5', status: 'Draft', downloads: '-', updated: '3天前' },
];

const statusColors = {
  Active: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
  Review: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
  Draft: 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400',
};
</script>

<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">欢迎回来, 创造者 👋</h1>
        <p class="text-slate-500 dark:text-slate-400 mt-1">你的创意正在改变方块世界，来看看今天的回响。</p>
      </div>
      <button class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
        <Plus :size="18" />
        发布新作品
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-indigo-500/30 transition-colors group cursor-default"
      >
        <div class="flex justify-between items-start mb-4">
          <div :class="`p-3 rounded-xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`">
            <component :is="stat.icon" :size="20" />
          </div>
          <span v-if="stat.change" class="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-lg">
            {{ stat.change }}
          </span>
        </div>
        <div>
          <div class="text-3xl font-black text-slate-900 dark:text-white mb-1">{{ stat.value }}</div>
          <div class="text-sm text-slate-500 dark:text-slate-400 font-medium">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-2 space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-bold text-slate-900 dark:text-white">最近更新</h3>
          <a href="#" class="text-sm font-bold text-indigo-600 hover:text-indigo-500 flex items-center gap-1 transition-colors">
            管理全部 <ArrowUpRight :size="14" />
          </a>
        </div>

        <div class="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden">
          <table class="w-full text-left text-sm">
            <thead class="bg-slate-50 dark:bg-white/5 text-slate-500 font-medium border-b border-slate-200 dark:border-white/5">
              <tr>
                <th class="px-6 py-4">项目名称</th>
                <th class="px-6 py-4">状态</th>
                <th class="px-6 py-4">热度</th>
                <th class="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-white/5">
              <tr v-for="project in projects" :key="project.id" class="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td class="px-6 py-4">
                  <div class="font-bold text-slate-900 dark:text-white">{{ project.name }}</div>
                  <div class="text-xs text-slate-400">{{ project.version }} • {{ project.updated }}</div>
                </td>
                <td class="px-6 py-4">
                  <span :class="`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[project.status]}`">
                    {{ project.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">
                  {{ project.downloads }}
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/10">
                    <MoreHorizontal :size="18" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">社区回响</h3>
        
        <div class="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white relative overflow-hidden group">
          <div class="relative z-10">
            <div class="inline-flex items-center gap-1.5 px-2 py-1 bg-white/20 rounded-lg text-xs font-bold mb-3 backdrop-blur-sm">
               <Trophy :size="12" /> 
               星火计划
            </div>
            <h4 class="text-xl font-bold mb-2">让优秀作品被看见</h4>
            <p class="text-indigo-100 text-sm mb-4 leading-relaxed">
              入选 "每周精选" 或获得 "S级优化" 认证，即可获得首页推荐位与专属开发者勋章。
            </p>
            <button class="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors shadow-lg">
              查看评选标准
            </button>
          </div>
          
          <div class="absolute -bottom-6 -right-6 text-white/10 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
             <Trophy :size="120" />
          </div>
        </div>

        <div class="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/5 rounded-2xl p-5">
           <h4 class="font-bold text-slate-900 dark:text-white mb-3 text-sm">系统通知</h4>
           <div class="space-y-3">
             <div class="flex gap-3 text-sm group cursor-pointer">
               <div class="w-2 h-2 mt-1.5 rounded-full bg-pink-500 shrink-0 group-hover:scale-125 transition-transform"></div>
               <p class="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                 <span class="font-bold">收录通知：</span> 恭喜！您的 "机械动力附属" 已被知名整合包 <span class="italic">All The Mods 9</span> 收录。
               </p>
             </div>
             <div class="flex gap-3 text-sm group cursor-pointer">
               <div class="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0 group-hover:scale-125 transition-transform"></div>
               <p class="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                 <span class="font-bold">里程碑：</span> 您的累计下载量已突破 10,000 次，解锁 "初露锋芒" 勋章。
               </p>
             </div>
           </div>
        </div>

      </div>

    </div>
  </div>
</template>