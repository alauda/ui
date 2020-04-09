import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CheckboxModule } from '../checkbox.module';

describe('CheckboxGroupComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let el1: HTMLElement;
  let el2: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CheckboxModule],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    el1 = fixture.debugElement.query(By.css('.group1 aui-checkbox-group'))
      .nativeElement;
    el2 = fixture.debugElement.query(By.css('.group2 aui-checkbox-group'))
      .nativeElement;
  });

  it('should checkbox init checked state by value array', fakeAsync(() => {
    ins.value = ['box1', 'box2', 'box3'];
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const boxes = el1.querySelectorAll('.aui-checkbox');
    expect(boxes.item(0).className).not.toContain('isChecked');
    expect(boxes.item(1).className).toContain('isChecked');
    expect(boxes.item(2).className).toContain('isChecked');
    expect(boxes.item(3).className).toContain('isChecked');
  }));

  it('should value change when checkbox clicked', () => {
    const boxes = el1.querySelectorAll('.aui-checkbox input');
    boxes.item(0).dispatchEvent(new Event('click'));
    boxes.item(1).dispatchEvent(new Event('click'));
    boxes.item(2).dispatchEvent(new Event('click'));
    boxes.item(3).dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(ins.value).toEqual(['box0', 'box1', 'box2']);
  });

  it('should checkbox init checked state by collection', fakeAsync(() => {
    ins.value2 = [{ name: 'box2' }];
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const boxes = el2.querySelectorAll('.aui-checkbox');
    expect(boxes.item(0).className).not.toContain('isChecked');
    expect(boxes.item(1).className).toContain('isChecked');
    expect(boxes.item(2).className).not.toContain('isChecked');
  }));
});

@Component({
  template: `
    <div class="group1">
      <aui-checkbox-group [(ngModel)]="value">
        <aui-checkbox label="box0">box0</aui-checkbox>
        <aui-checkbox label="box1">box1</aui-checkbox>
        <aui-checkbox label="box2">box2</aui-checkbox>
        <aui-checkbox label="box3" disabled>box3</aui-checkbox>
      </aui-checkbox-group>
    </div>
    <div class="group2">
      <aui-checkbox-group [(ngModel)]="value2" [trackFn]="trackFn">
        <aui-checkbox *ngFor="let v of baseData" [label]="v">
          {{ v.name }}
        </aui-checkbox>
      </aui-checkbox-group>
    </div>
  `,
})
class TestComponent {
  value: string[];
  baseData = [{ name: 'box1' }, { name: 'box2' }, { name: 'box3' }];
  value2: Array<{ name: string }>;
  trackFn = (val: any) => val?.name || val;
}
