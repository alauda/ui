import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IconModule } from '../icon';
import { SharedModule } from '../shared/shared.module';
import { TagModule } from '../tag';

import { AutosizeDirective } from './autosize.directive';
import {
  InputAddonAfterDirective,
  InputAddonBeforeDirective,
  InputPrefixDirective,
  InputSuffixDirective,
} from './helper-directives';
import { InputGroupComponent } from './input-group/input-group.component';
import { InputComponent } from './input.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { SearchComponent } from './search/search.component';
import { TagsInputComponent } from './tags-input/tags-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    TagModule,
    SharedModule,
  ],
  declarations: [
    AutosizeDirective,
    InputComponent,
    InputGroupComponent,
    InputAddonBeforeDirective,
    InputAddonAfterDirective,
    InputPrefixDirective,
    InputSuffixDirective,
    SearchComponent,
    TagsInputComponent,
    NumberInputComponent,
  ],
  exports: [
    AutosizeDirective,
    InputComponent,
    InputGroupComponent,
    InputAddonBeforeDirective,
    InputAddonAfterDirective,
    InputPrefixDirective,
    InputSuffixDirective,
    SearchComponent,
    TagsInputComponent,
    NumberInputComponent,
  ],
})
export class InputModule {}
