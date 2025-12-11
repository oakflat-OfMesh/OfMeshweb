<script setup>
import { reactive, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { Loader2, Mail, Lock, User, Check } from 'lucide-vue-next';
import AuthLayout from '@/components/auth/AuthLayout.vue';

const router = useRouter();
const isLoading = ref(false);
const focusedField = ref('');

const form = reactive({
  username: '',
  email: '',
  password: '',
  agreement: false
});

const handleRegister = async () => {
  isLoading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/dashboard');
  } catch (error) {
    console.error(error);
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
          :class="focusedField === 'username' ? 'border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'"
        >
          <div class="pl-4 text-slate-400 transition-colors" :class="{ 'text-indigo-500': focusedField === 'username' }">
            <User :size="20" />
          </div>
          <input 
            v-model="form.username"
            @focus="focusedField = 'username'"
            @blur="focusedField = ''"
            type="text" 
            placeholder="用户名 (例如: Steve)"
            class="w-full pl-3 pr-4 py-3.5 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
            required
          />
        </div>
      </div>

      <div class="space-y-1.5">
        <div 
          class="relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
          :class="focusedField === 'email' ? 'border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'"
        >
          <div class="pl-4 text-slate-400 transition-colors" :class="{ 'text-indigo-500': focusedField === 'email' }">
            <Mail :size="20" />
          </div>
          <input 
            v-model="form.email"
            @focus="focusedField = 'email'"
            @blur="focusedField = ''"
            type="email" 
            placeholder="电子邮箱"
            class="w-full pl-3 pr-4 py-3.5 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
            required
          />
        </div>
      </div>

      <div class="space-y-1.5">
        <div 
          class="relative flex items-center transition-all duration-300 rounded-xl bg-slate-50 dark:bg-black/20 border-2"
          :class="focusedField === 'password' ? 'border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'"
        >
          <div class="pl-4 text-slate-400 transition-colors" :class="{ 'text-indigo-500': focusedField === 'password' }">
            <Lock :size="20" />
          </div>
          <input 
            v-model="form.password"
            @focus="focusedField = 'password'"
            @blur="focusedField = ''"
            type="password" 
            placeholder="设置密码 (至少6位)"
            class="w-full pl-3 pr-4 py-3.5 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium"
            required
          />
        </div>
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
@keyframes shimmer {
  0% { transform: translateX(-150%) skewX(12deg); }
  100% { transform: translateX(150%) skewX(12deg); }
}
.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>