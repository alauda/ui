## Tag

### Tag Attributes

| 参数      | 说明                                                              | 类型          | 默认值               |
| --------- | ----------------------------------------------------------------- | ------------- | -------------------- |
| type      | 主题                                                              | TagType       | TagType.Primary      |
| size      | 尺寸                                                              | ComponentSize | ComponentSize.Medium |
| closeable | 是否可关闭                                                        | boolean       | false                |
| solid     | 是否实心                                                          | boolean       | false                |
| color     | 自定义颜色，可以 `,` 分隔两个色值，第一个值为主色，第二个为背景色 | string        | -                    |

### Tag Events

| 事件名称 | 说明            | 回调参数 |
| -------- | --------------- | -------- |
| close    | 关闭 tag 时触发 | -        |

## CheckTag

### CheckTag Attributes

| 参数    | 说明     | 类型          | 默认值               |
| ------- | -------- | ------------- | -------------------- |
| checked | 是否选中 | boolean       | false                |
| size    | 尺寸     | ComponentSize | ComponentSize.medium |

### CheckTag Events

| 事件名称      | 说明            | 回调参数 |
| ------------- | --------------- | -------- |
| checkedChange | 点击 tag 时触发 | boolean  |
