import {
  style,
  transition,
  trigger,
  AnimationEvent,
  state,
  animate,
} from '@angular/animations';
import { NgIf, NgTemplateOutlet, AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  Observable,
  Subject,
  combineLatest,
  map,
  startWith,
  BehaviorSubject,
} from 'rxjs';

import { Bem, buildBem, publishRef } from '../utils';

import { TooltipType } from './tooltip.types';

@Component({
  selector: 'aui-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  animations: [
    trigger('showHide', [
      state(
        'show',
        style({
          opacity: 1,
          transform: 'scale(1)',
        }),
      ),
      state(
        'hide,void',
        style({
          opacity: 0,
          transform: 'scale(0)',
        }),
      ),
      transition('* => show', [animate('160ms cubic-bezier(0, 0, 0.2, 1)')]),
      transition('* => hide', [
        animate('160ms cubic-bezier(0.38, 0, 0.24, 1)'),
      ]),
    ]),
  ],
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, AsyncPipe],
})
export class TooltipComponent implements OnDestroy {
  text: string;
  template: TemplateRef<any>;
  bem: Bem = buildBem('aui-tooltip');
  showHide: 'show' | 'hide' = 'hide';
  disableAnimation = true;

  inputContent$: Observable<string | TemplateRef<any>>;
  inputType$: Observable<TooltipType>;
  inputPosition$: Observable<string>;
  inputClass$: Observable<string>;
  inputContext$: Observable<any>;

  text$: Observable<string>;
  template$: Observable<TemplateRef<any>>;
  class$: Observable<string>;
  context$: Observable<any>;

  hover$ = new Subject<boolean>();
  destroy$ = new Subject();
  animating$$ = new BehaviorSubject(false);
  hide$ = new Subject();
  beforeHide$ = new Subject();
  beforeShow$ = new Subject();

  constructor(
    public elRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
  ) {}

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  setupInputs(inputs: {
    inputContent$: Observable<string | TemplateRef<any>>;
    inputType$: Observable<TooltipType>;
    inputPosition$: Observable<string>;
    inputClass$: Observable<string>;
    inputContext$: Observable<any>;
    disableAnimation?: boolean;
  }) {
    Object.assign(this, inputs);
    this.text$ = this.inputContent$.pipe(
      map(val => {
        if (typeof val === 'string') {
          return val;
        }
        return '';
      }),
      publishRef(),
    );
    this.template$ = this.inputContent$.pipe(
      map(val => {
        if (typeof val !== 'string') {
          return val;
        }
        return null;
      }),
      publishRef(),
    );
    this.class$ = combineLatest([
      this.inputPosition$.pipe(startWith('top')),
      this.inputType$.pipe(startWith(TooltipType.Default)),
      this.inputClass$.pipe(startWith('')),
    ]).pipe(
      map(([inputPosition, inputType, inputClass]) => {
        const b = this.bem.block();
        const dir = inputPosition.split(' ')[0];
        return inputType === TooltipType.Plain
          ? `${b}--${dir} ${inputClass}`
          : `${b} ${b}--${inputType} ${b}--${dir} ${inputClass}`;
      }),
      publishRef(),
    );
    this.context$ = this.inputContext$.pipe(publishRef());
  }

  onAnimation(event: AnimationEvent) {
    const { phaseName, toState } = event;
    this.animating$$.next(phaseName === 'start');
    if (toState === 'hide' && phaseName === 'done') {
      this.hide$.next(true);
    }
  }

  show() {
    this.beforeShow$.next(null);
    this.showHide = 'show';
    this.cdr.markForCheck();
  }

  hide() {
    this.beforeHide$.next(null);
    this.showHide = 'hide';
    this.cdr.markForCheck();
  }
}
