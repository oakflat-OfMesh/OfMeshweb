<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Search } from 'lucide-vue-next';

// 引入拆分好的组件
import PostCard from '@/components/community/PostCard.vue';
import CommunitySidebar from '@/components/community/CommunitySidebar.vue';
import CommunityRightbar from '@/components/community/CommunityRightbar.vue';

// 引入接口
import { CommunityService } from '@/api/community';
import type { Post, Topic, LeaderboardUser } from '@/types/community'; // 记得在 type 里补全 LeaderboardUser

// === 数据状态 ===
const posts = ref<Post[]>([]);
const trendingTopics = ref<Topic[]>([]);
const leaderboard = ref<LeaderboardUser[]>([]); // 新增
const activeChannel = ref('recommend'); // 左侧频道状态
const isLoading = ref(true);

// === 初始化 ===
onMounted(async () => {
  isLoading.value = true;
  try {
    const [postsData, topicsData, leaderboardData] = await Promise.all([
      CommunityService.getPosts(),
      CommunityService.getTrendingTopics(),
      CommunityService.getLeaderboard()
    ]);
    
    posts.value = postsData;
    trendingTopics.value = topicsData;
    
    // ✅ 修复：完全重写这个 map 函数，确保类型安全
    leaderboard.value = leaderboardData.map((user: any) => {
      // 1. 安全获取 solvedCount (默认为 0)
      const count = Number(user.solvedCount || 0);
      
      return {
        rank: user.rank,
        name: user.name,
        avatar: user.avatar,
        // 2. 优先用 score，没有则用 count 转字符串
        score: user.score || count.toString(),
        // 3. 趋势默认值
        trend: user.trend || 'same',
        // 4. 赋值数字，现在类型定义是可选的，所以这里传不传都行，传了更保险
        solvedCount: count
      };
    });

  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen pt-24 pb-12 px-4 sm:px-6 bg-slate-50 dark:bg-[#09090b]">
    <div class="container mx-auto max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div class="hidden lg:block lg:col-span-3">
          <CommunitySidebar 
            v-model:activeChannel="activeChannel" 
            :topics="trendingTopics"
            :is-loading="isLoading"
          />
        </div>

        <div class="lg:col-span-7 space-y-6">
          
          <div class="relative flex items-center bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 ring-indigo-500/20 transition-all group">
             <Search :size="18" class="text-slate-400 mr-3 group-focus-within:text-indigo-500 transition-colors" />
             <input type="text" placeholder="搜索帖子、标签或用户..." class="bg-transparent border-none outline-none text-sm w-full text-slate-800 dark:text-white placeholder:text-slate-400" />
             <div class="text-[10px] text-slate-400 border border-slate-200 dark:border-white/10 rounded px-1.5 py-0.5">⌘ K</div>
          </div>

          <div class="space-y-4">
            <div v-if="isLoading">
               <div v-for="i in 2" :key="i" class="h-48 bg-white dark:bg-[#121215] rounded-2xl border border-slate-200 dark:border-white/5 p-5 animate-pulse mb-4">
                 </div>
            </div>

            <template v-else>
              <TransitionGroup name="list" tag="div" class="space-y-4">
                <PostCard v-for="post in posts" :key="post.id" :post="post" />
              </TransitionGroup>
            </template>
          </div>
          
          <div v-if="!isLoading" class="py-8 text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 text-xs text-slate-400">
              <span>🎉 到底了，去发个帖吧</span>
            </div>
          </div>

        </div>

        <div class="hidden lg:block lg:col-span-2">
           <CommunityRightbar 
             :leaderboard="leaderboard" 
             :is-loading="isLoading" 
           />
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* 列表动画，让帖子刷出来的时候丝滑一点 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>