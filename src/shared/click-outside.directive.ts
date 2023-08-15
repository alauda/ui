import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[auiClickOutside]',
  exportAs: 'auiClickOutside',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output()
  auiClickOutside = new EventEmitter<Event>();

  @HostListener('document:click', ['$event'])
  onBodyClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target as Node)) {
      this.auiClickOutside.emit(event);
    }
  }

  constructor(private readonly el: ElementRef<HTMLElement>) {}
}
