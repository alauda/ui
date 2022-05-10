import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[auiCardHeader]',
  host: {
    '[class.aui-card__header]': 'true',
    '[class.aui-card__header--secondary]': 'size === "secondary"',
  },
})
export class CardHeaderDirective {
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
