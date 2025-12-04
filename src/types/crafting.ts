// src/types/crafting.ts

export interface CraftingNodeData {
  id: string;
  name: string;
  icon: string;
  desc?: string;
  method?: string; // e.g. "工匠作坊"
  children?: CraftingNodeData[];
}