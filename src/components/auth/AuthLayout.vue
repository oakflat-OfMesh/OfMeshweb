<script setup>
import { RouterLink } from 'vue-router';
import { ArrowLeft, Sparkles } from 'lucide-vue-next';

defineProps({
  title: String,
  subtitle: String
});
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
    
    <div class="absolute inset-0 z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/30 dark:bg-indigo-600/20 rounded-full blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-screen"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/30 dark:bg-purple-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen"></div>
      <div class="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] bg-pink-500/20 dark:bg-fuchsia-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen"></div>
      
      <div class="absolute inset-0 bg-noise opacity-[0.03] dark:opacity-[0.05]"></div>
    </div>

    <div class="relative z-10 w-full max-w-[440px] px-6">
      
      <div class="flex justify-center mb-8 animate-fade-in-down">
        <RouterLink to="/" class="group relative">
          <div class="absolute inset-0 bg-indigo-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
          <img src="@/assets/logoAI.png" alt="OfMesh" class="h-12 w-auto relative drop-shadow-lg" />
        </RouterLink>
      </div>

      <div class="bg-white/70 dark:bg-[#111]/60 backdrop-blur-2xl rounded-[2rem] border border-white/50 dark:border-white/10 shadow-2xl shadow-indigo-500/10 dark:shadow-black/50 p-8 sm:p-10 animate-fade-in-up relative overflow-hidden group/card">
        
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
        
        <div class="text-center mb-8">
          <h1 class="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            {{ title }}
          </h1>
          <p class="text-slate-500 dark:text-slate-400 text-sm">
            {{ subtitle }}
          </p>
        </div>

        <slot></slot>

      </div>

      <div class="mt-8 text-center animate-fade-in-up animation-delay-200">
        <RouterLink to="/" class="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors">
          <ArrowLeft :size="14" /> 返回首页
        </RouterLink>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 极光游动动画 */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 10s infinite;
}
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

/* 入场动画 */
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}
.animate-fade-in-down {
  animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(-20px);
}
.animation-delay-200 { animation-delay: 0.1s; }

@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInDown {
  to { opacity: 1; transform: translateY(0); }
}

/* 噪点背景 */
.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}
</style>