# Form Module

## FormItem

### FormItem Attributes

| 参数          | 说明                | 类型           | 默认值 |
| ------------- | ------------------- | -------------- | ------ |
| labelWidth    | 标签宽度            | string         | auto   |
| labelPosition | 标签位置            | left,right,top | right  |
| emptyAddon    | 添加 addon 占位元素 | boolean        | false  |

### FormItem Contents

| 选择器                   | 说明     |
| ------------------------ | -------- |
| `label[rcFormItemLabel]` | 标签     |
| `[rcFormItemControl]`    | 表单元素 |
| `[rcFormItemHint]`       | 信息提示 |
| `[rcFormItemError]`      | 错误提示 |
| `[rcFormItemAddon]`      | 插件     |

## Form

### Form Attributes

| 参数                 | 说明                | 类型           | 默认值 |
| -------------------- | ------------------- | -------------- | ------ |
| auiFormLabelWidth    | 标签宽度            | string         | auto   |
| auiFormLabelPosition | 标签位置            | left,right,top | right  |
| auiFormEmptyAddon    | 添加 addon 占位元素 | boolean        | false  |
| auiFormInline        | 单行显示            | boolean        | false  |
