import { Directive } from '@angular/core';

@Directive({
  selector: '*[auiEditableViewer]',
  standalone: true,
})
export class EditableViewerDirective {}

@Directive({
  selector: '*[auiEditableEditor]',
  standalone: true,
})
export class EditableEditorDirective {}
