import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Status, StatusType } from '@alauda/ui';

@Component({
  template: `
    <aui-status-bar
      [status]="status2"
      size="medium"
      (statusClick)="onChunkClick($event)"
    ></aui-status-bar>
    <aui-status-bar
      [status]="status2"
      size="small"
      (statusClick)="onChunkClick($event)"
    ></aui-status-bar>
    <aui-status-bar
      [status]="status1"
      [template]="ref"
      size="medium"
      (statusClick)="onChunkClick($event)"
    ></aui-status-bar>
    <aui-status-bar
      [status]="status1"
      size="small"
      (statusClick)="onChunkClick($event)"
    ></aui-status-bar>
    <aui-status-bar
      [status]="status3"
      (statusClick)="onChunkClick($event)"
    ></aui-status-bar>
    <aui-status-bar
      [status]="status4"
      (statusClick)="onChunkClick($event)"
    ></aui-status-bar>
    <ng-template
      #ref
      let-type="type"
      let-value="scale"
    >
      <div>{{ type }}: {{ value }}</div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBarComponent {
  status1: Status[] = [
    {
      scale: 0.1,
      type: StatusType.Info,
      class: 'custom-class',
    },
    {
      scale: 0.3,
      type: StatusType.Error,
    },
    {
      scale: 0.2,
      type: StatusType.Warning,
    },
    {
      scale: 0.2,
      type: StatusType.Success,
    },
    {
      scale: 0.2,
      type: StatusType.Primary,
    },
  ];

  status2: Status[] = [
    {
      type: StatusType.Pending,
      scale: 1,
    },
  ];

  status3: Status[] = [
    {
      scale: 0.2,
      type: StatusType.Primary,
    },
    {
      scale: 0.2,
      type: StatusType.Warning,
    },
  ];

  status4: Status[] = [
    {
      scale: 0.2,
      type: StatusType.Primary,
    },
  ];
}
