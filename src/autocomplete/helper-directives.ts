import { Directive } from '@angular/core';

@Directive({
  selector: '[auiSuggestionGroupTitle]',
  exportAs: 'auiSuggestionGroupTitle',
  host: {
    '[class.aui-suggestion-group__title]': 'true',
  },
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SuggestionGroupTitleDirective {}
