<script setup lang="ts">
import { MessageSquare, Trophy, ExternalLink } from 'lucide-vue-next';
import type { LeaderboardUser } from '@/api/community'; // 记得去 api 补上这个类型定义

defineProps<{
  leaderboard: LeaderboardUser[];
  isLoading?: boolean;
}>();
</script>

<template>
  <div class="space-y-6 sticky top-24 h-fit">
    
    <div class="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-500/20 group">
      <div class="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>
      
      <h4 class="font-bold text-base mb-3 flex items-center gap-2 relative z-10">
        <MessageSquare :size="18" class="text-indigo-200" /> 
        社区公约 v2.0
      </h4>
      <p class="text-xs text-indigo-100 leading-relaxed mb-4 opacity-90 relative z-10">
        为了维护良好的讨论氛围，请在发帖前阅读最新的社区规范。严禁发布任何形式的虚假服务器宣传。
      </p>
      <button class="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-bold transition-colors backdrop-blur-sm flex items-center justify-center gap-1">
        阅读全文 <ExternalLink :size="10" />
      </button>
    </div>

    <div class="bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm">
      <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-4 flex items-center gap-2">
        <Trophy :size="16" class="text-yellow-500" /> 本周贡献榜
      </h4>
      
      <div v-if="isLoading" class="space-y-4">
        <div v-for="i in 3" :key="i" class="flex gap-3 items-center animate-pulse">
          <div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-white/10"></div>
          <div class="flex-1 h-3 bg-slate-200 dark:bg-white/10 rounded"></div>
        </div>
      </div>

      <div v-else class="space-y-4">
        <div v-for="user in leaderboard" :key="user.rank" class="flex items-center gap-3 group">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ring-2 ring-white dark:ring-[#121215]"
            :class="[
              user.rank === 1 ? 'bg-yellow-500' : 
              user.rank === 2 ? 'bg-slate-400' : 
              user.rank === 3 ? 'bg-orange-400' : 'bg-slate-200 text-slate-500'
            ]"
          >
            {{ user.rank }}
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-indigo-500 transition-colors">
              {{ user.name }}
            </div>
            <div class="text-[10px] text-slate-400 truncate">
              解决 {{ user.solvedCount }} 个问题
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-400 px-2">
      <a href="#" class="hover:text-indigo-500 transition-colors">关于我们</a>
      <a href="#" class="hover:text-indigo-500 transition-colors">隐私政策</a>
      <a href="#" class="hover:text-indigo-500 transition-colors">联系版主</a>
      <a href="#" class="hover:text-indigo-500 transition-colors">RSS 订阅</a>
      <span class="opacity-50">© 2025 OfMesh</span>
    </div>

  </div>
</template>