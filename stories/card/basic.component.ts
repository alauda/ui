import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'story-card',
    template: `
    <aui-card [divider]="divider">
      <div auiCardHeader>header</div>
      <div style="line-height: 64px; background-color: #ededed;">content</div>
      <div auiCardFooter>footer</div>
    </aui-card>
    <aui-card [divider]="divider">
      <div
        auiCardHeader
        size="secondary"
      >
        secondary header
      </div>
      <div style="line-height: 64px; background-color: #ededed;">content</div>
      <div auiCardFooter>footer</div>
    </aui-card>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class CardBasicComponent {
  /**
   * header 和 content 是否有分隔线
   */
  @Input() divider = true;
}
