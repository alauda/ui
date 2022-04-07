import { Injectable, Optional, SkipSelf } from '@angular/core';

/**
 * Texts to render on the code editor.
 */
@Injectable()
export class TooltipCopyIntl {
  copyTip = 'Click to copy';

  copySuccessTip = 'Copied to clipboard';

  copyFailTip = 'Copy failed';
}

// eslint-disable-next-line sonar/function-name
export function TOOLTIP_COPY_INTL_PROVIDER_FACTORY(
  parentIntl: TooltipCopyIntl,
) {
  return parentIntl || new TooltipCopyIntl();
}

/** @docs-private */
export const TOOLTIP_COPY_INTL_INTL_PROVIDER = {
  // If there is already an CodeEditorIntl available, use that. Otherwise, provide a new one.
  provide: TooltipCopyIntl,
  deps: [[new Optional(), new SkipSelf(), TooltipCopyIntl]],
  useFactory: TOOLTIP_COPY_INTL_PROVIDER_FACTORY,
};
