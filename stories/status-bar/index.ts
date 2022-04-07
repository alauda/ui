import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/angular';

import { StatusBarModule, Status, StatusType } from '@alauda/ui';

storiesOf('Status Bar', module).add('status bar', () => {
  const status1: Status[] = [
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

  const status2: Status[] = [
    {
      type: StatusType.Pending,
      scale: 1,
    },
  ];

  const status3: Status[] = [
    {
      scale: 0.2,
      type: StatusType.Primary,
    },
    {
      scale: 0.2,
      type: StatusType.Warning,
    },
  ];

  const status4: Status[] = [
    {
      scale: 0.2,
      type: StatusType.Primary,
    },
  ];

  return {
    moduleMetadata: {
      imports: [StatusBarModule],
    },
    template: /* HTML */ `
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
        <div>{{ type }}: {{value}}</div>
      </ng-template>
    `,
    props: {
      status1,
      status2,
      status3,
      status4,
      onChunkClick: action('chunk clicked'),
    },
  };
});
