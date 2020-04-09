/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Directive } from '@angular/core';

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
