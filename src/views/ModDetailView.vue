<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Hammer, Map, Info, MessageSquare } from 'lucide-vue-next';

// 引入类型
import type { ModDetailData } from '@/types/mod';
// 引入数据查找函数 (你需要确保 src/data/index.js 存在且导出了 getModDataById)
import { getModDataById } from '@/data/index';

import ModHero from '@/components/mod-detail/ModHero.vue';
import ModTabs from '@/components/mod-detail/ModTabs.vue';
import WikiCraftingTab from '@/components/mod-detail/tabs/WikiCraftingTab.vue';
import PerformanceCard from '@/components/mod-detail/sidebar/PerformanceCard.vue';

const route = useRoute();
const router = useRouter();

// 使用 ref<ModDetailData | null> 允许数据为空（加载前）
const modData = ref<ModDetailData | null>(null);
const activeTabId = ref('wiki');
const isLoading = ref(true);

const tabs = [
  { id: 'wiki', label: '交互式工坊', icon: Hammer },
  { id: 'dungeon', label: '地牢透视', icon: Map },
  { id: 'comments', label: '评测与讨论', icon: MessageSquare },
];

// 加载数据的核心逻辑
const loadData = () => {
  isLoading.value = true;
  const id = route.params.id as string;
  
  // 模拟一点网络延迟，更有感觉 (实际项目中去掉 setTimeout)
  setTimeout(() => {
    const data = getModDataById(id);
    if (data) {
      modData.value = data;
    } else {
      // 找不到 ID，跳回工坊页
      router.replace('/workshop');
    }
    isLoading.value = false;
  }, 300);
};

onMounted(loadData);
// 监听路由 ID 变化 (比如从详情页推荐位跳到另一个详情页)
watch(() => route.params.id, loadData);
</script>

<template>
  <div v-if="isLoading" class="min-h-screen bg-[#0f1115] flex items-center justify-center">
    <div class="flex flex-col items-center gap-4">
      <div class="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      <div class="text-slate-500 text-sm animate-pulse">正在从数据中心加载...</div>
    </div>
  </div>

  <div v-else-if="modData" class="min-h-screen bg-[#0f1115] text-slate-200 font-sans pb-20">
    
    <ModHero :info="modData.baseInfo" />

    <div class="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
      
      <div class="flex-1 min-w-0">
        <ModTabs 
          :tabs="tabs" 
          :active-id="activeTabId" 
          @change="activeTabId = $event" 
        />

        <div class="mt-6">
          <Transition name="fade" mode="out-in">
            <div v-if="activeTabId === 'wiki'">
              <WikiCraftingTab :tree-data="modData.craftingTree" />
            </div>
            
            <div v-else-if="activeTabId === 'dungeon'" class="bg-[#161920] border border-white/5 rounded-2xl p-12 text-center text-slate-500">
              <Map :size="48" class="mx-auto mb-4 opacity-50" />
              <p>3D 地牢预览组件开发中...</p>
            </div>

            <div v-else-if="activeTabId === 'comments'" class="bg-[#161920] border border-white/5 rounded-2xl p-12 text-center text-slate-500">
              <MessageSquare :size="48" class="mx-auto mb-4 opacity-50" />
              <p>评论区组件开发中...</p>
            </div>
          </Transition>
        </div>
      </div>

      <div class="w-full lg:w-80 shrink-0 space-y-6">
        <PerformanceCard :stats="modData.performance" />
        
        <div class="h-40 rounded-2xl border border-white/5 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center text-xs text-white/30">
          服务器广告位预留
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>