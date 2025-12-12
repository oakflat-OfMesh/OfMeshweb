<script setup lang="ts">
import { computed } from 'vue';
import UserBadge from './UserBadge.vue';
import { BADGE_DICT } from '@/config/badgeDict';

// 定义 Props 类型
const props = withDefaults(defineProps<{
  badges: string[]; // 明确这是一个字符串数组
  mode?: 'full' | 'compact';
  limit?: number;
}>(), {
  badges: () => [],
  mode: 'full',
  limit: 2
});

// 临时接口，用于排序时的中间结构
interface BadgeSortItem {
  key: string;
  priority: number;
}

const displayBadges = computed<string[]>(() => {
  if (!props.badges || props.badges.length === 0) return [];

  // 1. 映射 (使用 TS 类型断言或自动推导)
  const mapped: BadgeSortItem[] = props.badges.map(key => ({
    key,
    // 可选链操作符 ?. 在 TS 中非常有用
    priority: BADGE_DICT[key]?.priority || 0
  }));

  // 2. 排序
  mapped.sort((a, b) => b.priority - a.priority);

  // 3. 截取
  if (props.mode === 'compact') {
    return mapped.slice(0, props.limit).map(b => b.key);
  }

  return mapped.map(b => b.key);
});
</script>

<template>
  <div class="flex flex-wrap items-center gap-1.5">
    <UserBadge 
      v-for="key in displayBadges" 
      :key="key" 
      :badgeKey="key"
      :size="mode === 'compact' ? 'sm' : 'md'"
    />
  </div>
</template>