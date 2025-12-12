// src/api/auth.ts
import api from '@/api/axios'; // 假设你封装好的 axios 实例

// === 1. 定义参数类型 (和后端 DTO 对应) ===

// 登录参数
export interface LoginParams {
  username?: string; // 支持用户名或邮箱登录
  email?: string;
  password?: string;
}

// 注册参数 (必须带验证码)
export interface RegisterParams {
  username: string;
  email: string;
  password: string;
  code: string; // ✅ 新增
}

// 发送验证码参数
export interface SendCodeParams {
  email: string;
  type: 'register' | 'reset'; // 对应后端区分的业务类型
}

// 返回结构 (根据你后端的 AuthResponse)
export interface AuthResponse {
  token: string;
}

export interface ApiUserProfile {
  id: number;
  username: string;
  role: string;
  avatar: string | null;
  bio: string | null;
  level: number;
  createdAt: string;
  badges: string[];
}
// === 2. 导出 API 方法 ===

/**
 * 发送邮箱验证码
 */
export const sendVerificationCode = (params: SendCodeParams) => {
  // 后端接口: POST /api/auth/send-code?email=xx&type=xx
  return api.post('/auth/send-code', null, {
    params // axios 会自动把对象转为 query string
  });
};

/**
 * 注册
 */
export const registerUser = (data: RegisterParams) => {
  return api.post<AuthResponse>('/auth/register', data);
};

/**
 * 登录
 */
export const loginUser = (data: LoginParams) => {
  return api.post<AuthResponse>('/auth/login', data);
};

export const getMe = () => {
  // Axios 拦截器会自动处理 Token，所以这里不用手动传 Header
  return api.get<ApiUserProfile>('/users/me');
};