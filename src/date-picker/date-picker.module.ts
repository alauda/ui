import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '../button/public-api';
import { I18nModule } from '../i18n/public-api';
import { IconModule } from '../icon/icon.module';
import { InputModule } from '../input/public-api';
import { TimePickerModule } from '../time-picker/public-api';
import { TooltipModule } from '../tooltip/public-api';

import { DatePickerPanelComponent } from './calendar/date-picker-panel/component';
import { CalendarFooterComponent } from './calendar/footer/component';
import { CalendarHeaderComponent } from './calendar/header/component';
import { PickerPanelComponent } from './calendar/panel/picker-panel';
import { DateRangePickerPanelComponent } from './calendar/range-picker-panel/component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { RangePickerComponent } from './range-picker/range-picker.component';
import { DatePickerTriggerComponent } from './trigger/trigger.component';

const COMPONENTS = [
  CalendarHeaderComponent,
  CalendarFooterComponent,
  DateRangePickerPanelComponent,
  PickerPanelComponent,
  RangePickerComponent,
  DatePickerPanelComponent,
  DatePickerComponent,
  DatePickerTriggerComponent,
];

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    ButtonModule,
    TooltipModule,
    ReactiveFormsModule,
    FormsModule,
    TimePickerModule,
    IconModule,
    I18nModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class DatePickerModule {}
