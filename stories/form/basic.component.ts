import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    template: `
    <form
      #form="ngForm"
      auiForm
      auiFormLabelWidth="114px"
      auiFormLabelPosition="right"
      [auiFormInline]="false"
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
        <div
          auiFormItemError
          *ngIf="name.errors?.required"
        >
          required
        </div>
        <div
          auiFormItemError
          *ngIf="name.errors?.minlength"
        >
          minlength: 3
        </div>
        <div auiFormItemHint>input your name</div>
        <div auiFormItemAddon>
          <aui-icon
            icon="info_circle_s"
            background="circle"
          ></aui-icon>
        </div>
      </aui-form-item>
      <aui-form-item width="small">
        <label auiFormItemLabel>input width small</label>
        <input
          aui-input
          auiFormItemControl
          name="small"
          [(ngModel)]="value1"
        />
      </aui-form-item>
      <aui-form-item width="medium">
        <label auiFormItemLabel>input width medium</label>
        <input
          aui-input
          auiFormItemControl
          name="medium"
          [(ngModel)]="value1"
        />
      </aui-form-item>
      <aui-form-item width="large">
        <label auiFormItemLabel>input width large</label>
        <aui-input-group auiFormItemControl>
          <input
            aui-input
            name="large"
            [(ngModel)]="value1"
          />
          <span auiInputAddonAfter>GB</span>
        </aui-input-group>
      </aui-form-item>
      <aui-form-item width="medium">
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
      <aui-form-item>
        <label auiFormItemLabel>年龄</label>
        <aui-number-input
          auiFormItemControl
          name="age"
          #age="ngModel"
          [(ngModel)]="value3"
          required
          min="0"
        ></aui-number-input>
      </aui-form-item>
      <aui-form-item>
        <label auiFormItemLabel>food</label>
        <aui-radio-group
          name="food"
          [(ngModel)]="food"
        >
          <aui-radio-button value="apple">apple</aui-radio-button>
          <aui-radio-button value="coffee">coffee</aui-radio-button>
          <aui-radio-button
            value="tea"
            disabled="true"
          >
            tea
          </aui-radio-button>
          <aui-radio-button value="icecream">icecream</aui-radio-button>
        </aui-radio-group>
        <div auiFormItemAddon>
          <aui-icon
            icon="info_circle_s"
            background="circle"
          ></aui-icon>
        </div>
      </aui-form-item>
      <aui-form-item>
        <label auiFormItemLabel>这是一个超长的标签</label>
        <aui-radio-group
          name="food1"
          [(ngModel)]="food"
        >
          <aui-radio value="apple">apple</aui-radio>
          <aui-radio value="coffee">coffee</aui-radio>
          <aui-radio
            value="tea"
            disabled="true"
            >tea</aui-radio
          >
          <aui-radio value="icecream">icecream</aui-radio>
        </aui-radio-group>
        <div auiFormItemAddon>
          <aui-icon
            icon="info_circle_s"
            background="circle"
          ></aui-icon>
        </div>
      </aui-form-item>
      <aui-form-item>
        <label auiFormItemLabel>long long english label</label>
        <aui-checkbox-group
          auiFormItemControl
          required
          name="foods"
          [(ngModel)]="foods"
        >
          <aui-checkbox label="apple">apple</aui-checkbox>
          <aui-checkbox label="coffee">coffee</aui-checkbox>
          <aui-checkbox
            label="tea"
            disabled="true"
            >tea</aui-checkbox
          >
          <aui-checkbox label="icecream">icecream</aui-checkbox>
        </aui-checkbox-group>
        <div auiFormItemAddon>
          <aui-icon
            icon="info_circle_s"
            background="circle"
          ></aui-icon>
        </div>
      </aui-form-item>
      <aui-form-item>
        <label auiFormItemLabel>开关</label>
        <aui-switch
          name="switch"
          auiFormItemControl
          [(ngModel)]="switchValue"
        ></aui-switch>
        <div auiFormItemAddon>
          <aui-icon
            icon="info_circle_s"
            background="circle"
          ></aui-icon>
        </div>
      </aui-form-item>
      <aui-form-item [width]="contentWidth">
        <label auiFormItemLabel>描述</label>
        <textarea
          auiFormItemControl
          aui-input
        ></textarea>
      </aui-form-item>
      <div style="display: flex; justify-content: flex-end;">
        <button
          aui-button="primary"
          (click)="form.onSubmit(null)"
        >
          submit
        </button>
        <button
          aui-button
          (click)="form.reset(); $event.preventDefault()"
        >
          reset
        </button>
      </div>
    </form>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class FormBasicComponent {}
