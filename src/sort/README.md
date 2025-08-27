### 设计

基于 angular/material 的 MatSort 及 MatSortHeader 原始代码修改，修改样式，移除 Alauda UI 不需要的功能，目的是保持组件尽可能简单，避免无关功能干扰开发，变更功能如下：

- sort disable 相关代码
- sort indicator 样式修改，并去除原有动画相关代码，原有动画仅适合箭头，Alauda UI 的设计并不适合添加动画
- 排序清除功能(asc -> desc -> no sort)，Alauda UI 的设计并未考虑这块功能，考虑这块功能不是非常必要，而且会增加一个排序状态，操作稍显繁琐。
- 无障碍相关功能（后续结合实际情况考虑是否加入）

### 使用

- [material2 sort.md](https://github.com/angular/material2/blob/master/src/lib/sort/sort.md)
- [material2 document](https://material.angular.io/components/sort/overview)
