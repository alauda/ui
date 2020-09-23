# Coding Standards

首先阅读 [Angular 风格指南](https://angular.cn/guide/styleguide)、[Material2 Coding Standards](https://github.com/angular/material2/blob/master/CODING_STANDARDS.md) ，Alauda UI 代码规范以此为基础。

## TypeScript

尽可能少的引入第三方库。必须使用的库，优先考虑是否可以使用 `peerDependencies`。

getter 不可产生副作用。

纯函数和静态变量使用 TS 模块导入。

每个模块新建独立的 `*.types.ts` 文件声明接口或类型。

目录结构、模块导入导出方式**必须**与现有组件保持一致，错误的方式可能导致 AOT 编译出错。[see more](./AOT_NOTES.md)

## Angular

使用 onPush 模式以获得更好的性能。

如果组件的功能是修改元素的内容则写成 `Component`，如果是对元素功能的增强则写成 `Directive`。

组件的 `input` 参数名不带组件前缀，指令 `input` 带前缀，命名要就简洁明了。

组件 `selector` 使用中划线命名（包括使用属性选择器时），指令使用驼峰命名。

## CSS

关闭 Angular 组件样式。

```ts
@Component({
  selector: 'aui-button'
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {}
```

使用 BEM 命名方法论。在严格遵守 [BEM](http://getbem.com/) 规范的基础上，可以使用以 `is-` 为前缀的类名表示状态。

```scss
.aui-button {
  // ...

  &__text {
    // ...
  }

  &--primary {
    // ...
  }

  &.is-disabled {
    // ...
  }
}
```

所有颜色、字体等在 `./src/theme/var.scss` 中使用语义化变量名进行配置。

## Test

使用 [Jest](https://facebook.github.io/jest/) 运行单元测试。在运行测试前组件已预编译为 `inline template`，因此在测试时不需再调用异步的 `compileComponents`。

虽然 `EventEmitter` 的回调函数是同步调用，但要保证回调函数内测试代码确实得到执行必须在 `subscribe` 内执行 `done()`。
