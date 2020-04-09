import { CdkAccordionItem } from '@angular/cdk/accordion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { AccordionComponent } from '../accordion.component';

@Directive({
  selector: '[auiAccordionItemHeader]',
})
export class AccordionItemHeaderDirective {}
@Component({
  selector: 'aui-accordion-item',
  templateUrl: 'accordion-item.component.html',
  styleUrls: ['accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  viewProviders: [AccordionItemComponent],
})
export class AccordionItemComponent extends CdkAccordionItem {
  @Input()
  hideToggle: false;

  @Input()
  togglePosition: 'left' | 'right' = 'left';

  @Output()
  expandedChange = new EventEmitter<boolean>();

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    accordion: AccordionComponent,
    cdr: ChangeDetectorRef,
    uniqueSelectionDispatcher: UniqueSelectionDispatcher,
  ) {
    super(accordion, cdr, uniqueSelectionDispatcher);
  }

  toggle() {
    super.toggle();
    this.expandedChange.emit(this.expanded);
  }
}
