<script setup lang="ts">
import { ref } from 'vue';
import { PlayCircle, ArrowRight, BookOpen } from 'lucide-vue-next';

const ponderSteps = [
  "将动力轴承放置在任意方块上。",
  "右键点击轴承顶部，将其设置为 '不放置方块时锁定'。",
  "在轴承上方连接底盘或方块，构建旋转体。",
  "提供侧面动力输入，整个结构将开始旋转。"
];

const currentStep = ref(0);

const nextStep = () => {
  currentStep.value = (currentStep.value + 1) % ponderSteps.length;
};
</script>

<template>
  <div class="bg-[#101014] border border-[#3d3834] rounded-2xl overflow-hidden shadow-2xl">
    <div class="bg-[#1e1e24] p-4 flex items-center justify-between border-b border-[#3d3834]">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[#3d3834] rounded-lg flex items-center justify-center text-2xl">⚙️</div>
        <div>
          <h3 class="text-[#e0dcd5] font-bold">思索: 动力轴承</h3>
          <p class="text-xs text-[#7d766f]">Mechanical Bearing</p>
        </div>
      </div>
      <BookOpen :size="20" class="text-[#64748b]" />
    </div>

    <div class="relative h-[350px] bg-[#0a0a0c] flex items-center justify-center group overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111),linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111)] bg-[length:20px_20px] opacity-20"></div>
      
      <div class="relative z-10 text-center">
        <div class="w-48 h-48 bg-[#1e1c1a] border-2 border-[#64748b] rounded-xl mx-auto mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(100,116,139,0.2)] transition-transform duration-500 group-hover:scale-105">
          <PlayCircle :size="64" class="text-[#64748b] opacity-50" />
        </div>
        <p class="text-[#64748b] text-sm font-mono bg-black/50 px-3 py-1 rounded-full inline-block">
          场景 {{ currentStep + 1 }} / {{ ponderSteps.length }}
        </p>
      </div>

      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        <div 
          v-for="(_, i) in ponderSteps" 
          :key="i"
          @click="currentStep = i"
          class="w-2.5 h-2.5 rounded-full cursor-pointer transition-all"
          :class="i === currentStep ? 'bg-[#64748b] scale-125' : 'bg-[#3d3834] hover:bg-[#5e5750]'"
        ></div>
      </div>
    </div>

    <div class="bg-[#1e1e24] p-6 border-t border-[#3d3834] flex items-start gap-4">
      <div class="w-8 h-8 rounded-full bg-[#64748b] text-[#0a0a0c] flex items-center justify-center font-bold shrink-0">
        {{ currentStep + 1 }}
      </div>
      <div>
        <h4 class="text-[#e0dcd5] font-bold mb-1">操作说明</h4>
        <p class="text-[#a8a29a] text-sm leading-relaxed max-w-md">
          {{ ponderSteps[currentStep] }}
        </p>
      </div>
      <button 
        @click="nextStep"
        class="ml-auto px-4 py-2 bg-[#3d3834] hover:bg-[#5e5750] text-[#e0dcd5] text-sm font-bold rounded-lg flex items-center gap-2 transition-colors"
      >
        下一步 <ArrowRight :size="14" />
      </button>
    </div>
  </div>
</template>