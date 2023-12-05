import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
  ElementRef,
  InjectionToken,
  Injector,
  Type,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';

import { TimingFunction } from '../../../core/animation/animation-consts';
import { IconComponent } from '../../../icon/icon.component';
import { handlePixel, isTemplateRef } from '../../../utils';
import { DrawerOptions, DrawerSize } from '../../types';

export const DATA = new InjectionToken('drawer-data');

const SIZE_MAPPER = {
  [DrawerSize.Small]: 400,
  [DrawerSize.Medium]: 600,
  [DrawerSize.Big]: 800,
};
const DRAWER_OVERLAY_BACKDROP_CLASS = 'aui-drawer-mask';

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
      state(
        'show',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        }),
      ),
      state(
        'hide, void',
        style({
          opacity: 0,
          transform: 'translateX(100%)',
        }),
      ),
      transition('hide => show, void => show', [
        animate(`${duration} ${TimingFunction.easeOut}`),
      ]),
      transition('show => hide, show => void', [
        animate(`${duration} ${TimingFunction.easeInOut}`),
      ]),
    ]),
  ],
})
export class DrawerInternalComponent<T = unknown, C = unknown> {
  @ViewChild(CdkPortalOutlet, { static: false })
  bodyPortalOutlet: CdkPortalOutlet;

  @ViewChild('mask')
  mask: ElementRef<HTMLElement>;

  animationStep$ = new Subject<Step>();

  options: DrawerOptions<T, C>;
  showHide = 'hide';
  maskVisible: boolean;

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
    return handlePixel(
      this.options.width || SIZE_MAPPER[this.options.size || DrawerSize.Medium],
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

      const backdropElement = this.mask?.nativeElement;
      if (backdropElement) {
        const enters = [
          `${DRAWER_OVERLAY_BACKDROP_CLASS}-enter`,
          `${DRAWER_OVERLAY_BACKDROP_CLASS}-enter-active`,
        ];
        const leaves = [
          `${DRAWER_OVERLAY_BACKDROP_CLASS}-leave`,
          `${DRAWER_OVERLAY_BACKDROP_CLASS}-leave-active`,
        ];
        if (step === 'showStart') {
          this.maskVisible = true;
          backdropElement.classList.add(...enters);
        }
        if (step === 'hideStart') {
          backdropElement.classList.add(...leaves);
        }
        if (step === 'hideDone') {
          this.maskVisible = false;
        }
        if (['showDone', 'hideDone'].includes(step)) {
          backdropElement.classList.remove(...enters, ...leaves);
        }
        this.cdr.markForCheck();
      }
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

  maskClick() {
    if (this.options.maskClosable) {
      this.hide();
    }
  }
}
