import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subject, combineLatest, map, startWith } from 'rxjs';

import { Bem, buildBem, generateDataTestId, publishRef } from '../utils';

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
  @HostBinding('attr.data-test')
  get dataTest() {
    return generateDataTestId('TOOLTIP');
  }

  text: string;
  template: TemplateRef<any>;
  bem: Bem = buildBem('aui-tooltip');

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

  constructor(
    public elRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
  ) {}

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
}
