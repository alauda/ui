import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TooltipModule } from '../tooltip/public-api';
import { E2eAttributeBindingDirective } from '../utils';

import { AutocompletePlaceholderComponent } from './autocomplete-placeholder.component';
import { AutocompleteComponent } from './autocomplete.component';
import {
  AutoCompleteDirective,
  CustomAutoCompleteDirective,
} from './autocomplete.directive';
import { SuggestionGroupTitleDirective } from './helper-directives';
import { SuggestionGroupComponent } from './suggestion-group/suggestion-group.component';
import { SuggestionComponent } from './suggestion/suggestion.component';

@NgModule({
  imports: [CommonModule, OverlayModule, TooltipModule],
  declarations: [
    AutoCompleteDirective,
    CustomAutoCompleteDirective,
    AutocompleteComponent,
    SuggestionComponent,
    AutocompletePlaceholderComponent,
    SuggestionGroupComponent,
    SuggestionGroupTitleDirective,
    E2eAttributeBindingDirective,
  ],
  exports: [
    AutoCompleteDirective,
    CustomAutoCompleteDirective,
    AutocompleteComponent,
    SuggestionComponent,
    AutocompletePlaceholderComponent,
    SuggestionGroupComponent,
    SuggestionGroupTitleDirective,
  ],
})
export class AutocompleteModule {}
