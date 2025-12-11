import type { ModDetailData } from '@/types/mod'; // ✅ 引入类型定义

export const confluenceData: ModDetailData = { // ✅ 加上类型注解
  id: 'confluence',
  
  // 视觉风格配置
  styleConfig: {
    primary: '#a855f7',       // 紫色
    primaryDim: 'rgba(168, 85, 247, 0.1)',
    secondary: '#3b82f6',     
    
    pageBackground: `
      background-color: #0f1115;
      background-image: radial-gradient(#a855f7 1px, transparent 1px);
      background-size: 24px 24px;
      opacity: 0.15;
    `,
  },

  baseInfo: {
    title: '汇流来世',
    subtitle: 'Confluence: Otherworld',
    description: '打破次元壁！将泰拉瑞亚的饰品系统、地牢探险与 Boss 挑战完美融入 Minecraft。由平台团队亲自打磨，为您带来最纯正的冒险体验。',
    bgImage: 'https://images.unsplash.com/photo-1605218427306-033ba20c6a39?q=80&w=1920&auto=format&fit=crop', 
    tags: ['官方认证', 'S级优化', 'RPG'],
    onlineCount: 7824,
    downloadUrl: '#',
    version: '2.4.1'
  },

  performance: [
    { label: '平均启动耗时', value: '12s', status: 'good', desc: '极快' },
    { label: '满载内存占用', value: '450MB', status: 'warning', desc: '中等' },
    { label: 'Tick 耗时影响', value: '+0.15ms', status: 'good', desc: '无感' },
    { label: '实体渲染开销', value: '低', status: 'good', desc: '优秀' },
  ],

  craftingTree: {
    id: 'final_boots',
    name: '泰拉之靴 (Terraspark Boots)',
    icon: '🥾',
    desc: '允许飞行、超快跑速，并在液体上行走。',
    method: '工匠作坊',
    children: [
      {
        id: 'frost_boots',
        name: '霜花靴',
        icon: '❄️',
        children: [
          { id: 'lightning_boots', name: '闪电靴', icon: '⚡' },
          { id: 'ice_skates', name: '溜冰鞋', icon: '⛸️' }
        ]
      },
      {
        id: 'lava_waders',
        name: '熔岩靴',
        icon: '🔥',
        children: [
          { id: 'obsidian_rose', name: '黑曜石水上漂靴', icon: '👞' },
          { id: 'lava_charm', name: '熔岩护身符', icon: '🧿' }
        ]
      }
    ]
  },

  customization: {
    sidebarWidget: null, 
    extraTabs: []
  }
};