import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem } from '../../utils';

@Component({
  selector: 'aui-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  standalone: true,
})
export class DialogFooterComponent {
  bem: Bem = buildBem('aui-dialog');
}
