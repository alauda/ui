/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[auiInputAddonBefore]',
})
export class InputAddonBeforeDirective {}

@Directive({
  selector: '[auiInputAddonAfter]',
})
export class InputAddonAfterDirective {}

@Directive({
  selector: '[auiInputPrefix]',
})
export class InputPrefixDirective {}

@Directive({
  selector: '[auiInputSuffix]',
})
export class InputSuffixDirective {}

@Directive({
  selector: 'input[aui-input][type=number]',
})
export class NumberTypeInputDirective {
  @HostListener('keypress', ['$event'])
  onKeydown(event: KeyboardEvent) {
    return /\d/.test(String.fromCharCode(event.keyCode));
  }

  @HostListener('keyup', ['$event'])
  onKeyup(event: KeyboardEvent) {
    const el = event.target as HTMLInputElement;
    el.value = el.value.replace(/\D/g, '');
  }
}
