import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[auiCardHeader]',
  host: {
    '[class.aui-card__header]': 'true',
  },
})
export class CardHeaderDirective {
  /**
   * @deprecated
   */
  @Input()
  size: 'default' | 'secondary' = 'default';
}

@Directive({
  selector: '[auiCardFooter]',
  host: {
    '[class.aui-card__footer]': 'true',
  },
})
export class CardFooterDirective {}

@Directive({
  selector: '[auiSectionTitle]',
  host: {
    '[class.aui-section__title]': 'true',
  },
})
export class SectionTitleDirective {}
