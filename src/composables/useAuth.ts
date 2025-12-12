// src/composables/useAuth.ts
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// ✅ 引入 API 和类型
import { getMe, type ApiUserProfile } from '@/api/auth';

// 定义前端使用的资料格式 (经过映射处理的)
export interface UserProfile {
  id: string;
  username: string;
  role: string;
  avatar: string;
  bio: string;
  level: number;
  joinDate: string;
  badges: string[];
}

const token = ref<string>(localStorage.getItem('token') || '');
const userProfile = ref<UserProfile | null>(null);

export function useAuth() {
  const router = useRouter();
  const isLoggedIn = computed(() => !!token.value);

  // 辅助函数：角色翻译
  const mapRole = (role: string): string => {
    const map: Record<string, string> = { 
      'USER': '创造者', 
      'ADMIN': '管理员', 
      'MODERATOR': '版主' 
    };
    return map[role] || role;
  };

  // === 核心动作：获取用户资料 (重构版) ===
  const fetchUserProfile = async () => {
    if (!token.value) return;

    try {
      // ✅ 使用 Axios 调用，不用自己写 fetch 和 header 了
      const res = await getMe();
      
      // Axios 返回的是 response.data，所以这里直接用 res.data
      const data = res.data;
      
      // 数据映射
      userProfile.value = {
          id: `UID-${String(data.id).padStart(4, '0')}`,
          username: data.username,
          role: mapRole(data.role), 
          avatar: data.avatar || '', 
          bio: data.bio || '暂无介绍',
          level: data.level || 0,
          joinDate: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '未知',
          badges: data.badges || []
      };
    } catch (error: any) {
      console.error('获取用户信息失败:', error);
      // 如果是 401/403，说明 Token 失效，自动登出
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        logout();
      }
    }
  };

  // === 动作：登录 ===
  const login = (newToken: string, newUsername: string) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', newUsername); // 仅作备用，主要靠 userProfile
    
    // 登录后立刻拉取最新资料
    fetchUserProfile();
  };

  // === 动作：登出 ===
  const logout = () => {
    token.value = '';
    userProfile.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('/login');
  };

  return {
    isLoggedIn,
    token,        
    userProfile,  
    login,
    logout,
    fetchUserProfile
  };
}