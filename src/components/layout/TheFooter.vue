<script setup>
import { ShieldCheck, Zap } from 'lucide-vue-next';
</script>

<template>
  <footer class="border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0c0c0e] mt-auto transition-colors duration-500">
    <div class="container mx-auto px-6 py-16">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-8 transition-colors">为什么选择 OfMesh？</h2>
          <div class="space-y-8">
            <div class="flex gap-4 group">
              <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 border border-indigo-200 dark:border-indigo-500/10 group-hover:border-indigo-500/50 transition-colors">
                <ShieldCheck :size="24" />
              </div>
              <div>
                <h3 class="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">严格的合规审核</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  拒绝快餐服与虚假宣传。所有入驻服务器均经过人工+机器双重验证，保障玩家权益。
                </p>
              </div>
            </div>

            <div class="flex gap-4 group">
              <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 border border-purple-200 dark:border-purple-500/10 group-hover:border-purple-500/50 transition-colors">
                <Zap :size="24" />
              </div>
              <div>
                <h3 class="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">PCL 深度集成</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  无需繁琐下载与配置。点击网页“一键安装”，直接唤起本地 PCL 启动器开始游戏。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="relative h-64 bg-white dark:bg-[#18181b] dark:bg-gradient-to-br dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden group shadow-sm dark:shadow-none transition-all">
          
          <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div class="text-center z-10 px-6">
            <p class="text-slate-600 dark:text-slate-200 mb-6 text-lg font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
              准备好体验下一代 Minecraft 社区了吗？
            </p>
            
            <button class="px-8 py-3 bg-slate-900 text-white dark:bg-white dark:text-black font-bold rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/10 dark:shadow-white/5">
              立即注册账号
            </button>
          </div>
        </div>

      </div>

      <div class="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 text-center text-xs text-slate-500 dark:text-slate-600 transition-colors">
        &copy; 2025 OfMesh Platform. All rights reserved. Not affiliated with Mojang Studios.
      </div>
      
    </div>
  </footer>
</template>