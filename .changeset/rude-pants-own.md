---
'@alauda/ui': minor
---

- fix: `close` event will be triggered twice - close #247
- fix: no transition when use drawer service - close #529
- refactor: only instantiate when opened
- [BREAKING CHANGE] refactor: return type of `DrawerService#open` is changed from `DrawerComponent` to `DrawerRef`
