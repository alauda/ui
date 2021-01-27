import {
  ButtonModule,
  CheckboxModule,
  FormModule,
  IconModule,
  InputModule,
  LabelPosition,
  RadioModule,
  SelectModule,
  SwitchModule,
} from '@alauda/ui';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('Form', module)
  .addDecorator(withKnobs)
  .add('form', () => {
    const labelWidth = text('labelWidth', '114px');

    const labelPositionOptions = {
      [LabelPosition.Right]: LabelPosition.Right,
      [LabelPosition.Left]: LabelPosition.Left,
      [LabelPosition.Top]: LabelPosition.Top,
    };
    const labelPosition = select(
      'labelPosition',
      labelPositionOptions,
      LabelPosition.Right,
    );

    const inline = boolean('inline', false);

    return {
      moduleMetadata: {
        imports: [
          FormModule,
          InputModule,
          IconModule,
          SelectModule,
          ButtonModule,
          SwitchModule,
          RadioModule,
          CheckboxModule,
        ],
      },
      template: /* HTML */ `
        <form
          #form="ngForm"
          auiForm
          [auiFormLabelWidth]="labelWidth"
          [auiFormLabelPosition]="labelPosition"
          [auiFormInline]="inline"
          [auiFormEmptyAddon]="true"
          style="margin: auto; max-width: 960px;"
        >
          <aui-form-item>
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
            <div auiFormItemError *ngIf="name.errors?.required">required</div>
            <div auiFormItemError *ngIf="name.errors?.minlength">
              minlength: 3
            </div>
            <div auiFormItemHint>input your name</div>
            <div auiFormItemAddon>
              <aui-icon icon="info_circle_s"></aui-icon>
            </div>
          </aui-form-item>
          <aui-form-item>
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
              <aui-icon icon="info_circle_s"></aui-icon>
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
            <aui-radio-group name="food" [(ngModel)]="food">
              <aui-radio-button value="apple">apple</aui-radio-button>
              <aui-radio-button value="coffee">coffee</aui-radio-button>
              <aui-radio-button value="tea" disabled="true">
                tea
              </aui-radio-button>
              <aui-radio-button value="icecream">icecream</aui-radio-button>
            </aui-radio-group>
            <div auiFormItemAddon>
              <aui-icon icon="info_circle_s"></aui-icon>
            </div>
          </aui-form-item>
          <aui-form-item>
            <label auiFormItemLabel>这是一个超长的标签</label>
            <aui-radio-group name="food1" [(ngModel)]="food">
              <aui-radio value="apple">apple</aui-radio>
              <aui-radio value="coffee">coffee</aui-radio>
              <aui-radio value="tea" disabled="true">tea</aui-radio>
              <aui-radio value="icecream">icecream</aui-radio>
            </aui-radio-group>
            <div auiFormItemAddon>
              <aui-icon icon="info_circle_s"></aui-icon>
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
              <aui-checkbox label="tea" disabled="true">tea</aui-checkbox>
              <aui-checkbox label="icecream">icecream</aui-checkbox>
            </aui-checkbox-group>
            <div auiFormItemAddon>
              <aui-icon icon="info_circle_s"></aui-icon>
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
              <aui-icon icon="info_circle_s"></aui-icon>
            </div>
          </aui-form-item>
          <aui-form-item>
            <label auiFormItemLabel>描述</label>
            <textarea auiFormItemControl aui-input></textarea>
          </aui-form-item>
          <div style="display: flex; justify-content: flex-end;">
            <button aui-button="primary" (click)="form.onSubmit(null)">
              submit
            </button>
            <button aui-button (click)="form.reset(); $event.preventDefault()">
              reset
            </button>
          </div>
        </form>
      `,
      props: {
        labelWidth,
        labelPosition,
        inline,
      },
    };
  });
