import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';

import { SelectOption } from './select.types';

@Component({
  selector: 'aui-option',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  preserveWhitespaces: false,
  standalone: true,
})
export class OptionComponent<T> implements OnChanges {
  @Input() label: SelectOption['label'];
  @Input() value: T = null;
  @Input() disabled = false;
  @Input() labelContext: unknown = {};

  @ViewChild(TemplateRef, { static: true }) contentTemplate!: TemplateRef<any>;

  changes$ = new Subject();
  // 在 option-group 中赋值，主要用来在 base-select 的清洗数据中用来归纳组数据
  groupTitle: ElementRef;

  ngOnChanges(): void {
    this.changes$.next(null);
  }
}
