<script setup lang="ts">
import { computed } from 'vue';
import { 
  ThumbsUp, MessageCircle, Share2, MoreHorizontal, 
  Flame, HelpCircle, Image as ImageIcon, Copy, Flag, Ban
} from 'lucide-vue-next';
import { 
  DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuPortal, 
  DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator 
} from 'radix-vue';
import type { Post } from '@/types/community';

const props = defineProps<{
  post: Post
}>();

// === UI 逻辑封装 ===
const typeConfig = computed(() => {
  switch(props.post.type) {
    case 'question': return { color: 'text-orange-500 bg-orange-500/10 border-orange-500/20', label: '求助' };
    case 'showcase': return { color: 'text-purple-500 bg-purple-500/10 border-purple-500/20', label: 'Showcase' };
    default: return { color: 'text-blue-500 bg-blue-500/10 border-blue-500/20', label: '讨论' };
  }
});

const formatNumber = (num: number) => {
  return num > 1000 ? (num / 1000).toFixed(1) + 'k' : num;
};
</script>

<template>
  <div class="group bg-white dark:bg-[#121215] border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer relative">
    
    <div class="flex justify-between items-start mb-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm" :class="post.author.avatar">
          {{ post.author.name[0] }}
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-900 dark:text-white text-sm hover:underline decoration-indigo-500/50 underline-offset-4">{{ post.author.name }}</span>
            <span class="text-xs text-slate-400">{{ post.createdAt }}</span>
          </div>
          <div class="flex gap-2 mt-0.5">
            <span v-for="tag in post.tags" :key="tag" class="text-[10px] text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 transition-colors">
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
      
      <span class="text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wider" :class="typeConfig.color">
        {{ typeConfig.label }}
      </span>
    </div>

    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors leading-tight">
      {{ post.title }}
    </h3>
    
    <p v-if="post.preview" class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
      {{ post.preview }}
    </p>

    <div v-if="post.images && post.images.length > 0" class="mb-4 rounded-xl overflow-hidden h-64 w-full relative group/image">
      <img :src="post.images[0]" class="w-full h-full object-cover transform group-hover/image:scale-105 transition-transform duration-700" />
      <div v-if="post.images.length > 1" class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
        <span class="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded backdrop-blur-md border border-white/10">
          <ImageIcon :size="12" class="inline mr-1" /> {{ post.images.length }} 张图片
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
      <div class="flex gap-6">
        <button class="flex items-center gap-1.5 text-slate-400 hover:text-indigo-500 transition-colors text-xs font-medium group/btn">
          <ThumbsUp :size="16" class="group-hover/btn:scale-110 transition-transform" /> {{ post.stats.likes }}
        </button>
        <button class="flex items-center gap-1.5 text-slate-400 hover:text-indigo-500 transition-colors text-xs font-medium group/btn">
          <MessageCircle :size="16" class="group-hover/btn:scale-110 transition-transform" /> {{ post.stats.comments }}
        </button>
        
        <DropdownMenuRoot>
          <DropdownMenuTrigger class="outline-none" @click.stop>
             <button class="flex items-center gap-1.5 text-slate-400 hover:text-indigo-500 transition-colors text-xs font-medium group/btn">
               <MoreHorizontal :size="16" />
             </button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
             <DropdownMenuContent class="min-w-[140px] bg-white dark:bg-[#18181b] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-200" :side-offset="5" align="start">
               <DropdownMenuItem class="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg cursor-pointer outline-none">
                 <Copy :size="14" /> 复制链接
               </DropdownMenuItem>
               <DropdownMenuItem class="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg cursor-pointer outline-none">
                 <Share2 :size="14" /> 分享海报
               </DropdownMenuItem>
               <DropdownMenuSeparator class="h-px bg-slate-100 dark:bg-white/10 my-1" />
               <DropdownMenuItem class="flex items-center gap-2 px-2 py-1.5 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer outline-none">
                 <Flag :size="14" /> 举报内容
               </DropdownMenuItem>
             </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenuRoot>
      </div>

      <div class="flex items-center gap-2">
        <span v-if="post.isHot" class="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
          <Flame :size="10" fill="currentColor" /> 热帖
        </span>
        <span v-if="post.type === 'question' && !post.isSolved" class="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
          <HelpCircle :size="10" /> 未解决
        </span>
      </div>
    </div>
  </div>
</template>