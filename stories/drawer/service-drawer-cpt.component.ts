import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DrawerRef, DrawerService } from '@alauda/ui';

@Component({
    template: `
    <button
      aui-button="primary"
      (click)="open()"
    >
      打开component抽屉
    </button>
    <button
      aui-button="primary"
      (click)="openTwo()"
    >
      打开component2抽屉
    </button>
    <button
      aui-button
      (click)="close()"
    >
      关闭
    </button>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ServiceDrawerCptComponent {
  drawerRef: DrawerRef;
  constructor(private readonly drawerService: DrawerService) {}

  open() {
    this.drawerRef = this.drawerService.open({
      title: 'title',
      width: 500,
      content: DrawerContentComponent,
      contentParams: { data: 111 },
      footer: 'footer',
    });
    this.drawerRef.afterClosed.subscribe(() => {
      //
    });
    this.drawerRef.afterOpen.subscribe(() => {
      //
    });
  }

  openTwo() {
    this.drawerService.open({
      title: 'title',
      width: 500,
      content: DrawerContent1Component,
      contentParams: { data: 222 },
      footer: 'footer',
    });
  }

  close() {
    this.drawerRef.close();
  }
}

@Component({
    template: ` component {{ data }}`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DrawerContentComponent {
  @Input() data: string;
}

@Component({
    template: `component {{ data }}`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DrawerContent1Component {
  @Input() data: string;
}
