import {
  Directive,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

export enum LifeCycle {
  OnInit,
  OnDestroy,

  // TODO: add more if you wish
}

/**
 * A hooker directive to count the current view is created or not (event not yet attached).
 */
@Directive({
  selector: '[auiLifeCycle]',
  standalone: true,
})
export class LifeCycleDirective implements OnInit, OnDestroy {
  @Output()
  auiLifeCycle = new EventEmitter<LifeCycle>();

  ngOnInit(): void {
    this.auiLifeCycle.next(LifeCycle.OnInit);
  }

  ngOnDestroy(): void {
    this.auiLifeCycle.next(LifeCycle.OnDestroy);
    this.auiLifeCycle.complete();
  }
}
