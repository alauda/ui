## 设计

基于 angular/material 的 MatTable 修改， 功能基本一致，仅移除 MatTableDataSource 相关代码`（MatTableDataSource和MatTable本身并无关系，而且功能并不适合基于服务端的排序及过滤，未来是否会抽取适合服务端的排序及过滤功能还需要考虑）`，样式按 Alauda UI 设计规范调整 。MatTable 相关组件基于 CdkTable 开发，未来 AuiTable 的  功能变更会结合 CdkTable 来做。CdkTable 的[设计目标](https://docs.google.com/document/d/1ZyKhwrgqfTBAn7saTq2jPlep2_CwSw5DeoZ8UbaXrC0/preview)和 AuiTable 有很多  共同点，可以作为一个后续功能迭代的基础。

## 使用

- [material2 table.md](https://github.com/angular/components/blob/master/src/cdk/table/table.md)
- [material2 document](https://material.angular.io/components/table/overview)
