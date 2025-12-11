<script setup lang="ts">
import { ref } from 'vue';
import { Layers, Search, ChevronRight, Hammer } from 'lucide-vue-next';
import type { CraftingNodeData } from '@/types/crafting';
import CraftingNode from './CraftingNode.vue';

const props = defineProps<{ treeData: CraftingNodeData }>();
const selectedNode = ref<CraftingNodeData>(props.treeData);
const handleSelect = (node: CraftingNodeData) => { selectedNode.value = node; };
</script>

<template>
  <div class="bg-white dark:bg-[#161920] border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col h-[600px] overflow-hidden shadow-lg dark:shadow-2xl transition-colors duration-300">
    
    <div class="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#1a1d24]">
      <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
        <Layers :size="20" class="text-purple-600 dark:text-purple-500" /> 合成可视化
      </h3>
      
      <div class="relative group">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
        <input 
          type="text" 
          placeholder="搜索组件 ID..." 
          class="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-slate-700 rounded-full py-1.5 pl-9 pr-4 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-purple-500 focus:bg-white dark:focus:bg-slate-900 transition-all w-48 focus:w-64" 
        />
      </div>
    </div>

    <div class="flex-1 overflow-auto p-10 bg-[radial-gradient(#00000008_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:16px_16px] flex justify-center items-start transition-colors">
      <CraftingNode 
        :node="treeData" 
        :selected-id="selectedNode.id"
        @select="handleSelect" 
      />
    </div>

    <div class="p-6 bg-slate-50 dark:bg-[#1a1d24] border-t border-slate-200 dark:border-slate-800 z-10">
      <div class="flex items-start gap-5" :key="selectedNode.id">
        
        <div class="w-16 h-16 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-4xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-inner shrink-0 transition-colors">
          {{ selectedNode.icon }}
        </div>
        
        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h4 class="text-lg font-bold text-slate-900 dark:text-white leading-none mb-1.5">{{ selectedNode.name }}</h4>
              <div class="flex items-center gap-2">
                <code class="text-[10px] text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-purple-500/10 px-1.5 py-0.5 rounded font-mono border border-purple-200 dark:border-purple-500/20">
                  {{ selectedNode.id }}
                </code>
              </div>
            </div>
            <button class="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
              完整图鉴 <ChevronRight :size="12" />
            </button>
          </div>
          
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-3 line-clamp-2">
            {{ selectedNode.desc || '暂无详细描述信息。' }}
          </p>
          
          <div class="flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-1 text-[10px] bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-1 rounded border border-blue-200 dark:border-blue-500/20 font-medium">
              <Hammer :size="10" /> {{ selectedNode.method || '工作台' }}
            </span>
            <span class="inline-flex items-center gap-1 text-[10px] bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 px-2 py-1 rounded border border-orange-200 dark:border-orange-500/20 font-medium">
              ★ 传说物品
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>