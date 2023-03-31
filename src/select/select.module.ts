import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { I18nModule } from '../i18n';
import { IconModule } from '../icon';
import { InputModule } from '../input';
import { ScrollingModule } from '../scrolling';
import { TagModule } from '../tag';
import { TooltipModule } from '../tooltip';

import {
  OptionContentDirective,
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
    CommonModule,
    InputModule,
    I18nModule,
    IconModule,
    TooltipModule,
    TagModule,
    ScrollingModule,
    PortalModule,
  ],
  declarations: [
    SelectComponent,
    OptionComponent,
    OptionItemComponent,
    OptionGroupComponent,
    OptionPlaceholderComponent,
    MultiSelectComponent,
    IncludesDirective,
    OptionGroupTitleDirective,
    OptionContentDirective,
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
    OptionContentDirective,
    OptionItemCustomDirective,
  ],
})
export class SelectModule {}
