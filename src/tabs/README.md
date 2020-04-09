# Alauda Tabs

> 移植自 Angular Material, 增加了类型(卡片/线条)和大小(大/中/小)选项.

## 基本介绍

- 可使用 `selectedIndex` `@Input` 或者用户选择 Tab 标签来激活选中的 Tab.
- 当激活 Tab 变化时, 会发射 `selectedTabChange` 事件
- 当 Tab 被 focus 时, 会发送 `focusChange` 事件
- Label 支持文本输入 (通过 `aui-tab` 的 `[label]` 输入 ), 或者将 `auiTabLabel` 指令包裹 `ng-template` 提供自定义模板
- 可提供 `auiTabHeaderAddon` 指令为 Tab 头提供额外的模板, 停靠在 Tab 头的右侧
- 提供大/中/小三种大小输入
- 提供卡片/线条两种样式
- Tab 可打开 `closeable` 选项, tab 标签上会渲染关闭按键. 当关闭按键点击时, 会发射 `close` 事件.
- 只有被激活的 tab 的模板才会渲染
- 支持键盘选中

## 简单使用方法

```html
<aui-tab-group>
  <aui-tab label="One">
    <h1>Some tab content</h1>
    <p>...</p>
  </aui-tab>
  <aui-tab label="Two">
    <h1>Some more tab content</h1>
    <p>...</p>
  </aui-tab>
</aui-tab-group>
```

## 自定义 Tab Label

```html
<aui-tab-group>
  <aui-tab label="One">
    <ng-template auiTabLabel>
      <h1>Some tab content</h1>
      <p>...</p>
    </ng-template>
  </aui-tab>
</aui-tab-group>
```

## 自定义 Tab Header Addon

```html
<aui-tab-group>
  <aui-tab label="One">
    Content for One
  </aui-tab>

  <ng-template auiTabHeaderAddon>
    Some Addon controls
  </ng-template>
</aui-tab-group>
```

## Components

### `TabGroupComponent`

- **selector**: `aui-tab-group`
- **export**: `auiTabGroup`

#### TabGroupComponent Inputs

| 参数          | 说明              | 类型    | 默认值       |
| ------------- | ----------------- | ------- | ------------ |
| type          | 主题              | TabType | TabType.Line |
| size          | 尺寸              | TabSize | Tab.Medium   |
| selectedIndex | 选中 tab 的 index | number  | -            |
| lazy          | 懒加载模式        | boolean | false        |

#### TabGroupComponent Events

```ts
interface TabChangeEvent {
  index: number;
  tab: TabComponent;
}
```

- **selectedTabChange**: 当 Tab 切换时, 发射 TabChangeEvent 事件.
- **selectedIndex**: 当 Tab 切换时, 发射改变的 index. 与 `selectedIndex` 输入可组合成双向绑定输入.
- **focusChange**: 当 Tab 的 focus 进行切换时, 发射 TabChangeEvent 事件.

### `TabComponent`

- **selector**: `aui-tab`
- **export**: `auiTab`

#### TabComponent Inputs

| 参数      | 说明             | 类型    | 默认值 |
| --------- | ---------------- | ------- | ------ |
| label     | 文字 label       | string  | -      |
| closeable | 是否显示关闭按键 | boolean | false  |
| disabled  | 是否禁用此 tab   | boolean | false  |

#### TabComponent Events

- **close**: 当 Tab 的关闭按键被点击时发射

## Directives

### `TabLabelDirective`

- **selector**: `auiTabLabel`

可让用户自定义 label 模板.

### `TabHeaderAddonDirective`

- **selector**: `auiTabHeaderAddon`

可让用户自定义 Tab 头的插件模板.
