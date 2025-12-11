<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
    <div v-for="i in 2" :key="i" class="h-48 bg-red-500/5 border border-red-500/10 rounded-2xl flex items-center justify-center text-red-400">
      硬核整合包展示位 {{ i }}
    </div>
  </div>
</template>