import { Directionality } from '@angular/cdk/bidi';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  ViewEncapsulation,
} from '@angular/core';

import { Bem, buildBem } from '../../internal/utils';

@Component({
  selector: 'aui-dialog-content',
  templateUrl: './dialog-content.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  standalone: true,
})
export class DialogContentComponent extends CdkScrollable {
  bem: Bem = buildBem('aui-dialog');

   
  constructor(
    elementRef: ElementRef<HTMLElement>,
    scrollDispatcher: ScrollDispatcher,
    ngZone: NgZone,
    dir?: Directionality,
  ) {
    super(elementRef, scrollDispatcher, ngZone, dir);
  }
}
