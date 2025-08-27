import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'story-checkbox-basic',
  template: `
    value: {{ model | json }}
    <br />
    <aui-checkbox
      [type]="type"
      [disabled]="disabled"
      [(ngModel)]="model.a"
      >选项A</aui-checkbox
    >
    <aui-checkbox
      [type]="type"
      [disabled]="disabled"
      [(ngModel)]="model.b"
      >选项B</aui-checkbox
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class CheckboxBasicComponent {
  @Input()
  type: 'label' | 'tag' = 'label';

  @Input()
  disabled = false;

  model = {
    a: true,
    b: false,
  };
}
