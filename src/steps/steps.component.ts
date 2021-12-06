import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StepItem, StepState, StepsOrientation, StepsType } from './types';

const StepDefaultIcon = {
  [StepState.Default]: 'number',
  [StepState.Done]: 'check_circle',
  [StepState.Error]: 'close_circle',
  [StepState.Pending]: 'sync_circle',
};

const StepSelectedIcon = {
  [StepState.Default]: 'number',
  [StepState.Done]: 'check_circle_s',
  [StepState.Error]: 'close_circle_s',
  [StepState.Pending]: 'sync_circle_s',
};

@Component({
  selector: 'aui-steps',
  exportAs: 'auiSteps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StepsComponent implements OnInit, OnDestroy {
  _currentIndex: number;
  private _steps: StepItem[] = [];
  @Input()
  get steps() {
    return this._steps;
  }

  set steps(val: StepItem[]) {
    this._steps = val;
    this.stepsChange$$.next(val);
  }

  /**
   * @deprecated type 为 step 时一般在使用上下文中控制是否可以进行下一步；type 为 progress 时强制按顺序执行
   */
  @Input()
  linear = false;

  @Input()
  get currentIndex() {
    return this._currentIndex;
  }

  set currentIndex(index: number) {
    this.currentIndexChange$$.next(index);
  }

  @Input()
  orientation: StepsOrientation = 'horizontal';

  @Input()
  type: StepsType = 'step';

  @Input()
  selectable = false;

  @Output()
  currentIndexChange = new EventEmitter<number>();

  @Output()
  selectedIndexChange = new EventEmitter<number>();

  currentIndexChange$$ = new BehaviorSubject<number>(0);
  stepsChange$$ = new BehaviorSubject<StepItem[]>([]);

  selectedIndex: number;

  private readonly destroy$$ = new Subject<void>();

  ngOnInit() {
    this.currentIndexChange$$
      .pipe(takeUntil(this.destroy$$))
      .subscribe(index => {
        if (this.type === 'step') {
          this.setCurrentIndex(index);
        }
      });
    this.stepsChange$$.pipe(takeUntil(this.destroy$$)).subscribe(steps => {
      if (this.type === 'progress') {
        this.getProgressCurrentIndex(steps);
      }
    });
  }

  private setCurrentIndex(index: number) {
    if (this.linear) {
      if (this.steps?.length) {
        const ret = Math.min(Math.max(0, index), this.steps.length - 1);
        const reversedPrevSteps = this.steps.slice(0, ret).reverse();
        const doneIndex = reversedPrevSteps.findIndex(
          step => step.state === StepState.Done || step.optional,
        );
        const lastDoneStepIndex =
          doneIndex > -1 ? reversedPrevSteps.length - doneIndex : 0;
        this._currentIndex = this.selectedIndex = Math.min(
          lastDoneStepIndex,
          ret,
        );
      }
    } else {
      this._currentIndex = this.selectedIndex = index;
    }
  }

  private getProgressCurrentIndex(steps: StepItem[]) {
    if (!steps?.length) {
      if (this._currentIndex !== 0) {
        this.currentIndexChange.emit(0);
      }
      this._currentIndex = 0;
    } else {
      const reversedSteps = this.steps.slice(0).reverse();
      const doneStepIndex = reversedSteps.findIndex(
        step => step.state === StepState.Done,
      );
      const lastDoneStepIndex =
        doneStepIndex > -1 ? reversedSteps.length - doneStepIndex : 0;
      const newIndex = Math.min(lastDoneStepIndex, steps.length - 1);
      if (this._currentIndex !== newIndex) {
        this.currentIndexChange.emit(newIndex);
      }
      if (this._currentIndex === this.selectedIndex) {
        this._currentIndex = this.selectedIndex = newIndex;
      } else {
        this._currentIndex = newIndex;
      }
    }
  }

  get isVertical() {
    return this.orientation === 'vertical';
  }

  get isProgress() {
    return this.type === 'progress';
  }

  getIcon(i: number, state: StepState): string {
    if (!state) {
      return StepDefaultIcon.default;
    }
    return this.getActiveIndex() === i
      ? StepSelectedIcon[state]
      : StepDefaultIcon[state];
  }

  select(i: number) {
    if (this.isSelectable(i)) {
      if (this.isProgress) {
        this.selectedIndexChange.emit(i);
        this.selectedIndex = i;
      } else {
        this.currentIndexChange.emit(i);
        this._currentIndex = i;
        this.selectedIndex = i;
      }
    }
  }

  isSelectable(i: number) {
    const currentStep = this.steps[this._currentIndex];
    if (!this.selectable || this.selectedIndex === i) {
      return false;
    }
    const isLinear = this.isProgress ? true : this.linear;
    if (
      isLinear &&
      !currentStep.optional &&
      ((currentStep.state === StepState.Done && i > this._currentIndex + 1) ||
        (currentStep.state !== StepState.Done && i > this._currentIndex))
    ) {
      return false;
    }
    if (i < this._currentIndex && !this.selectable) {
      return false;
    }
    return true;
  }

  getActiveIndex() {
    return this.selectedIndex !== undefined
      ? this.selectedIndex
      : this._currentIndex;
  }

  isLastActive(i: number, steps: StepItem[]) {
    const firstDefaultIndex = steps.findIndex(
      step => !step.state || step.state === StepState.Default,
    );
    return i === this.selectedIndex
      ? true
      : firstDefaultIndex === 0
      ? false
      : firstDefaultIndex === i;
  }

  ngOnDestroy() {
    this.destroy$$.next();
  }
}
