import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { DialogService } from '@alauda/ui';

@Component({
  template: `<button
      aui-button="primary"
      (click)="openString()"
    >
      打开对话框(String)
    </button>
    <button
      aui-button="primary"
      (click)="openTemplateRef()"
    >
      打开对话框(TemplateRef)
    </button>
    <button
      aui-button="primary"
      (click)="openComponent()"
    >
      打开对话框(Component)
    </button>
    <ng-template #templateContent
      >This will permanently delete the item.(TemplateRef)</ng-template
    > `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  @ViewChild('templateContent') contentTemplateRef: TemplateRef<any>;
  readonly title = 'Are you sure?';
  constructor(private readonly dialog: DialogService) {}

  openString() {
    this.dialog.confirm({
      title: this.title,
      content: 'This will permanently delete the item.(String)',
      confirmText: 'Yes',
      cancelText: 'No',
      noAnimation: true,
    });
  }

  openTemplateRef() {
    this.dialog.confirm({
      title: this.title,
      content: this.contentTemplateRef,
      confirmText: 'Yes',
      cancelText: 'No',
      beforeConfirm: resolve => {
        setTimeout(resolve, 900);
      },
    });
  }

  openComponent() {
    this.dialog.confirm({
      title: this.title,
      content: ConfirmContentComponent,
      confirmText: 'Yes',
      cancelText: 'No',
    });
  }
}

@Component({
  template: 'This will permanently delete the item.(Component)',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmContentComponent {}
