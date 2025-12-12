<script setup lang="ts">
import { computed } from 'vue';
import { BADGE_DICT, type BadgeDefinition } from '@/config/badgeDict';

// 使用 TS 的泛型写法定义 Props，自带类型检查
const props = withDefaults(defineProps<{
  badgeKey: string;
  size?: 'sm' | 'md'; // 限制 size 只能是这两个字符串
}>(), {
  size: 'md'
});

// 强类型计算属性：返回值明确为 BadgeDefinition
const config = computed<BadgeDefinition>(() => {
  return BADGE_DICT[props.badgeKey] || { 
    ...BADGE_DICT._default, 
    label: props.badgeKey // 找不到配置时，显示 key 作为 label
  };
});
</script>

<template>
  <span 
    class="inline-flex items-center gap-1 rounded-md border font-bold select-none transition-all hover:scale-105 cursor-help"
    :class="[
      config.style,
      size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'
    ]"
    :title="config.label"
  >
    <component 
      :is="config.icon" 
      v-if="config.icon" 
      :size="size === 'sm' ? 10 : 12" 
      stroke-width="2.5"
    />
    <span>{{ config.label }}</span>
  </span>
</template>