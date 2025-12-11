import { ref, computed } from 'vue';
import type { Modpack } from '@/types/modpack';

// 模拟数据库数据
const MOCK_DATA: Modpack[] = [
  {
    id: 'rlcraft',
    title: 'RLCraft',
    sub: 'Real Life Craft',
    desc: '你觉得自己很强？来试试这个。添加了真实的口渴、体温机制，每一棵树、每一只骷髅都可能要了你的命。这不是我的世界，这是受苦模拟器。',
    icon: '🐉',
    coverImage: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=1000&auto=format&fit=crop',
    downloads: '18.2M',
    rating: 9.5,
    difficulty: 'Hardcore',
    questCount: 0,
    author: 'Shivaxi',
    tags: ['硬核生存', 'RPG', '受苦']
  },
  {
    id: 'gtnh',
    title: 'GT: New Horizons',
    sub: 'GregTech: New Horizons',
    desc: '科技整合包的终极魔王，献给最硬核的工业玩家。从石器时代开始，经历数千小时的奋斗，最终飞向星辰大海。你需要学习真实的化学公式和电路逻辑。',
    icon: '🚀',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    downloads: '3.1M',
    rating: 9.9,
    difficulty: 'Expert',
    questCount: 3500,
    author: 'DreamMasterXXL',
    tags: ['深度科技', '魔改', '肝度爆炸']
  },
  {
    id: 'dawncraft',
    title: 'DawnCraft',
    sub: 'Echoes of Legends',
    desc: '彻底重写了战斗系统，带来了魂类游戏的体验。探索巨大的开放世界，击败数十个精心设计的 Boss，完成村民的任务，书写你的传奇。',
    icon: '⚔️',
    coverImage: 'https://images.unsplash.com/photo-1642542289680-e445037d0796?q=80&w=1000&auto=format&fit=crop',
    downloads: '5.6M',
    rating: 9.8,
    difficulty: 'Hard',
    questCount: 200,
    author: 'Bstylia14',
    tags: ['动作冒险', '魂系', '剧情']
  },
  {
    id: 'better_mc',
    title: 'Better MC',
    sub: 'BMC 4',
    desc: '如果你想要“原版”的感觉，但又希望有更多内容。添加了新的生物群系、动物和结构，完美保持了 Minecraft 的原汁原味，适合联机养老。',
    icon: '🌿',
    coverImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop',
    downloads: '12.8M',
    rating: 9.7,
    difficulty: 'Normal',
    questCount: 150,
    author: 'Sharkie',
    tags: ['原版增强', '养老', '建筑']
  }
];

// 全局状态
const modpacks = ref<Modpack[]>(MOCK_DATA);
const activePackId = ref<string>(MOCK_DATA[0]?.id || '');

export function useModpacks() {
  const activePack = computed(() => 
    modpacks.value.find(p => p.id === activePackId.value) || modpacks.value[0]
  );

  const setActivePack = (id: string) => {
    activePackId.value = id;
  };

  return {
    modpacks,
    activePack,
    activePackId,
    setActivePack
  };
}