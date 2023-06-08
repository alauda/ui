import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: 'anchor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InnerScrollerComponent {}
