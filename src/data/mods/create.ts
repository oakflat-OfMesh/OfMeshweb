import type { ModDetailData } from '@/types/mod'; // ✅ 引入类型定义

export const createData: ModDetailData = { // ✅ 加上类型注解
  id: 'create',
  themeColor: '#c78d46', 
  
  // 视觉风格配置
  styleConfig: {
    primary: '#c78d46',       // 主色 (黄铜)
    primaryDim: 'rgba(199, 141, 70, 0.1)', // 浅色背景
    secondary: '#8b5cf6',     
    
    // 网页大背景样式
    pageBackground: `
      background-color: #1e1c1a;
      background-image: radial-gradient(#c78d46 1px, transparent 1px);
      background-size: 40px 40px;
      opacity: 0.2; /* ✅ 修正为标准 CSS opacity */
    `,
    
    heroOverlay: 'mix-blend-overlay',
  },
  
  baseInfo: {
    title: '机械动力',
    subtitle: 'Create',
    description: '欢迎来到工业革命。利用旋转力、传送带和机械臂，构建全自动化的梦想工厂。本平台独家提供 12,000+ 验证蓝图。',
    bgImage: 'https://images.unsplash.com/photo-1590252972957-37fb79bb77b7?q=80&w=1920&auto=format&fit=crop',
    tags: ['S级优化', '工业', '红石'],
    onlineCount: 42105,
    downloadUrl: '#',
    version: '0.5.1'
  },

  performance: [
    { label: '实体渲染', value: 'Instancing', status: 'good', desc: '飞轮优化' },
    { label: '应力计算开销', value: 'Low', status: 'good', desc: '极致优化' },
    { label: '内存占用', value: 'High', status: 'warning', desc: '模型复杂' },
  ],

  craftingTree: { 
    id: 'andesite_alloy',
    name: '安山岩合金',
    icon: '🧱',
    desc: '机械动力的基础材料',
    children: [] 
  },

  customization: {
    // 侧边栏挂件 (暂时隐藏 AI 助手，填 null)
    sidebarWidget: null, 
    
    extraTabs: [
      { 
        id: 'blueprints', 
        label: '蓝图市场', 
        iconName: 'Factory', 
        componentKey: 'create_blueprints' 
      },
      { 
        id: 'ponder', 
        label: '思索 (Ponder)', 
        iconName: 'BookOpen', 
        componentKey: 'create_ponder' 
      }
    ]
  }
};