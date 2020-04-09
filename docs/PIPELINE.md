## alauda-ui 流水线

AUI 发版流水线部署在 [bitbucket 流水线](https://bitbucket.org/mathildetech/alauda-ui/addon/pipelines/home)，遵守[公共组件版本管理流程](http://confluence.alauda.cn/pages/viewpage.action?pageId=50836030)里定义的操作步骤。

### 发版操作流程

通过 PR 将开发代码 merge 到 `master` 或 `prod-*` 分支，进入 merge commit 的详情页面，点击 `run pipeline` 选择 publish 流水线运行。运行时的 `PUBLISH_VERSION` 参数默认值为 `patch`，可选的值为 `major`, `minor`, `patch` 或具体的版本号，如 `2.3.3`, `2.3.3-beta.3`, `2.3.3-prod-2.3-3`。publish 流水线会自动发布 npm 包，并在当前分支推送 tag 以及 release commit(修改版本，更新 changelog)。
