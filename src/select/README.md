## Select

### Select Attributes

| 参数        | 说明                                         | 类型               | 默认值                  |
| ----------- | -------------------------------------------- | ------------------ | ----------------------- |
| size        | 尺寸                                         | ComponentSize      | ComponentSize.Medium    |
| placeholder | 占位符                                       | string             | -                       |
| disabled    | 禁用                                         | boolean            | false                   |
| loading     | 加载状态                                     | boolean            | false                   |
| value       | 选中值                                       | T                  | -                       |
| filterable  | 是否可过滤选项                               | boolean            | false                   |
| filterFn    | 过滤函数                                     | OptionFilterMethod | Array.property.includes |
| allowCreate | 是否允许创建新值，需要和 filterable 一起打开 | boolean            | false                   |
| clearable   | 是否可清空选项                               | boolean            | false                   |
| trackFn     | 返回 value 唯一标识符                        | TrackFn            | val => val              |

### Select Events

| 时间名称     | 说明         | 回调参数      |
| ------------ | ------------ | ------------- |
| valueChange  | 选中值变化   | value: T      |
| filterChange | input 值变化 | value: string |

## MultiSelect

### MultiSelect Attributes

| 参数        | 说明                                         | 类型           | 默认值                  |
| ----------- | -------------------------------------------- | -------------- | ----------------------- |
| size        | 尺寸                                         | ComponentSize  | ComponentSize.Medium    |
| placeholder | 占位符                                       | string         | -                       |
| disabled    | 禁用                                         | boolean        | false                   |
| loading     | 加载状态                                     | boolean        | false                   |
| value       | 选中值                                       | T[]            | []                      |
| filterable  | 是否可过滤选项                               | boolean        | false                   |
| filterFn    | 过滤函数                                     | OptionFilterFn | Array.property.includes |
| allowCreate | 是否允许创建新值，需要和 filterable 一起打开 | boolean        | false                   |
| clearable   | 是否可清空选项                               | boolean        | false                   |
| trackFn     | 返回 value 唯一标识符                        | TrackFn        | val => val              |

### MultiSelect Events

| 事件名称     | 说明         | 回调参数      |
| ------------ | ------------ | ------------- |
| valueChange  | 选中值变化   | value: T      |
| filterChange | input 值变化 | value: string |

## Option

### Option Attributes

| 参数     | 说明                     | 类型    | 默认值 |
| -------- | ------------------------ | ------- | ------ |
| label    | 选中后 select 显示的文案 | string  | -      |
| value    | 选中值                   | T       | -      |
| disabled | 禁用                     | boolean | false  |
