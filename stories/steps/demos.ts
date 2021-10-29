import { StepState, StepsOrientation, StepsSelection } from '@alauda/ui';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-steps
      [linear]="true"
      [selectedIndex]="selectedIndex"
      [orientation]="orientation"
      [steps]="steps"
      (selectionChange)="selectionChange($event)"
    ></aui-steps>
    <div style="margin-top: 50px">
      <button aui-button="primary" (click)="prev()">Previous</button>
      <button aui-button="primary" (click)="complete()">Complete</button>
      <button aui-button="primary" (click)="next()">Next</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicHorizontalDemoComponent {
  selectedIndex = 3;
  steps = [
    {
      label: 'Step 1',
      state: 'done',
    },
    {
      label: 'Step 2',
      state: 'done',
    },
    {
      label: 'Step 3',
    },
    {
      label: 'Step 4',
    },
  ];

  prev() {
    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
  }

  complete() {
    this.steps[this.selectedIndex].state = StepState.Done;
    this.steps = [...this.steps];
  }

  next() {
    this.selectedIndex = Math.min(
      this.selectedIndex + 1,
      this.steps.length - 1,
    );
  }

  selectionChange(ret: StepsSelection) {
    this.selectedIndex = ret.selectedIndex;
    console.log(ret);
  }
}

@Component({
  template: `
    <aui-steps
      [linear]="true"
      [orientation]="orientation"
      [selectedIndex]="selectedIndex"
      [steps]="steps"
      (selectionChange)="selectionChange($event)"
    ></aui-steps>
    <div style="margin-top: 50px">
      <button aui-button="primary" (click)="prev()">Previous</button>
      <button aui-button="primary" (click)="start()">Start</button>
      <button aui-button="primary" (click)="complete()">Complete</button>
      <button aui-button="primary" (click)="next()">Next</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicVerticalDemoComponent extends BasicHorizontalDemoComponent {
  orientation: StepsOrientation = 'vertical';
  start() {
    this.steps[this.selectedIndex].state = StepState.Pending;
    this.steps = [...this.steps];
  }
}
