import { DialogService, DialogSize } from '@alauda/ui';
import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';

@Component({
  template: `
    <button aui-button="primary" (click)="open(dialog)">打开对话框</button>
    <ng-template #dialog>
      <aui-dialog-header>
        <aui-icon icon="exclamation_circle_s"></aui-icon>
        <span>What can Kubernetes do for you?</span>
      </aui-dialog-header>
      <aui-dialog-content>
        With modern web services, users expect applications to be available
        24/7, and developers expect to deploy new versions of those applications
        several times a day. Containerization helps package software to serve
        these goals, enabling applications to be released and updated in an easy
        and fast way without downtime. Kubernetes helps you make sure those
        containerized applications run where and when you want, and helps them
        find the resources and tools they need to work. Kubernetes is a
        production-ready, open source platform designed with Google's
        accumulated experience in container orchestration, combined with
        best-of-breed ideas from the community.
      </aui-dialog-content>
      <aui-dialog-footer>
        <button aui-button="primary" [auiDialogClose]="true">Confirm</button>
        <button aui-button [auiDialogClose]="false">Cancel</button>
      </aui-dialog-footer>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDialogComponent {
  constructor(private readonly dialog: DialogService) {}

  open(template: TemplateRef<any>) {
    this.dialog.open(template);
  }
}

@Component({
  template: `
    <button aui-button="primary" (click)="open(dialog)">打开对话框</button>
    <ng-template #dialog>
      <aui-dialog-header>
        <span>What can Kubernetes do for you?</span>
      </aui-dialog-header>
      <aui-dialog-content>
        With modern web services, users expect applications to be available
        24/7, and developers expect to deploy new versions of those applications
        several times a day. Containerization helps package software to serve
        these goals, enabling applications to be released and updated in an easy
        and fast way without downtime. Kubernetes helps you make sure those
        containerized applications run where and when you want, and helps them
        find the resources and tools they need to work. Kubernetes is a
        production-ready, open source platform designed with Google's
        accumulated experience in container orchestration, combined with
        best-of-breed ideas from the community.
      </aui-dialog-content>
      <aui-dialog-footer>
        <button aui-button="primary" [auiDialogClose]="true">Confirm</button>
        <button aui-button [auiDialogClose]="false">Cancel</button>
      </aui-dialog-footer>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FitViewportDialogComponent {
  constructor(private readonly dialog: DialogService) {}

  open(template: TemplateRef<any>) {
    this.dialog.open(template, { fitViewport: true });
  }
}

@Component({
  template: `
    <button aui-button="primary" (click)="open(dialog)">打开对话框</button>
    <ng-template #dialog>
      <aui-dialog-header>
        <span>What can Kubernetes do for you?</span>
      </aui-dialog-header>
      <aui-dialog-content>
        With modern web services, users expect applications to be available
        24/7, and developers expect to deploy new versions of those applications
        several times a day. Containerization helps package software to serve
        these goals, enabling applications to be released and updated in an easy
        and fast way without downtime. Kubernetes helps you make sure those
        containerized applications run where and when you want, and helps them
        find the resources and tools they need to work. Kubernetes is a
        production-ready, open source platform designed with Google's
        accumulated experience in container orchestration, combined with
        best-of-breed ideas from the community.
      </aui-dialog-content>
      <aui-dialog-footer>
        <button aui-button="primary" [auiDialogClose]="true">Confirm</button>
        <button aui-button [auiDialogClose]="false">Cancel</button>
      </aui-dialog-footer>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullScreenDialogComponent {
  constructor(private readonly dialog: DialogService) {}

  open(template: TemplateRef<any>) {
    this.dialog.open(template, { size: DialogSize.Fullscreen });
  }
}

@Component({
  template: `<button aui-button="primary" (click)="open()">打开对话框</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  constructor(private readonly dialog: DialogService) {}

  open() {
    this.dialog.confirm({
      title: 'Are you sure?',
      content: 'This will permanently delete the item.',
      confirmText: 'Yes',
      cancelText: 'No',
    });
  }
}
