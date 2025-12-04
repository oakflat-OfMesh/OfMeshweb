// 1. 引入具体的 Mod 数据文件
import { confluenceData } from './mods/confluence';

// 2. 建立映射表 (ID -> Data)
const modMap = {
  // Key 必须和 URL 里的 id 一致
  'confluence': confluenceData,
  
  // 暂时还没数据的，可以用汇流的数据占位测试
  'create': confluenceData, 
  'twilight': confluenceData,
};

// 3. 导出查找函数
export function getModDataById(id) {
  // 如果找不到 ID，返回默认数据或 null
  return modMap[id] || null;
}