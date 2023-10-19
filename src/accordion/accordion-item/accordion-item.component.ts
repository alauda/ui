import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { filter, startWith, take } from 'rxjs';

import { IconComponent } from '../../icon/icon.component';
import { AccordionComponent } from '../accordion.component';

@Directive({
  selector: '[auiAccordionItemHeader]',
  standalone: true,
})
export class AccordionItemHeaderDirective {}
@Directive({
  selector: '[auiAccordionContent]',
  standalone: true,
})
export class AccordionItemContentDirective {}
@Component({
  selector: 'aui-accordion-item',
  templateUrl: 'accordion-item.component.html',
  styleUrls: ['accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  animations: [
    trigger('expand', [
      state('*', style({ height: 0 })),
      state('expanded', style({ height: '*' })),
      transition('* <=> expanded', [animate('0.1s ease-in-out')]),
    ]),
  ],
  viewProviders: [AccordionItemComponent],
  standalone: true,
  imports: [IconComponent, NgIf, NgTemplateOutlet],
})
export class AccordionItemComponent
  extends CdkAccordionItem
  implements AfterContentInit
{
  @Input()
  background = true;

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
}
