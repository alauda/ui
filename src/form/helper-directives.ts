import { Directive, Input } from '@angular/core';

import { coerceAttrBoolean } from '../utils';

@Directive({
  selector: 'label[auiFormItemLabel]',
  host: {
    '[class.aui-form-item__label]': 'true',
  },
  standalone: true,
})
export class FormItemLabelDirective {}

@Directive({
  selector: '[auiFormItemHint]',
  host: {
    '[class.aui-form-item__hint]': 'true',
  },
  standalone: true,
})
export class FormItemHintDirective {}

@Directive({
  selector: '[auiFormItemAddon]',
  host: {
    '[class.aui-form-item__addon]': 'true',
  },
  standalone: true,
})
export class FormItemAddonDirective {}

@Directive({
  selector: '[auiFormItemError]',
  host: {
    '[class.aui-form-item__error]': 'true',
  },
  standalone: true,
})
export class FormItemErrorDirective {}

@Directive({
  selector: '[auiFormItemControl]',
  host: {
    '[class.aui-form-item__control]': 'true',
  },
  standalone: true,
})
export class FormItemControlDirective {
  @Input({ transform: coerceAttrBoolean })
  required: boolean;
}
