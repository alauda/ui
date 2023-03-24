import {
  _RecycleViewRepeaterStrategy,
  _VIEW_REPEATER_STRATEGY,
  DataSource,
} from '@angular/cdk/collections';
import {
  CdkVirtualForOf,
  CdkVirtualForOfContext,
} from '@angular/cdk/scrolling';
import {
  Directive,
  Input,
  NgIterable,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[auiVirtualFor][auiVirtualForOf]',
  providers: [
    {
      provide: _VIEW_REPEATER_STRATEGY,
      useClass: _RecycleViewRepeaterStrategy,
    },
  ],
})
export class VirtualForOfDirective<T> extends CdkVirtualForOf<T> {
  @Input()
  set auiVirtualForOf(
    value: DataSource<T> | Observable<T[]> | NgIterable<T> | null | undefined,
  ) {
    this.cdkVirtualForOf = value;
  }

  @Input()
  set auiVirtualForTrackBy(fn: TrackByFunction<T> | undefined) {
    this.cdkVirtualForTrackBy = fn;
  }

  @Input()
  set auiVirtualForTemplate(value: TemplateRef<CdkVirtualForOfContext<T>>) {
    this.cdkVirtualForTemplate = value;
  }

  @Input()
  set auiVirtualForTemplateCacheSize(size: number) {
    this.cdkVirtualForTemplateCacheSize = size;
  }
}
