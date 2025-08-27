import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { BasicHorizontalDemoComponent } from './step.component';

import { ButtonModule, StepsModule, SwitchModule } from '@alauda/ui';

const meta: Meta<BasicHorizontalDemoComponent> = {
  title: 'Example/Steps',
  component: BasicHorizontalDemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [BasicHorizontalDemoComponent],
      imports: [FormsModule, StepsModule, ButtonModule, SwitchModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<BasicHorizontalDemoComponent>;

export const Step: Story = {
  name: 'Step',
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `
        @Component({
            template: 
              <aui-steps
                [currentIndex]="currentIndex"
                [orientation]="orientation"
                [steps]="steps"
                [linear]="linear"
                [selectable]="selectable"
                (currentIndexChange)="currentIndexChange($event)"
              ></aui-steps>
              <div style="margin-top: 50px">
                <button aui-button="primary" (click)="prev()">Previous</button>
                <button aui-button="primary" (click)="next()">Next</button>
              </div>
              <div>
                Linear: <aui-switch [(ngModel)]="linear"></aui-switch>
              </div>
              <div>
                Selectable: <aui-switch [(ngModel)]="selectable"></aui-switch>
              </div>
              <div>Current index: {{ currentIndex }}</div>
            ,
            changeDetection: ChangeDetectionStrategy.OnPush,
          })
          export class BasicHorizontalDemoComponent {
            currentIndex = 0;
            linear = false;
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
            prev() {
              this.currentIndex = Math.max(this.currentIndex - 1, 0);
            }
            next() {
              this.currentIndex = Math.min(
                this.currentIndex + 1,
                this.steps.length - 1,
              );
            }
            currentIndexChange(index: number) {
              this.currentIndex = index;
            }
          }
        `,
      },
    },
  },
};
