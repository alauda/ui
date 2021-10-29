import { StepItem, StepState, StepsOrientation } from '@alauda/ui';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-steps
      [currentIndex]="currentIndex"
      [orientation]="orientation"
      [steps]="steps"
      (currentIndexChange)="currentIndexChange($event)"
    ></aui-steps>
    <div style="margin-top: 50px">
      <button aui-button="primary" (click)="prev()">Previous</button>
      <button aui-button="primary" (click)="next()">Next</button>
    </div>
    <div>Current index: {{ currentIndex }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicHorizontalDemoComponent {
  currentIndex = 0;
  steps: StepItem[] = [
    {
      label: 'Step 1',
    },
    {
      label: 'Step 2',
    },
    {
      label: 'Step 3',
    },
    {
      label: 'Step 4',
    },
  ];

  prev() {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
  }

  next() {
    this.currentIndex = Math.min(this.currentIndex + 1, this.steps.length - 1);
  }

  currentIndexChange(index: number) {
    this.currentIndex = index;
  }
}

@Component({
  template: `
    <aui-steps
      [linear]="true"
      [orientation]="orientation"
      [type]="'progress'"
      [steps]="steps"
      (currentIndexChange)="currentIndexChange($event)"
      (selectedIndexChange)="selectedIndexChange($event)"
    ></aui-steps>
    <div style="margin-top: 50px">
      <button aui-button="primary" (click)="start()">Start</button>
      <button aui-button="primary" (click)="complete()">Complete</button>
      <button aui-button="primary" (click)="error()">Set Error</button>
    </div>
    <div>
      Selected Index: {{ selectedIndex }}, Current index: {{ currentIndex }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicVerticalDemoComponent {
  orientation: StepsOrientation = 'vertical';
  currentIndex = 0;
  selectedIndex: number;
  steps: StepItem[] = [
    {
      label: 'Step 1',
    },
    {
      label: 'Step 2',
      description: 'This is description',
    },
    {
      label: 'Step 3',
    },
    {
      label: 'Step 4',
    },
  ];

  currentIndexChange(index: number) {
    this.currentIndex = index;
  }

  selectedIndexChange(index: number) {
    this.selectedIndex = index;
  }

  start() {
    this.setState(StepState.Pending);
  }

  complete() {
    this.setState(StepState.Done);
  }

  error() {
    this.setState(StepState.Error);
  }

  private setState(state: StepState) {
    this.steps[this.currentIndex].state = state;
    this.steps = [...this.steps];
  }
}
