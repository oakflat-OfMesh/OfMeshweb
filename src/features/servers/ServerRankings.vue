<script setup>
import { CheckCircle2, ArrowRight } from 'lucide-vue-next';

const servers = [
  { rank: 1, name: 'Hypixel 国际服', players: '42,051', tps: '20.0', tags: ['小游戏', '正版验证'], status: 'online' },
  { rank: 2, name: '云深不知处 RPG', players: '1,204', tps: '19.8', tags: ['剧情', '长期服'], status: 'online' },
  { rank: 3, name: '地球 OL 模拟', players: '892', tps: '18.5', tags: ['生存', '经济'], status: 'busy' },
  { rank: 4, name: '2b2t 亚洲镜像', players: '560', tps: '14.2', tags: ['无政府', 'PVP'], status: 'congested' },
];
</script>

<template>
  <div class="animate-in fade-in slide-in-from-bottom-8">
    <div class="bg-[#121215] border border-white/5 rounded-2xl overflow-hidden">
      <div class="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-bold text-slate-500 uppercase tracking-wider bg-[#1a1a1e]">
        <div class="col-span-1 text-center">排名</div>
        <div class="col-span-5">服务器名称</div>
        <div class="col-span-2">状态</div>
        <div class="col-span-2 text-right">真实人数</div>
        <div class="col-span-2 text-right">平均 TPS</div>
      </div>

      <div v-for="server in servers" :key="server.rank" class="grid grid-cols-12 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors group">
        <div class="col-span-1 text-center font-black text-lg text-slate-600 group-hover:text-indigo-500">
          #{{ server.rank }}
        </div>
        <div class="col-span-5">
          <div class="font-bold text-white text-base group-hover:text-indigo-400 transition-colors flex items-center gap-2">
            {{ server.name }}
            <CheckCircle2 v-if="server.rank <= 2" :size="14" class="text-blue-500" />
          </div>
          <div class="flex gap-2 mt-1">
            <span v-for="tag in server.tags" :key="tag" class="text-[10px] px-1.5 py-0.5 rounded border border-white/10 text-slate-500">
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="col-span-2 flex items-center gap-2">
          <div class="w-2 h-2 rounded-full" 
               :class="{
                 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]': server.status === 'online',
                 'bg-yellow-500': server.status === 'busy',
                 'bg-red-500': server.status === 'congested'
               }">
          </div>
          <span class="text-xs text-slate-300 capitalize">{{ server.status }}</span>
        </div>
        <div class="col-span-2 text-right font-mono text-slate-300 font-bold">{{ server.players }}</div>
        <div class="col-span-2 text-right font-mono">
          <span class="px-2 py-1 rounded text-xs font-bold" 
                :class="parseFloat(server.tps) >= 19.5 ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'">
            {{ server.tps }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="mt-4 text-center">
      <button class="text-sm text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto group">
        显示全部 850+ 个服务器 <ArrowRight :size="12" class="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
</template>