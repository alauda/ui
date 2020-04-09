import { ComponentSize, IconModule, TagModule } from '@alauda/ui';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('Tag', module)
  .addDecorator(withKnobs)
  .add('tag', () => {
    const sizeOptions = {
      [ComponentSize.Large]: ComponentSize.Large,
      [ComponentSize.Medium]: ComponentSize.Medium,
      [ComponentSize.Small]: ComponentSize.Small,
      [ComponentSize.Mini]: ComponentSize.Mini,
    };
    const size = select('size', sizeOptions, ComponentSize.Medium);
    const closeable = boolean('closeable', true);
    const round = boolean('round', true);
    const solid = boolean('solid', false);
    const invalid = boolean('invalid', false);

    return {
      moduleMetadata: {
        imports: [TagModule, IconModule],
      },
      template: /* HTML */ `
        <aui-tag
          type="primary"
          [size]="size"
          [solid]="solid"
          [closeable]="closeable"
          [invalid]="invalid"
          [round]="round"
        >
          <aui-icon icon="check_s"></aui-icon>
          primary
        </aui-tag>
        <aui-tag
          type="success"
          [size]="size"
          [solid]="solid"
          [closeable]="closeable"
          [invalid]="invalid"
          [round]="round"
        >
          success
        </aui-tag>
        <aui-tag
          type="warning"
          [size]="size"
          [solid]="solid"
          [closeable]="closeable"
          [invalid]="invalid"
          [round]="round"
        >
          warning
        </aui-tag>
        <aui-tag
          type="error"
          [size]="size"
          [solid]="solid"
          [closeable]="closeable"
          [invalid]="invalid"
          [round]="round"
        >
          error
        </aui-tag>
        <aui-tag
          type="info"
          [size]="size"
          [solid]="solid"
          [closeable]="closeable"
          [invalid]="invalid"
          [round]="round"
        >
          info
        </aui-tag>
        <aui-tag
          type="info"
          [size]="size"
          [solid]="solid"
          [closeable]="closeable"
          [invalid]="invalid"
          [round]="round"
        >
          <a href="javascript:;">link</a>
        </aui-tag>
      `,
      props: {
        size,
        solid,
        closeable,
        invalid,
        round,
      },
    };
  })
  .add('custom color', () => {
    const color = text('color', '#7c70e2,#f2f1fd');
    return {
      moduleMetadata: {
        imports: [TagModule],
      },
      template: /* HTML */ `
        <aui-tag [color]="color">custom color</aui-tag>
      `,
      props: {
        color,
      },
    };
  })
  .add('check tag', () => {
    const checked = true;
    return {
      moduleMetadata: {
        imports: [TagModule],
      },
      template: /* HTML */ `
        <aui-check-tag [(checked)]="checked">
          check tag
        </aui-check-tag>
        checked: {{ checked }}
      `,
      props: {
        checked,
      },
    };
  });
