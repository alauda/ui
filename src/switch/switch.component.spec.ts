import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SwitchModule } from '.';

describe('SwitchComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SwitchModule, FormsModule, TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
  });

  it('should render correct with click event', () => {
    // not-switched => switched
    (
      fixture.debugElement.query(By.css('#switch2 .aui-switch'))
        .nativeElement as HTMLElement
    ).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(
      (
        fixture.debugElement.query(By.css('#switch2 .aui-switch'))
          .nativeElement as HTMLElement
      ).className,
    ).toContain('isChecked');

    // switched => not-switched
    (
      fixture.debugElement.query(By.css('#switch1 .aui-switch'))
        .nativeElement as HTMLElement
    ).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(
      (
        fixture.debugElement.query(By.css('#switch1 .aui-switch'))
          .nativeElement as HTMLElement
      ).className,
    ).not.toContain('isChecked');

    // disabled: switched => switched
    (
      fixture.debugElement.query(By.css('#switch3 .aui-switch'))
        .nativeElement as HTMLElement
    ).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(
      (
        fixture.debugElement.query(By.css('#switch3 .aui-switch'))
          .nativeElement as HTMLElement
      ).className,
    ).toContain('isChecked');
  });

  it('should render correct with ngModel', fakeAsync(() => {
    (
      fixture.debugElement.query(By.css('#switch4 .aui-switch'))
        .nativeElement as HTMLElement
    ).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ins.switchMap.d).toBe(false);
    ins.switchMap.d = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(
      (
        fixture.debugElement.query(By.css('#switch4 .aui-switch'))
          .nativeElement as HTMLElement
      ).className,
    ).toContain('isChecked');
  }));
});

@Component({
  template: `
    <aui-switch
      id="switch1"
      [(ngModel)]="switchMap.a"
    ></aui-switch>
    <aui-switch
      id="switch2"
      [(ngModel)]="switchMap.b"
    ></aui-switch>
    <aui-switch
      id="switch3"
      [(ngModel)]="switchMap.c"
      [disabled]="true"
    ></aui-switch>
    <aui-switch
      id="switch4"
      [(ngModel)]="switchMap.d"
      [loading]="true"
    ></aui-switch>
  `,
  standalone: true,
  imports: [SwitchModule, FormsModule],
})
export class TestComponent {
  switchMap = { a: true, b: false, c: true, d: true };
}
