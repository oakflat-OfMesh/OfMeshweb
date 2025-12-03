<script setup>
import { reactive, watch } from 'vue'; // ✅ 引入 watch
import { useTheme } from '@/composables/useTheme'; // ✅ 引入主题
import { Sparkles, Download, Terminal, Box, Users, Server, Layers } from 'lucide-vue-next';

const { isDark } = useTheme();

// 定义两种颜色的粒子
const colors = {
  dark: ["#3b82f6", "#8b5cf6", "#06b6d4", "#ffffff"], // 亮色粒子
  light: ["#4f46e5", "#7c3aed", "#0891b2", "#64748b"]  // 深色粒子 (为了在白底上显示)
};

const stats = [
  { label: '收录模组', value: '12,405', icon: Box },
  { label: '月活跃玩家', value: '2.4M+', icon: Users },
  { label: '验证服务器', value: '850+', icon: Server },
  { label: '已托管蓝图', value: '45k', icon: Layers },
];

const particlesConfig = reactive({
  autoPlay: true,
  background: { color: { value: "transparent" } },
  fullScreen: { enable: false },
  fpsLimit: 120, // ✅ 优化1: 限制 60 帧，省电且对低端机友好 (原 120)

  emitters: {
    direction: "top-right",
    rate: {
      quantity: 1,
      delay: 0.3, // ✅ 优化2: 发射频率降低 (0.1 -> 0.3)，细水长流
    },
    size: { width: 0, height: 100 },
    position: { x: -5, y: 50 },
  },

  particles: {
    // 颜色配置保持不变
    color: { value: isDark.value ? colors.dark : colors.light },
    
    // ✅ 优化3 (核心): 大幅降低密度计算压力
    // area: 300 -> 800 (标准值)
    // value: 120 -> 60 (够用了)
    number: { 
      value: 60, 
      density: { enable: true, area: 800 } 
    },
    
    move: {
      enable: true, 
      direction: "top-right", 
      speed: 1, // 速度保持慢速优雅
      random: false, 
      straight: false,
      outModes: { default: "out" },
    },
    
    opacity: {
      value: { min: 0.1, max: 0.6 },
      animation: { enable: true, speed: 1, startValue: "random", sync: false },
    },
    
    size: {
      value: { min: 1, max: 3 },
      animation: { enable: true, speed: 2, startValue: "random", sync: false }
    },
    
    links: { enable: false },
    shape: { type: "circle" },
  },

  interactivity: {
    // 交互保持不变
    events: { onHover: { enable: true, mode: "bubble" }, resize: true },
    modes: {
      bubble: { distance: 200, size: 6, duration: 2, opacity: 1, color: "#ffffff" },
    },
  },
  
  detectRetina: true, // 保持开启，视网膜屏适配
});

// ✅ 监听主题变化，动态修改粒子颜色
watch(isDark, (newVal) => {
  particlesConfig.particles.color.value = newVal ? colors.dark : colors.light;
  // 更新 bubble 交互颜色
  particlesConfig.interactivity.modes.bubble.color = newVal ? "#ffffff" : "#4f46e5";
});
</script>

<template>
  <div class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[600px]">
    
    <vue-particles
      id="hero-particles"
      class="absolute inset-0 z-0"
      :options="particlesConfig"
    />

    <div class="container mx-auto px-6 relative z-10 text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-6">
        <Sparkles :size="12" /> OfMesh 2.0 正式上线
      </div>
      
      <h1 class="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
        不仅仅是下载。<br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          是量化，是联机，是未来。
        </span>
      </h1>
      
      <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        告别虚假的评分和不稳定的私服。OfMesh 用真实的数据流重塑标准。<br className="hidden md:block"/>
        数千个 S 级优化模组，一键部署的蓝图，以及绝对透明的服务器排行榜。
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button class="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
          <Download :size="20" /> 下载 OfMesh 平台客户端
        </button>
        
        <button class="w-full sm:w-auto px-8 py-4 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm hover:bg-slate-100 dark:hover:bg-white/10">
          <Terminal :size="20" /> 开发者入驻
        </button>
      </div>

      <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 border-t border-slate-200 dark:border-white/5 pt-12 max-w-4xl mx-auto">
        <div v-for="(stat, i) in stats" :key="i" class="flex flex-col items-center gap-2 group">
          <div class="text-3xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ stat.value }}</div>
          <div class="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <component :is="stat.icon" :size="12" /> {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>