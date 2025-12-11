<script setup lang="ts">
import { ref } from 'vue';
import { Download, Search, ThumbsUp, Factory } from 'lucide-vue-next';

// 模拟蓝图数据
const blueprints = [
  {
    id: 1,
    title: "早期全自动刷铁机",
    author: "工业狂魔_007",
    downloads: "12k",
    likes: 854,
    stress: "256 SU",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80", // 替换为工业风图片
    tags: ["生存前期", "全自动"]
  },
  {
    id: 2,
    title: "精密列车工厂 v2.0",
    author: "TrainLover",
    downloads: "8.5k",
    likes: 620,
    stress: "16,384 SU",
    image: "https://images.unsplash.com/photo-1455433827244-6332da7b2c26?auto=format&fit=crop&w=400&q=80",
    tags: ["后期", "精密工程"]
  },
  {
    id: 3,
    title: "紧凑型树场 (9x9)",
    author: "EcoBuilder",
    downloads: "32k",
    likes: 2100,
    stress: "512 SU",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80",
    tags: ["生存必备", "木炭生产"]
  }
];
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap gap-4 items-center bg-[#2a2622] p-4 rounded-xl border border-[#3d3834]">
      <div class="relative flex-1">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-[#7d766f]" :size="18" />
        <input 
          type="text" 
          placeholder="搜索蓝图 (例如: 刷铁机, 树场...)" 
          class="w-full bg-[#1e1c1a] border border-[#3d3834] rounded-lg py-2 pl-10 pr-4 text-[#e0dcd5] focus:outline-none focus:border-[#c78d46] transition-colors placeholder:text-[#5e5750]"
        />
      </div>
      <button class="bg-[#c78d46]/10 text-[#c78d46] px-4 py-2 rounded-lg border border-[#c78d46]/30 hover:bg-[#c78d46]/20 transition-colors font-bold text-sm flex items-center gap-2">
        <Factory :size="16" /> 上传蓝图
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="bp in blueprints" 
        :key="bp.id" 
        class="group bg-[#25221e] border border-[#3d3834] rounded-xl overflow-hidden hover:border-[#c78d46] transition-all hover:shadow-[0_0_30px_rgba(199,141,70,0.1)] hover:-translate-y-1 cursor-pointer"
      >
        <div class="relative h-48 bg-[#1a1816] overflow-hidden">
          <img :src="bp.image" :alt="bp.title" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
          <div class="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs font-mono text-[#c78d46] border border-[#c78d46]/30">
            {{ bp.stress }}
          </div>
        </div>
        <div class="p-5">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-bold text-lg text-[#e0dcd5] group-hover:text-[#c78d46] transition-colors">{{ bp.title }}</h3>
              <div class="text-xs text-[#7d766f]">by {{ bp.author }}</div>
            </div>
            <div class="flex items-center gap-1 text-xs text-[#7d766f] bg-[#1e1c1a] px-2 py-1 rounded-full">
              <ThumbsUp :size="12" /> {{ bp.likes }}
            </div>
          </div>
          <div class="flex gap-2 mt-4">
            <button class="flex-1 bg-[#c78d46] text-[#1e1c1a] font-bold py-2 rounded-lg text-sm hover:bg-[#d9a05b] transition-colors flex items-center justify-center gap-2">
              <Download :size="16" /> 获取蓝图
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>