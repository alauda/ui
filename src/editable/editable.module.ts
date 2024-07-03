import { NgModule } from '@angular/core';

import { EditableComponent } from './editable.component';
import {
  EditableEditorDirective,
  EditableViewerDirective,
} from './editable.directive';

@NgModule({
  imports: [
    EditableComponent,
    EditableViewerDirective,
    EditableEditorDirective,
  ],
  exports: [
    EditableComponent,
    EditableViewerDirective,
    EditableEditorDirective,
  ],
})
export class EditableModule {}
