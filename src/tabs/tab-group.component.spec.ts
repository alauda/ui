import { Component, QueryList, ViewChildren } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LifeCycle, LifeCycleDirective } from '../utils/life-cycle';

import { TabContentDirective, TabLabelDirective } from './tab-body.component';
import { TabChangeEvent, TabGroupComponent } from './tab-group.component';
import { TabComponent } from './tab.component';

describe('TabGroupComponent', () => {
  describe('basic behavior', () => {
    let fixture: ComponentFixture<SimpleTabsTestAppComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(SimpleTabsTestAppComponent);
    });

    it('should default to the first tab', () => {
      checkSelectedIndex(0, fixture);
    });

    it('should change selected index on click', fakeAsync(() => {
      const component = fixture.debugElement
        .componentInstance as TabGroupComponent;
      component.selectedIndex = 0;
      checkSelectedIndex(0, fixture);

      // select the second tab
      let tabLabel = fixture.debugElement.queryAll(By.css('.aui-tab-label'))[1];
      (tabLabel.nativeElement as HTMLElement).click();
      checkSelectedIndex(1, fixture);

      // select the third tab
      tabLabel = fixture.debugElement.queryAll(By.css('.aui-tab-label'))[2];
      (tabLabel.nativeElement as HTMLElement).click();
      fixture.detectChanges();
      tick();
      checkSelectedIndex(2, fixture);
    }));

    it('should support two-way binding for selectedIndex', fakeAsync(() => {
      const component = fixture.componentInstance;
      component.selectedIndex = 0;
      fixture.detectChanges();
      const tabLabel = fixture.debugElement.queryAll(
        By.css('.aui-tab-label'),
      )[1];
      (tabLabel.nativeElement as HTMLElement).click();
      fixture.detectChanges();
      tick();
      expect(component.selectedIndex).toBe(1);
    }));

    // Note: needs to be `async` in order to fail when we expect it to.
    it('should set to correct tab on fast change', waitForAsync(() => {
      const component = fixture.componentInstance;
      component.selectedIndex = 0;
      fixture.detectChanges();
      setTimeout(() => {
        component.selectedIndex = 1;
        fixture.detectChanges();
        setTimeout(() => {
          component.selectedIndex = 0;
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.selectedIndex).toBe(0);
          });
        }, 1);
      }, 1);
    }));

    it('should change tabs based on selectedIndex', fakeAsync(() => {
      const component = fixture.componentInstance;
      const tabComponent = fixture.debugElement.query(By.css('aui-tab-group'))
        .componentInstance as TabGroupComponent;
      const spy = jest.spyOn(component, 'handleSelection');

      checkSelectedIndex(0, fixture);
      tabComponent.selectedIndex = 2;
      checkSelectedIndex(2, fixture);
      tick();
      expect(component.handleSelection).toHaveBeenCalledTimes(1);
      expect(component.selectEvent.index).toBe(2);
      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    }));

    it('should handle auiTabContent correctly for lazy loaded tabs', fakeAsync(() => {
      const component = fixture.componentInstance;
      const tabComponent = fixture.debugElement.query(By.css('aui-tab-group'))
        .componentInstance as TabGroupComponent;

      // At first there should no created tabs:
      expect(component.createdTabsCounter).toBe(0);

      // After initializing, there should be 2 created tabs:
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(2);

      // The second tab is lazy loaded (created)
      tabComponent.selectedIndex = 1;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(3);

      tabComponent.selectedIndex = 2;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(3);

      tabComponent.selectedIndex = 3;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(2);
    }));

    it('should handle auiTabContent correctly for true lazy loading tabs', fakeAsync(() => {
      const component = fixture.componentInstance;
      const tabComponent = fixture.debugElement.query(By.css('aui-tab-group'))
        .componentInstance as TabGroupComponent;

      component.setLazy(true);

      // At first there should no created tabs:
      expect(component.createdTabsCounter).toBe(0);

      // After initializing, there should be 2 created tabs:
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(2);

      // The second tab is lazy loaded (created)
      tabComponent.selectedIndex = 1;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(3);

      tabComponent.selectedIndex = 2;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(4);

      tabComponent.selectedIndex = 3;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(4);
    }));

    it('should clear lazy loaded tabs after lazy changed to false', fakeAsync(() => {
      const component = fixture.componentInstance;
      const tabComponent = fixture.debugElement.query(By.css('aui-tab-group'))
        .componentInstance as TabGroupComponent;

      component.setLazy(true);

      expect(component.createdTabsCounter).toBe(0);

      fixture.detectChanges();
      tabComponent.selectedIndex = 1;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(3);

      component.setLazy(false);

      tabComponent.selectedIndex = 2;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(3);

      component.setLazy(true);

      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(3);

      tabComponent.selectedIndex = 1;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(component.createdTabsCounter).toBe(4);
    }));

    it('should update tab positions when selected index is changed', () => {
      fixture.detectChanges();
      const component = fixture.debugElement.query(By.css('aui-tab-group'))
        .componentInstance as TabGroupComponent;
      const tabs = component._tabs.toArray();
      expect(tabs[0].position).toBe(0);
      expect(tabs[1].position).toBeGreaterThan(0);
      expect(tabs[2].position).toBeGreaterThan(0);
      // Move to third tab
      component.selectedIndex = 2;
      fixture.detectChanges();
      expect(tabs[0].position).toBeLessThan(0);
      expect(tabs[1].position).toBeLessThan(0);
      expect(tabs[2].position).toBe(0);
      // Move to the first tab
      component.selectedIndex = 0;
      fixture.detectChanges();
      expect(tabs[0].position).toBe(0);
      expect(tabs[1].position).toBeGreaterThan(0);
      expect(tabs[2].position).toBeGreaterThan(0);
    });

    it('should clamp the selected index to the size of the number of tabs', () => {
      fixture.detectChanges();
      const component = fixture.debugElement.query(By.css('aui-tab-group'))
        .componentInstance as TabGroupComponent;
      // Set the index to be negative, expect first tab selected
      fixture.componentInstance.selectedIndex = -1;
      fixture.detectChanges();
      expect(component.selectedIndex).toBe(0);
      // Set the index beyond the size of the tabs, expect last tab selected
      fixture.componentInstance.selectedIndex = 4;
      fixture.detectChanges();
      expect(component.selectedIndex).toBe(3);
    });

    it('should not crash when setting the selected index to NaN', () => {
      const component = fixture.debugElement
        .componentInstance as TabGroupComponent;
      expect(() => {
        component.selectedIndex = NaN;
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should set the isActive flag on each of the tabs', () => {
      fixture.detectChanges();
      const tabs = fixture.componentInstance.tabs.toArray();
      expect(tabs[0].tabContext.isActive).toBe(true);
      expect(tabs[1].tabContext.isActive).toBe(false);
      expect(tabs[2].tabContext.isActive).toBe(false);
      expect(tabs[3].tabContext.isActive).toBe(false);
      fixture.componentInstance.selectedIndex = 2;
      fixture.detectChanges();
      expect(tabs[0].tabContext.isActive).toBe(false);
      expect(tabs[1].tabContext.isActive).toBe(false);
      expect(tabs[2].tabContext.isActive).toBe(true);
      expect(tabs[3].tabContext.isActive).toBe(false);
    });
  });
});

/**
 * Checks that the `selectedIndex` has been updated; checks that the label and body have their
 * respective `active` classes
 */
function checkSelectedIndex(
  expectedIndex: number,
  fixture: ComponentFixture<any>,
) {
  fixture.detectChanges();
  const tabComponent = fixture.debugElement.query(By.css('aui-tab-group'))
    .componentInstance as TabGroupComponent;
  expect(tabComponent.selectedIndex).toBe(expectedIndex);
  const tabLabelElement = fixture.debugElement.query(
    By.css(`.aui-tab-label:nth-of-type(${expectedIndex + 1})`),
  ).nativeElement as HTMLElement;
  expect(tabLabelElement.classList.contains('isActive')).toBe(true);
}

@Component({
  template: `
    <aui-tab-group
      class="tab-group"
      [(selectedIndex)]="selectedIndex"
      (selectedTabChange)="handleSelection($event)"
      [lazy]="lazy"
    >
      <aui-tab>
        <ng-template auiTabLabel>Tab One</ng-template>
        <div (auiLifeCycle)="handleTabRender(0, $event)">Tab one content</div>
      </aui-tab>
      <aui-tab>
        <ng-template auiTabLabel>Tab Two</ng-template>
        <span
          *auiTabContent
          (auiLifeCycle)="handleTabRender(1, $event)"
        >
          Tab
        </span>
        <span>two</span>
        <span>content</span>
      </aui-tab>
      <aui-tab>
        <ng-template auiTabLabel>Tab Three</ng-template>
        <span
          *auiTabContent
          (auiLifeCycle)="handleTabRender(2, $event)"
        >
          Tab
        </span>
        <span>Three</span>
        <span>content</span>
      </aui-tab>
      <aui-tab>
        <ng-template auiTabLabel>Tab Four</ng-template>
        <div (auiLifeCycle)="handleTabRender(3, $event)">Tab four content</div>
      </aui-tab>
    </aui-tab-group>
  `,
  standalone: true,
  imports: [
    TabGroupComponent,
    TabComponent,
    TabLabelDirective,
    TabContentDirective,
    LifeCycleDirective,
  ],
})
class SimpleTabsTestAppComponent {
  @ViewChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  selectedIndex = 0;
  createdTabsCounter = 0;
  selectEvent: TabChangeEvent;

  lazy = false;

  setLazy(lazy: boolean) {
    this.lazy = lazy;
  }

  handleSelection(event: TabChangeEvent) {
    this.selectEvent = event;
  }

  handleTabRender(_index: number, lifeCycle: LifeCycle) {
    if (lifeCycle === LifeCycle.OnDestroy) {
      this.createdTabsCounter--;
    } else if (lifeCycle === LifeCycle.OnInit) {
      this.createdTabsCounter++;
    }
  }
}
