import { NgModule } from '@angular/core';

import {
  OptionGroupTitleDirective,
  OptionItemCustomDirective,
} from './helper-directives';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { OptionGroupComponent } from './option-group/option-group.component';
import { OptionItemComponent } from './option-item/option-item.component';
import { OptionPlaceholderComponent } from './option-placeholder.component';
import { OptionComponent } from './option.component';
import { SelectComponent } from './select.component';
import { IncludesDirective } from './validators';

@NgModule({
  imports: [
    SelectComponent,
    OptionComponent,
    OptionItemComponent,
    OptionGroupComponent,
    OptionPlaceholderComponent,
    MultiSelectComponent,
    IncludesDirective,
    OptionGroupTitleDirective,
    OptionItemCustomDirective,
  ],
  exports: [
    SelectComponent,
    OptionComponent,
    OptionItemComponent,
    OptionGroupComponent,
    OptionPlaceholderComponent,
    MultiSelectComponent,
    IncludesDirective,
    OptionGroupTitleDirective,
    OptionItemCustomDirective,
  ],
})
export class SelectModule {}

export const SELECT_MODULE = [
  SelectComponent,
  OptionComponent,
  OptionGroupComponent,
  OptionPlaceholderComponent,
  MultiSelectComponent,
  IncludesDirective,
  OptionGroupTitleDirective,
] as const;
