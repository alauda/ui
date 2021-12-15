import { AccordionModule } from '@alauda/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/angular';

storiesOf('Accordion', module)
  .addDecorator(withKnobs)
  .add('accordion', () => {
    const multi = boolean('multi', false);
    const background = boolean('background', true);
    return {
      moduleMetadata: {
        imports: [BrowserAnimationsModule, AccordionModule],
      },
      template: /* HTML */ `
        <aui-accordion [multi]="multi" [background]="background">
          <aui-accordion-item [disabled]="true">
            <div auiAccordionItemHeader>header1</div>
            <div>accordion item content1</div>
          </aui-accordion-item>
          <aui-accordion-item>
            <div auiAccordionItemHeader>header2</div>
            <div>accordion item content2</div>
          </aui-accordion-item>
          <aui-accordion-item>
            <div auiAccordionItemHeader>header3</div>
            <div>accordion item content3</div>
          </aui-accordion-item>
        </aui-accordion>
      `,
      props: {
        multi,
        background,
      },
    };
  });
