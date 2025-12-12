// src/api/server.ts
import type { MinecraftServer } from '@/types/server';

const MOCK_SERVERS: MinecraftServer[] = [
  {
    id: '1',
    name: 'OfMesh 官方生存服',
    ip: 'play.ofmesh.com',
    motd: '纯净生存 | 机械动力 | 经济系统 | 长期周目',
    cover: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop',
    status: 'online',
    players: { current: 128, max: 500 },
    ping: 24,
    version: '1.20.1',
    tags: ['Survival', 'Create Mod', 'Economy'],
    isVerified: true
  },
  {
    id: '2',
    name: 'Hypixel Network',
    ip: 'mc.hypixel.net',
    motd: '全球最大的小游戏服务器 | 起床战争 | 空岛战争',
    cover: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000&auto=format&fit=crop',
    status: 'online',
    players: { current: 42500, max: 100000 },
    ping: 180,
    version: '1.8 - 1.20',
    tags: ['Minigames', 'PVP', 'Skyblock'],
    isVerified: true
  },
  {
    id: '3',
    name: '2B2T - 混乱之地',
    ip: '2b2t.org',
    motd: '最古老的无政府服务器。没有规则，没有管理。',
    cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
    status: 'online',
    players: { current: 890, max: 1000 },
    ping: 210,
    version: '1.12.2',
    tags: ['Anarchy', 'Hardcore', 'No Rules']
  },
  {
    id: '4',
    name: 'Pixelmon 宝可梦世代',
    ip: 'pixel.mon.gg',
    motd: '抓捕、训练、对战！体验方块世界中的宝可梦冒险。',
    cover: 'https://images.unsplash.com/photo-1640955014216-75201063265b?q=80&w=1000&auto=format&fit=crop',
    status: 'maintenance',
    players: { current: 0, max: 200 },
    ping: 0,
    version: '1.16.5',
    tags: ['Pixelmon', 'RPG', 'Adventure']
  }
];

export const ServerService = {
  async getServers(): Promise<MinecraftServer[]> {
    // 模拟网络延迟
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_SERVERS), 800);
    });
  }
};