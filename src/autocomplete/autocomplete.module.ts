import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipModule } from '../tooltip/public-api';

import { AutocompletePlaceholderComponent } from './autocomplete-placeholder.component';
import { AutocompleteComponent } from './autocomplete.component';
import { AutoCompleteDirective } from './autocomplete.directive';
import { SuggestionGroupTitleDirective } from './helper-directives';
import { SuggestionGroupComponent } from './suggestion-group/suggestion-group.component';
import { SuggestionComponent } from './suggestion/suggestion.component';

@NgModule({
  imports: [CommonModule, OverlayModule, TooltipModule],
  declarations: [
    AutoCompleteDirective,
    AutocompleteComponent,
    SuggestionComponent,
    AutocompletePlaceholderComponent,
    SuggestionGroupComponent,
    SuggestionGroupTitleDirective,
  ],
  exports: [
    AutoCompleteDirective,
    AutocompleteComponent,
    SuggestionComponent,
    AutocompletePlaceholderComponent,
    SuggestionGroupComponent,
    SuggestionGroupTitleDirective,
  ],
})
export class AutocompleteModule {}
