import { AccordionModule } from '@alauda/ui';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('Accordion', module)
  .addDecorator(withKnobs)
  .add('accordion', () => {
    const multi = boolean('multi', false);
    const togglePosition = select(
      'position',
      { left: 'left', right: 'right' },
      'left',
    );
    return {
      moduleMetadata: {
        imports: [AccordionModule],
      },
      template: /* HTML */ `
        <aui-accordion [multi]="multi">
          <aui-accordion-item [togglePosition]="togglePosition">
            <div auiAccordionItemHeader>header1</div>
            <h3>accordion item content1</h3>
          </aui-accordion-item>
          <aui-accordion-item [togglePosition]="togglePosition">
            <div auiAccordionItemHeader>header2</div>
            <h3>accordion item content2</h3>
          </aui-accordion-item>
          <aui-accordion-item [togglePosition]="togglePosition">
            <div auiAccordionItemHeader>header3</div>
            <h3>accordion item content3</h3>
          </aui-accordion-item>
        </aui-accordion>
      `,
      props: {
        multi,
        togglePosition,
      },
    };
  });
