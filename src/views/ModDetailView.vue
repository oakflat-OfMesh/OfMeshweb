<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Hammer, Map, Info, MessageSquare, Box } from 'lucide-vue-next';

// 1. 引入类型和数据
import type { ModDetailData } from '@/types/mod';
import { getModDataById } from '@/data/index';

// 2. 引入组件注册表
import { customComponents } from '@/config/modRegistry';

// 3. 引入通用子组件
import ModHero from '@/components/mod-detail/ModHero.vue';
import ModTabs from '@/components/mod-detail/ModTabs.vue';
import WikiCraftingTab from '@/components/mod-detail/tabs/WikiCraftingTab.vue';
import PerformanceCard from '@/components/mod-detail/sidebar/PerformanceCard.vue';

const route = useRoute();
const router = useRouter();
const modData = ref<ModDetailData | null>(null);
const activeTabId = ref('');
const isLoading = ref(true);

// === 核心逻辑 1: 动态计算 Tabs ===
const displayTabs = computed(() => {
  if (!modData.value) return [];

  const baseTabs = [
    { id: 'wiki', label: '交互式工坊', icon: Hammer },
    { id: 'comments', label: '评测与讨论', icon: MessageSquare },
  ];

  const extraTabs = modData.value.customization?.extraTabs || [];

  if (extraTabs.length > 0) {
    return [...extraTabs, ...baseTabs];
  }
  
  return baseTabs;
});

// === 核心逻辑 2: 计算侧边栏挂件 ===
const SidebarWidget = computed(() => {
  const widgetKey = modData.value?.customization?.sidebarWidget;
  if (widgetKey && customComponents[widgetKey]) {
    return customComponents[widgetKey];
  }
  return null;
});

// === 核心逻辑 3: 计算主题变量 ===
const cssVariables = computed(() => {
  const style = modData.value?.styleConfig;
  // 如果没有配置 styleConfig，返回空对象
  if (!style) return {};

  return {
    '--mod-primary': style.primary,
    '--mod-primary-dim': style.primaryDim,
    // pageBackground 是一个完整的 CSS 字符串 (background-image: ...)
    // 我们把它应用在专门的背景层上，而不是作为变量传给 body
  };
});

// 加载数据
const loadData = () => {
  isLoading.value = true;
  const id = route.params.id as string;
  
  setTimeout(() => {
    const data = getModDataById(id);
    
    if (data) {
      modData.value = data;
      activeTabId.value = displayTabs.value[0]?.id || 'wiki';
    } else {
      router.replace('/workshop');
    }
    isLoading.value = false;
  }, 200);
};

onMounted(loadData);
watch(() => route.params.id, loadData);
</script>

<template>
  <div v-if="isLoading" class="min-h-screen bg-slate-50 dark:bg-[#0f1115] flex items-center justify-center transition-colors duration-300">
    <div class="flex flex-col items-center gap-4">
      <div class="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      <div class="text-slate-500 dark:text-slate-400 text-sm animate-pulse">正在读取神经网格数据...</div>
    </div>
  </div>

  <div 
    v-else-if="modData" 
    class="min-h-screen font-sans pb-20 transition-colors duration-300 relative"
    :style="cssVariables"
  >
    
    <div 
      class="fixed inset-0 z-0 pointer-events-none opacity-10"
      :style="modData.styleConfig?.pageBackground"
    ></div>
    
    <div class="fixed inset-0 z-[-1] bg-slate-50 dark:bg-[#09090b]"></div>

    <div class="relative z-10">
      
      <ModHero :info="modData.baseInfo" :styles="modData.styleConfig" />

      <div class="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        <div class="flex-1 min-w-0">
          
          <ModTabs 
            :tabs="displayTabs" 
            :active-id="activeTabId" 
            @change="activeTabId = $event" 
          />

          <div class="mt-6">
            <Transition name="fade" mode="out-in">
              
              <component 
                v-if="displayTabs.find(t => t.id === activeTabId)?.componentKey"
                :is="customComponents[displayTabs.find(t => t.id === activeTabId)!.componentKey]"
                :mod-id="modData.id"
              />

              <div v-else-if="activeTabId === 'wiki'">
                <WikiCraftingTab :tree-data="modData.craftingTree" />
              </div>

              <div v-else-if="activeTabId === 'comments'" class="bg-white dark:bg-[#161920] border border-slate-200 dark:border-white/5 rounded-2xl p-12 text-center text-slate-400 dark:text-slate-500 transition-colors">
                <MessageSquare :size="48" class="mx-auto mb-4 opacity-50" />
                <p>评论区组件开发中...</p>
              </div>
              
              <div v-else class="p-12 text-center text-slate-500">
                暂无内容
              </div>

            </Transition>
          </div>
        </div>

        <div class="w-full lg:w-80 shrink-0 space-y-6">
          
          <div v-if="SidebarWidget" class="animate-in slide-in-from-right-4 fade-in duration-500">
            <component :is="SidebarWidget" />
          </div>

          <PerformanceCard :stats="modData.performance" />
          
          <div class="h-40 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-gradient-to-br dark:from-purple-900/20 dark:to-blue-900/20 flex items-center justify-center text-xs text-slate-400 dark:text-white/30 transition-colors">
            服务器广告位预留
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>