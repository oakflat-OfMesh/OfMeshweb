// 模拟 API 返回的单个 Mod 详情数据
export const mockModData = {
  id: 'confluence',
  baseInfo: {
    title: '汇流来世',
    subtitle: 'Confluence: Otherworld',
    description: '打破次元壁！将泰拉瑞亚的饰品系统、地牢探险与 Boss 挑战完美融入 Minecraft。由平台团队亲自打磨，为您带来最纯正的冒险体验。',
    bgImage: 'https://placehold.co/1920x600/2a1b3d/FFF', // 替换真实图片
    tags: ['官方认证', 'S级优化'],
    onlineCount: 7824
  },
  performance: [
    { label: '平均启动耗时', value: '12s', status: 'good', desc: '极快' },
    { label: '满载内存占用', value: '450MB', status: 'warning', desc: '中等' },
    { label: 'Tick 耗时影响', value: '+0.15ms', status: 'good', desc: '无感' },
    { label: '实体渲染开销', value: '低', status: 'good', desc: '优秀' },
  ],
  // 合成树数据 (递归结构)
  craftingTree: {
    id: 'final_boots',
    name: '泰拉之靴',
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
  }
};