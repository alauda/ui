import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { BasicVerticalDemoComponent } from './progress.component';

import { ButtonModule, StepsModule, SwitchModule } from '@alauda/ui';

const meta: Meta<BasicVerticalDemoComponent> = {
  title: 'Example/Steps',
  component: BasicVerticalDemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [BasicVerticalDemoComponent],
      imports: [FormsModule, StepsModule, ButtonModule, SwitchModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<BasicVerticalDemoComponent>;

export const Progress: Story = {
  name: 'Progress',
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `
        @Component({
            template: 
              <aui-steps
                [orientation]="orientation"
                [type]="'progress'"
                [selectable]="selectable"
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
                Selectable: <aui-switch [(ngModel)]="selectable"></aui-switch>
              </div>
              <div>
                Selected Index: {{ selectedIndex }}, Current index: {{ currentIndex }}
              </div>
            ,
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
        `,
      },
    },
  },
};
