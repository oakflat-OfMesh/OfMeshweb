// src/composables/useSettings.ts
import { ref } from 'vue';

// ✨ 正确！放在外面，大家共用同一个状态 (全局单例)
const isSettingsOpen = ref(false);

export function useSettings() {
  const openSettings = () => {
    isSettingsOpen.value = true;
  };

  const closeSettings = () => {
    isSettingsOpen.value = false;
  };

  return {
    isSettingsOpen,
    openSettings,
    closeSettings
  };
}