import { CdkAccordionItem } from '@angular/cdk/accordion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { filter, startWith, take } from 'rxjs/operators';

import { AccordionComponent } from '../accordion.component';

@Directive({
  selector: '[auiAccordionItemHeader]',
})
export class AccordionItemHeaderDirective {}
@Directive({
  selector: '[auiAccordionContent]',
})
export class AccordionItemContentDirective {}
@Component({
  selector: 'aui-accordion-item',
  templateUrl: 'accordion-item.component.html',
  styleUrls: ['accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  viewProviders: [AccordionItemComponent],
})
export class AccordionItemComponent
  extends CdkAccordionItem
  implements AfterContentInit {
  @Input()
  hideToggle = false;

  @Input()
  togglePosition: 'left' | 'right' = 'left';

  @Output()
  expandedChange = new EventEmitter<boolean>();

  @ContentChild(AccordionItemContentDirective, {
    read: TemplateRef,
    static: true,
  })
  _lazyContentTpl: TemplateRef<unknown>;

  lazyContentTpl: TemplateRef<unknown>;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    accordion: AccordionComponent,
    cdr: ChangeDetectorRef,
    uniqueSelectionDispatcher: UniqueSelectionDispatcher,
  ) {
    super(accordion, cdr, uniqueSelectionDispatcher);
  }

  ngAfterContentInit() {
    if (this._lazyContentTpl) {
      // Render the content as soon as the accordion becomes open.
      this.opened
        .pipe(
          startWith(null as void),
          filter(() => !!this.expanded),
          take(1),
        )
        .subscribe(() => {
          this.lazyContentTpl = this._lazyContentTpl;
        });
    }
  }

  toggle() {
    super.toggle();
    this.expandedChange.emit(this.expanded);
  }
}
