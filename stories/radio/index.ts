import { RadioModule, RadioSize } from '@alauda/ui';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('Radio', module)
  .addDecorator(withKnobs)
  .add('radio', () => {
    const direction = select(
      'direction',
      { row: 'row', column: 'column' },
      'row',
    );

    const sizeOptions = {
      [RadioSize.Medium]: RadioSize.Medium,
      [RadioSize.Small]: RadioSize.Small,
      [RadioSize.Mini]: RadioSize.Mini,
    };
    const size = select('size', sizeOptions, RadioSize.Medium);

    const value = 'kubernetes';

    return {
      moduleMetadata: {
        imports: [RadioModule],
      },
      template: /* HTML */ `
        value: {{ value | json }}
        <section>
          <aui-radio-group [(ngModel)]="value" [direction]="direction">
            <aui-radio value="kubernetes">kubernetes</aui-radio>
            <aui-radio value="mesos">mesos</aui-radio>
            <aui-radio value="swarm" [disabled]="true">swarm</aui-radio>
          </aui-radio-group>
        </section>
        <br />
        <section>
          <aui-radio-group [(ngModel)]="value" [size]="size">
            <aui-radio-button value="kubernetes">kubernetes</aui-radio-button>
            <aui-radio-button value="mesos">mesos</aui-radio-button>
            <aui-radio-button value="swarm" [disabled]="true">
              swarm
            </aui-radio-button>
          </aui-radio-group>
        </section>
        <br />
        <section>
          <aui-radio-group [(ngModel)]="value" [size]="size" [plain]="false">
            <aui-radio-button value="kubernetes">kubernetes</aui-radio-button>
            <aui-radio-button value="mesos">mesos</aui-radio-button>
            <aui-radio-button value="swarm" [disabled]="true">
              swarm
            </aui-radio-button>
          </aui-radio-group>
        </section>
      `,
      props: {
        direction,
        size,
        value,
      },
    };
  });
