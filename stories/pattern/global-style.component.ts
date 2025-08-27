import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `<section>
      <div>跳转链接:</div>
      <div><a href=".">link</a></div>
    </section>
    <section>
      <div>点击复制 icon:</div>
      <div>
        <span>跟在 span 后的复制 icon 会自动添加间距</span>
        <aui-icon
          icon="copy"
          auiTooltipCopy="value"
        ></aui-icon>
      </div>
    </section> `,
  styleUrls: ['./global-style.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class GlobalStyleComponent {}
