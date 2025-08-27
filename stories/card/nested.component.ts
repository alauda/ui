import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <aui-card>
      <div auiCardHeader>header</div>
      <div style="line-height: 64px; background-color: #ededed;">content</div>
      <aui-card [divider]="false">
        <div auiCardHeader>header inside</div>
        <div style="line-height: 64px; background-color: red;">content</div>
      </aui-card>
      <div auiCardFooter>footer</div>
    </aui-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class CardNestedComponent {}
