import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  InlineAlertComponent,
  InlineAlertModule,
  InlineAlertType,
} from './public-api';

describe('InlineAlertComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InlineAlertModule],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
  });

  it('should render correct text content', () => {
    ins.title = 'text title 1';
    fixture.detectChanges();
    expect(
      (fixture.debugElement.query(
        By.css('#inline-alert .aui-inline-alert__title'),
      ).nativeElement as HTMLElement).textContent,
    ).toContain('text title 1');

    ins.content = 'text content 1';
    fixture.detectChanges();
    expect(
      (fixture.debugElement.query(
        By.css('#inline-alert .aui-inline-alert__content'),
      ).nativeElement as HTMLElement).textContent,
    ).toContain('text content 1');
  });

  it('should be closed by click close button', () => {
    (fixture.debugElement.query(
      By.css('#inline-alert .aui-inline-alert__close'),
    ).nativeElement as HTMLElement).click();
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('#inline-alert aui-inline-alert')),
    ).toBeNull();
  });

  it('should emit close event when click close button', () => {
    return new Promise(resolve => {
      ins.inlineAlertRef.close.subscribe(() => {
        resolve();
      });
      (fixture.debugElement.query(
        By.css('#inline-alert .aui-inline-alert__close'),
      ).nativeElement as HTMLElement).click();
      fixture.detectChanges();
    });
  });

  it('should hide close button when not closable', () => {
    ins.closable = true;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(
        By.css('#inline-alert .aui-inline-alert__close'),
      ),
    ).not.toBeNull();

    ins.closable = false;
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(
        By.css('#inline-alert .aui-inline-alert__close'),
      ),
    ).toBeNull();
  });

  it('should render correct type', () => {
    const typeList = [
      InlineAlertType.Info,
      InlineAlertType.Success,
      InlineAlertType.Warning,
      InlineAlertType.Error,
    ];

    for (const type of typeList) {
      fixture.componentInstance.type = type;
      fixture.detectChanges();
      expect(
        (fixture.debugElement.query(By.css('#inline-alert .aui-inline-alert'))
          .nativeElement as HTMLElement).className,
      ).toContain(`aui-inline-alert--${type}`);
    }
  });
});

@Component({
  template: `
    <aui-inline-alert
      id="inline-alert"
      [title]="title"
      [content]="content"
      [type]="type"
      [closable]="closable"
      #inlineAlertRef
    ></aui-inline-alert>
  `,
})
export class TestComponent {
  title = '';
  content = '';
  closable = true;
  color = '';
  type = InlineAlertType.Info;
  @ViewChild('inlineAlertRef', { static: true })
  inlineAlertRef: InlineAlertComponent;
}
