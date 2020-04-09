import { InlineAlertModule } from '@alauda/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { storiesOf } from '@storybook/angular';

storiesOf('Inline Alert', module).add('inline alert', () => {
  return {
    moduleMetadata: {
      imports: [InlineAlertModule, BrowserAnimationsModule],
    },
    template: /* HTML */ `
      <aui-inline-alert [closable]="true">
        <span auiInlineAlertTitle>
          use auiInlineAlertTitle directive insert title
        </span>
        <div>
          ng-content.
          <a>link</a>
        </div>
      </aui-inline-alert>
      <aui-inline-alert [closable]="true">
        <div>
          ng-content will display as content by default.
          <a>link</a>
        </div>
      </aui-inline-alert>
      <aui-inline-alert
        title="title"
        content="content"
        type="success"
        [closable]="true"
      ></aui-inline-alert>
      <aui-inline-alert
        title="title"
        content="content"
        type="warning"
        [closable]="true"
      ></aui-inline-alert>
      <aui-inline-alert
        title="title"
        content="content"
        type="error"
      ></aui-inline-alert>
    `,
  };
});
