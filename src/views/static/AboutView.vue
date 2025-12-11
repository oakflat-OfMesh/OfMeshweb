<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Heart, Code2, Globe2, Coffee, ArrowRight, Sparkles } from 'lucide-vue-next';
// --- 2. 简单的滚动入场动画指令 ---
// 在元素上添加 v-animate 即可实现进入视口时上浮淡入
const vAnimate = {
  mounted: (el) => {
    el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000', 'ease-out');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.remove('opacity-0', 'translate-y-10');
          el.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(el);
  }
};
</script>

<template>
  <div class="relative min-h-screen bg-slate-50 dark:bg-[#050505] overflow-hidden transition-colors duration-500">
    
    <div class="fixed top-[64px] left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-40 transition-all duration-100 ease-out"
         :style="{ width: `${scrollProgress}%` }"></div>

    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none -z-0"></div>

    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 flex flex-col items-center text-center">
      <div v-animate class="relative z-10 max-w-4xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 text-xs font-bold mb-8">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          重构下一代社区体验
        </div>

        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white">
          连接每一个<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 animate-gradient-x">
            方块与梦想
          </span>
        </h1>

        <p class="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          OfMesh 始于一个简单的问题：<br class="hidden md:block"/>
          为什么在 Minecraft 寻找优质模组像是在开盲盒？
        </p>
      </div>
    </section>

    <section class="py-24 px-6 relative">
      <div class="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        
        <div v-animate class="order-2 md:order-1 h-[400px]">
          <div class="group relative h-full bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div class="relative z-10">
              <div class="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 border border-indigo-100 dark:border-white/5">
                <Heart :size="28" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">社区优先，而非算法</h3>
              <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                在这个流量为王的时代，我们坚持“去中心化”的推荐逻辑。无论你是只有 10 个下载量的萌新作者，还是百万级的顶流，优秀的每一行代码都值得被看见。
              </p>
            </div>
            
            <div class="text-xs font-bold text-slate-400 mt-6 uppercase tracking-wider">No Pay-to-Win</div>
          </div>
        </div>

        <div v-animate class="order-1 md:order-2 md:pl-10">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            打破 <span class="text-indigo-600 dark:text-indigo-400">黑盒</span> 推荐。
          </h2>
          <p class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            我们相信社区的力量源于每一个个体的创造力，而不是冰冷的算法权重。在这里，真诚的创作永远是第一位的。
          </p>
        </div>

      </div>
    </section>

    <section class="py-24 px-6 relative">
      <div class="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="container mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        
        <div v-animate class="max-w-md">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            拥抱<br/>彻底的 <span class="text-blue-500">透明</span>。
          </h2>
          <p class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            OfMesh 的核心组件正在逐步开源。我们相信透明是信任的基石。没有隐藏的代码，没有未知的后门。
          </p>
          <a href="#" class="inline-flex items-center gap-2 text-slate-900 dark:text-white font-bold border-b-2 border-slate-900 dark:border-white hover:text-blue-600 hover:border-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-400 transition-all pb-1">
             查看 GitHub 组织架构 <ArrowRight :size="18" />
          </a>
        </div>

        <div v-animate class="h-[450px]">
          <div class="h-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 flex flex-col justify-between text-white shadow-2xl shadow-indigo-500/30 hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden group">
            
            <div class="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>

            <div class="relative z-10">
              <div class="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6">
                <Code2 :size="28" />
              </div>
              <h3 class="text-3xl font-bold mb-2">拥抱开源</h3>
              <p class="text-indigo-200 font-bold text-sm mb-6">Open Source Core</p>
              <p class="text-white/90 text-lg leading-relaxed">
                我们的代码就在阳光下。社区不仅是使用者，更是构建者。你可以审查、修改、甚至分叉我们的核心组件。
              </p>
            </div>

            <div class="relative z-10 mt-8 flex items-center gap-2 font-bold text-sm cursor-pointer hover:gap-4 transition-all">
               GitHub Repository <ArrowRight :size="16" />
            </div>
          </div>
        </div>

      </div>
    </section>

    <section class="py-32 px-6">
      <div class="container mx-auto max-w-6xl">
        
        <div v-animate class="text-center mb-20">
          <h2 class="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
            为构建者构建，<br/>为 <span class="text-green-500">玩家</span> 服务。
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          
          <div v-animate class="min-h-[300px] bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col hover:border-green-500/30 transition-colors group">
            <div class="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
              <Globe2 :size="24" />
            </div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">无国界联机</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              打破语言壁垒，自动化的本地化工具让模组跨越国界。无论服务器在大洋彼岸还是隔壁宿舍，延迟不再是距离的代名词。
            </p>
          </div>

          <div v-animate class="min-h-[300px] bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col hover:border-orange-500/30 transition-colors group">
            <div class="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6">
              <Coffee :size="24" />
            </div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">由玩家构建</h3>
            <p class="text-xs font-bold text-slate-400 uppercase mb-2">OfMesh Team & Oakflat Digital 联合出品</p>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              我们首先是 Minecraft 玩家，其次才是开发者。我们深知寻找一个好 Mod 的痛苦，所以我们着手解决它。
            </p>
          </div>

        </div>
      </div>
    </section>

    <section class="py-40 px-6 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/50 dark:to-indigo-900/10 pointer-events-none"></div>

      <div v-animate class="relative z-10 max-w-3xl mx-auto text-center">
        <h2 class="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8">
          准备好加入<br/>这场变革了吗？
        </h2>
        <p class="text-xl text-slate-600 dark:text-slate-400 mb-12">
          不仅是一个平台，更是下一代 Minecraft 社区的起点。
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link to="/register">
            <button class="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black text-lg font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl">
              注册账号
            </button>
          </router-link>
          <button class="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-lg font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
            联系我们
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* 补充的文字渐变动画 */
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 5s ease infinite;
}
</style>