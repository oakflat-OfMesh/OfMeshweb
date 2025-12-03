import { ref, onMounted, watch } from 'vue';

// 定义全局状态
const isDark = ref(false);

export function useTheme() {
  
  // 核心切换逻辑
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateHtmlClass();
    console.log('切换主题中...', isDark.value ? '变黑' : '变亮'); // 🖨️ 调试日志
  };

  // 更新 HTML 标签的 class
  const updateHtmlClass = () => {
    const html = document.documentElement;
    if (isDark.value) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // 初始化
  onMounted(() => {
    // 优先读取本地存储
    const saved = localStorage.getItem('theme');
    if (saved) {
      isDark.value = saved === 'dark';
    } else {
      // 其次读取系统偏好
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    updateHtmlClass();
  });

  return { isDark, toggleTheme };
}