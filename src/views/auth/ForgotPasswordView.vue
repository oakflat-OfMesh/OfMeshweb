<script setup lang="ts">
import { reactive, ref, onUnmounted, computed } from 'vue'; 
import { useRouter, RouterLink } from 'vue-router';
import { Loader2, Mail, Lock, Key, CheckCircle, ArrowLeft } from 'lucide-vue-next';
import AuthLayout from '@/components/auth/AuthLayout.vue';
import authApi from '@/api/auth';
import { createDiscreteApi } from 'naive-ui';

const router = useRouter();
const { message } = createDiscreteApi(['message']);

// 样式
const inputClass = "w-full pl-3 pr-4 py-3.5 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium";

const isLoading = ref(false);      
const isSending = ref(false);      
const countdown = ref(0);          
const focusedField = ref('');
const errorMessage = ref('');
let timer: number | null = null;   

const form = reactive({
  email: '',
  code: '',
  newPassword: '',
  confirmPassword: ''
});

// 简单的密码一致性检查
const isPasswordMatch = computed(() => {
  return form.newPassword && form.confirmPassword && form.newPassword === form.confirmPassword;
});

// === 发送验证码 (Type = reset) ===
const handleSendCode = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email || !emailRegex.test(form.email)) {
    errorMessage.value = '请输入有效的邮箱地址';
    return;
  }

  isSending.value = true;
  errorMessage.value = '';

  try {
    // ✅ 重点：这里传 type: 'reset'
    await authApi.sendCode(form.email, 'reset');
    
    // 倒计时
    countdown.value = 60;
    timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0 && timer) {
        clearInterval(timer);
      }
    }, 1000);

    message.success('验证码已发送，请检查邮箱'); 

  } catch (error: any) {
    const msg = error.response?.data?.message || error.response?.data;
    errorMessage.value = typeof msg === 'string' ? msg : '验证码发送失败';
  } finally {
    isSending.value = false;
  }
};

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

// === 提交重置 ===
const handleReset = async () => {
  if (!form.email || !form.code || !form.newPassword) return;
  
  if (!isPasswordMatch.value) {
    errorMessage.value = '两次输入的密码不一致';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    await authApi.resetPassword({
      email: form.email,
      code: form.code,
      newPassword: form.newPassword
    });

    message.success('密码重置成功，请重新登录');
    
    // 稍微延迟一下跳转，让用户看清提示
    setTimeout(() => {
      router.push('/login');
    }, 1000);

  } catch (error: any) {
    console.error('重置失败:', error);
    const backendMsg = error.response?.data?.message || error.response?.data;
    errorMessage.value = typeof backendMsg === 'string' ? backendMsg : '重置失败，请检查验证码';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <AuthLayout title="找回密码" subtitle="重置您的安全密钥">
    <form @submit.prevent="handleReset" class="space-y-5">
      
      <div class="space-y-1.5">
        <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">邮箱</label>
        <div 
          class="relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
          :class="[
            focusedField === 'email' && !errorMessage ? 'border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'
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
            placeholder="您注册时的邮箱"
            :class="inputClass"
            required
          />
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">验证码</label>
        <div class="flex gap-3">
          <div 
            class="relative flex-1 flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
            :class="[
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
            <span v-else-if="countdown > 0">{{ countdown }}s</span>
            <span v-else>获取</span>
          </button>
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">新密码</label>
        <div 
          class="relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
          :class="focusedField === 'newPassword' ? 'border-indigo-500 shadow-focus' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'"
        >
          <div class="pl-4 text-slate-400 transition-colors" :class="{ 'text-indigo-500': focusedField === 'newPassword' }">
            <Lock :size="20" />
          </div>
          <input 
            v-model="form.newPassword"
            @focus="focusedField = 'newPassword'; errorMessage = ''"
            @blur="focusedField = ''"
            type="password" 
            placeholder="至少 6 位"
            :class="inputClass"
            required
            minlength="6"
          />
        </div>
      </div>

      <div class="space-y-1.5">
        <div 
          class="relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
          :class="focusedField === 'confirmPassword' ? 'border-indigo-500 shadow-focus' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'"
        >
          <div class="pl-4 text-slate-400 transition-colors" :class="{ 'text-indigo-500': focusedField === 'confirmPassword' }">
            <Lock :size="20" />
          </div>
          <input 
            v-model="form.confirmPassword"
            @focus="focusedField = 'confirmPassword'; errorMessage = ''"
            @blur="focusedField = ''"
            type="password" 
            placeholder="再次输入"
            :class="inputClass"
            required
          />
          <div v-if="isPasswordMatch && form.confirmPassword" class="pr-4 text-green-500 animate-in fade-in zoom-in duration-300">
             <CheckCircle :size="18" />
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="flex items-center gap-2 text-sm text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-200 dark:border-red-500/20 animate-in fade-in slide-in-from-top-2 duration-300">
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
          <span v-else>重置密码</span>
        </div>
      </button>

      <div class="text-center mt-6">
        <RouterLink to="/login" class="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
          <ArrowLeft :size="16" />
          返回登录
        </RouterLink>
      </div>

    </form>
  </AuthLayout>
</template>

<style scoped>
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