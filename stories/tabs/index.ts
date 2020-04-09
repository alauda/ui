import {
  ButtonModule,
  IconModule,
  TabSize,
  TabType,
  TabsModule,
} from '@alauda/ui';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add('tabs', () => {
    const sizeOptions = {
      [TabSize.Large]: TabSize.Large,
      [TabSize.Medium]: TabSize.Medium,
      [TabSize.Small]: TabSize.Small,
    };
    const size = select('size', sizeOptions, TabSize.Medium);
    const typeOptions = {
      [TabType.Line]: TabType.Line,
      [TabType.Card]: TabType.Card,
    };
    const type = select('type', typeOptions, TabType.Line);
    const closeable = boolean('closeable', true);
    const disabled = boolean('disabled', false);
    const lazy = boolean('lazy', true);

    return {
      moduleMetadata: {
        imports: [TabsModule, ButtonModule, IconModule],
        declarations: [DemoComponent, ContentComponent],
      },
      component: DemoComponent,
      props: {
        size,
        type,
        closeable,
        disabled,
        lazy,
      },
    };
  });

@Component({
  template: `
    <aui-tab-group
      [size]="size"
      [type]="type"
      [lazy]="lazy"
      [selectedIndex]="selectedIndex$ | async"
    >
      <aui-tab
        *ngFor="let tab of tabs; let i = index"
        [disabled]="disabled"
        [closeable]="closeable"
        (close)="remove(i)"
      >
        <ng-container *auiTabLabel>
          <aui-icon icon="sun"></aui-icon>
          <span>Tab {{ tab }}</span>
        </ng-container>
        <!-- 如果不使用 auiTabContent 指令 content 组件不会动态创建销毁 -->
        <content *auiTabContent [index]="tab"></content>
      </aui-tab>

      <ng-container *auiTabHeaderAddon>
        <button
          aui-button="primary"
          (click)="add()"
          size="small"
          [square]="true"
        >
          <aui-icon icon="plus"></aui-icon>
        </button>
      </ng-container>

      <aui-tab *ngIf="showLast$ | async">
        <ng-container *auiTabLabel>Last Tab</ng-container>
        <div *auiTabContent>Last Content</div>
      </aui-tab>
    </aui-tab-group>
  `,
})
class DemoComponent implements OnInit {
  @Input()
  size: TabSize;

  @Input()
  type: TabType;

  @Input()
  disabled: boolean;

  @Input()
  lazy: boolean;

  tabs: number[] = [1, 2, 3];

  showLast$ = of(false).pipe(delay(1500));
  selectedIndex$ = this.showLast$.pipe(map(() => 0));

  ngOnInit() {
    this.add(3);
  }

  add(num = 1) {
    this.tabs = this.tabs.concat(
      new Array(num)
        .fill(null)
        .map((_, i) => (this.tabs[this.tabs.length - 1] || 0) + i + 1),
    );
  }

  remove(index: number) {
    this.tabs.splice(index, 1);
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'content',
  template: `
    <h2>Content {{ index }}</h2>
  `,
})
class ContentComponent implements OnInit, OnDestroy {
  @Input()
  index: number;

  ngOnInit() {
    action(`content ${this.index}`)('initialized');
  }

  ngOnDestroy() {
    action(`content ${this.index}`)('destroyed');
  }
}
