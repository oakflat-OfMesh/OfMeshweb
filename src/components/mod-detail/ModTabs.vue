<script setup lang="ts">
// 定义 Tab 对象的结构
interface TabItem {
  id: string;
  label: string;
  icon: any; // Lucide icon component
}

defineProps<{
  tabs: TabItem[];
  activeId: string;
}>();

const emit = defineEmits<{
  (e: 'change', id: string): void
}>();
</script>

<template>
  <div class="sticky top-[72px] z-30 bg-[#0f1115]/95 backdrop-blur-sm border-b border-slate-800 mb-8">
    <div class="flex gap-1 overflow-x-auto no-scrollbar">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="emit('change', tab.id)"
        class="relative px-6 py-4 text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap group"
        :class="activeId === tab.id ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'"
      >
        <component 
          :is="tab.icon" 
          :size="18" 
          class="transition-transform group-hover:scale-110 group-active:scale-95"
          :class="activeId === tab.id ? 'text-purple-500' : 'text-slate-500 group-hover:text-slate-300'"
        />
        
        {{ tab.label }}

        <span 
          class="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500 rounded-t-full transition-all duration-300"
          :class="activeId === tab.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-50'"
        ></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>