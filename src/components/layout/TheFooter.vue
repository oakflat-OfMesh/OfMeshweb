<template>
  <footer class="border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0c0c0e] transition-colors duration-500">
    <div class="container mx-auto px-6 py-12">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div class="flex flex-col items-center md:items-start gap-2">
          <div class="flex items-center gap-2 select-none">
            <div class="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold text-sm">O</div>
            <span class="font-bold text-slate-900 dark:text-white">OfMesh</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-500">连接每一个方块与梦想。</p>
        </div>

        <div class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          <RouterLink to="/about" class="hover:text-white transition-colors">关于我们</RouterLink>
          <a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">开发者 API</a>
          <RouterLink to="/privacy" class="hover:text-white transition-colors">隐私政策</RouterLink>
          <a href="#" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">帮助中心</a>
        </div>

        <div class="text-xs text-slate-400 dark:text-slate-600 text-center md:text-right">
          &copy; 2025 OfMesh With Oakflat Digital.<br/>Not affiliated with Mojang Studios.
        </div>

      </div>
    </div>
  </footer>
</template>