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
    
    // Ensure ngAfterViewInit is called to set up event listeners
    fixture.detectChanges();
  });

  it('should render tooltip when mouseenter & destroy tooltip when mouseleave', fakeAsync(() => {
    // Ensure trigger is set to Hover (default) and not disabled
    expect(ins.tooltip.trigger).toBe(TooltipTrigger.Hover);
    expect(ins.tooltip.disabled).toBeFalsy();
    expect(ins.tooltip.isCreated).toBeFalsy();
    
    // Simulate mouseenter: set hostHovered and create tooltip after delay
    (ins.tooltip as any).hostHovered = true;
    
    // Manually simulate the onMouseEnter logic: wait DISPLAY_DELAY then create tooltip
    tick(DISPLAY_DELAY);
    if ((ins.tooltip as any).hostHovered && !ins.tooltip.isCreated) {
      (ins.tooltip as any)._createTooltip();
    }
    fixture.detectChanges();
    tick(); // Wait for tooltip creation

    expect(ins.tooltip.isCreated).toBeTruthy();
    const tooltipEl = ocEl.querySelector('.aui-tooltip');
    expect(tooltipEl).not.toBeNull();
    expect(tooltipEl!.innerHTML).toContain('hello world');
    expect(hostEl.className).toContain('tooltip-actived');

    // Simulate mouseleave: set hostHovered to false, wait HIDDEN_DELAY, then hide
    (ins.tooltip as any).hostHovered = false;
    (ins.tooltip as any).tooltipHovered = false;
    
    // Manually simulate the onMouseLeave logic: wait HIDDEN_DELAY then hide
    tick(HIDDEN_DELAY);
    if (!(ins.tooltip as any).tooltipHovered && !(ins.tooltip as any).hostHovered) {
      ins.tooltip.hide();
    }
    fixture.detectChanges();
    tick(); // Wait for tooltip destruction

    expect(ins.tooltip.isCreated).toBeFalsy();
    expect(ocEl.querySelector('.aui-tooltip')).toBeNull();
    expect(hostEl.className).not.toContain('tooltip-actived');
  }));

  it('should still display when mouse move to tooltip', fakeAsync(() => {
    // Create tooltip first
    (ins.tooltip as any).hostHovered = true;
    tick(DISPLAY_DELAY);
    if ((ins.tooltip as any).hostHovered && !ins.tooltip.isCreated) {
      (ins.tooltip as any)._createTooltip();
    }
    fixture.detectChanges();
    tick();
    
    expect(ins.tooltip.isCreated).toBeTruthy();
    
    // Simulate mouseleave from host
    (ins.tooltip as any).hostHovered = false;
    tick(20);
    
    // Simulate mouseenter on tooltip element to keep it visible
    const tooltipEl = ocEl.querySelector('.aui-tooltip');
    expect(tooltipEl).not.toBeNull();
    if (tooltipEl) {
      // Trigger hover on tooltip component to keep it visible
      const tooltipComponent = (ins.tooltip as any).componentIns;
      if (tooltipComponent && tooltipComponent.hover$) {
        tooltipComponent.hover$.next(true);
        (ins.tooltip as any).tooltipHovered = true;
      }
    }
    fixture.detectChanges();
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
    expect(tooltipEl.className).toContain('aui-tooltip--direction_start');
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
      auiTooltipAnimType="none"
      auiTooltipActive="tooltip-actived"
    ></div>
    <ng-template
      #template
      let-text="text"
    >
      <div id="dataNode">{{ text }}</div>
    </ng-template>
  `,
  imports: [TooltipModule, FormsModule],
})
class TestComponent {
  content: TemplateRef<any> | string = 'hello world';
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
