import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <button
      aui-button="primary"
      (click)="open()"
    >
      打开抽屉
    </button>
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
  standalone: false,
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
