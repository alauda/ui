import { RowOutlet } from '@angular/cdk/table';
import {
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: 'ng-template[auiTablePlaceholderDef]',
})
export class TablePlaceholderDefDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({
  selector: '[auiTablePlaceholderOutlet]',
})
export class TablePlaceholderOutletDirective implements RowOutlet {
  constructor(
    public viewContainer: ViewContainerRef,
    public elementRef: ElementRef,
  ) {}
}
