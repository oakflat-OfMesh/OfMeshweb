<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const progress = ref(0);

const updateScrollProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  
  // 防止分母为 0 或计算出 NaN
  if (docHeight > 0) {
    progress.value = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
  } else {
    progress.value = 0;
  }
};

// 使用 requestAnimationFrame 优化性能，避免滚动时频繁重绘导致卡顿
let rafId = null;
const handleScroll = () => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    updateScrollProgress();
    rafId = null;
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // 初始化一次，防止刷新页面时位置不对
  updateScrollProgress();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (rafId) cancelAnimationFrame(rafId);
});
</script>

<template>
  <div class="absolute bottom-0 left-0 w-full h-[2px] bg-transparent z-50 pointer-events-none">
    <div 
      class="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] transition-all duration-150 ease-out"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>