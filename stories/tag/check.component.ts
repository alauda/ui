import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-check-tag
      [(checked)]="model"
      size="mini"
      >check</aui-check-tag
    >
    value: {{ model }}
    <br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class TagCheckComponent {
  model = false;
}
