// src/data/index.ts
import { confluenceData } from './mods/confluence';
import { createData } from './mods/create';
import type { ModDetailData } from '@/types/mod'; // 引入类型

// ✅ 定义 Map 类型
const modMap: Record<string, ModDetailData> = {
  'confluence': confluenceData,
  'create': createData,
  'twilight': confluenceData, // 占位
};

// ✅ 给参数和返回值加类型
export function getModDataById(id: string): ModDetailData | null {
  return modMap[id] || null;
}