import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'story-basic-accordion',
  template: `
    <aui-accordion
      [multi]="multi"
      [background]="background"
    >
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export default class AccordionBasicComponent {
  /**
   * 多个展开
   */
  @Input() multi = true;

  /**
   * 背景色
   */
  @Input() background = true;
}
