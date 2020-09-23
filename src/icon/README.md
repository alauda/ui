# Icon

## Attributes

| 参数   | 说明                                      | 类型           | 默认值 |
| ------ | ----------------------------------------- | -------------- | ------ |
| icon   | icon 名称，用 `:` 将 namespace 和 id 隔开 | string         | none   |
| link   | 外链 svg 地址                             | string         | -      |
| margin | 在左、右方添加边距                        | 'left'/'right' | -      |

## IconRegistryService

| 名称                       | 参数        | 说明                                                                  |
| -------------------------- | ----------- | --------------------------------------------------------------------- |
| registrySvgSymbolsByUrl    | url: string | 异步加载 svg 文件，要注意预防脚本注入攻击，确保 url 和 响应是可信任的 |
| registrySvgSymbolsByString | str: string | 将 svg 字符串添加到文档，确保字符串是可信任的                         |

## Read More

主要考虑了三种实现方式：`font icon`，`inline svg`，`svg symbols`。

- `font icon`：目前使用最广泛最成熟的方案，但因为[一些缺陷](https://css-tricks.com/icon-fonts-vs-svg/)业内开始不再推崇这种方式。针对 `aui-icon` 的使用场景主要缺陷是可能出现的渲染问题。
- `inline svg`：实现上比较麻烦，DOM 操作太多。
- `svg symbols`：具有 `inline svg` 的所有优点，使用简单优雅。缺陷是浏览器兼容性，IE 所有不支持外链 svg，所以需要将 svg 插入到文档中。

## 使用自定义图标

通过静态文件目录、webpack 打包等方式将 symbol svg 文件发布到线上，并在使用图标前（通常是 app 初始化时）通过 `IconRegistryService` 服务的 `registryByUrl()` 方法注册图标文件，参数为图标对应的 url，服务将自动加载图标并将其添加到文档中。之后在使用时将图标 ID 以 `{namespace}:{name}` 的格式传给 icon 组件即可。
