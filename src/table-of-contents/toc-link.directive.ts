import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { TocContainerDirective } from './toc-container.directive';

@Directive({
  selector: '[auiTocLink]',
  standalone: true,
})
export class TocLinkDirective implements OnInit, OnDestroy {
  @HostBinding('class.isActive')
  active: boolean;

  @Input()
  for: TocContainerDirective;

  @Input()
  auiTocLink: string[] | string;

  private readonly _subs: Subscription[] = [];

  @HostListener('click')
  onClick() {
    this.for.scrollTo(this.auiTocLink);
  }

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.for || !this.auiTocLink) {
      return;
    }
    this._subs.push(
      this.for.activedChange.subscribe((actived: string) => {
        this.active = Array.isArray(this.auiTocLink)
          ? this.auiTocLink.includes(actived)
          : actived === this.auiTocLink;
        this.cdr.detectChanges();
      }),
    );
  }

  ngOnDestroy() {
    this._subs.forEach(sub => sub.unsubscribe());
  }
}
