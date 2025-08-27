import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'aui-tree-node-placeholder',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  standalone: true,
})
export class TreeNodePlaceholderComponent {}
