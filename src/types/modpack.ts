// src/types/modpack.ts

export type DifficultyLevel = 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'Hardcore';

export interface Modpack {
  id: string;
  title: string;
  sub: string;
  desc: string;
  icon: string;       // 封面图或图标
  coverImage: string; // 大背景图
  downloads: string;
  rating: number;
  
  // ✨ 整合包特有字段
  difficulty: DifficultyLevel;
  questCount: number; // 任务数量
  author: string;     // 作者/团队
  tags: string[];
}