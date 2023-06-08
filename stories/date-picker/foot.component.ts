import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Dayjs } from 'dayjs';

import { DatePickerType } from '@alauda/ui';

@Component({
  template: `
    <aui-date-picker
      placeholder="请选择"
      [type]="DatePickerType.Day"
      [(ngModel)]="time"
      [extraFooter]="extraFooter"
    ></aui-date-picker>
    <ng-template
      #extraFooter
      let-context="context"
    >
      <div
        style="height:40px;display:flex;justify-content:center;align-items: center"
      >
        <button
          aui-button="inline"
          (click)="context.confirmValue(now, false)"
        >
          today
        </button>
      </div>
    </ng-template>
    <br />
    Form value: {{ time?.toDate() }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatePickerWithoutTimeComponent {
  time: Dayjs = null;
  DatePickerType = DatePickerType;
}
