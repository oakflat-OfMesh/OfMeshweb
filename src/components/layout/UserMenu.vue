<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  ChevronDown 
} from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';
import { useSettings } from '@/composables/useSettings';

// 1. 获取全局状态
const { userProfile, logout } = useAuth();
const { openSettings } = useSettings();

// 2. ✨ 使用 computed 保持响应式 ✨
// 只有这样写，当 userProfile 变化时，这里才会跟着变
const displayName = computed(() => userProfile.value?.username || '加载中...');
const displayId = computed(() => userProfile.value?.id || 'UID-....');
const avatarUrl = computed(() => userProfile.value?.avatar);
const initial = computed(() => displayName.value.charAt(0).toUpperCase());

const isOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const closeMenu = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener('click', closeMenu));
onUnmounted(() => document.removeEventListener('click', closeMenu));

const handleLogout = () => {
  isOpen.value = false;
  logout();
};

const handleOpenSettings = () => {
  isOpen.value = false;
  openSettings();
};
</script>

<template>
  <div class="relative" ref="menuRef">
    <button 
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-transparent hover:border-slate-200 dark:hover:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 group"
    >
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform overflow-hidden ring-2 ring-white dark:ring-[#18181b]">
        <img v-if="avatarUrl" :src="avatarUrl" class="w-full h-full object-cover" />
        <span v-else>{{ initial }}</span>
      </div>
      
      <div class="flex flex-col items-start">
        <span class="text-xs font-bold text-slate-700 dark:text-slate-200 max-w-[80px] truncate leading-tight">
          {{ displayName }}
        </span>
      </div>
      <ChevronDown :size="14" class="text-slate-400 transition-transform duration-300" :class="{ 'rotate-180': isOpen }" />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0 translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 translate-y-2"
    >
      <div 
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 bg-white dark:bg-[#18181b] rounded-xl shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden py-1 z-50"
      >
        <div class="px-4 py-3 border-b border-slate-100 dark:border-white/5 mb-1 bg-slate-50/50 dark:bg-white/5">
          <p class="text-sm font-bold text-slate-900 dark:text-white truncate">{{ displayName }}</p>
          <p class="text-xs text-slate-400 font-mono mt-0.5">{{ displayId }}</p>
        </div>

        <RouterLink 
          to="/dashboard" 
          class="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          @click="isOpen = false"
        >
          <LayoutDashboard :size="16" />
          控制台
        </RouterLink>

        <RouterLink 
          to="/profile" 
          class="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          @click="isOpen = false"
        >
          <User :size="16" />
          个人资料
        </RouterLink>

        <button 
          @click="handleOpenSettings" 
          class="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <Settings :size="16" />
          设置
        </button>

        <div class="h-[1px] bg-slate-100 dark:bg-white/5 my-1"></div>

        <button 
          @click="handleLogout"
          class="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut :size="16" />
          退出登录
        </button>
      </div>
    </Transition>
  </div>
</template>