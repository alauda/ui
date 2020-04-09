import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { Bem, buildBem } from '../../utils/bem';
import { RadioComponent } from '../radio.component';
import { RadioSize } from '../radio.types';

@Component({
  selector: 'aui-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class RadioButtonComponent extends RadioComponent implements OnInit {
  bem: Bem = buildBem('aui-radio-button');

  size = RadioSize.Medium;
  isPlain = true;

  get rootClass() {
    return `${this.bem.block(this.size)} ${this.disabled ? 'isDisabled' : ''} ${
      this.checked ? 'isChecked' : ''
    } ${this.isPlain ? 'isPlain' : ''}`;
  }

  ngOnInit() {
    super.ngOnInit();
    this.radioGroup.size$.pipe(takeUntil(this.destroy$$)).subscribe(size => {
      this.size = size;
      this.cdr.markForCheck();
    });
    this.radioGroup.isPlain$
      .pipe(takeUntil(this.destroy$$))
      .subscribe(isPlain => {
        this.isPlain = isPlain;
        this.cdr.markForCheck();
      });
  }
}
