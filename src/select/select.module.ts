import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { I18nModule } from '../i18n';
import { IconModule } from '../icon';
import { InputModule } from '../input';
import { SharedModule } from '../shared/shared.module';
import { TagModule } from '../tag';
import { TooltipModule } from '../tooltip';

import {
  OptionContentDirective,
  OptionGroupTitleDirective,
} from './helper-directives';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { OptionGroupComponent } from './option-group/option-group.component';
import { OptionPlaceholderComponent } from './option-placeholder.component';
import { OptionComponent } from './option/option.component';
import { SelectComponent } from './select.component';
import { IncludesDirective } from './validators';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    I18nModule,
    IconModule,
    TooltipModule,
    TagModule,
    SharedModule,
  ],
  declarations: [
    SelectComponent,
    OptionComponent,
    OptionGroupComponent,
    OptionPlaceholderComponent,
    MultiSelectComponent,
    IncludesDirective,
    OptionGroupTitleDirective,
    OptionContentDirective,
  ],
  exports: [
    SelectComponent,
    OptionComponent,
    OptionGroupComponent,
    OptionPlaceholderComponent,
    MultiSelectComponent,
    IncludesDirective,
    OptionGroupTitleDirective,
    OptionContentDirective,
  ],
})
export class SelectModule {}
