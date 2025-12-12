// src/config/badgeDict.ts
import { type Component } from 'vue';
import { Crown, Wrench, Shield, Zap, Star, type Icon } from 'lucide-vue-next';

// 1. 定义徽章的数据结构接口
export interface BadgeDefinition {
  label: string;
  style?: string;     // ← 改为可选字段
  icon?: Component;
  priority?: number;
}

// 2. 样式预设 (抽取为常量，方便复用)
const STYLES = {
  gold:   'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
  blue:   'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
  purple: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20',
  gray:   'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700/50 dark:text-slate-400 dark:border-slate-600',
};

// 3. 徽章字典 (使用 TS 类型约束)
// Record<string, BadgeDefinition> 意味着：key 是字符串，value 必须符合 BadgeDefinition 接口
export const BADGE_DICT: Record<string, BadgeDefinition> = {
  'founder': {
    label: '创始成员',
    style: STYLES.gold,
    icon: Crown,
    priority: 100
  },
  'staff': {
    label: '官方团队',
    style: STYLES.purple,
    icon: Shield,
    priority: 90
  },
  'dev-core': {
    label: '核心开发',
    style: STYLES.blue,
    icon: Wrench,
    priority: 80
  },
  'contributor': {
    label: '贡献者',
    style: STYLES.blue,
    icon: Zap,
    priority: 50
  },
  // 默认兜底配置 (以 _ 开头避免和真实 key 冲突)
  '_default': {
    label: '未知徽章',
    style: STYLES.gray,
    icon: Star,
    priority: 0
  }
};