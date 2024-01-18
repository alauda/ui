import { last } from '../internal/utils';

import { AnchorItem, AnchorTreeItem } from './types';

export const getAnchorTreeItems = (items: AnchorItem[], level = 0) => {
  const treeItems: AnchorTreeItem[] = [];
  const subItems: AnchorItem[] = [];
  for (const item of items) {
    if (item.level === level) {
      const lastTreeItem = last(treeItems);
      if (lastTreeItem) {
        const children = getAnchorTreeItems(subItems, level + 1);
        if (children.length) {
          lastTreeItem.children = children;
        }
      }
      treeItems.push(item);
      subItems.length = 0;
    } else {
      subItems.push(item);
    }
  }
  if (subItems.length) {
    last(treeItems).children = getAnchorTreeItems(subItems, level + 1);
  }
  return treeItems;
};
