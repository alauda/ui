# Anchor Module

## AnchorDirective(`[auiAnchor]`)

### AnchorDirective Inputs

| 参数          | 说明                                                                                                       | 类型                    | 默认值      |
| ------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------- | ----------- |
| auiAnchor     | 滚动容器, 不传值默认取 `cdkScrollable` 或当前元素（如果可滚动）或 `window`                                 | `HTMLElement`           | `undefined` |
| adaptPosition | 是否自动调整当前元素 `paddingRight` 以保证与自动生成的锚点内容不重叠                                       | `boolean`               | `true`      |
| padding       | 自动调整 `paddingRight` 时自动保持与自动生成的锚点内容的距离                                               | `number`                | `20`        |
| minTop        | 当滚动页面时自动生成的锚点内容距离页面顶部最小距离，默认取当前 `.aui-page__content` 元素的 `paddingTop` 值 | `number`                | `20`        |
| injectId      | 是否自动在 `auiAnchorLabel` 元素上注入 id，将自动生成 `#` 可记录锚点                                       | `window === window.top` |

## AnchorLabelDirective(`[auiAnchorLabel]`)

### AnchorLabelDirective Inputs

| 参数                  | 说明                                                          | 类型                    | 默认值      |
| --------------------- | ------------------------------------------------------------- | ----------------------- | ----------- |
| auiAnchorLabel        | 自动生成锚点时对应文本内容，默认取当前元素文本内容            | `string \| TemplateRef` | `undefined` |
| auiAnchorLabelContext | 使用 `TemplateRef` 类型 `auiAnchorLabel` 时的上下文           | `unknown`               | `undefined` |
| level                 | 锚点层级，不写这个 `input` 默认是 `0`，写了不填内容默认是 `1` | `number`                | `0`         |
