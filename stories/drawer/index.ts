import {
  ButtonModule,
  DrawerModule,
  DrawerRef,
  DrawerService,
  InputModule,
} from '@alauda/ui';
import { Component, Input, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { storiesOf } from '@storybook/angular';

storiesOf('Drawer', module)
  .add('drawer', () => ({
    moduleMetadata: {
      imports: [ButtonModule, DrawerModule, InputModule, FormsModule],
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
      declarations: [ServiceDrawerCptComponent, DrawerContentComponent],
      entryComponents: [DrawerContentComponent],
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
    <aui-drawer [offsetY]="offsetY" [visible]="visible" (close)="close()">
      <div *auiDrawerHeader>header</div>
      <ng-container *auiDrawerContent> content </ng-container>
      <div *auiDrawerFoot>foot</div>
    </aui-drawer>
  `,
})
class DemoComponent {
  offsetY = 0;
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
    <button aui-button="primary" (click)="open()">打开抽屉</button>
    <aui-drawer
      [visible]="visible"
      [maskClosable]="true"
      [mask]="true"
      (close)="close()"
    >
      <div *auiDrawerHeader>header</div>
      <ng-container *auiDrawerContent> content </ng-container>
      <div *auiDrawerFoot>foot</div>
    </aui-drawer>
  `,
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
    this.drawerRef.closure('on close');
  }
}

@Component({
  template: `
    <button aui-button="primary" (click)="open()">打开component抽屉</button>
    <button aui-button (click)="close()">关闭</button>
  `,
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

  close() {
    this.drawerRef.closure('on close');
  }
}

@Component({
  template: ` component {{ data }}`,
})
export class DrawerContentComponent {
  @Input() data: string;
}
