import { RowOutlet } from '@angular/cdk/table';
import {
  Directive,
  ElementRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Directive({
  selector: 'ng-template[auiTablePlaceholderDef]',
})
export class TablePlaceholderDefDirective {
  constructor(public templateRef: TemplateRef<any>) {}
  visible$$ = new BehaviorSubject(true);
  visible$ = this.visible$$.asObservable().pipe(distinctUntilChanged());
  @Input() set auiTablePlaceholderDef(show: boolean | string) {
    this.visible$$.next(!!show);
  }
}

@Directive({
  selector: '[auiTablePlaceholderOutlet]',
})
export class TablePlaceholderOutletDirective implements RowOutlet {
  private def: TablePlaceholderDefDirective;
  constructor(
    public viewContainer: ViewContainerRef,
    public elementRef: ElementRef,
  ) {}

  register(def: TablePlaceholderDefDirective, visible: boolean) {
    if (this.def) {
      this.viewContainer.clear();
    }
    if (visible) {
      this.def = def;
      this.viewContainer.createEmbeddedView(def.templateRef);
    }
  }
}
