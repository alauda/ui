import { CheckboxModule } from '@alauda/ui';
import { action } from '@storybook/addon-actions';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

const trackFn = (val: any) => val?.name || val;

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('checkbox', () => {
    const value = { foo: true, bar: false };
    const log = action('value changed');
    return {
      moduleMetadata: {
        imports: [CheckboxModule],
      },
      template: /* HTML */ `
        value: {{ value | json }}
        <section>
          <aui-checkbox
            [(ngModel)]="value.foo"
            (ngModelChange)="log('foo', $event)"
          >
            foo
          </aui-checkbox>
          <aui-checkbox
            [(ngModel)]="value.bar"
            (ngModelChange)="log('bar', $event)"
          >
            bar
          </aui-checkbox>
        </section>
        <section>
          <aui-checkbox
            [(ngModel)]="value.foo"
            (ngModelChange)="log('foo', $event)"
            [disabled]="true"
          >
            foo
          </aui-checkbox>
          <aui-checkbox
            [(ngModel)]="value.bar"
            (ngModelChange)="log('bar', $event)"
            type="tag"
          >
            bar
          </aui-checkbox>
        </section>
      `,
      props: {
        value,
        log,
      },
    };
  })
  .add('checkbox group', () => {
    const value = ['app', 'other'];
    const value2 = [{ name: 'foo' }];
    const values = [{ name: 'foo' }, { name: 'bar' }];

    const direction = select(
      'direction',
      { row: 'row', column: 'column' },
      'row',
    );
    return {
      moduleMetadata: {
        imports: [CheckboxModule],
      },
      template: /* HTML */ `
        <aui-checkbox-group [(ngModel)]="value" [direction]="direction">
          <aui-checkbox label="app">app</aui-checkbox>
          <aui-checkbox label="sitemap">sitemap</aui-checkbox>
          <aui-checkbox label="server">server</aui-checkbox>
          <aui-checkbox label="other">other</aui-checkbox>
        </aui-checkbox-group>
        {{ value | json }}
        <br />
        <aui-checkbox-group
          [(value)]="value2"
          [trackFn]="trackFn"
          [direction]="direction"
        >
          <aui-checkbox *ngFor="let v of values" [label]="v">
            {{v.name}}
          </aui-checkbox>
        </aui-checkbox-group>
        {{ value2 | json }}
      `,
      props: {
        value,
        value2,
        values,
        trackFn,
        direction,
      },
    };
  });
