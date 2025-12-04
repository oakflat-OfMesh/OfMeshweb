// src/types/mod.ts

// 1. 工坊列表页的卡片数据接口
export interface WorkshopMod {
  id: string;
  title: string;
  sub: string;
  desc: string;
  icon: string;
  downloads: string;
  rating: number;
  bg: string; // Tailwind bg class
  tags: string[];
}

// 2. 详情页：基础信息接口
export interface ModBaseInfo {
  title: string;
  subtitle: string;
  description: string;
  bgImage: string;
  tags: string[];
  onlineCount: number;
  downloadUrl?: string;
  version?: string;
}

// 3. 详情页：性能评测接口
export interface PerformanceStat {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'bad'; // 限制为这三种字符串
  desc: string;
}

// 4. 详情页：完整数据聚合接口
// (这里引用了之前定义的 CraftingNodeData，确保你之前的 types/crafting.ts 还在)
import type { CraftingNodeData } from './crafting';

export interface ModDetailData {
  id: string;
  baseInfo: ModBaseInfo;
  performance: PerformanceStat[];
  craftingTree: CraftingNodeData;
  customization?: {
    sidebarWidget?: string | null;
    extraTabs?: any[];
  };
}