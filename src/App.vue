<script setup>
import { RouterView, useRoute } from 'vue-router'; // ✅ 1. 引入 useRoute
import TheNavbar from '@/components/layout/TheNavbar.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

const route = useRoute(); // ✅ 2. 获取当前路由实例
</script>

<template>
  <div 
    class="min-h-screen transition-colors duration-500 font-sans"
    :class="[
      // 只有在显示导航栏时 (官网模式)，才应用这些通用背景和布局
      !route.meta.hideNavbar ? 'bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-200 flex flex-col' : ''
    ]"
  >
    
    <TheNavbar v-if="!route.meta.hideNavbar" />
    
    <div :class="{ 'flex-1': !route.meta.hideNavbar }">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
    
    <TheFooter v-if="!route.meta.hideNavbar" />
    
  </div>
</template>

<style scoped>
/* 页面切换动画 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>