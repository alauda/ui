import {
  ButtonModule,
  MessageType,
  NOTIFICATION_CONFIG,
  NotificationModule,
  NotificationService,
} from '@alauda/ui';
import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/angular';
import { noop } from 'rxjs';

storiesOf('Notification', module).add('notification', () => ({
  moduleMetadata: {
    imports: [NotificationModule, BrowserAnimationsModule, ButtonModule],
    declarations: [DemoComponent],
    providers: [
      {
        provide: NOTIFICATION_CONFIG,
        useValue: {
          duration: {
            [MessageType.Error]: 0,
            [MessageType.Success]: 3333,
            [MessageType.Warning]: 3333,
            [MessageType.Info]: 3333,
          },
          maxStack: 3,
        },
      },
    ],
  },
  component: DemoComponent,
  props: {
    action: action('after closed result: '),
  },
}));

@Component({
  template: `
    <span>Notification:</span>
    <button aui-button (click)="notificationService.success('success')">
      success
    </button>
    <button aui-button (click)="notificationService.warning('warning')">
      warning
    </button>
    <button
      aui-button
      (click)="
        notificationService.error({
          content: 'error content',
          title: 'error title'
        })
      "
    >
      error
    </button>
    <button
      aui-button
      (click)="
        notificationService.info({ content: 'info', duration: 0, id: 'test01' })
      "
    >
      info
    </button>
    <button aui-button (click)="notify()">with template</button>
    <button
      aui-button
      (click)="
        notificationService.success({
          duration: 0,
          title: 'Custom Class',
          customClass: 'custom-class'
        })
      "
    >
      custom class
    </button>

    <ng-template #template>
      <div>custom template</div>
      <br />
      <button aui-button="primary">inline template button</button>
    </ng-template>
  `,
})
class DemoComponent implements OnDestroy {
  @ViewChild('template', { static: true })
  template: TemplateRef<any>;

  constructor(public notificationService: NotificationService) {}

  notify() {
    const notificationRef = this.notificationService.success({
      title: 'With template',
      contentRef: this.template,
    });
    notificationRef.instance.beforeClosed.subscribe(noop);
    notificationRef.instance.afterClosed.subscribe(noop);
  }

  ngOnDestroy() {
    this.notificationService.componentRefs.forEach(ref => {
      ref.destroy();
    });
    this.notificationService.wrapperInstance.elementRef.nativeElement.remove();
  }
}
