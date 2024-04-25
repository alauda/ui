import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <button
      aui-button="primary"
      (click)="open()"
    >
      打开抽屉
    </button>
    <button
      aui-button
      (click)="close()"
    >
      关闭
    </button>
    <div>
      offsetY:
      <aui-number-input
        [step]="20"
        [(ngModel)]="offsetY"
      ></aui-number-input>
    </div>
    <div>
      divider:
      <aui-switch [(ngModel)]="divider"></aui-switch>
    </div>
    <aui-drawer
      [divider]="divider"
      [offsetY]="offsetY + 'px'"
      [visible]="visible"
      (close)="closeHandle()"
    >
      <div *auiDrawerHeader>header</div>
      <ng-container *auiDrawerContent>
        <input aui-input />
      </ng-container>
      <div *auiDrawerFooter>footer</div>
    </aui-drawer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDrawerComponent {
  offsetY = 0;
  visible = false;
  divider = true;
  open() {
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  closeHandle() {
    this.visible = false;
  }
}
