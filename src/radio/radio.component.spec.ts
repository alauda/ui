import { Component, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { RadioModule } from '../public-api';

import { RadioSize } from './radio.types';

describe('RadioComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let buttonDebug: DebugElement;
  let buttonEl: HTMLButtonElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RadioModule, FormsModule],
      declarations: [TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    buttonDebug = fixture.debugElement.query(By.css('.aui-radio-button'));
    buttonEl = buttonDebug.nativeElement;
  });

  it('should render correct size class in aui-radio-button', () => {
    const sizeList = [RadioSize.Medium, RadioSize.Small];
    for (const size of sizeList) {
      ins.size = size;
      fixture.detectChanges();
      expect(buttonEl.classList).toContain(`aui-radio-button--${size}`);
    }
  });

  it('should render correct disabled class in aui-radio', fakeAsync(() => {
    const disabledRadioBtn = fixture.debugElement.query(
      By.css('.aui-radio-button.isDisabled'),
    );
    expect(disabledRadioBtn).toBeNull();
    ins.disabled = true;
    fixture.detectChanges();
    tick();
    expect(disabledRadioBtn).toBeDefined();
  }));

  it('should ngModel work', fakeAsync(() => {
    (fixture.debugElement.query(By.css('#btn2 input'))
      .nativeElement as HTMLElement).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(
      (fixture.debugElement.query(By.css('#btn2 .aui-radio-button'))
        .nativeElement as HTMLElement).classList,
    ).toContain('isChecked');
    expect(ins.food).toEqual('8');

    ins.food = '7';
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(
      (fixture.debugElement.query(By.css('#btn1 .aui-radio-button'))
        .nativeElement as HTMLElement).classList,
    ).toContain('isChecked');

    (fixture.debugElement.query(By.css('#btn3 input'))
      .nativeElement as HTMLElement).dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(
      (fixture.debugElement.query(By.css('#btn3 .aui-radio-button'))
        .nativeElement as HTMLElement).classList,
    ).toContain('isChecked');
  }));
});

@Component({
  template: `
    <aui-radio-group name="food" [(ngModel)]="food">
      <aui-radio value="7">7</aui-radio>
      <aui-radio value="8">8</aui-radio>
      <aui-radio value="9" disabled="true">9</aui-radio>
    </aui-radio-group>
    <aui-radio-group name="food" [size]="size" [(ngModel)]="food">
      <aui-radio-button id="btn1" value="7">7</aui-radio-button>
      <aui-radio-button id="btn2" value="8">8</aui-radio-button>
      <aui-radio-button id="btn3" [disabled]="disabled" value="9">
        9
      </aui-radio-button>
    </aui-radio-group>
  `,
})
export class TestComponent {
  size: RadioSize = RadioSize.Medium;
  disabled = false;
  food = '7';
}
