import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CheckboxModule } from './public-api';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckboxModule, FormsModule],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    el = fixture.debugElement.query(By.css('.aui-checkbox__content'))
      .nativeElement;
  });

  it('should render correct text content', () => {
    ins.content = 'text content';
    fixture.detectChanges();
    expect(el.innerHTML).toContain('text content');
  });

  it('should render correct with click event', () => {
    // not-checked => checked
    (fixture.debugElement.query(By.css('#checkbox2 input'))
      .nativeElement as HTMLElement).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(
      (fixture.debugElement.query(By.css('#checkbox2 .aui-checkbox'))
        .nativeElement as HTMLElement).className,
    ).toContain('isChecked');

    // checked => not-checked
    (fixture.debugElement.query(By.css('#checkbox1 input'))
      .nativeElement as HTMLElement).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(
      (fixture.debugElement.query(By.css('#checkbox1 .aui-checkbox'))
        .nativeElement as HTMLElement).className,
    ).not.toContain('isChecked');

    // disabled: checked => checked
    (fixture.debugElement.query(By.css('#checkbox3 input'))
      .nativeElement as HTMLElement).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(
      (fixture.debugElement.query(By.css('#checkbox3 .aui-checkbox'))
        .nativeElement as HTMLElement).className,
    ).toContain('isChecked');
  });

  it('should render correct with ngModel', fakeAsync(() => {
    (fixture.debugElement.query(By.css('#checkbox4 input'))
      .nativeElement as HTMLElement).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ins.checkedMap.d).toBe(false);
    ins.checkedMap.d = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(
      (fixture.debugElement.query(By.css('#checkbox4 .aui-checkbox'))
        .nativeElement as HTMLElement).className,
    ).toContain('isChecked');
  }));
});

@Component({
  template: `
    <aui-checkbox id="checkbox1" [(ngModel)]="checkedMap.a">
      {{ content }}
    </aui-checkbox>
    <aui-checkbox id="checkbox2" [(ngModel)]="checkedMap.b">
      {{ content }}
    </aui-checkbox>
    <aui-checkbox id="checkbox3" [(ngModel)]="checkedMap.c" [disabled]="true">
      {{ content }}
    </aui-checkbox>
    <aui-checkbox id="checkbox4" [(ngModel)]="checkedMap.d">
      {{ content }}
    </aui-checkbox>
  `,
})
export class TestComponent {
  checkedMap = { a: true, b: false, c: true, d: true };
  content = 'text content';
}
