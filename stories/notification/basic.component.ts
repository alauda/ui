import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { noop } from 'rxjs';

import { NotificationService } from '@alauda/ui';

@Component({
  template: `
    <span>
      <button
        aui-button="primary"
        (click)="
          notificationService.info({
            title: '标题',
            content: '这是一条提醒通知',
            duration: 0,
            id: 'test01',
          })
        "
      >
        提醒通知
      </button>
    </span>
    <span>
      <button
        aui-button="success"
        (click)="
          notificationService.success({
            title: '成功标题',
          })
        "
      >
        成功通知
      </button>
    </span>
    <span>
      <button
        aui-button="warning"
        (click)="notificationService.warning('警告内容')"
      >
        警告通知
      </button>
    </span>
    <span>
      <button
        aui-button="danger"
        (click)="
          notificationService.error({
            title: '错误标题',
            content: '错误内容',
          })
        "
      >
        错误通知
      </button>
    </span>
    <span>
      <button
        aui-button
        (click)="notify()"
      >
        使用内容模板的通知
      </button>
    </span>
    <span>
      <button
        aui-button
        (click)="notify2()"
      >
        使用页脚模板的通知
      </button>
    </span>
    <span>
      <button
        aui-button
        (click)="
          notificationService.success({
            duration: 0,
            title: '自定义 Class',
            content: '在 .aui-notification 同级添加了 class: custom-class',
            customClass: 'custom-class',
          })
        "
      >
        使用自定义 class 的通知
      </button>
    </span>
    <ng-template #template>
      <a>自定义超链接</a>
      <div>自定义文本</div>
      <button aui-button="primary">自定义按钮</button>
    </ng-template>
    <ng-template #footer>
      <div style="text-align: right">
        自定义页脚
        <button
          aui-button="primary"
          size="small"
        >
          primary
        </button>
        <button
          aui-button
          size="small"
        >
          default
        </button>
      </div>
    </ng-template>
  `,
  styles: [
    `
      span {
        display: block;
        margin-bottom: 8px;
      }
      ::ng-deep .custom-class {
        font-weight: bold;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDemoComponent implements OnDestroy {
  @ViewChild('template', { static: true })
  template: TemplateRef<any>;

  @ViewChild('footer', { static: true })
  footerTpl: TemplateRef<any>;

  constructor(public notificationService: NotificationService) {}

  notify() {
    const notificationRef = this.notificationService.success({
      title: '标题',
      contentRef: this.template,
    });
    notificationRef.instance.beforeClosed.subscribe(noop);
    notificationRef.instance.afterClosed.subscribe(noop);
  }

  notify2() {
    const notificationRef = this.notificationService.success({
      title: '标题',
      footerRef: this.footerTpl,
      duration: 0,
    });
    notificationRef.instance.beforeClosed.subscribe(noop);
    notificationRef.instance.afterClosed.subscribe(noop);
  }

  ngOnDestroy() {
    this.notificationService.componentRefs.forEach(ref => {
      ref.destroy();
    });
    this.notificationService.wrapperInstance.elementRef.nativeElement.remove();
  }
}
