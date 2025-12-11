<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
    <div v-for="i in 3" :key="i" class="h-64 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400">
      热门 Mod 展示位 {{ i }}
    </div>
  </div>
</template>