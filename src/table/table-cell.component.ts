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
  selector: 'aui-table-cell[auiExpandButton]',
  template: `
    <button
      type="button"
      class="aui-expand-button"
      [class.isExpanded]="expand"
      [disabled]="disabled"
      (click)="expandChange.next()"
    >
      <aui-icon icon="angle_right"></aui-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class TableExpandButtonCellComponent extends CdkCell {
  @Input()
  expand = false;

  @Input()
  disabled = false;

  @Output()
  expandChange = new EventEmitter();

  get expanded() {
    return this.expand ? 'expanded' : null;
  }
}
@Component({
  selector: 'aui-table-cell[auiExpandPanel]',
  template: `
    <div
      *ngIf="expand"
      class="aui-table__cell-expand-panel"
      [@expand]="expanded"
    >
      <div
        class="aui-table__cell-expand-panel-content"
        [class.hasBackground]="background"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  animations: [
    trigger('expand', [
      state('*', style({ height: 0 })),
      state('expanded', style({ height: '*', 'margin-bottom': '15px' })),
      transition('* <=> expanded', [animate('0.1s ease-in-out')]),
    ]),
  ],
})
export class TableExpandPanelCellComponent extends CdkCell {
  @Input()
  expand = false;

  @Input()
  background = true;

  get expanded() {
    return this.expand ? 'expanded' : null;
  }
}
