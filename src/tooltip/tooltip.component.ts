import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, publishReplay, refCount, startWith } from 'rxjs/operators';

import { TooltipType } from './tooltip.types';

@Component({
  selector: 'aui-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class TooltipComponent {
  text: string;
  template: TemplateRef<any>;

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

  constructor(public elRef: ElementRef, public cdr: ChangeDetectorRef) {}

  setupInputs(inputs: {
    inputContent$: Observable<string | TemplateRef<any>>;
    inputType$: Observable<TooltipType>;
    inputPosition$: Observable<string>;
    inputClass$: Observable<string>;
    inputContext$: Observable<any>;
  }) {
    Object.assign(this, inputs);
    this.text$ = this.inputContent$.pipe(
      map(val => {
        if (typeof val === 'string') {
          return val;
        }
        return '';
      }),
      publishReplay(1),
      refCount(),
    );
    this.template$ = this.inputContent$.pipe(
      map(val => {
        if (typeof val !== 'string') {
          return val;
        }
        return null;
      }),
      publishReplay(1),
      refCount(),
    );
    this.class$ = combineLatest([
      this.inputPosition$.pipe(startWith('top')),
      this.inputType$.pipe(startWith(TooltipType.Default)),
      this.inputClass$.pipe(startWith('')),
    ]).pipe(
      map(([inputPosition, inputType, inputClass]) => {
        const b = 'aui-tooltip';
        const dir = inputPosition.split(' ')[0];
        return inputType === TooltipType.Plain
          ? `${b}--${dir} ${inputClass}`
          : `${b} ${b}--${inputType} ${b}--${dir} ${inputClass}`;
      }),
      publishReplay(1),
      refCount(),
    );
    this.context$ = this.inputContext$.pipe(publishReplay(1), refCount());
  }
}
