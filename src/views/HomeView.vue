<script setup>
import { ref, computed } from 'vue';
import { Box, Layers, Globe } from 'lucide-vue-next';

// 引入子模块
import HeroSection from '@/features/home/HeroSection.vue'; // 假设你已把Hero代码放入此文件
import ModShowcase from '@/features/mods/ModShowcase.vue';
import ModpackList from '@/features/modpacks/ModpackList.vue';
import ServerRankings from '@/features/servers/ServerRankings.vue';

// 状态管理
const activeTabId = ref('mods');

// 配置 Tabs
const tabs = [
  { id: 'mods', label: '热门 Mod', icon: Box, component: ModShowcase },
  { id: 'modpacks', label: '硬核整合包', icon: Layers, component: ModpackList },
  { id: 'servers', label: '联机排行', icon: Globe, component: ServerRankings },
];

// 计算当前要渲染的组件
const currentComponent = computed(() => {
  return tabs.find(t => t.id === activeTabId.value)?.component;
});
</script>

<template>
  <main>
    <HeroSection />

    <div class="container mx-auto px-6 py-20 min-h-[800px]">
      
      <div class="flex justify-center mb-12">
        <div class="p-1 bg-white/5 border border-white/10 rounded-xl inline-flex">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTabId = tab.id"
            class="px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all duration-300"
            :class="activeTabId === tab.id 
              ? 'bg-indigo-600 text-white shadow-lg scale-105' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'"
          >
            <component :is="tab.icon" :size="16" />
            {{ tab.label }}
          </button>
        </div>
      </div>

      <Transition name="fade" mode="out-in">
        <component :is="currentComponent" />
      </Transition>

    </div>
  </main>
</template>

<style scoped>
/* 简单的淡入淡出过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>