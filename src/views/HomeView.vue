<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import { Box, Layers, Globe } from 'lucide-vue-next';

// 1. 引入主要区块
import HeroSection from '@/features/home/HeroSection.vue'; // 确保路径正确
import MarketingSection from '@/components/home/MarketingSection.vue'; // ✅ 新增：营销通栏


// 2. 引入 Tab 子组件 (使用异步加载，优化首屏性能)
// 确保你已经创建了上面的占位文件，否则这里会报错
const ModShowcase = defineAsyncComponent(() => import('@/components/home/tabs/ModShowcase.vue'));
const ModpackList = defineAsyncComponent(() => import('@/components/home/tabs/ModpackList.vue'));
const ServerRankings = defineAsyncComponent(() => import('@/components/home/tabs/ServerRankings.vue'));

// 3. Tab 配置
const activeTabId = ref('mods');

const tabs = [
  { id: 'mods', label: '热门 Mod', icon: Box, component: ModShowcase },
  { id: 'modpacks', label: '硬核整合包', icon: Layers, component: ModpackList },
  { id: 'servers', label: '联机排行', icon: Globe, component: ServerRankings },
];

const currentComponent = computed(() => {
  return tabs.find(t => t.id === activeTabId.value)?.component;
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#09090b] transition-colors duration-500">
    
    <HeroSection />

    <div class="container mx-auto px-6 py-24 min-h-[600px]">
      
      <div class="flex justify-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div class="p-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl inline-flex shadow-sm">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTabId = tab.id"
            class="px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300"
            :class="activeTabId === tab.id 
              ? 'bg-slate-900 text-white dark:bg-indigo-600 dark:text-white shadow-md scale-105' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'"
          >
            <component :is="tab.icon" :size="16" />
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div class="max-w-6xl mx-auto">
        <Transition name="fade" mode="out-in">
          <KeepAlive>
            <component :is="currentComponent" />
          </KeepAlive>
        </Transition>
      </div>

    </div>

    <MarketingSection />

  </div>
</template>

<style scoped>
/* 丝滑的切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>