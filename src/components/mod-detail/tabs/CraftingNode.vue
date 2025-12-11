<script setup lang="ts">
import type { CraftingNodeData } from '@/types/crafting';

const props = withDefaults(defineProps<{
  node: CraftingNodeData;
  selectedId: string;
  depth?: number;
}>(), { depth: 0 });

const emit = defineEmits<{ (e: 'select', node: CraftingNodeData): void }>();
const handleClick = () => { emit('select', props.node); };
const handleChildSelect = (childNode: CraftingNodeData) => { emit('select', childNode); };
</script>

<template>
  <div class="flex flex-col items-center">
    <div 
      @click.stop="handleClick"
      class="relative cursor-pointer transition-all duration-300 flex flex-col items-center justify-center w-16 h-16 rounded-xl border-2 z-10 group"
      :class="selectedId === node.id 
        ? 'border-purple-500 bg-purple-50 dark:bg-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.4)] scale-110' 
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-purple-400 dark:hover:border-purple-400 hover:bg-slate-50 dark:hover:bg-slate-700'"
    >
      <span class="text-2xl filter drop-shadow-sm">{{ node.icon }}</span>
      
      <div v-if="depth > 0" class="absolute -top-8 left-1/2 w-0.5 h-8 bg-slate-300 dark:bg-slate-600/50 -translate-x-1/2 -z-10 transition-colors" />
    </div>
    
    <span 
      class="mt-3 text-xs font-bold transition-colors px-2 py-0.5 rounded"
      :class="selectedId === node.id 
        ? 'text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-purple-500/10' 
        : 'text-slate-500 dark:text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-300'"
    >
      {{ node.name }}
    </span>

    <div v-if="node.children && node.children.length" class="flex gap-6 mt-10 relative">
      <div v-if="node.children.length > 1" class="absolute -top-6 left-8 right-8 h-0.5 bg-slate-300 dark:bg-slate-600/50 -z-10 transition-colors" />
      
      <div v-for="child in node.children" :key="child.id" class="relative">
        <CraftingNode 
          :node="child" 
          :selected-id="selectedId" 
          :depth="depth + 1"
          @select="handleChildSelect" 
        />
      </div>
    </div>
  </div>
</template>