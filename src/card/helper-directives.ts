/* eslint-disable @typescript-eslint/no-extraneous-class */
// tslint:disable: no-host-metadata-property
import { Directive } from '@angular/core';

@Directive({
  selector: '[auiCardHeader]',
  host: {
    '[class.aui-card__header]': 'true',
  },
})
export class CardHeaderDirective {}

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
