# Alauda UI 介绍

当前目标是满足发行版和 DevOps 需求，长远目标是要移植进大平台并且开源。以后大平台会使用新的设计规范。

## Overview

- 开发、demo => storybook：The UI Development Environment
- 单元测试 => jest: 命令行运行、更快的测试速度、支持 snapshot 对比
- 编译 => ngc/rollup: 参照 google [APF](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview#)，支持 AOT。编译过程：
  - 复制源码并 inline template 和样式
  - ngc 将 ts 编译为 js 并生成 metadata 供 AOT 使用
  - rollup 将代码打包成 es2015/es5/umd 模块
  - 复制 package.json 等
- 项目结构 =>
  - config: jest/storybook 配置
  - tasks: 编译脚本
  - release: 编译产出物
  - coverage: 测试覆盖率报告
  - dist：storybook build
  - src: 源码
  - stories: demo app

## Coding Standards

### Angular

- 组件的配置

```ts
@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class XComponent {}
```

- 原则上如果修改元素内容或样式使用 `Component`，如果是对元素功能的增强使用 `Directive`
- 组件 `selector` 使用中划线命名，指令使用驼峰命名
- 组件参数名不带组件名前缀，指令使用指令名作为前缀

### CSS

- 严格遵守 BEM 规范
- 组件颜色、边框等可配置参数统一放在 `var.scss` 中，并根据设计意图决定是否引用基础变量
- 公用 `mixin` 等放在 `common.scss` 中

### Test

- 测试覆盖率以 80% 为目标，但测试覆盖率不能表明测试代码的质量
- 避免使用 Angular 提供的异步测试工具，推荐 `async` 和 `sleep` 函数
- AOT 打包会检查模板语法，有错误时会导致编译失败。在完成新组件后应运行 `yarn run test:aot` 进行 AOT 编译测试。bitbucket pipeline 为 master 分支配置了 AOT 编译测试，在发布新版本前应等待测试通过

## 需要注意的点

- aui 目前没有提供一次性导入全部组件的模块，需要单独导入要用的组件模块
- 当 `import` 路径为文件夹时，ngc 无法正确生成 `metadata`，所以导出模块的文件全部命名为 `public-api.ts`
- 运行 jest 测试前组件模板已被预编译为 `inline template`，因此不需要再异步编译
- 通过 `pipe` 方法组合操作符
- 多行注释会保留在编译后的文件中，所以写注释时要考虑下是不是应该用单行注释（比如 `TODO`）

## Contributing

1.  与产品和设计讨论、制定组件样式规范，或从已确定的设计中领取任务
2.  调研实现方案、接口设计，与其他组员讨论，讨论通过后明确 deadline
3.  开始开发
