import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';

import { DrawerRef, DrawerService } from '@alauda/ui';

@Component({
  template: `
    <button
      aui-button="primary"
      (click)="open(customContent)"
    >
      打开抽屉
    </button>
    <button
      aui-button
      (click)="close()"
    >
      关闭
    </button>
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
