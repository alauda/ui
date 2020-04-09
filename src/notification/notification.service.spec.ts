import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  NOTIFICATION_CONFIG,
  NotificationModule,
  NotificationService,
} from './public-api';

describe('NotificationService', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ocEl: HTMLElement;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        {
          provide: NOTIFICATION_CONFIG,
          useValue: {
            duration: 3000,
            maxStack: 3,
          },
        },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);

    inject(
      [OverlayContainer, NotificationService],
      (overlayContainer: OverlayContainer, service: NotificationService) => {
        ocEl = overlayContainer.getContainerElement();
        notificationService = service;
      },
    )();
  });

  it('should work with global config', () => {
    notificationService.success('notification success');
    fixture.detectChanges();
    expect(ocEl.querySelector('.aui-notification__close').innerHTML).toContain(
      '3s',
    );
    notificationService.success('notification success1');
    fixture.detectChanges();
    notificationService.success('notification success2');
    fixture.detectChanges();
    notificationService.success('notification success3');
    fixture.detectChanges();
    notificationService.success('notification success4');
    fixture.detectChanges();
    notificationService.success('notification success5');
    fixture.detectChanges();
    expect(ocEl.querySelectorAll('.aui-notification').length).toEqual(6);
  });

  it('should show a success notification with  string', () => {
    notificationService.success('notification success');
    fixture.detectChanges();
    expect(ocEl.querySelector('.aui-notification')).not.toBeNull();
    expect(ocEl.querySelector('.aui-notification').classList).toContain(
      'aui-notification--success',
    );
    expect(
      ocEl.querySelector('.aui-notification__content').textContent,
    ).toContain('notification success');
  });

  it('should show a success notification with object', () => {
    notificationService.success({
      content: 'notification success object',
    });
    fixture.detectChanges();
    expect(ocEl.querySelector('.aui-notification')).not.toBeNull();
    expect(ocEl.querySelector('.aui-notification').classList).toContain(
      'aui-notification--success',
    );
    expect(
      ocEl.querySelector('.aui-notification__content').innerHTML,
    ).toContain('notification success object');
  });

  it('should show a success notification with template', () => {
    notificationService.success({
      contentRef: fixture.componentInstance.templateRef,
      duration: 10000,
    });
    fixture.detectChanges();

    expect(ocEl.querySelector('.aui-notification button')).not.toBeNull();
    expect(ocEl.querySelector('.aui-notification button').classList).toContain(
      'temp-btn',
    );
    expect(ocEl.querySelector('.aui-notification__close').innerHTML).toContain(
      '10s',
    );
  });

  it('should show a success notification with component', () => {
    notificationService.success({
      contentRef: NotificationContentComponent,
    });
    fixture.detectChanges();

    expect(
      ocEl.querySelector('.aui-notification .notification-demo-content'),
    ).not.toBeNull();
    expect(
      ocEl.querySelector('.aui-notification .notification-demo-content')
        .innerHTML,
    ).toContain('demo content');
  });
});

@Component({
  template: `
    <div class="notification-demo-content">demo content</div>
  `,
})
class NotificationContentComponent {}

@Component({
  template: `
    <div>
      <ng-template #template>
        <button class="temp-btn">点击</button>
      </ng-template>
    </div>
  `,
})
export class TestComponent {
  @ViewChild('template', { static: true })
  templateRef: TemplateRef<any>;
}

@NgModule({
  imports: [NotificationModule, NoopAnimationsModule],
  declarations: [TestComponent, NotificationContentComponent],
  entryComponents: [NotificationContentComponent],
})
class TestModule {}
