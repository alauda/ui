import { ScrollingModule } from '@alauda/ui';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('Scrolling', module)
  .addDecorator(withKnobs)
  .add('virtual-scroll', () => {
    return {
      moduleMetadata: {
        imports: [ScrollingModule],
      },
      template: /* HTML */ `
        <aui-virtual-scroll-viewport itemSize="50" class="example-viewport">
          <div *auiVirtualFor="let item of items" class="example-item">
            {{item}}
          </div>
        </aui-virtual-scroll-viewport>
      `,
      styles: [
        /* CSS */ `.example-viewport {
        height: 200px;
        width: 200px;
        border: 1px solid black;
      }

      .example-item {
        height: 50px;
      }`,
      ],
      props: {
        items: Array.from({ length: 100000 }).map((_, i) => `Item #${i}`),
      },
    };
  });
