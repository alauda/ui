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
import {
  AsyncPipe,
  NgClass,
  NgIf,
  NgStyle,
  NgTemplateOutlet,
} from '@angular/common';
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
  AfterViewInit,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { TimingFunction } from '../../../core/animation/animation-consts';
import { IconComponent } from '../../../icon/icon.component';
import { handlePixel, isTemplateRef } from '../../../internal/utils';
import { DrawerOptions, DrawerSize } from '../../types';

export const DATA = new InjectionToken('drawer-data');

const SIZE_MAPPER = {
  [DrawerSize.Small]: 400,
  [DrawerSize.Medium]: 600,
  [DrawerSize.Big]: 800,
};
const DRAWER_OVERLAY_BACKDROP_CLASS = 'aui-drawer-mask';

export const duration = '300ms';

type Step = 'hideDone' | 'hideStart' | 'showDone' | 'showStart';

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
    AsyncPipe,
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
export class DrawerInternalComponent<T = unknown, C extends object = object>
  implements AfterViewInit
{
  @ViewChild(CdkPortalOutlet, { static: false })
  bodyPortalOutlet: CdkPortalOutlet;

  @ViewChild('mask')
  mask: ElementRef<HTMLDivElement>;

  animationStep$ = new Subject<Step>();

  options: DrawerOptions<T, C>;
  showHide$$ = new BehaviorSubject<'hide' | 'show'>('hide');
  maskVisible$ = new Subject<boolean>();

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

  get context() {
    return {
      $implicit: this.options.contentParams,
      ...this.options.contentParams,
    };
  }

  isTemplateRef = isTemplateRef;

  constructor(
    private readonly injector: Injector,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.attachBodyContent();
  }

  private attachBodyContent(): void {
    this.bodyPortalOutlet?.dispose();
    const content = this.options.content;
    if (!(content instanceof Type)) {
      return;
    }
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

  onAnimation(event: AnimationEvent) {
    const { phaseName, toState } = event;
    if (!['show', 'hide'].includes(toState)) {
      return;
    }

    const step = [
      toState,
      phaseName.charAt(0).toUpperCase() + phaseName.slice(1),
    ].join('') as Step;
    this.animationStep$.next(step);

    const backdropElement = this.mask?.nativeElement;
    if (!backdropElement) {
      return;
    }

    const enters = [
      `${DRAWER_OVERLAY_BACKDROP_CLASS}-enter`,
      `${DRAWER_OVERLAY_BACKDROP_CLASS}-enter-active`,
    ];
    const leaves = [
      `${DRAWER_OVERLAY_BACKDROP_CLASS}-leave`,
      `${DRAWER_OVERLAY_BACKDROP_CLASS}-leave-active`,
    ];
    switch (step) {
      case 'showStart': {
        backdropElement.classList.add(...enters);
        this.maskVisible$.next(true);
        break;
      }
      case 'hideStart': {
        backdropElement.classList.add(...leaves);
        break;
      }
      case 'showDone': {
        backdropElement.classList.remove(...enters);
        break;
      }
      case 'hideDone': {
        this.maskVisible$.next(false);
        backdropElement.classList.remove(...leaves);
        break;
      }
    }
  }

  updateOptions(options: DrawerOptions<T, C>) {
    this.options = options;
    this.cdr.markForCheck();
  }

  show() {
    this.showHide$$.next('show');
  }

  hide() {
    this.showHide$$.next('hide');
  }

  maskClick() {
    if (this.options.maskClosable) {
      this.hide();
    }
  }
}
