# TreeSelect Module

## TreeSelect

### TreeSelect Attributes

| 参数        | 说明           | 类型               | 默认值                  |
| ----------- | -------------- | ------------------ | ----------------------- |
| placeholder | 占位符         | string             | -                       |
| disabled    | 禁用           | boolean            | false                   |
| loading     | 加载状态       | boolean            | false                   |
| value       | 选中值         | any                | -                       |
| filterable  | 是否可过滤选项 | boolean            | false                   |
| filterFn    | 过滤函数       | OptionFilterMethod | Array.property.includes |
| clearable   | 是否可清空选项 | boolean            | false                   |

### TreeSelect Events

| 时间名称     | 说明         | 回调参数      |
| ------------ | ------------ | ------------- |
| valueChange  | 选中值变化   | value: any    |
| filterChange | input 值变化 | value: string |

## TreeNode

### TreeNode Attributes

| 参数     | 说明                     | 类型    | 默认值 |
| -------- | ------------------------ | ------- | ------ |
| label    | 选中后 select 显示的文案 | string  | -      |
| value    | 选中值                   | any     | -      |
| disabled | 禁用                     | boolean | false  |
| expanded | 是否默认展开节点         | boolean | false  |
| leafOnly | 只允许选择叶子节点       | boolean | false  |
