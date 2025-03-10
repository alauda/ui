import { AnimationEvent, trigger } from '@angular/animations';
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

import { Bem, buildBem, publishRef } from '../internal/utils';

import { animations, AnimationType } from './animations';
import { TooltipType } from './tooltip.types';

@Component({
  selector: 'aui-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  animations: [trigger('showHide', animations)],
  imports: [NgIf, NgTemplateOutlet, AsyncPipe],
})
export class TooltipComponent implements OnDestroy {
  text: string;
  template: TemplateRef<any>;
  bem: Bem = buildBem('aui-tooltip');
  showHide = 'scale-hide';
  animationType: AnimationType;

  inputContent$: Observable<TemplateRef<any> | string>;
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
    inputContent$: Observable<TemplateRef<any> | string>;
    inputType$: Observable<TooltipType>;
    inputPosition$: Observable<string>;
    inputClass$: Observable<string>;
    inputContext$: Observable<any>;
    animationType?: string;
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
        const [direction, align] = inputPosition.split(' ');
        return `${
          inputType === TooltipType.Empty ? '' : b
        } ${b}--${inputType} ${b}--direction_${direction} ${b}--align_${
          align ?? 'center'
        } ${this.bem.element('transform-origin')} ${inputClass}`;
      }),
      publishRef(),
    );
    this.context$ = this.inputContext$.pipe(publishRef());
  }

  onAnimation(event: AnimationEvent) {
    const { phaseName, toState } = event;
    this.animating$$.next(phaseName === 'start');
    if (toState.endsWith('-hide') && phaseName === 'done') {
      this.hide$.next(true);
    }
  }

  show() {
    this.beforeShow$.next(null);
    this.showHide = `${this.animationType}-show`;
    this.cdr.markForCheck();
  }

  hide() {
    this.beforeHide$.next(null);
    this.showHide = `${this.animationType}-hide`;
    this.cdr.markForCheck();
  }
}
