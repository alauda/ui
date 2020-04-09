import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MESSAGE_CONFIG, MessageModule, MessageService } from './public-api';

describe('MessageService', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ocEl: HTMLElement;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        {
          provide: MESSAGE_CONFIG,
          useValue: {
            duration: 10000,
            maxStack: 3,
          },
        },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);

    inject(
      [OverlayContainer, MessageService],
      (overlayContainer: OverlayContainer, service: MessageService) => {
        ocEl = overlayContainer.getContainerElement();
        messageService = service;
      },
    )();
  });

  it('should work with global config', () => {
    messageService.success('Message success0');
    fixture.detectChanges();
    messageService.success('Message success1');
    fixture.detectChanges();
    messageService.success('Message success2');
    fixture.detectChanges();
    messageService.success('Message success3');
    fixture.detectChanges();
    messageService.success('Message success4');
    fixture.detectChanges();
    messageService.success('Message success5');
    fixture.detectChanges();

    expect(ocEl.querySelectorAll('.aui-message').length).toEqual(6);
  });

  it('should show a success Message with  string', () => {
    messageService.success('Message success');
    fixture.detectChanges();
    expect(ocEl.querySelector('.aui-message')).not.toBeNull();
    expect(ocEl.querySelector('.aui-message').classList).toContain(
      'aui-message--success',
    );
    expect(ocEl.querySelector('.aui-message__content').innerHTML).toContain(
      'Message success',
    );
  });

  it('should show a success Message with object', () => {
    messageService.success({
      content: 'Message success object',
      duration: 5,
    });
    fixture.detectChanges();
    expect(ocEl.querySelector('.aui-message')).not.toBeNull();
    expect(ocEl.querySelector('.aui-message').classList).toContain(
      'aui-message--success',
    );
    expect(ocEl.querySelector('.aui-message__content').innerHTML).toContain(
      'Message success object',
    );
  });
});

@Component({
  template: '',
})
export class TestComponent {
  @ViewChild('template', { static: true })
  templateRef: TemplateRef<any>;
}

@NgModule({
  imports: [MessageModule, NoopAnimationsModule],
  declarations: [TestComponent],
})
class TestModule {}
