import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CdkCell } from '@angular/cdk/table';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'aui-table-cell[expand]',
  template: `
    <ng-container *ngIf="!template">
      <button
        (click)="expandChange.next()"
        class="aui-table__cell-expand-button"
        [class.expanded]="expand"
        [class.collapsed]="!expand"
        aui-button="primary"
        size="mini"
        [square]="true"
        [round]="true"
      >
        <aui-icon [icon]="expand ? 'angle_down' : 'angle_right'"></aui-icon>
      </button>
    </ng-container>

    <ng-container *ngIf="expand && template">
      <div class="aui-table__cell-expand-detail" [@expand]="expanded">
        <ng-content></ng-content>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'auiTableCell',
  preserveWhitespaces: false,
  animations: [
    trigger('expand', [
      state('*', style({ height: 0 })),
      state('expanded', style({ height: '*', 'margin-bottom': '0' })),
      transition('* => expanded', [animate(250)]),
      transition('expanded => *', [animate(250)]),
    ]),
  ],
})
export class TableCellComponent extends CdkCell {
  @Input()
  expand: boolean;

  @Input()
  template: boolean;

  @Output()
  expandChange = new EventEmitter();

  get expanded() {
    return this.expand ? 'expanded' : null;
  }
}
