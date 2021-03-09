import { ButtonModule, MessageModule, MessageService } from '@alauda/ui';
import { Component, OnDestroy } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { storiesOf } from '@storybook/angular';

storiesOf('Message', module).add('message', () => ({
  moduleMetadata: {
    imports: [MessageModule, BrowserAnimationsModule, ButtonModule],
    declarations: [DemoComponent],
  },
  component: DemoComponent,
}));

@Component({
  template: `
    <span>Message:</span>
    <button aui-button (click)="messageService.success('success')">
      success
    </button>
    <button aui-button (click)="messageService.warning('warning')">
      warning
    </button>
    <button aui-button (click)="messageService.error('error')">error</button>
    <button
      aui-button
      (click)="
        messageService.info({ content: 'info', duration: 0, id: 'test01' })
      "
    >
      info
    </button>
  `,
})
class DemoComponent implements OnDestroy {
  constructor(public messageService: MessageService) {}

  ngOnDestroy() {
    this.messageService.componentRefs.forEach(ref => {
      ref.destroy();
    });
    this.messageService.wrapperInstance.elementRef.nativeElement.remove();
  }
}
