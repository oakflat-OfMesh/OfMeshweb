<script setup>
import TheNavbar from '@/components/layout/TheNavbar.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import HomeView from '@/views/HomeView.vue';
</script>

<template>
  <div class="min-h-screen transition-colors duration-500 bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-slate-200 font-sans">
    <TheNavbar />
    <HomeView />
    <TheFooter />
  </div>
</template>