import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  computed,
  effect,
  signal,
} from '@angular/core';
import { finalize, first, from } from 'rxjs';

import { ButtonModule } from '../button';
import { CustomBeforeAction } from '../dialog';
import { IconComponent } from '../icon';
import { buildBem } from '../internal/utils';

import {
  EditableEditorDirective,
  EditableViewerDirective,
} from './editable.directive';
import { ButtonPosition, EditableMode } from './editable.type';

const bem = buildBem('aui-editable');

@Component({
  selector: 'aui-editable',
  templateUrl: 'editable.component.html',
  styleUrls: ['editable.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    NgTemplateOutlet,
    IconComponent,
    ButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableComponent {
  @Input()
  beforeSave: CustomBeforeAction<unknown>;

  @Input()
  get position() {
    return this.$$position();
  }

  set position(val) {
    if (this.$$position() !== val) {
      this.$$position.set(val);
    }
  }

  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() modeChange: EventEmitter<EditableMode> =
    new EventEmitter<EditableMode>();

  @ContentChild(EditableViewerDirective, { read: TemplateRef })
  viewer: TemplateRef<unknown>;

  @ContentChild(EditableEditorDirective, { read: TemplateRef })
  editor: TemplateRef<unknown>;

  EditableMode = EditableMode;
  bem = bem;
  loading = false;

  $$mode = signal(EditableMode.View);
  $$position = signal<ButtonPosition>('center');

  $hostClass = computed(() => {
    return `${bem.block()} ${bem.modifier(this.$$position())}`;
  });

  constructor() {
    effect(() => {
      this.modeChange.emit(this.$$mode());
    });
  }

  saveEdit() {
    this.loading = true;
    from(this.beforeSave?.() || Promise.resolve())
      .pipe(
        first(),
        finalize(() => (this.loading = false)),
      )
      .subscribe(isContinue => {
        if (isContinue === false) {
          return;
        }
        this.$$mode.set(EditableMode.View);
        this.save.emit();
      });
  }

  cancelEdit() {
    this.$$mode.set(EditableMode.View);
    this.cancel.emit();
  }
}
