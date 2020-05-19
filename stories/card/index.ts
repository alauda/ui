import { CardModule } from '@alauda/ui';
import { storiesOf } from '@storybook/angular';

storiesOf('Card', module).add('card', () => {
  return {
    moduleMetadata: {
      imports: [CardModule],
    },
    template: /* HTML */ `
      <aui-card>
        <div auiCardHeader>header</div>
        <div style="line-height: 64px; background-color: #ededed;">content</div>
        <aui-card [divider]="false">
          <div auiCardHeader>header inside</div>
          <div style="line-height: 64px; background-color: red;">content</div>
        </aui-card>
      </aui-card>

      <aui-card [divider]="false">
        <div auiCardHeader>header</div>
        <div style="line-height: 64px; background-color: #ededed;">content</div>
        <div auiCardFooter>footer</div>
      </aui-card>

      <aui-card>
        <div auiCardFooter>footer</div>
        <div auiCardHeader>header</div>
        <aui-section>
          <div auiSectionTitle>section title</div>
          section content 1
        </aui-section>
        <aui-section>
          <div auiSectionTitle>section title</div>
          section content 2
        </aui-section>
      </aui-card>
    `,
  };
});
