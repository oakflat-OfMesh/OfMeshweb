// src/api/community.ts
import type { Post, Topic } from '@/types/community';

// 模拟延迟工具
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// === 模拟数据 ===
const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: { id: 'u1', name: 'Vazkii', avatar: 'bg-pink-500' },
    title: '关于 Botania 2.0 的魔力传输机制重构思路',
    preview: '目前的魔力发射器在长距离传输时有明显的性能损耗...',
    type: 'discuss',
    tags: ['植物魔法', 'RFC'],
    stats: { likes: 342, comments: 89, views: 5200 },
    createdAt: '2小时前',
    isHot: true
  },
  {
    id: 3,
    author: { id: 'u3', name: 'Artist_X', avatar: 'bg-blue-500' },
    title: '复刻《赛博朋克 2077》不夜城',
    preview: '',
    images: ['https://images.unsplash.com/photo-1605218427306-033ba20c6a39?q=80&w=1000'],
    type: 'showcase',
    tags: ['建筑', '光影'],
    stats: { likes: 2890, comments: 456, views: 42000 },
    createdAt: '1天前',
    isHot: true
  }
];

export interface LeaderboardUser {
  rank: number;
  name: string;
  solvedCount: number;
  avatar: string; // Tailwind class
}

// === 模拟数据：贡献榜 ===
const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Steve_Dev', solvedCount: 12, avatar: 'bg-green-500' },
  { rank: 2, name: 'Alex_Pro', solvedCount: 8, avatar: 'bg-orange-500' },
  { rank: 3, name: 'Notch_Real', solvedCount: 5, avatar: 'bg-blue-500' },
];

// === 导出服务接口 ===
export const CommunityService = {
  // 获取帖子列表 (支持分页和筛选)
  async getPosts(page = 1, filter = 'recommend'): Promise<Post[]> {
    await delay(600); // 模拟 600ms 网络延迟
    return MOCK_POSTS;
  },

  // 获取侧边栏话题
  async getTrendingTopics(): Promise<Topic[]> {
    await delay(300);
    return [
      { id: 'create', name: '机械动力', count: 1240, icon: '⚙️' },
      { id: 'dev', name: '模组开发', count: 856, icon: '💻' },
    ];
  },

  async getLeaderboard(): Promise<LeaderboardUser[]> {
    await new Promise(resolve => setTimeout(resolve, 400)); // 模拟延迟
    return MOCK_LEADERBOARD;
  }
};