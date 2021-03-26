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

import { TooltipDirective, TooltipModule } from './public-api';
import { TooltipTrigger, TooltipType } from './tooltip.types';

const DELAY_TIMES = 50;

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ins: TestComponent;
  let debugEl: DebugElement;
  let hostEl: HTMLElement;
  let ocEl: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TooltipModule, FormsModule],
      declarations: [TestComponent],
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
    tick(DELAY_TIMES);
    fixture.detectChanges();

    expect(ins.tooltip.isCreated).toBeTruthy();
    expect(ocEl.querySelector('.aui-tooltip').innerHTML).toContain(
      'hello world',
    );
    expect(hostEl.className).toContain('tooltip-actived');

    hostEl.dispatchEvent(new Event('mouseleave'));
    tick(DELAY_TIMES);

    expect(ins.tooltip.isCreated).toBeFalsy();
    expect(ocEl.querySelector('.aui-tooltip')).toBeNull();
    expect(hostEl.className).not.toContain('tooltip-actived');
  }));

  it('should still display when mouse move to tooltip', fakeAsync(() => {
    hostEl.dispatchEvent(new Event('mouseenter'));
    tick(DELAY_TIMES);
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('mouseleave'));
    tick(20);
    ocEl.querySelector('.aui-tooltip').dispatchEvent(new Event('mouseenter'));
    tick(20);
    fixture.detectChanges();

    expect(ins.tooltip.isCreated).toBeTruthy();
    expect(ocEl.querySelector('.aui-tooltip')).not.toBeNull();
    tick(DELAY_TIMES - 40);
  }));

  it('should click trigger work', () => {
    ins.trigger = TooltipTrigger.Click;
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ocEl.querySelector('.aui-tooltip')).not.toBeNull();
    document.body.click();
    expect(ocEl.querySelector('.aui-tooltip')).toBeNull();

    hostEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(ocEl.querySelector('.aui-tooltip')).not.toBeNull();
    hostEl.dispatchEvent(new Event('click'));
    expect(ocEl.querySelector('.aui-tooltip')).toBeNull();
  });

  it('should focus trigger work', () => {
    ins.trigger = TooltipTrigger.Focus;
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    expect(ocEl.querySelector('.aui-tooltip')).not.toBeNull();

    hostEl.dispatchEvent(new Event('blur'));

    expect(ocEl.querySelector('.aui-tooltip')).toBeNull();
  });

  it('should can be disabled', () => {
    ins.disabled = true;
    ins.trigger = TooltipTrigger.Click;
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(ocEl.querySelector('.aui-tooltip')).toBeNull();
  });

  it('should tooltip configs work', () => {
    ins.trigger = TooltipTrigger.Click;
    ins.content = 'custom content';
    ins.type = TooltipType.Primary;
    ins.position = 'start';
    ins.className = 'custom-class';
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const tooltipEl = ocEl.querySelector('.aui-tooltip');
    expect(tooltipEl.innerHTML).toContain('custom content');
    expect(tooltipEl.className).toContain('aui-tooltip--primary');
    expect(tooltipEl.className).toContain('aui-tooltip--start');
    expect(tooltipEl.className).toContain('custom-class');
  });

  it('should tooltip render templateRef', () => {
    ins.trigger = TooltipTrigger.Click;
    ins.content = ins.templateRef;
    ins.context = { text: 'custom context' };
    fixture.detectChanges();
    hostEl.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(ocEl.querySelector('#dataNode').innerHTML).toContain(
      'custom context',
    );
  });

  it('should emit show event', () =>
    new Promise(resolve => {
      ins.tooltip.show.subscribe(resolve);

      ins.trigger = TooltipTrigger.Click;
      fixture.detectChanges();
      hostEl.dispatchEvent(new Event('click'));
      fixture.detectChanges();
    }));

  it('should emit hide event', () =>
    new Promise(resolve => {
      ins.tooltip.hide.subscribe(resolve);

      ins.trigger = TooltipTrigger.Click;
      fixture.detectChanges();
      hostEl.dispatchEvent(new Event('click'));
      document.body.click();
    }));
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
      auiTooltipActive="tooltip-actived"
    ></div>
    <ng-template #template let-text="text">
      <div id="dataNode">{{ text }}</div>
    </ng-template>
  `,
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
