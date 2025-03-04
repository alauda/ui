import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { BasicDialogComponent } from './basic.component';

import {
  ButtonModule,
  DialogModule,
  IconModule,
  TooltipModule,
} from '@alauda/ui';

const meta: Meta<BasicDialogComponent> = {
  title: 'Example/Dialog',
  component: BasicDialogComponent,
  decorators: [
    moduleMetadata({
      declarations: [BasicDialogComponent],
      imports: [
        BrowserAnimationsModule,
        ButtonModule,
        DialogModule,
        IconModule,
        TooltipModule,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<BasicDialogComponent>;

export const Basic: Story = {
  name: 'Basic',
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `        
@Component({
    template: \`
        <button aui-button="primary" (click)="open(dialog)">打开对话框</button>
        <ng-template #dialog>
        <aui-dialog-header>
            <aui-icon icon="exclamation_circle_s" background="circle"></aui-icon>
            <span>What can Kubernetes do for you?</span>
        </aui-dialog-header>
        <aui-dialog-content>
            With modern web services, users expect applications to be available
            24/7, and developers expect to deploy new versions of those applications
            several times a day. Containerization helps package software to serve
            these goals, enabling applications to be released and updated in an easy
            and fast way without downtime. Kubernetes helps you make sure those
            containerized applications run where and when you want, and helps them
            find the resources and tools they need to work. Kubernetes is a
            production-ready, open source platform designed with Google's
            accumulated experience in container orchestration, combined with
            best-of-breed ideas from the community.
        </aui-dialog-content>
        <aui-dialog-footer>
            <button aui-button="primary" [auiDialogClose]="true">Confirm</button>
            <button aui-button [auiDialogClose]="false">Cancel</button>
        </aui-dialog-footer>
        </ng-template>
    \`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    })
    export class BasicDialogComponent {
    constructor(private readonly dialog: DialogService) {}
    
    open(template: TemplateRef<any>) {
        this.dialog.open(template);
    }
}
          `,
      },
    },
  },
};
