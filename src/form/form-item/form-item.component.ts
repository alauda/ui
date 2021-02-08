import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  Optional,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Observable, Subject, combineLatest, merge } from 'rxjs';
import {
  map,
  publishReplay,
  refCount,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { Bem, buildBem } from '../../utils/bem';
import { FormDirective } from '../form.directive';
import { LabelPosition } from '../form.types';
import {
  FormItemAddonDirective,
  FormItemControlDirective,
  FormItemErrorDirective,
  FormItemHintDirective,
  FormItemLabelDirective,
} from '../helper-directives';

@Component({
  selector: 'aui-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class FormItemComponent implements AfterContentInit, OnDestroy {
  bem: Bem = buildBem('aui-form-item');

  @Input()
  labelWidth = 'auto';

  @Input()
  labelPosition = LabelPosition.Right;

  @Input()
  emptyAddon = false;

  @ContentChild(FormItemLabelDirective, { static: false })
  itemLabel: FormItemLabelDirective;

  @ContentChild(FormItemControlDirective, { static: false })
  itemControl: FormItemControlDirective;

  @ContentChildren(NgControl, { descendants: true })
  ngControls: QueryList<NgControl>;

  @ContentChildren(FormItemAddonDirective)
  addons: QueryList<FormItemAddonDirective>;

  @ContentChildren(FormItemErrorDirective)
  errors: QueryList<FormItemErrorDirective>;

  @ContentChildren(FormItemHintDirective)
  hints: QueryList<FormItemHintDirective>;

  hasError$: Observable<boolean>;
  parentForm: NgForm | FormGroupDirective;

  private readonly destroy$$ = new Subject<void>();

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Optional() private readonly auiForm: FormDirective,
    @Optional() ngForm: NgForm,
    @Optional() formGroup: FormGroupDirective,
  ) {
    this.parentForm = formGroup || ngForm;
    if (this.auiForm) {
      this.subscribeInputsFromParent();
    }
  }

  ngAfterContentInit() {
    this.hasError$ = this.ngControls.changes.pipe(
      startWith(this.ngControls),
      switchMap((controls: QueryList<NgControl>) =>
        combineLatest(
          controls.map(control => this.mapControlStatus(control)),
        ).pipe(map(statuses => statuses.some(status => status))),
      ),
    );
  }

  subscribeInputsFromParent() {
    this.auiForm.labelWidth$
      .pipe(takeUntil(this.destroy$$))
      .subscribe(width => {
        this.labelWidth = width;
        this.cdr.markForCheck();
      });
    this.auiForm.labelPosition$
      .pipe(takeUntil(this.destroy$$))
      .subscribe(position => {
        this.labelPosition = position;
        this.cdr.markForCheck();
      });
    this.auiForm.emptyAddon$
      .pipe(takeUntil(this.destroy$$))
      .subscribe(emptyAddon => {
        this.emptyAddon = emptyAddon;
        this.cdr.markForCheck();
      });
  }

  mapControlStatus(control: NgControl) {
    return (this.parentForm
      ? combineLatest([
          control.statusChanges.pipe(startWith(control.status)),
          merge(
            this.parentForm.statusChanges.pipe(
              startWith(this.parentForm.status),
            ),
            this.parentForm.ngSubmit,
          ),
        ]).pipe(map(([status]: string[]) => status))
      : control.statusChanges
    ).pipe(
      map(
        (status: string) =>
          status === 'INVALID' && (control.dirty || this.parentForm?.submitted),
      ),
      publishReplay(1),
      refCount(),
    );
  }

  ngOnDestroy() {
    this.destroy$$.next();
  }
}
