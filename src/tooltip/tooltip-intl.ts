import { Injectable } from '@angular/core';

/**
 * Texts to render on the code editor.
 */
@Injectable({
  providedIn: 'root',
})
export class TooltipCopyIntl {
  copyTip = 'Click to copy';

  copySuccessTip = 'Copied to clipboard';

  copyFailTip = 'Copy failed';
}
