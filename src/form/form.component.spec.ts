import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';

import { FormModule } from './form.module';

describe('FormComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, FormModule],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();

    ins.form.onSubmit(null);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  template: `
    <form
      #form="ngForm"
      auiForm
      auiFormLabelWidth="100px"
      auiFormLabelPosition="left"
      [auiFormInline]="false"
      [auiFormEmptyAddon]="true"
    >
      <aui-form-item>
        <label auiFormItemLabel>label</label>
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
        <div auiFormItemAddon>addon</div>
      </aui-form-item>
    </form>
  `,
})
class TestComponent {
  @ViewChild('form', { static: true })
  form: NgForm;
}
