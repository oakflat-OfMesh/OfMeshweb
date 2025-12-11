<script setup>
// src/components/BackgroundRipple.vue
</script>

<template>
  <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
    
    <div class="absolute inset-0 w-full h-full mix-blend-soft-light dark:mix-blend-screen filter blur-[80px] opacity-70 dark:opacity-40">
      
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 animate-ripple-expand"></div>
      <div class="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-purple-500/60 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-[10%] right-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/50 animate-blob animation-delay-4000"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] rounded-full bg-white/40 dark:bg-indigo-300/30 blur-xl animate-pulse-slow"></div>
    </div>

    <div class="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"></div>
  </div>
</template>

<style scoped>
/* 动画样式保持不变，直接复制之前的即可 */
@keyframes ripple-expand {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
}
.animate-ripple-expand { animation: ripple-expand 15s ease-in-out infinite; }

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(50px, -80px) scale(1.1); }
  66% { transform: translate(-40px, 40px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 12s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
.animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>