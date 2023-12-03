import {
  animate,
  AnimationEvent,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ComponentType } from '@angular/cdk/overlay';
import {
  CdkPortalOutlet,
  ComponentPortal,
  PortalModule,
} from '@angular/cdk/portal';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgClass, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  InjectionToken,
  Injector,
  Output,
  Type,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';

import { TimingFunction } from '../../../core/animation/animation-consts';
import { IconComponent } from '../../../icon/icon.component';
import { isTemplateRef } from '../../../utils';
import { DrawerOptions, DrawerSize } from '../../types';

export const DATA = new InjectionToken('drawer-data');

const SIZE_MAPPER = {
  [DrawerSize.Small]: 400,
  [DrawerSize.Medium]: 600,
  [DrawerSize.Big]: 800,
};
export const duration = '300ms';

type Step = 'showStart' | 'showDone' | 'hideStart' | 'hideDone';

@Component({
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    NgTemplateOutlet,
    IconComponent,
    CdkScrollable,
    PortalModule,
  ],
  animations: [
    trigger('showHide', [
      transition('hide => show, void => show', [
        animate(
          `${duration} ${TimingFunction.easeOut}`,
          keyframes([
            style({
              opacity: 0,
              transform: 'translateX(100%)',
            }),
            style({
              opacity: 1,
              transform: 'translateX(0)',
            }),
          ]),
        ),
      ]),
      transition('show => hide, show => void', [
        animate(
          `${duration} ${TimingFunction.easeInOut}`,
          keyframes([
            style({
              opacity: 1,
              transform: 'translateX(0)',
            }),
            style({
              opacity: 0,
              transform: 'translateX(100%)',
            }),
          ]),
        ),
      ]),
    ]),
  ],
})
export class DrawerInternalComponent<T = ComponentType<unknown>> {
  @Output()
  maskClick = new EventEmitter<MouseEvent>();

  @Output()
  closeClick = new EventEmitter();

  @ViewChild(CdkPortalOutlet, { static: false })
  bodyPortalOutlet: CdkPortalOutlet;

  animationStep$ = new Subject<Step>();

  options: DrawerOptions;
  showHide = 'hide';

  get drawerClasses(): Record<string, boolean> {
    return {
      'aui-drawer': true,
      hasDivider: this.options.divider,
      ...(this.options.drawerClass
        ? { [this.options.drawerClass]: true }
        : null),
    };
  }

  get width() {
    return (
      this.options.width || SIZE_MAPPER[this.options.size || DrawerSize.Medium]
    );
  }

  isTemplateRef = isTemplateRef;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly injector: Injector,
  ) {}

  ngAfterViewInit() {
    this.attachBodyContent();
  }

  private attachBodyContent(): void {
    this.bodyPortalOutlet?.dispose();
    const content = this.options.content;
    if (content instanceof Type) {
      const componentPortal = new ComponentPortal<T>(
        content,
        null,
        Injector.create({
          providers: [
            {
              provide: DATA,
              useValue: this.options.contentParams,
            },
          ],
          parent: this.injector,
        }),
      );
      const componentRef =
        this.bodyPortalOutlet?.attachComponentPortal(componentPortal);
      Object.assign(componentRef.instance, this.options.contentParams);
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  onAnimation(event: AnimationEvent) {
    const { phaseName, toState } = event;
    if (['show', 'hide'].includes(toState)) {
      const step = [
        toState,
        phaseName.charAt(0).toUpperCase() + phaseName.slice(1),
      ].join('') as Step;
      this.animationStep$.next(step);
    }
  }

  show() {
    this.showHide = 'show';
    this.cdr.markForCheck();
  }

  hide() {
    this.showHide = 'hide';
    this.cdr.markForCheck();
  }
}
