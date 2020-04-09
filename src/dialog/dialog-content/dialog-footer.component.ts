import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem } from '../../utils/bem';

@Component({
  selector: 'aui-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class DialogFooterComponent {
  bem: Bem = buildBem('aui-dialog');
}
