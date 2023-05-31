import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { DialogService, DialogSize } from '@alauda/ui';

@Component({
  selector: 'basic-dialog-demo',
  template: `
    <button
      aui-button="primary"
      (click)="open(dialog)"
    >
      打开对话框
    </button>
    <ng-template #dialog>
      <aui-dialog-header>
        <aui-icon
          icon="exclamation_circle_s"
          background="circle"
        ></aui-icon>
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
        <button
          aui-button="primary"
          (click)="open(dialog1)"
        >
          Open Next
        </button>
        <button
          aui-button
          [auiDialogClose]="false"
        >
          Cancel
        </button>
      </aui-dialog-footer>
    </ng-template>
    <ng-template #dialog1>
      <aui-dialog-header>
        <aui-icon
          icon="exclamation_circle_s"
          background="circle"
        ></aui-icon>
        <span>What can Kubernetes do for you?</span>
      </aui-dialog-header>
      <aui-dialog-content> </aui-dialog-content>
      <aui-dialog-footer>
        <button
          aui-button="primary"
          (click)="open(dialog)"
        >
          Open Next
        </button>
        <button
          aui-button
          [auiDialogClose]="false"
        >
          Cancel
        </button>
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
  selector: 'fit-viewport-dialog-demo',
  template: `
    <button
      aui-button="primary"
      (click)="open(dialog)"
    >
      打开对话框
    </button>
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
        best-of-breed ideas from the community. With modern web services, users
        expect applications to be available 24/7, and developers expect to
        deploy new versions of those applications several times a day.
        Containerization helps package software to serve these goals, enabling
        applications to be released and updated in an easy and fast way without
        downtime. Kubernetes helps you make sure those containerized
        applications run where and when you want, and helps them find the
        resources and tools they need to work. Kubernetes is a production-ready,
        open source platform designed with Google's accumulated experience in
        container orchestration, combined with best-of-breed ideas from the
        community.
      </aui-dialog-content>
      <aui-dialog-footer>
        <button
          aui-button="primary"
          [auiDialogClose]="true"
        >
          Confirm
        </button>
        <button
          aui-button
          [auiDialogClose]="false"
        >
          Cancel
        </button>
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
  selector: 'full-screen-dialog-demo',
  template: `
    <button
      aui-button="primary"
      (click)="open(dialog)"
    >
      打开对话框
    </button>
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
        <button
          aui-button="primary"
          [auiDialogClose]="true"
        >
          Confirm
        </button>
        <button
          aui-button
          [auiDialogClose]="false"
        >
          Cancel
        </button>
      </aui-dialog-footer>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullScreenDialogComponent {
  constructor(private readonly dialog: DialogService) {}

  open(template: TemplateRef<any>) {
    this.dialog.open(template, {
      size: DialogSize.Fullscreen,
      noAnimation: true,
    });
  }
}

@Component({
  selector: 'confirm-dialog-demo',
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
