# Inline Alert

## Attributes

| 参数     | 说明       | 类型            | 默认值               |
| -------- | ---------- | --------------- | -------------------- |
| title    | 标题       | string          | -                    |
| content  | 内容       | string          | -                    |
| type     | 类型       | InlineAlertType | InlineAlertType.Info |
| closable | 是否可关闭 | boolean         | false                |

## Events

| 事件名称 | 说明                     | 回调参数 |
| -------- | ------------------------ | -------- |
| close    | 关闭 Inline Alert 时触发 | -        |
