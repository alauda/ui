# 使用没有 typing 文件的 JavaScript 第三方库

直接引入没有 Typing 文件的 JS 模块会出现 TSC 错误。为了避免这样的情况，可以在 `src/typings.d.ts` 中增加模块和全局变量的声明。同时，在源码中如果需要声明第三方库的 `class` 的类型时，其类型应声明为 `any`。
