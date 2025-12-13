import request from './axios'

export interface UserSummary {
  id: number | string
  username: string
  email: string
  role: string
  status: 'active' | 'banned'
  createdAt: string
}

export default {
  // === 1. 仪表盘统计 (目前后端缺这个，先留着占位) ===
  getDashboardStats() {
    return request.get('/admin/stats')
  },

  // === 2. 用户检索 ===
  // 后端可能还没写专门的 search 接口，我们先假设它支持 ?q=... 参数
  // 如果后端暂不支持，这个请求会 404，我们在页面里用 Mock 数据兜底即可
  searchUsers(query: string) {
    return request.get('/admin/users/search', { params: { q: query } })
  },
// === 2.1 管理台健康检查 (DB/Redis) ===
  getSystemHealth() {
    return request.get('/admin/health')
  },
  // === 3. 徽章管理 (对应后端 Checklist 3.1 & 3.2) ===
  grantBadge(data: { userId: number | string; badgeKey: string }) {
    return request.post('/admin/badges/grant', data)
  },

  revokeBadge(userId: number | string, badgeKey: string) {
    return request.delete('/admin/badges/revoke', { 
      params: { userId, badgeKey } 
    })
  },
  // === 4.1 概览统计 ===
  getOverviewStats() {
    return request.get('/admin/stats/overview')
  }
}