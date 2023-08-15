import { Directive } from '@angular/core';

@Directive({
  selector: '[auiInputAddonBefore]',
  standalone: true,
})
export class InputAddonBeforeDirective {}

@Directive({
  selector: '[auiInputAddonAfter]',
  standalone: true,
})
export class InputAddonAfterDirective {}

@Directive({
  selector: '[auiInputPrefix]',
  standalone: true,
})
export class InputPrefixDirective {}

@Directive({
  selector: '[auiInputSuffix]',
  standalone: true,
})
export class InputSuffixDirective {}
