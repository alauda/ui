import { Directionality } from '@angular/cdk/bidi';
import { PortalModule } from '@angular/cdk/portal';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { IconModule } from '../icon';

import {
  TabHeaderActiveIndicatorComponent,
  TabHeaderComponent,
  TabLabelWrapperDirective,
} from '.';

describe('TabHeaderComponent', () => {
  const change = new Subject();
  let fixture: ComponentFixture<SimpleTabHeaderAppComponent>;
  let appComponent: SimpleTabHeaderAppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, PortalModule, IconModule],
      declarations: [
        TabHeaderComponent,
        TabHeaderActiveIndicatorComponent,
        TabLabelWrapperDirective,
        SimpleTabHeaderAppComponent,
      ],
      providers: [
        ViewportRuler,
        {
          provide: Directionality,
          useFactory: () => ({ value: 'ltr', change: change.asObservable() }),
        },
      ],
    });
  });

  describe('pagination', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTabHeaderAppComponent);
      fixture.detectChanges();
      appComponent = fixture.componentInstance;
    });

    // FIXME: looks like JSDom does not work properly with offsetWidth?
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('should show width when tab list width exceeds container', () => {
      fixture.detectChanges();
      expect(appComponent.tabHeader._showPaginationControls).toBe(false);

      // Add enough tabs that it will obviously exceed the width
      appComponent.addTabsForScrolling();
      fixture.detectChanges();

      fixture.detectChanges();

      expect(appComponent.tabHeader._showPaginationControls).toBe(true);
    });
  });
});

interface Tab {
  label: string;
  disabled?: boolean;
}

@Component({
  template: `
    <aui-tab-header [selectedIndex]="selectedIndex">
      <div
        auiTabLabelWrapper
        *ngFor="let tab of tabs; let i = index"
        [disabled]="!!tab.disabled"
        (click)="selectedIndex = i"
      >
        {{ tab.label }}
      </div>
    </aui-tab-header>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100px;
      }
    `,
  ],
})
class SimpleTabHeaderAppComponent {
  selectedIndex = 0;
  disabledTabIndex = 1;
  tabs: Tab[] = [
    { label: 'tab one' },
    { label: 'tab one' },
    { label: 'tab one' },
    { label: 'tab one' },
  ];

  @ViewChild(TabHeaderComponent, { static: true })
  tabHeader: TabHeaderComponent;

  constructor() {
    this.tabs[this.disabledTabIndex].disabled = true;
  }

  addTabsForScrolling() {
    this.tabs.push(
      { label: 'new' },
      { label: 'new' },
      { label: 'new' },
      { label: 'new' },
    );
  }
}
