<script setup lang="ts">
import { ref } from 'vue';

// 假设你有一个 api 工具或者直接用 fetch
// import { api } from '@/utils/api'; 

const userId = ref('');
const badgeKey = ref('founder'); // 默认选中 founder
const loading = ref(false);
const logs = ref<string[]>([]);

// 硬编码字典，省得去后端查，快速测试
const badgeOptions = [
  { key: 'founder', label: '👑 创始成员 (Founder)' },
  { key: 'dev-core', label: '🛠 核心开发 (Dev Core)' },
  { key: 'staff', label: '🛡 官方团队 (Staff)' },
];

const handleGrant = async () => {
  if (!userId.value) return alert('请输入 User ID');
  
  loading.value = true;
  const token = localStorage.getItem('token'); // 假设你的 token 存在这里

  try {
    // 直接请求生产环境接口
    // 如果你在本地开发前端，记得配置 vite proxy 或者填完整 URL
    const response = await fetch('/api/admin/badges/grant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 必须带 Token，否则 403
      },
      body: JSON.stringify({
        userId: parseInt(userId.value),
        badgeKey: badgeKey.value
      })
    });

    const text = await response.text();
    
    if (response.ok) {
      addLog(`✅ 成功: 给用户 ${userId.value} 发放了 [${badgeKey.value}]`);
    } else {
      addLog(`❌ 失败: ${text}`);
    }
  } catch (e) {
    addLog(`❌ 网络错误: ${e}`);
  } finally {
    loading.value = false;
  }
};

const addLog = (msg: string) => {
  logs.value.unshift(`${new Date().toLocaleTimeString()} - ${msg}`);
};
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
    <div class="max-w-md w-full bg-gray-800 rounded-xl border border-gray-700 p-6 shadow-2xl">
      <h1 class="text-2xl font-bold mb-6 text-orange-500">OfMesh 狂野控制台 🚧</h1>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">目标用户 ID (User ID)</label>
          <input 
            v-model="userId" 
            type="number" 
            placeholder="例如: 1"
            class="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:border-orange-500 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-1">选择徽章 (Badge)</label>
          <select 
            v-model="badgeKey"
            class="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white focus:border-orange-500 outline-none"
          >
            <option v-for="opt in badgeOptions" :key="opt.key" :value="opt.key">
              {{ opt.label }}
            </option>
          </select>
        </div>

        <button 
          @click="handleGrant" 
          :disabled="loading"
          class="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
        >
          {{ loading ? '发送中...' : '🚀 立即发放 (Grant)' }}
        </button>
      </div>

      <div class="mt-8">
        <h3 class="text-xs font-uppercase text-gray-500 mb-2">操作日志 (Console Logs)</h3>
        <div class="bg-black/50 rounded p-3 h-40 overflow-y-auto text-xs font-mono space-y-1">
          <div v-for="(log, i) in logs" :key="i" :class="log.includes('❌') ? 'text-red-400' : 'text-green-400'">
            {{ log }}
          </div>
          <div v-if="logs.length === 0" class="text-gray-600 italic">暂无操作...</div>
        </div>
      </div>
    </div>
  </div>
</template>