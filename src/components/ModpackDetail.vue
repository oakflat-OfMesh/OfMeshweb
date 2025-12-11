<script setup lang="ts">
import { computed } from 'vue';
import { Download, Star, Trophy } from 'lucide-vue-next';
import { useModpacks } from '@/composables/useModpacks';
import type { DifficultyLevel } from '@/types/modpack';

const { activePack } = useModpacks();

// 难度数值映射
const difficultyScore = computed(() => {
  // ✅ 卫语句：如果 activePack 没值，直接返回默认值，防止报错
  if (!activePack.value) return 3;
  
  const map: Record<string, number> = {
    'Easy': 1,
    'Normal': 3,
    'Hard': 4,
    'Expert': 5
  };
  return map[activePack.value.difficulty] || 3;
});

const difficultyColor = computed(() => {
  // ✅ 卫语句
  if (!activePack.value) return 'text-slate-500';

  const map: Record<string, string> = {
    'Easy': 'text-green-500',
    'Normal': 'text-blue-500',
    'Hard': 'text-orange-500',
    'Expert': 'text-red-500'
  };
  return map[activePack.value.difficulty] || 'text-slate-500';
});
</script>

<template>
  <div class="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 group bg-slate-900 isolation-auto">
    
    <template v-if="activePack">
      
      <Transition name="bg-fade">
        <div :key="activePack.id" class="absolute inset-0 z-0 overflow-hidden">
          <img 
            :src="activePack.coverImage" 
            class="w-full h-full object-cover opacity-60 transition-transform duration-[3000ms] ease-out scale-110 group-hover:scale-125" 
            alt="cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/80 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/50 to-transparent"></div>
        </div>
      </Transition>

      <div class="relative z-10 h-full w-full pointer-events-none">
        <Transition name="content-slide" mode="out-in">
          <div 
            :key="activePack.id" 
            class="h-full p-8 md:p-12 flex flex-col justify-end items-start text-white pointer-events-auto"
          >
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tag in activePack.tags" :key="tag" class="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-xs font-bold text-white/90 shadow-sm">
                {{ tag }}
              </span>
            </div>

            <h2 class="text-5xl md:text-6xl font-black tracking-tight mb-2 drop-shadow-2xl">
              {{ activePack.title }}
            </h2>
            <div class="text-xl text-slate-300 font-light mb-6 font-mono">
              {{ activePack.sub }}
            </div>
            <p class="text-slate-300 text-lg max-w-2xl leading-relaxed mb-8 line-clamp-3 drop-shadow-md">
              {{ activePack.desc }}
            </p>

            <div class="flex flex-wrap items-center gap-8 mb-8 pt-8 border-t border-white/10 w-full">
              <div>
                <div class="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Difficulty</div>
                <div class="flex gap-1">
                  <div v-for="i in 5" :key="i" class="w-8 h-2 rounded-full transition-colors duration-300 shadow-sm"
                    :class="i <= difficultyScore ? difficultyColor : 'bg-white/10'"></div>
                </div>
                <div class="text-sm font-bold mt-1 shadow-black/50 drop-shadow-sm" :class="difficultyColor">{{ activePack.difficulty }}</div>
              </div>

              <div>
                <div class="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Quests</div>
                <div class="flex items-center gap-2 text-xl font-mono font-bold">
                  <Trophy :size="20" class="text-yellow-500 drop-shadow-md" />
                  {{ activePack.questCount > 0 ? activePack.questCount + '+' : 'N/A' }}
                </div>
              </div>

              <div>
                <div class="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Rating</div>
                <div class="flex items-center gap-2 text-xl font-mono font-bold">
                  <Star :size="20" class="text-purple-500 drop-shadow-md" fill="currentColor" />
                  {{ activePack.rating }}
                </div>
              </div>
            </div>

            <div class="flex gap-4">
              <button class="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-xl shadow-black/20">
                <Download :size="20" /> 安装整合包
              </button>
              <button class="px-6 py-3 bg-white/10 border border-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all backdrop-blur-md shadow-lg">
                查看详情
              </button>
            </div>
          </div>
        </Transition>
      </div>

    </template>

    <div v-else class="flex items-center justify-center h-full text-white/20">
      Loading Modpack Data...
    </div>

  </div>
</template>

<style scoped>
/* 1. 背景动画 (bg-fade)
  不需要 mode="out-in"，我们希望新旧图片叠加淡化 (Cross-fade)
  leave-active 必须是 absolute，这样旧图片不会占据空间导致新图片被挤下去
*/
.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
}

/* 确保旧图片离开时保持绝对定位，固定在原位淡出 */
.bg-fade-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; 
}

/* 2. 内容动画 (content-slide)
  使用了 mode="out-in"，所以这里只需要定义简单的进出状态
  不需要 absolute，因为 out-in 保证同一时间只有一个 div 存在
*/
.content-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  /* 稍微延迟一点进场，等背景先变一点 */
  transition-delay: 0.1s; 
}
.content-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.content-slide-enter-from {
  opacity: 0;
  transform: translateY(10px); /* 向上轻微滑入 */
}
.content-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px); /* 向上轻微消失 */
}
</style>