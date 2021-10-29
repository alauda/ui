import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  ViewEncapsulation,
} from '@angular/core';

import { StepItem, StepState, StepsOrientation, StepsSelection } from './types';

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
export class StepsComponent implements OnChanges {
  @Input()
  steps: StepItem[];

  @Input()
  linear = false;

  @Input()
  selectedIndex = 0;

  @Input()
  orientation: StepsOrientation = 'horizontal';

  @Output()
  selectionChange = new EventEmitter<StepsSelection>();

  validSelectedIndex = 0;

  // If linear is true and input selectedIndex is larger than the index of last done step,
  // then set the selectedIndex with the index of last done step.
  ngOnChanges(changes: {
    steps: SimpleChange;
    linear: SimpleChange;
    selectedIndex: SimpleChange;
  }) {
    const steps: StepItem[] = changes.steps?.currentValue || this.steps;
    const linear = changes.linear?.currentValue ?? this.linear;
    const selectedIndex =
      changes.selectedIndex?.currentValue || this.selectedIndex;
    if (!linear) {
      this.validSelectedIndex = selectedIndex;
    } else {
      if (steps?.length) {
        const ret = Math.min(Math.max(0, selectedIndex), steps.length - 1);
        const reversedPrevSteps = steps.slice(0, ret).reverse();
        const lastDoneStepIndex =
          reversedPrevSteps.length -
          reversedPrevSteps.findIndex(
            step => step.state === StepState.Done || step.optional,
          );
        this.validSelectedIndex = Math.min(lastDoneStepIndex, ret);
        if (this.validSelectedIndex !== this.selectedIndex) {
          this.selectionChange.emit({
            selectedIndex: this.validSelectedIndex,
            previousSelectedIndex: null,
            selectedStep: steps[this.validSelectedIndex],
            previousSelectedStep: null,
          });
        }
      }
    }
  }

  get isVertical() {
    return this.orientation === 'vertical';
  }

  getIcon(i: number, step: StepItem): string {
    if (!step.state) {
      return StepDefaultIcon.default;
    }
    return this.validSelectedIndex === i
      ? StepSelectedIcon[step.state]
      : StepDefaultIcon[step.state];
  }

  select(i: number, step: StepItem) {
    const currentStep = this.steps[this.validSelectedIndex];
    if (
      this.linear &&
      currentStep.state !== StepState.Done &&
      !currentStep.optional &&
      i > this.validSelectedIndex
    ) {
      return;
    }
    if (i < this.validSelectedIndex && !(step.editable ?? true)) {
      return;
    }
    this.selectionChange.emit({
      selectedIndex: i,
      previousSelectedIndex: this.validSelectedIndex,
      selectedStep: step,
      previousSelectedStep: currentStep,
    });
    this.validSelectedIndex = i;
  }

  isLastActive(i: number, steps: StepItem[]) {
    const firstDefaultIndex = steps.findIndex(
      step => step.state === StepState.Default,
    );
    return firstDefaultIndex === 0 ? false : firstDefaultIndex - 1 === i;
  }
}
