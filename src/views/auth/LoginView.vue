<script setup>
import { reactive, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { Loader2, Mail, Lock, ChevronRight, AlertCircle } from 'lucide-vue-next';
import AuthLayout from '@/components/auth/AuthLayout.vue';
import api from '@/api/axios';
// ❌ 删除旧的 useAuth
// ✅ 引入新的 Pinia Store
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore(); // ✅ 初始化 Store

const isLoading = ref(false);
const focusedField = ref(''); 
const errorMessage = ref('');

const form = reactive({
  email: '',
  password: '',
  remember: false
});

const handleLogin = async () => {
  if (!form.email || !form.password) return;
  
  isLoading.value = true;
  errorMessage.value = '';

  try {
    // ✅ 1. 发送请求：使用标准字段 'identifier'
    // api.post 经过拦截器处理，直接返回 data 数据
    const authData = await api.post('/auth/login', {
      identifier: form.email, 
      password: form.password
    });

    // ✅ 2. 获取 Token
    const token = authData.token; 
    
    // ✅ 3. 更新全局状态 (存入 Pinia 并触发用户信息拉取)
    // 我们 await 它，确保状态更新完成
    await userStore.setToken(token);

    // ✅ 4. 智能跳转：根据角色决定去哪里
    try {
      // 为了确保跳转逻辑最准确，这里手动再查一次 User (或者直接用 store 里的 user)
      const userProfile = await api.get('/users/me');
      
      if (userProfile.role === 'ADMIN') {
        router.push('/admin/dashboard'); // 管理员去后台
      } else {
        router.push('/dashboard'); // 普通用户去控制台
      }
    } catch (profileError) {
      // 如果极少数情况下获取 User 失败，兜底去 Dashboard
      console.warn('Profile fetch failed during login redirect', profileError);
      router.push('/dashboard');
    }

  } catch (error) {
    console.error('登录出错:', error);
    
    // ✅ 5. 错误处理：优先展示后端返回的具体错误
    const status = error.response?.status;
    const backendMsg = error.response?.data?.message || error.response?.data;

    if (status === 400 && backendMsg) {
      // 如果后端明确说了“验证码错误”或“密码错误”，直接显示
      errorMessage.value = typeof backendMsg === 'string' ? backendMsg : '账号或密码错误';
    } else if (status && [401, 403].includes(status)) {
      errorMessage.value = '账号或密码错误，请重试';
    } else {
      errorMessage.value = '服务器连接失败，请稍后重试';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <AuthLayout title="欢迎回来" subtitle="登录 OfMesh，继续你的创造之旅">
    <form @submit.prevent="handleLogin" class="space-y-6">
      
      <div class="space-y-2 group">
        <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">邮箱 / 用户名</label>
        <div 
          class="relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
          :class="[
            errorMessage ? 'border-red-500/50 bg-red-50/10' : '',
            focusedField === 'email' && !errorMessage ? 'border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'
          ]"
        >
          <div class="pl-4 text-slate-400 transition-colors" :class="{ 'text-indigo-500': focusedField === 'email', 'text-red-500': errorMessage }">
            <Mail :size="20" />
          </div>
          <input 
            v-model="form.email"
            @focus="focusedField = 'email'; errorMessage = ''" 
            @blur="focusedField = ''"
            type="text" 
            placeholder="name@example.com"
            class="w-full pl-3 pr-4 py-3.5 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
            required
          />
        </div>
      </div>

      <div class="space-y-2">
        <div class="flex justify-between items-center ml-1">
          <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">密码</label>
          <a href="#" class="text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors">忘记密码?</a>
        </div>
        <div 
          class="relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
          :class="[
            errorMessage ? 'border-red-500/50 bg-red-50/10' : '',
            focusedField === 'password' && !errorMessage ? 'border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'
          ]"
        >
          <div class="pl-4 text-slate-400 transition-colors" :class="{ 'text-indigo-500': focusedField === 'password', 'text-red-500': errorMessage }">
            <Lock :size="20" />
          </div>
          <input 
            v-model="form.password"
            @focus="focusedField = 'password'; errorMessage = ''"
            @blur="focusedField = ''"
            type="password" 
            placeholder="••••••••"
            class="w-full pl-3 pr-4 py-3.5 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
            required
          />
        </div>
      </div>

      <div v-if="errorMessage" class="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-200 dark:border-red-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
        <AlertCircle :size="16" />
        <span>{{ errorMessage }}</span>
      </div>

      <button 
        type="submit" 
        :disabled="isLoading"
        class="group relative w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl overflow-hidden shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-shimmer skew-x-12"></div>
        
        <div class="relative flex items-center justify-center gap-2">
          <Loader2 v-if="isLoading" class="animate-spin" :size="20" />
          <span v-else>立即登录</span>
          <ChevronRight v-if="!isLoading" :size="18" class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </button>

      <div class="relative text-center mt-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-slate-200 dark:border-white/10"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-white/50 dark:bg-[#151515] backdrop-blur text-slate-500">
            还没有账号?
          </span>
        </div>
      </div>

      <div class="text-center">
         <RouterLink to="/register" class="inline-block text-indigo-600 dark:text-indigo-400 font-bold hover:underline decoration-2 underline-offset-4 transition-all">
           免费注册 OfMesh 账号
         </RouterLink>
      </div>

    </form>
  </AuthLayout>
</template>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-150%) skewX(12deg); }
  100% { transform: translateX(150%) skewX(12deg); }
}
.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>