import { CdkAccordion } from '@angular/cdk/accordion';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Optional,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'aui-accordion',
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class AccordionComponent extends CdkAccordion {
  @HostBinding('attr.accordion-depth')
  depth: number;

  constructor(
    @SkipSelf()
    @Optional()
    public parent: AccordionComponent,
  ) {
    super();
    this.depth = parent ? parent.depth + 1 : 0;
  }
}
