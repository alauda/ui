import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { filter } from 'rxjs';

import { DISPLAY_DELAY, HIDDEN_DELAY } from './base-tooltip';
import { TooltipTrigger, TooltipType } from './tooltip.types';

import { TooltipDirective, TooltipModule } from '.';

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let hostEl: HTMLElement;
  let ocEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    ins = fixture.componentInstance;
    debugEl = fixture.debugElement.query(By.css('#host'));
    hostEl = debugEl.nativeElement;

    inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
      ocEl = overlayContainer.getContainerElement();
    })();
  });

  it('should render tooltip when mouseenter & destroy tooltip when mouseleave', fakeAsync(() => {
    hostEl.dispatchEvent(new Event('mouseenter'));
    tick(DISPLAY_DELAY);
    fixture.detectChanges();
    tick();

    expect(ins.tooltip.isCreated).toBeTruthy();
    expect(ocEl.querySelector('.aui-tooltip').innerHTML).toContain(
      'hello world',
    );
    expect(hostEl.className).toContain('tooltip-actived');

    hostEl.dispatchEvent(new Event('mouseleave'));
    tick(HIDDEN_DELAY);
    fixture.detectChanges();
    tick();

    expect(ins.tooltip.isCreated).toBeFalsy();
    expect(ocEl.querySelector('.aui-tooltip')).toBeNull();
    expect(hostEl.className).not.toContain('tooltip-actived');
  }));

  it('should still display when mouse move to tooltip', fakeAsync(() => {
    hostEl.dispatchEvent(new Event('mouseenter'));
    tick(DISPLAY_DELAY);
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('mouseleave'));
    tick(20);
    ocEl.querySelector('.aui-tooltip').dispatchEvent(new Event('mouseenter'));
    tick(20);
    fixture.detectChanges();

    expect(ins.tooltip.isCreated).toBeTruthy();
    expect(ocEl.querySelector('.aui-tooltip')).not.toBeNull();
    tick(HIDDEN_DELAY - 40);
  }));

  it('should click trigger work', fakeAsync(() => {
    ins.trigger = TooltipTrigger.Click;
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();
    expect(ocEl.querySelector('.aui-tooltip')).not.toBeNull();

    document.body.click();
    fixture.detectChanges();
    tick();
    expect(ocEl.querySelector('.aui-tooltip')).toBeNull();

    hostEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();
    expect(ocEl.querySelector('.aui-tooltip')).not.toBeNull();
    hostEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();
    expect(ocEl.querySelector('.aui-tooltip')).toBeNull();
  }));

  it('should focus trigger work', fakeAsync(() => {
    ins.trigger = TooltipTrigger.Focus;
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    tick();

    expect(ocEl.querySelector('.aui-tooltip')).not.toBeNull();

    hostEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    tick();

    expect(ocEl.querySelector('.aui-tooltip')).toBeNull();
  }));

  it('should can be disabled', fakeAsync(() => {
    ins.disabled = true;
    ins.trigger = TooltipTrigger.Click;
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    expect(ocEl.querySelector('.aui-tooltip')).toBeNull();
  }));

  it('should tooltip configs work', fakeAsync(() => {
    ins.trigger = TooltipTrigger.Click;
    ins.content = 'custom content';
    ins.type = TooltipType.Primary;
    ins.position = 'start';
    ins.className = 'custom-class';
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    const tooltipEl = ocEl.querySelector('.aui-tooltip');
    expect(tooltipEl.innerHTML).toContain('custom content');
    expect(tooltipEl.className).toContain('aui-tooltip--primary');
    expect(tooltipEl.className).toContain('aui-tooltip--start');
    expect(tooltipEl.className).toContain('custom-class');
  }));

  it('should tooltip render templateRef', fakeAsync(() => {
    ins.trigger = TooltipTrigger.Click;
    ins.content = ins.templateRef;
    ins.context = { text: 'custom context' };
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    tick();

    expect(ocEl.querySelector('#dataNode').innerHTML).toContain(
      'custom context',
    );
  }));

  it('should emit show event', () =>
    new Promise(resolve => {
      ins.tooltip.visibleChange.pipe(filter(Boolean)).subscribe(resolve);

      ins.trigger = TooltipTrigger.Click;
      fixture.detectChanges();
      hostEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
    }));

  it('should emit hide event', fakeAsync(() =>
    new Promise(resolve => {
      ins.tooltip.visibleChange
        .pipe(filter(visible => !visible))
        .subscribe(resolve);

      ins.trigger = TooltipTrigger.Click;
      fixture.detectChanges();
      hostEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();

      document.body.click();
      fixture.detectChanges();
    })));
});

@Component({
  template: `
    <div
      id="host"
      [auiTooltip]="content"
      [auiTooltipContext]="context"
      [auiTooltipType]="type"
      [auiTooltipClass]="className"
      [auiTooltipPosition]="position"
      [auiTooltipTrigger]="trigger"
      [auiTooltipDisabled]="disabled"
      [auiDisableAnimation]="true"
      auiTooltipActive="tooltip-actived"
    ></div>
    <ng-template
      #template
      let-text="text"
    >
      <div id="dataNode">{{ text }}</div>
    </ng-template>
  `,
  standalone: true,
  imports: [TooltipModule, FormsModule],
})
class TestComponent {
  content: string | TemplateRef<any> = 'hello world';
  context: any;
  type: TooltipType;
  className: string;
  position: string;
  trigger: TooltipTrigger;
  disabled: boolean;

  @ViewChild(TooltipDirective, { static: true })
  tooltip: TooltipDirective;

  @ViewChild('template', { static: true })
  templateRef: TemplateRef<any>;
}
