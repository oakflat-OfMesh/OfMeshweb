<template>
  <div class="space-y-4 animate-in fade-in slide-in-from-bottom-4">
    <div v-for="i in 5" :key="i" class="h-16 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center text-slate-400">
      服务器排行 #{{ i }}
    </div>
  </div>
</template>