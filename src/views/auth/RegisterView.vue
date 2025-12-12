<script setup lang="ts">
import { reactive, ref, onUnmounted } from 'vue'; 
import { useRouter, RouterLink } from 'vue-router';
import { Loader2, Mail, Lock, User, Check, AlertCircle, Key } from 'lucide-vue-next';
import AuthLayout from '@/components/auth/AuthLayout.vue';
import { useAuth } from '@/composables/useAuth';
import { registerUser, sendVerificationCode } from '@/api/auth';

const router = useRouter();
const { login } = useAuth();

// ✅ 样式常量 (解决 @apply 报错问题)
// 将 Tailwind 类名提取到这里
const inputClass = "w-full pl-3 pr-4 py-3.5 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium";

const isLoading = ref(false);      
const isSending = ref(false);      
const countdown = ref(0);          
const focusedField = ref('');
const errorMessage = ref('');
let timer: number | null = null;   

const form = reactive({
  username: '',
  email: '',
  password: '',
  code: '', 
  agreement: false
});

// === 1. 发送验证码逻辑 ===
const handleSendCode = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email || !emailRegex.test(form.email)) {
    errorMessage.value = '请输入有效的邮箱地址';
    return;
  }

  isSending.value = true;
  errorMessage.value = '';

  try {
    await sendVerificationCode({ email: form.email, type: 'register' });
    
    countdown.value = 60;
    timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer as number);
      }
    }, 1000);

    alert('验证码已发送，请检查邮箱'); 

  } catch (error: any) {
    errorMessage.value = error.response?.data || '验证码发送失败';
  } finally {
    isSending.value = false;
  }
};

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

// === 2. 注册逻辑 ===
const handleRegister = async () => {
  if (!form.username || !form.email || !form.password || !form.code) return;
  
  if (!form.agreement) {
    errorMessage.value = '请先同意用户协议';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const response = await registerUser({
      username: form.username,
      email: form.email,
      password: form.password,
      code: form.code
    });

    const token = response.data.token;
    login(token, form.username);
    
    router.push('/profile');

  } catch (error: any) {
    console.error('注册失败:', error);
    if (error.response && error.response.data) {
      const msg = typeof error.response.data === 'string' 
        ? error.response.data 
        : error.response.data.message || '注册失败';
      
      errorMessage.value = msg;
    } else {
      errorMessage.value = '服务器连接失败，请检查网络';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <AuthLayout title="创建账号" subtitle="加入社区，开始构建你的世界">
    <form @submit.prevent="handleRegister" class="space-y-5">
      
      <div class="space-y-1.5">
        <div 
          class="relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
          :class="[
            errorMessage && errorMessage.includes('用户') ? 'border-red-500/50 bg-red-50/10' : '',
            focusedField === 'username' && !errorMessage ? 'border-indigo-500 shadow-focus' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'
          ]"
        >
          <div class="pl-4 text-slate-400 transition-colors" :class="{ 'text-indigo-500': focusedField === 'username' }">
            <User :size="20" />
          </div>
          <input 
            v-model="form.username"
            @focus="focusedField = 'username'; errorMessage = ''"
            @blur="focusedField = ''"
            type="text" 
            placeholder="用户名 (例如: Steve)"
            :class="inputClass"
            required
          />
        </div>
      </div>

      <div class="space-y-1.5">
        <div 
          class="relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
          :class="[
            errorMessage && errorMessage.includes('邮箱') ? 'border-red-500/50 bg-red-50/10' : '',
            focusedField === 'email' && !errorMessage ? 'border-indigo-500 shadow-focus' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'
          ]"
        >
          <div class="pl-4 text-slate-400 transition-colors" :class="{ 'text-indigo-500': focusedField === 'email' }">
            <Mail :size="20" />
          </div>
          <input 
            v-model="form.email"
            @focus="focusedField = 'email'; errorMessage = ''"
            @blur="focusedField = ''"
            type="email" 
            placeholder="电子邮箱"
            :class="inputClass"
            required
          />
        </div>
      </div>

      <div class="flex gap-3">
        <div 
          class="relative flex-1 flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
          :class="[
            errorMessage && errorMessage.includes('验证码') ? 'border-red-500/50 bg-red-50/10' : '',
            focusedField === 'code' && !errorMessage ? 'border-indigo-500 shadow-focus' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'
          ]"
        >
          <div class="pl-4 text-slate-400 transition-colors" :class="{ 'text-indigo-500': focusedField === 'code' }">
            <Key :size="20" />
          </div>
          <input 
            v-model="form.code"
            @focus="focusedField = 'code'; errorMessage = ''"
            @blur="focusedField = ''"
            type="text" 
            placeholder="6位验证码"
            :class="inputClass"
            required
            maxlength="6"
          />
        </div>
        
        <button 
          type="button"
          @click="handleSendCode"
          :disabled="isSending || countdown > 0 || !form.email"
          class="w-32 flex items-center justify-center font-bold rounded-xl text-sm transition-all duration-300 border-2"
          :class="isSending || countdown > 0 
            ? 'bg-slate-100 dark:bg-white/5 text-slate-400 border-transparent cursor-not-allowed' 
            : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-100 dark:hover:bg-indigo-500/20'"
        >
          <Loader2 v-if="isSending" class="animate-spin" :size="18" />
          <span v-else-if="countdown > 0">{{ countdown }}s 后重发</span>
          <span v-else>获取验证码</span>
        </button>
      </div>

      <div class="space-y-1.5">
        <div 
          class="relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
          :class="focusedField === 'password' ? 'border-indigo-500 shadow-focus' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'"
        >
          <div class="pl-4 text-slate-400 transition-colors" :class="{ 'text-indigo-500': focusedField === 'password' }">
            <Lock :size="20" />
          </div>
          <input 
            v-model="form.password"
            @focus="focusedField = 'password'; errorMessage = ''"
            @blur="focusedField = ''"
            type="password" 
            placeholder="设置密码 (至少6位)"
            :class="inputClass"
            required
            minlength="6"
          />
        </div>
      </div>

      <div v-if="errorMessage" class="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-200 dark:border-red-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
        <AlertCircle :size="16" />
        <span>{{ errorMessage }}</span>
      </div>

      <label class="flex items-center gap-3 cursor-pointer group p-1">
        <div class="relative flex items-center justify-center w-5 h-5 rounded border-2 border-slate-300 dark:border-white/20 transition-colors" :class="form.agreement ? 'bg-indigo-600 border-indigo-600' : 'group-hover:border-indigo-400'">
           <input type="checkbox" v-model="form.agreement" class="appearance-none absolute inset-0 w-full h-full cursor-pointer" required />
           <Check v-if="form.agreement" :size="12" class="text-white" stroke-width="3" />
        </div>
        <div class="text-sm text-slate-500 dark:text-slate-400 select-none">
          我同意 <a href="#" class="text-indigo-600 font-bold hover:underline">用户协议</a> 和 <a href="#" class="text-indigo-600 font-bold hover:underline">隐私政策</a>
        </div>
      </label>

      <button 
        type="submit" 
        :disabled="isLoading"
        class="group relative w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl overflow-hidden shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-shimmer skew-x-12"></div>
        <div class="relative flex items-center justify-center gap-2">
          <Loader2 v-if="isLoading" class="animate-spin" :size="20" />
          <span v-else>立即注册</span>
        </div>
      </button>

      <div class="text-center mt-6">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          已有账号? 
          <RouterLink to="/login" class="font-bold text-indigo-600 dark:text-indigo-400 hover:underline transition-all">
            直接登录
          </RouterLink>
        </p>
      </div>

    </form>
  </AuthLayout>
</template>

<style scoped>
/* 这里的 @apply 已经删掉了，不会再报错了 */

.shadow-focus {
  box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
}

@keyframes shimmer {
  0% { transform: translateX(-150%) skewX(12deg); }
  100% { transform: translateX(150%) skewX(12deg); }
}
.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>