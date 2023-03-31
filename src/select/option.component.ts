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
})
export class OptionComponent<T> implements OnChanges {
  changes = new Subject();

  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<any>;
  @Input() label: SelectOption['label'];
  @Input() value: T = null;
  @Input() disabled = false;
  @Input() labelContext: unknown = {};

  groupTitle: ElementRef;

  ngOnChanges(): void {
    this.changes.next(null);
  }
}
