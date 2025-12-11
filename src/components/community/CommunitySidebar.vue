<script setup lang="ts">
import { Flame, Clock, HelpCircle, Image as ImageIcon, PenTool } from 'lucide-vue-next';
import type { Topic } from '@/types/community';
import { useRouter } from 'vue-router';

// 接收外部数据
defineProps<{
  topics: Topic[];
  isLoading?: boolean;
}>();

// 双向绑定当前频道
const activeChannel = defineModel<string>('activeChannel', { default: 'recommend' });

const router = useRouter();

const channels = [
  { id: 'recommend', label: '推荐', icon: Flame },
  { id: 'latest', label: '最新', icon: Clock },
  { id: 'question', label: '问答', icon: HelpCircle },
  { id: 'showcase', label: '展厅', icon: ImageIcon },
];
</script>

<template>
  <div class="space-y-8 sticky top-24 h-fit">
    
    <button 
      @click="router.push('/community/create')"
      class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 group tracking-wide"
    >
      <PenTool :size="20" class="group-hover:rotate-12 transition-transform" /> 
      发布创作
    </button>

    <nav class="space-y-2">
      <button 
        v-for="channel in channels" 
        :key="channel.id"
        @click="activeChannel = channel.id"
        class="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200 font-bold text-base"
        :class="activeChannel === channel.id 
          ? 'bg-white dark:bg-white/10 text-indigo-600 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'"
      >
        <component :is="channel.icon" :size="22" :class="activeChannel === channel.id ? 'text-indigo-500 dark:text-white' : 'text-slate-400'" />
        {{ channel.label }}
      </button>
    </nav>

    <div class="w-full h-px bg-slate-200 dark:bg-white/10"></div>

    <div>
      <h3 class="px-5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">热门话题</h3>
      
      <div v-if="isLoading" class="space-y-3 px-5">
        <div v-for="i in 4" :key="i" class="h-10 bg-slate-200 dark:bg-white/5 rounded-lg animate-pulse"></div>
      </div>

      <div v-else class="space-y-2">
        <a href="#" v-for="topic in topics" :key="topic.id" class="flex items-center justify-between px-5 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors group">
          <div class="flex items-center gap-3">
            <span class="text-xl opacity-80 group-hover:scale-110 transition-transform">{{ topic.icon }}</span>
            <span class="group-hover:text-indigo-500 transition-colors text-sm font-bold">#{{ topic.name }}</span>
          </div>
          <span class="text-xs text-slate-400 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-md font-mono font-medium group-hover:text-indigo-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/20 transition-colors">
            {{ topic.count }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>