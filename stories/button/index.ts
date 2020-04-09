import { ButtonModule, ComponentSize, IconModule } from '@alauda/ui';
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('button', () => {
    const content = text('content', 'button');

    const sizeOptions = {
      [ComponentSize.Large]: ComponentSize.Large,
      [ComponentSize.Medium]: ComponentSize.Medium,
      [ComponentSize.Small]: ComponentSize.Small,
      [ComponentSize.Mini]: ComponentSize.Mini,
    };
    const size = select('size', sizeOptions, ComponentSize.Medium);

    const plain = boolean('plain', false);
    const disabled = boolean('disabled', false);
    const loading = boolean('loading', false);
    const round = boolean('round', false);
    const square = boolean('square', false);

    const onClickHandler = action('button clicked');

    return {
      moduleMetadata: {
        imports: [ButtonModule, IconModule],
      },
      template: /* HTML */ `
        <div>
          <button
            aui-button="default"
            [size]="size"
            [plain]="plain"
            [disabled]="disabled"
            [loading]="loading"
            [round]="round"
            [square]="square"
            (click)="onClickHandler()"
          >
            {{ content }}
          </button>
          <button
            aui-button="primary"
            [size]="size"
            [plain]="plain"
            [disabled]="disabled"
            [loading]="loading"
            [round]="round"
            [square]="square"
            (click)="onClickHandler()"
          >
            {{ content }}
          </button>
          <button
            aui-button="success"
            [size]="size"
            [plain]="plain"
            [disabled]="disabled"
            [loading]="loading"
            [round]="round"
            [square]="square"
            (click)="onClickHandler()"
          >
            {{ content }}
          </button>
          <button
            aui-button="warning"
            [size]="size"
            [plain]="plain"
            [disabled]="disabled"
            [loading]="loading"
            [round]="round"
            [square]="square"
            (click)="onClickHandler()"
          >
            {{ content }}
          </button>
          <button
            aui-button="danger"
            [size]="size"
            [plain]="plain"
            [disabled]="disabled"
            [loading]="loading"
            [round]="round"
            [square]="square"
            (click)="onClickHandler()"
          >
            {{ content }}
          </button>
          <button
            aui-button="info"
            [size]="size"
            [plain]="plain"
            [disabled]="disabled"
            [loading]="loading"
            [round]="round"
            [square]="square"
            (click)="onClickHandler()"
          >
            {{ content }}
          </button>
          <button
            aui-button="text"
            [size]="size"
            [plain]="plain"
            [disabled]="disabled"
            [loading]="loading"
            [round]="round"
            [square]="square"
            (click)="onClickHandler()"
          >
            {{ content }}
          </button>
        </div>
        <div style="margin-top: 24px;">
          <button aui-button square="true">
            <aui-icon icon="search_s"></aui-icon>
          </button>
          <button aui-button>
            text
            <aui-icon icon="search_s" margin="left"></aui-icon>
          </button>
          <button aui-button="text">
            <aui-icon icon="search_s" margin="right"></aui-icon>
            text
          </button>
        </div>
      `,
      props: {
        content,
        size,
        plain,
        disabled,
        loading,
        round,
        square,
        onClickHandler,
      },
    };
  })
  .add('button group', () => {
    return {
      moduleMetadata: {
        imports: [ButtonModule],
      },
      template: /* HTML */ `
        <aui-button-group>
          <button aui-button="primary" [square]="true">A</button>
          <button aui-button="primary" [square]="true" [plain]="true">B</button>
          <button aui-button="primary" [square]="true">C</button>
          <button aui-button="primary" [square]="true" disabled>D</button>
        </aui-button-group>
        <aui-button-group>
          <button aui-button [square]="true" [plain]="true">A</button>
          <button aui-button [square]="true" [plain]="true">B</button>
          <button aui-button [square]="true" [plain]="true" disabled>C</button>
          <button aui-button [square]="true" [plain]="true">D</button>
        </aui-button-group>
      `,
    };
  });
