import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';

import { TocContainerDirective } from './toc-container.directive';

@Directive({
  selector: '[auiTocContent]',
})
export class TocContentDirective implements OnInit, OnDestroy {
  @HostBinding('class.isActive')
  active: boolean;

  @Input()
  auiTocContent: string;

  nativeElement: HTMLElement;

  constructor(
    elemRef: ElementRef,
    @Optional() private readonly containerDirective: TocContainerDirective,
  ) {
    this.nativeElement = elemRef.nativeElement;
  }

  ngOnInit(): void {
    if (this.containerDirective) {
      this.containerDirective.registerContent(this);
    }
  }

  ngOnDestroy(): void {
    if (this.containerDirective) {
      this.containerDirective.deregisterContent(this);
    }
  }
}
