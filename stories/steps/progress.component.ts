import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StepItem, StepState, StepsOrientation } from '@alauda/ui';

@Component({
  template: `
    <aui-steps
      [orientation]="orientation"
      [type]="'progress'"
      [selectable]="selectable"
      [steps]="steps"
      (currentIndexChange)="currentIndexChange($event)"
      (selectedIndexChange)="selectedIndexChange($event)"
    ></aui-steps>
    <div style="margin-top: 50px">
      <button
        aui-button="primary"
        (click)="start()"
      >
        Start
      </button>
      <button
        aui-button="primary"
        (click)="complete()"
      >
        Complete
      </button>
      <button
        aui-button="primary"
        (click)="error()"
      >
        Set Error
      </button>
    </div>
    <div>Selectable: <aui-switch [(ngModel)]="selectable"></aui-switch></div>
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
  selectable = false;
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
