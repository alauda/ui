- 开始时间: 2020-10-19
- 目标主版本: 5.3
- 相关 issues: https://github.com/alauda/alauda-ui/issues/47
- 实现 PR: (留空)

# 概要

用户需要输入一个日期，可以点击提供日期面板供以选择日期(年、月)

# 基本实例

```html
<!-- 选择年 -->
<aui-year-picker 
  [(ngModel)]="date" 
  (ngModelChange)="onChange($event)" 
  placeHolder="Select year"
></aui-year-picker>

<!-- 选择月 -->
<aui-month-picker
  [(ngModel)]="date"
  (ngModelChange)="onChange($event)"
  placeHolder="Select month"
></aui-month-picker>
```

# 动机

在现有业务中存在一些选择时间，不同业务中操作行为及ui上都存在不一致的情况，并且在现有时间组件臃肿操作不方便，因此需要统一产品中时间组件

# 详细设计

### 参数

| 参数               | 说明                     | 类型                         | 默认值             |
| ------------------ | ------------------------ | ---------------------------- | ------------------ |
| `[format]`         | 日期格式                 | `string`               | `yyyy | yyyy-MM` |
| `[placeHolder]`    | 输入框提示文字           | `string`              | -                  |
| `[allowClear]`     | 清除按钮                 | `boolean`            | `false`            |
| `[disabled]`       | 禁用输入框               | `boolean`            | `false`            |
| `[disabledDate]`   | 不可选择的日期           | `(current: Date) => boolean` | -                  |
| `[open]`           | 弹出层是否展开           | `boolean`            | -                  |
| `[locale]` | 国际化配置 | `object` |  |
| `[size]`           | 输入框大小               | `large|medium|small|mini`    | `medium`           |
| `(onOpenChange)` | 弹出日历和关闭日历的回调 | `EventEmitter<boolean>`      | -                  |

### ui 结构

```html
<aui-year-picker>
  // 使用 picker 组件
  <picker>
	  <calendar-header></calendar-header>
  </picker>
</aui-year-picker>


<!-- picker 日期组件--->
<span cdkOverlayOrigin>
  <input/>
  //...
</span>
// 日历弹框
<ng-template cdkConnectedOverlay>
  // ...
  <ng-content></ng-content>
</ng-template>


<!--- calendar-header 日历面板 --->
<calendar-header>
  // ...
   <ng-container [ngSwitch]="panelMode">
    <ng-container *ngSwitchCase="'decade'">
      // 十年面板
      <decade-panel></decade-panel>
    </ng-container>
    <ng-container *ngSwitchCase="'year'">
      // 年面板
      <year-panel></year-panel>
    </ng-container>
    <ng-container *ngSwitchCase="'month'">
      // 月面板
      <month-panel></month-panel>
    </ng-container>
  </ng-container>
</calendar-header>

```

### picker

> 用于设置 日期 input 样式状态 及打开关闭日历弹框(`calendar-picker`)

- `format`  根据传入的格式，转换

  ```html
  <input
   readonly
   [disabled]="disabled"
   value="{{ getReadableValue() }}"
   placeholder="{{ getPlaceholder() }}"
  />
  getReadableValue() {
    // ....
    return helper.format(date, this.format)
  }	
  ```

- `locale`  aui 内部提供`i18n service`,用来翻译日期组件的一些文字

  ```typescript
  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }
  
  // zh
  export default {
    today: '今天',
    now: '此刻',
    ok: '确定',
    timeSelect: '选择时间',
    dateSelect: '选择日期',
    weekSelect: '选择周',
    // ...
  }
  // en
  export default {
    today: 'Today',
    now: 'Now',
    ok: 'Ok',
    timeSelect: 'select time',
    dateSelect: 'select date',
    weekSelect: 'Choose a week',
  }
  ```

- open 默认打开日历面板，通过`cdk Overlay`创建及销毁 日历面板(`calendar-picker`)

```html
<span
  cdkOverlayOrigin
  #origin="cdkOverlayOrigin"
  (click)="onClickInputBox()"
  (keyup.enter)="onClickInputBox()"
>
  <input
    #pickerInput
    [disabled]="disabled"
    readonly
    value="{{ getReadableValue() }}"
    placeholder="{{ getPlaceholder() }}"
  />

<!-- Overlay -->
<ng-template
  cdkConnectedOverlay
  [cdkConnectedOverlayOrigin]="origin"
  [cdkConnectedOverlayOpen]="realOpenState"
  [cdkConnectedOverlayHasBackdrop]="!isOpenHandledByUser()"
  [cdkConnectedOverlayPositions]="overlayPositions"
  (positionChange)="onPositionChange($event)"
  (backdropClick)="onClickBackdrop()"
  (detach)="onOverlayDetach()"
>
  // ...
  <ng-content></ng-content>
</ng-template>
```


### calendar-picker

> 日历面板，选择年、月

#### `decade-pane month-panel year-pane`

>通过 `panelMode` 判断展示某种模式 日历面板组件 
> `[decade, year, month] 模式日历面板`

- `disabledDate` 根据当前模式日历面板，循环面板中的日期，通过比较日期是否允许来动态展示页面ui

  ```typescript
  <aui-year-picker [disabledDate]="disabledDate"></aui-year-picker>
  
  disabledDate = (current: Date): boolean => {
   return differenceInCalendarDays(current, this.today) > 0;
  };
  
  
  // year-panel
  ngOnChanges() {
  	 this.panelYears = this.makePanelYears();
  }
  private makePanelYears(): PanelYearData[][] {
      const years: PanelYearData[][] = [];
      let index = 0;
      for (let rowIndex = 0; rowIndex < MAX_ROW; rowIndex++) {
        years[rowIndex] = [];
        for (let colIndex = 0; colIndex < MAX_COL; colIndex++) {
          const year = previousYear + index;
          const content = String(year);
          const disabled = this.disabledDate ? this.disabledDate(this.value.setYear(year).nativeDate) : false;
          const cell: PanelYearData = (years[rowIndex][colIndex] = {
            disabled,
            content,
            year,
            title: content,
            // ...
          });
          index++;
        }
      }
      return years;
    }
  }
  ```

# 缺点

NAN

# 替代方案

NAN

# 实施策略

替换掉现有时间组件(年、月)

# 未解决的问题

NAN

