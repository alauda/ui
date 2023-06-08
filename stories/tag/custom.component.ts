import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-tag
      [color]="'#7c70e2,#f2f1fd'"
      size="mini"
      >custom</aui-tag
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TagCustomComponent {}
