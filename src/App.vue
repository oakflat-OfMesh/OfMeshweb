<script setup>
import { RouterView } from 'vue-router'; // ✅ 引入路由出口组件
import TheNavbar from '@/components/layout/TheNavbar.vue';
import TheFooter from '@/components/layout/TheFooter.vue';

// ❌ 删除这一行：import HomeView from '@/views/HomeView.vue';
</script>

<template>
  <div class="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-200 font-sans flex flex-col">
    
    <TheNavbar />
    
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
    
    <TheFooter />
    
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