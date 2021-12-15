import { CdkAccordion } from '@angular/cdk/accordion';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  Optional,
  SkipSelf,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'aui-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class AccordionComponent extends CdkAccordion {
  @Input()
  background = true;

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
