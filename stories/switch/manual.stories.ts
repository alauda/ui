import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { LoadingSwitchComponent } from './manual.component';

import { SwitchModule } from '@alauda/ui';

const meta: Meta<LoadingSwitchComponent> = {
  title: 'Example/Switch',
  component: LoadingSwitchComponent,
  decorators: [
    moduleMetadata({
      declarations: [LoadingSwitchComponent],
      imports: [SwitchModule, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<LoadingSwitchComponent>;

export const Manual: Story = {
  name: 'Manual',
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `
        @Component({
            template:
              <aui-switch
                [value]="data"
                [loading]="loading"
                (valueChange)="toggle()"
              ></aui-switch>
            ,
          })
          export class LoadingSwitchComponent {
            data = false;
            loading = false;
            toggle() {
              this.loading = true;
              setTimeout(() => {
                this.loading = false;
                this.data = !this.data;
              }, 500);
            }
          }f        
        `,
      },
    },
  },
};
