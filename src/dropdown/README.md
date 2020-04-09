# Dropdown Module

## Dropdown

### Dropdown Attributes

| 参数                | 说明             | 类型          | 默认值       |
| ------------------- | ---------------- | ------------- | ------------ |
| auiDropdown         | menu 模板        | MenuComponent | -            |
| auiDropdownContext  | template context | any           | -            |
| auiDropdownPosition | menu 弹出位置    | string        | 'bottom end' |
| auiDropdownDisabled | 禁用 dropdown    | boolean       | false        |

## Menu

### Menu Attributes

| 参数 | 说明      | 类型          | 默认值               |
| ---- | --------- | ------------- | -------------------- |
| size | menu 大小 | ComponentSize | ComponentSize.Medium |

## MenuItem

### MenuItem Attributes

| 参数     | 说明                 | 类型    | 默认值 |
| -------- | -------------------- | ------- | ------ |
| disabled | 是否禁用             | boolean | false  |
| divide   | 是否在顶部显示分割线 | boolean | false  |

## Submenu

### Submenu Attributes

| 参数     | 说明                 | 类型           | 默认值               |
| -------- | -------------------- | -------------- | -------------------- |
| disabled | 是否禁用             | boolean        | false                |
| trigger  | 触发方式             | TooltipTrigger | TooltipTrigger.Hover |
| divide   | 是否在顶部显示分割线 | boolean        | false                |
| size     | menu 大小            | ComponentSize  | ComponentSize.Medium |

## DropdownButton

### DropdownButton Attributes

| 参数     | 说明                     | 类型          | 默认值               |
| -------- | ------------------------ | ------------- | -------------------- |
| type     | 按钮类型                 | ButtonType    | ButtonType.Default   |
| size     | 组件大小                 | ComponentSize | ComponentSize.Medium |
| loading  | 外部按钮是否显示 loading | boolean       | false                |
| disabled | 是否禁用外部按钮         | boolean       | false                |

### Events

| 事件名称    | 说明           | 回调参数 |
| ----------- | -------------- | -------- |
| buttonClick | 外部按钮被点击 | Event    |
