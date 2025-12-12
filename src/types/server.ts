// src/types/server.ts

export interface MinecraftServer {
  id: string;
  name: string;
  ip: string;
  motd: string; // Message of the Day (服务器简介)
  cover: string; // 封面图
  status: 'online' | 'offline' | 'maintenance';
  players: {
    current: number;
    max: number;
  };
  ping: number; // 延迟 (ms)
  version: string;
  tags: string[];
  isVerified?: boolean; // 是否官方认证
}