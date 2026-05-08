import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <form
      #form="ngForm"
      auiForm
      auiFormLabelWidth="114px"
      auiFormLabelPosition="top"
      [auiFormEmptyAddon]="true"
      >
      <aui-form-item [width]="contentWidth">
        <label auiFormItemLabel>姓名</label>
        <input
          auiFormItemControl
          name="name"
          #name="ngModel"
          aui-input
          required
          minlength="3"
          [(ngModel)]="value1"
          />
        @if (name.errors?.required) {
          <div
            auiFormItemError
            >
            required
          </div>
        }
        @if (name.errors?.minlength) {
          <div
            auiFormItemError
            >
            minlength: 3
          </div>
        }
        <div auiFormItemHint>input your name</div>
        <div auiFormItemAddon>
          <aui-icon
            icon="info_circle_s"
            background="circle"
          ></aui-icon>
        </div>
      </aui-form-item>
      <aui-form-item [width]="contentWidth">
        <label auiFormItemLabel>性别</label>
        <aui-select
          auiFormItemControl
          name="sex"
          #sex="ngModel"
          required
          [(ngModel)]="value2"
          >
          <aui-option value="test">test</aui-option>
        </aui-select>
        <div auiFormItemAddon>
          <aui-icon
            icon="info_circle_s"
            background="circle"
          ></aui-icon>
        </div>
      </aui-form-item>
    </form>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class DropdownLabelComponent {}
