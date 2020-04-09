import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'aui-message-wrapper',
  styleUrls: ['./message-wrapper.component.scss'],
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MessageWrapperComponent {
  constructor(public elementRef: ElementRef) {}
}
