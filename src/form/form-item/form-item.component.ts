import { NgClass, NgIf, AsyncPipe } from '@angular/common';
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
import {
  Observable,
  Subject,
  combineLatest,
  merge,
  map,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';

import { Bem, buildBem, publishRef } from '../../internal/utils';
import { FormDirective } from '../form.directive';
import { FormItemWidth, LabelPosition } from '../form.types';
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
  standalone: true,
  imports: [NgClass, NgIf, AsyncPipe],
})
export class FormItemComponent implements AfterContentInit, OnDestroy {
  bem: Bem = buildBem('aui-form-item');

  @Input()
  labelWidth: string = null;

  @Input()
  width: FormItemWidth;

  @Input()
  labelPosition: LabelPosition = LabelPosition.Right;

  @Input()
  emptyAddon = false;

  @Input()
  plain = false;

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
  errorCount$: Observable<number>;
  hintCount$: Observable<number>;
  parentForm: FormGroupDirective | NgForm;

  private readonly destroy$$ = new Subject<void>();

  get formItemWidthClass() {
    return this.width
      ? this.bem.element('content', { [this.width]: true })
      : '';
  }

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
        ).pipe(map(statuses => statuses.some(Boolean))),
      ),
    );

    this.errorCount$ = this.errors.changes.pipe(
      map(errors => errors.length),
      startWith(this.errors.length),
    );

    this.hintCount$ = this.hints.changes.pipe(
      map(hints => hints.length),
      startWith(this.hints.length),
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
    return (
      this.parentForm
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
      publishRef(),
    );
  }

  ngOnDestroy() {
    this.destroy$$.next();
  }
}
