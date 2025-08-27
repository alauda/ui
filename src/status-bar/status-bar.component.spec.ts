import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DISPLAY_DELAY } from '../tooltip/base-tooltip';

import { StatusBarModule } from './status-bar.module';
import { Status, StatusType } from './status-bar.types';

describe('Status Bar', () => {
  let fixture: ComponentFixture<TestComponent>;
  let ocEl: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
      ocEl = overlayContainer.getContainerElement();
    })();
  });

  it('should match snapshot', fakeAsync(() => {
    expect(fixture).toMatchSnapshot();

    const chunk = fixture.debugElement.query(
      By.css('aui-status-bar .aui-status-bar__chunk'),
    ).nativeElement as HTMLElement;
    chunk.dispatchEvent(new Event('mouseenter'));
    tick(DISPLAY_DELAY);
    fixture.detectChanges();
    tick();

    expect(fixture).toMatchSnapshot();
    expect(ocEl).toMatchSnapshot();
  }));

  it('should onChunkClick called once', () => {
    const mockFn = jest.fn();

    fixture.componentInstance.onChunkClick = mockFn;

    const chunk = fixture.debugElement.query(
      By.css('aui-status-bar .aui-status-bar__chunk'),
    ).nativeElement as HTMLElement;
    chunk.dispatchEvent(new Event('click'));

    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn.mock.calls[0][0]).toEqual({
      scale: 0.1,
      type: StatusType.Info,
      class: 'custom-class',
    });
  });
});

@Component({
  template: `
    <aui-status-bar
      [status]="status1"
      [template]="ref"
      size="medium"
      (statusClick)="onChunkClick($event)"
    ></aui-status-bar>
    <aui-status-bar
      [status]="status1"
      size="small"
      (statusClick)="onChunkClick($event)"
    ></aui-status-bar>
    <aui-status-bar
      [status]="status2"
      size="medium"
      (statusClick)="onChunkClick($event)"
    ></aui-status-bar>
    <aui-status-bar
      [status]="status2"
      size="small"
      (statusClick)="onChunkClick($event)"
    ></aui-status-bar>
    <ng-template
      #ref
      let-type="type"
      let-value="scale"
    >
      <div>{{ type }}: {{ value }}</div>
    </ng-template>
  `,
  imports: [StatusBarModule],
})
class TestComponent {
  status1: Status[] = [
    {
      scale: 0.1,
      type: StatusType.Info,
      class: 'custom-class',
    },
    {
      scale: 0.3,
      type: StatusType.Error,
    },
    {
      scale: 0.2,
      type: StatusType.Warning,
    },
    {
      scale: 0.2,
      type: StatusType.Success,
    },
    {
      scale: 0.2,
      type: StatusType.Primary,
    },
  ];

  status2: Status[] = [
    {
      type: StatusType.Pending,
      scale: 1,
    },
  ];

  onChunkClick: (status: Status) => {
    //
  };
}
