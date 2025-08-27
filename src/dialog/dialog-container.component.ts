import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, ViewChild } from '@angular/core';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'aui-dialog-container',
  template: `
    <div
      class="aui-dialog-container"
      cdkScrollable
    >
      <aui-dialog #dialogComponent></aui-dialog>
    </div>
  `,
  styles: [
    `
      .aui-dialog-container {
        width: 100vw;
        height: 100%;
        overflow: auto;
      }
    `,
  ],
  imports: [CdkScrollable, DialogComponent],
})
export class DialogContainerComponent {
  @ViewChild('dialogComponent', { static: true })
  dialogComponent: DialogComponent;
}
