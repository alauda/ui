import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { BasicDemoComponent } from './basic.component';

import { ButtonModule, MessageModule } from '@alauda/ui';

const meta: Meta<BasicDemoComponent> = {
  title: 'Example/Message',
  component: BasicDemoComponent,
  decorators: [
    moduleMetadata({
      declarations: [BasicDemoComponent],
      imports: [BrowserAnimationsModule, ButtonModule, MessageModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<BasicDemoComponent>;

export const Basic: Story = {
  name: 'Basic',
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `
@Component({
    template: \`
        <button aui-button="primary" (click)="message.info({ content: '这是一条消息提醒', duration: 5000 })">消息提醒</button>
        <button aui-button="success" (click)="message.success('这是一个条成功消息')">成功消息</button>
        <button aui-button="warning" (click)="message.warning('这是一条警告消息')">警告消息</button>
        <button aui-button="danger" (click)="message.error('这是一条错误消息')">错误消息</button>
    \`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    })
    export class BasicDemoComponent implements OnDestroy {
    constructor(public message: MessageService) {}
    
    ngOnDestroy() {
        this.message.removeAll();
    }
}
        `,
      },
    },
  },
};
