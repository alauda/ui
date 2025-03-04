import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    template: `
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class CardSectionComponent {}
