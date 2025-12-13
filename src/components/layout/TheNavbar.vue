<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router'; 
import { Search, Command, Sun, Moon, User } from 'lucide-vue-next';
import { useTheme } from '@/composables/useTheme';
// ❌ 删除: import { useAuth } from '@/composables/useAuth';
// ✅ 新增: 引入 Pinia Store
import { useUserStore } from '@/stores/user';
import ScrollProgress from '@/components/ui/ScrollProgress.vue';
import UserMenu from '@/components/layout/UserMenu.vue'; 

const route = useRoute();
const { isDark, toggleTheme } = useTheme();
const userStore = useUserStore(); // ✅ 初始化 Store

const isScrolled = ref(false);

const handleScroll = () => { isScrolled.value = window.scrollY > 10; };
onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

const navItems = [
  { name: 'Mod 工坊', path: '/workshop' },
  { name: '硬核整合包', path: '/modpacks' },
  { name: '创作者社区', path: '/community' }
];
</script>

<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b"
    :class="[
      isScrolled 
        ? 'py-3 backdrop-blur-md shadow-sm dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
        : 'py-5 bg-transparent border-transparent',
      isScrolled 
        ? 'bg-white/70 border-slate-200/60 dark:bg-[#09090b]/50 dark:border-white/10' 
        : ''
    ]"
  >
    <div 
      class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent transition-opacity duration-500"
      :class="isScrolled ? 'opacity-100' : 'opacity-0'"
    ></div>

    <div class="container mx-auto px-6 flex items-center justify-between">
      
      <RouterLink to="/" class="flex items-center gap-2 cursor-pointer group select-none">
        <div class="relative h-12 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          <div class="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <img 
            src="@/assets/logoAI.png" 
            alt="OfMesh" 
            class="relative h-full w-auto object-contain [image-rendering:pixelated] drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          />
        </div>
      </RouterLink>

      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
        <RouterLink 
          v-for="item in navItems" 
          :key="item.name"
          :to="item.path" 
          class="relative hover:text-indigo-600 dark:hover:text-white transition-colors duration-300 py-2 group"
          active-class="text-indigo-600 dark:text-white font-bold"
        >
          {{ item.name }}
          <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-indigo-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>

        <RouterLink 
          to="/servers" 
          class="relative hover:text-indigo-600 dark:hover:text-white transition-colors duration-300 py-2 group flex items-center gap-1.5"
          active-class="text-indigo-600 dark:text-white font-bold"
        >
          联机大厅
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          </span>
          <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-green-500 rounded-full transition-all duration-300 group-hover:w-full"></span>
        </RouterLink>
      </div>

      <div class="flex items-center gap-3 lg:gap-4">
         
         <button @click="toggleTheme" class="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 transition-colors duration-300 group overflow-hidden">
           <Sun :size="20" class="absolute transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 text-amber-500" />
           <Moon :size="20" class="absolute transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-indigo-400" />
         </button>

         <div class="hidden lg:flex items-center group relative">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-focus-within:opacity-100 transition duration-500 blur opacity-20"></div>
            <div class="relative flex items-center bg-slate-100 border border-slate-200 dark:bg-black/20 dark:border-white/10 rounded-full px-4 py-1.5 text-slate-400 focus-within:bg-white dark:focus-within:bg-black/40 focus-within:border-indigo-500/50 transition-all duration-300 backdrop-blur-sm">
              <Search :size="14" class="mr-2 text-slate-500 dark:text-slate-400 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors" />
              <input type="text" placeholder="搜索资源..." class="bg-transparent border-none outline-none text-sm w-32 focus:w-56 transition-all duration-500 ease-out placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-white" />
              <div class="ml-2 flex items-center gap-0.5 text-[10px] bg-slate-200 dark:bg-white/5 px-1.5 py-0.5 rounded text-slate-500 border border-slate-300 dark:border-white/5 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-300 transition-colors"><Command :size="10" /> K</div>
            </div>
         </div>

         <template v-if="userStore.isLoggedIn">
            <UserMenu />
         </template>

         <template v-else>
             <RouterLink to="/login" class="hidden sm:block text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors px-2">
               登录
             </RouterLink>
             
             <RouterLink to="/register">
               <button class="relative overflow-hidden bg-slate-900 text-white dark:bg-white dark:text-black px-5 py-2 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all duration-300 group shadow-lg hover:shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-shimmer skew-x-12"></div>
                  <div class="relative flex items-center gap-2">
                    <User :size="16" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> 
                    <span>立即注册</span>
                  </div>
               </button>
             </RouterLink>
         </template>

      </div>
    </div>
    
    <ScrollProgress v-if="route.meta.showProgressBar" />

  </nav>
</template>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-150%) skewX(12deg); }
  100% { transform: translateX(150%) skewX(12deg); }
}
.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>