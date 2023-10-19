import { Directive, Inject, Input, Optional } from '@angular/core';
import { ControlContainer, FormGroupDirective, NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';

import { LabelPosition } from './form.types';

@Directive({
  selector: 'form[auiForm]',
  exportAs: 'auiForm',
  host: {
    '[class.aui-form]': 'true',
    '[class.aui-form--inline]': 'inline',
    '[class.ng-submitted]': 'ngClassSubmitted',
  },
  standalone: true,
})
export class FormDirective {
  get ngClassSubmitted() {
    return (this.controlContainer?.formDirective as NgForm | FormGroupDirective)
      .submitted;
  }

  private readonly labelWidth$$ = new BehaviorSubject<string>(null);
  private readonly labelPosition$$ = new BehaviorSubject<LabelPosition>(
    LabelPosition.Right,
  );

  private readonly emptyAddon$$ = new BehaviorSubject<boolean>(false);

  @Input('auiFormLabelWidth')
  set labelWidth(val: string) {
    this.labelWidth$$.next(val);
  }

  @Input('auiFormLabelPosition')
  set labelPosition(val: LabelPosition) {
    this.labelPosition$$.next(val);
  }

  @Input('auiFormEmptyAddon')
  set emptyAddon(val: boolean) {
    this.emptyAddon$$.next(val);
  }

  @Input('auiFormInline')
  inline = false;

  labelWidth$: Observable<string> = this.labelWidth$$
    .asObservable()
    .pipe(distinctUntilChanged());

  labelPosition$: Observable<LabelPosition> = this.labelPosition$$
    .asObservable()
    .pipe(distinctUntilChanged());

  emptyAddon$: Observable<boolean> = this.emptyAddon$$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(
    @Inject(ControlContainer)
    @Optional()
    public controlContainer?: ControlContainer,
  ) {}
}
