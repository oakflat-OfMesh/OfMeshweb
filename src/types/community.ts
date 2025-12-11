// src/types/community.ts

export type PostType = 'discuss' | 'question' | 'showcase' | 'announcement';

export interface User {
  id: string;
  name: string;
  avatar: string; // 后续可是 URL
  level?: number;
}

export interface PostStats {
  likes: number;
  comments: number;
  views: number; // 或者 string 如 '5.2k'
}

// 核心帖子结构
export interface Post {
  id: number | string;
  author: User;
  title: string;
  preview: string;
  content?: string; // 详情页才需要
  images?: string[]; // 支持多图
  type: PostType;
  tags: string[];
  stats: PostStats;
  createdAt: string; // ISO 时间或 "2小时前"
  isHot?: boolean;
  isSolved?: boolean; // 问答帖专用
}

// 话题/板块结构
export interface Topic {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  score: string;
  trend?: 'up' | 'down' | 'same';
  
  // 🔴 修改：去掉问号，强制为 number
  solvedCount: number; 
}