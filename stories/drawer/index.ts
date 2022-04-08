import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { storiesOf } from '@storybook/angular';

import {
  ButtonModule,
  DrawerModule,
  DrawerRef,
  DrawerService,
  InputModule,
  SwitchModule,
} from '@alauda/ui';

storiesOf('Drawer', module)
  .add('drawer', () => ({
    moduleMetadata: {
      imports: [
        ButtonModule,
        DrawerModule,
        InputModule,
        FormsModule,
        SwitchModule,
      ],
      declarations: [DemoComponent],
    },
    component: DemoComponent,
  }))
  .add('mask drawer', () => ({
    moduleMetadata: {
      imports: [ButtonModule, DrawerModule],
      declarations: [MaskDrawerComponent],
    },
    component: MaskDrawerComponent,
  }))
  .add('service create drawer', () => ({
    moduleMetadata: {
      imports: [ButtonModule, DrawerModule],
      declarations: [ServiceDrawerComponent],
    },
    component: ServiceDrawerComponent,
  }))
  .add('service create component drawer', () => ({
    moduleMetadata: {
      imports: [ButtonModule, DrawerModule],
      declarations: [
        ServiceDrawerCptComponent,
        DrawerContentComponent,
        DrawerContent1Component,
      ],
      entryComponents: [DrawerContentComponent, DrawerContent1Component],
    },
    component: ServiceDrawerCptComponent,
  }));

@Component({
  template: `
    <button aui-button="primary" (click)="open()">打开抽屉</button>
    <button aui-button (click)="close()">关闭</button>
    <div>
      offsetY:
      <aui-number-input [step]="20" [(ngModel)]="offsetY"></aui-number-input>
    </div>
    <div>
      divider:
      <aui-switch [(ngModel)]="divider"></aui-switch>
    </div>
    <aui-drawer
      [divider]="divider"
      [offsetY]="offsetY + 'px'"
      [visible]="visible"
      (close)="close()"
    >
      <div *auiDrawerHeader>header</div>
      <ng-container *auiDrawerContent> content </ng-container>
      <div *auiDrawerFooter>footer</div>
    </aui-drawer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DemoComponent {
  offsetY = 0;
  visible = false;
  divider = true;
  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}

@Component({
  template: `
    <button aui-button="primary" (click)="open()">打开抽屉</button>
    <aui-drawer
      [visible]="visible"
      [maskClosable]="true"
      [mask]="true"
      (close)="close()"
    >
      <div *auiDrawerHeader>header</div>
      <ng-container *auiDrawerContent> content </ng-container>
      <div *auiDrawerFooter>footer</div>
    </aui-drawer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaskDrawerComponent {
  visible = false;
  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }
}

@Component({
  template: `
    <button aui-button="primary" (click)="open(customContent)">打开抽屉</button>
    <button aui-button (click)="close()">关闭</button>
    <ng-template #customContent>
      drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义content <br />1drawer 自定义content <br />1drawer 自定义content
      drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义content <br />1drawer 自定义content <br />1drawer
      自定义contentdrawer 自定义content <br />1drawer 自定义content
      <br />1drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义contentdrawer 自定义content <br />1drawer 自定义content
      <br />1drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义contentdrawer 自定义content <br />1drawer 自定义content
      <br />1drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义contentdrawer 自定义content <br />1drawer 自定义content
      <br />1drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义contentdrawer 自定义content <br />1drawer 自定义content
      <br />1drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义contentdrawer 自定义content <br />1drawer 自定义content
      <br />1drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义contentdrawer 自定义content <br />1drawer 自定义content
      <br />1drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义contentdrawer 自定义content <br />1drawer 自定义content
      <br />1drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义contentdrawer 自定义content <br />1drawer 自定义content
      <br />1drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义contentdrawer 自定义content <br />1drawer 自定义content
      <br />1drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义contentdrawer 自定义content <br />1drawer 自定义content
      <br />1drawer 自定义content <br />1drawer 自定义content <br />1drawer
      自定义content
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceDrawerComponent {
  drawerRef: DrawerRef;
  constructor(private readonly drawerService: DrawerService) {}

  open(template: TemplateRef<unknown>) {
    this.drawerRef = this.drawerService.open({
      title: 'title',
      content: template,
      footer: 'footer',
    });
    this.drawerRef.afterClosed.subscribe(res => {
      console.log(res);
    });
    this.drawerRef.afterOpen.subscribe(() => {
      console.log('open');
    });
  }

  close() {
    this.drawerRef.dispose('on close');
  }
}

@Component({
  template: `
    <button aui-button="primary" (click)="open()">打开component抽屉</button>
    <button aui-button="primary" (click)="openTwo()">打开component2抽屉</button>
    <button aui-button (click)="close()">关闭</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.drawerRef.afterClosed.subscribe(res => {
      console.log(res);
    });
    this.drawerRef.afterOpen.subscribe(() => {
      console.log('open');
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
    this.drawerRef.dispose('on close');
  }
}

@Component({
  template: ` component {{ data }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContentComponent {
  @Input() data: string;
}

@Component({
  template: `component {{ data }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerContent1Component {
  @Input() data: string;
}
