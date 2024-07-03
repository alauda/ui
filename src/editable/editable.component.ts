import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Output,
  TemplateRef,
  effect,
  signal,
} from '@angular/core';

import { ButtonModule } from '../button';
import { IconComponent } from '../icon';
import { buildBem } from '../internal/utils';

import {
  EditableEditorDirective,
  EditableViewerDirective,
} from './editable.directive';
import { EditableMode } from './editable.type';

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

  $$mode = signal(EditableMode.View);

  constructor() {
    effect(() => {
      this.modeChange.emit(this.$$mode());
    });
  }

  saveEdit() {
    this.$$mode.set(EditableMode.View);
    this.save.emit();
  }

  cancelEdit() {
    this.$$mode.set(EditableMode.View);
    this.cancel.emit();
  }
}
