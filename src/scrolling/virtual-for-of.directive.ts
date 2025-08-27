import { DataSource } from '@angular/cdk/collections';
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
  standalone: true,
})
export class VirtualForOfDirective<T> extends CdkVirtualForOf<T> {
  @Input()
  set auiVirtualForOf(
    value: DataSource<T> | NgIterable<T> | Observable<T[]> | null | undefined,
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
