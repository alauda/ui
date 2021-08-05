import {
  ButtonModule,
  ConfirmType,
  DialogConfig,
  DialogModule,
  DialogRef,
  DialogService,
  DialogSize,
  IconModule,
} from '@alauda/ui';
import { ComponentType } from '@angular/cdk/portal';
import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/angular';

storiesOf('Dialog', module).add('dialog', () => ({
  moduleMetadata: {
    imports: [DialogModule, ButtonModule, IconModule],
    declarations: [DemoComponent, DialogContentComponent],
    entryComponents: [DialogContentComponent],
  },
  component: DemoComponent,
}));

@Component({
  template: `
    <button aui-button (click)="openDialog(template)">open dialog</button>
    <button
      aui-button
      (click)="openDialog(template, { fitViewport: true, size: 'small' })"
    >
      open dialog with limited height
    </button>
    <button
      aui-button
      (click)="openDialog(fullscreenTemplate, { size: 'fullscreen' })"
    >
      open fullscreen dialog
    </button>
    <button aui-button (click)="openComponentDialog()">
      open dialog fitview using component content
    </button>
    <button aui-button (click)="confirmDialog()">confirm dialog</button>

    <ng-template #template>
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
    <ng-template #fullscreenTemplate>
      <aui-dialog-header>
        Docker Platform for Digital Transformation
      </aui-dialog-header>
      <aui-dialog-content>
        <div>
          Innovation in today’s organizations comes from software, where all
          companies are becoming software companies and need to empower their
          developers to deliver new customer experiences quickly. Innovation can
          come in many different application formats - from traditional,
          monolithic applications to cloud-native and 12-factor applications.
        </div>
        <div>
          These applications must also be able to run across hybrid/multi-cloud
          and out to the edge. Docker enables organizations to achieve these
          goals by providing the only end-to-end (desktop to the data center)
          experience for developing and scaling distributed applications while
          leveraging the processes, people and tools that they have in place
          today. In addition to building and running applications, the Docker
          Platform provides end-to-edge security at scale, without slowing down
          innovation with automated governance and compliance throughout the
          application lifecycle.
        </div>
        <div>
          The Docker platform is built on industry-standard, open source
          technologies including Docker and Kubernetes. Used by millions of
          developers and IT professionals worldwide, Docker includes the world's
          leading container content library and ecosystem with more than 100,000
          container images from major software vendors, open-source projects and
          the community.
        </div>
      </aui-dialog-content>
    </ng-template>
  `,
})
class DemoComponent implements OnDestroy {
  dialogRefs: Array<DialogRef<any>> = [];

  constructor(private readonly dialogService: DialogService) {}

  openDialog(
    content: TemplateRef<any> | ComponentType<any>,
    config?: DialogConfig,
  ) {
    const dialogRef = this.dialogService.open(content, config);

    dialogRef.afterClosed().subscribe(result => {
      action('afterClosed')(result);
      const index = this.dialogRefs.indexOf(dialogRef);
      this.dialogRefs.splice(index, 1);
    });

    this.dialogRefs.push(dialogRef);
  }

  confirmDialog() {
    this.dialogService
      .confirm({
        title: 'title',
        content: 'content',
        confirmType: ConfirmType.Warning,
        beforeConfirm: resolve => {
          action('beforeConfirm')();
          setTimeout(resolve, 2000);
        },
      })
      .then(() => {
        action('confirm')();
      })
      .catch(() => {
        action('cancel')();
      });
  }

  openComponentDialog() {
    this.openDialog(DialogContentComponent, {
      fitViewport: true,
      size: DialogSize.Small,
    });
  }

  ngOnDestroy() {
    this.dialogRefs.forEach(ref => {
      ref.close(false);
    });
  }
}

@Component({
  template: `
    <aui-dialog-header>What can Kubernetes do for you?</aui-dialog-header>
    <aui-dialog-content>
      With modern web services, users expect applications to be available 24/7,
      and developers expect to deploy new versions of those applications several
      times a day. Containerization helps package software to serve these goals,
      enabling applications to be released and updated in an easy and fast way
      without downtime. Kubernetes helps you make sure those containerized
      applications run where and when you want, and helps them find the
      resources and tools they need to work. Kubernetes is a production-ready,
      open source platform designed with Google's accumulated experience in
      container orchestration, combined with best-of-breed ideas from the
      community.
    </aui-dialog-content>
    <aui-dialog-footer>
      <button aui-button [auiDialogClose]="false">Cancel</button>
    </aui-dialog-footer>
  `,
})
class DialogContentComponent {}
