import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <button
      aui-button="primary"
      auiTooltipCopy="Content"
      auiTooltipCopyTip="Tips"
    >
      Click to copy
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TooltipCopyComponent {}
