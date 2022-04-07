import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: 'shadow.component.html',
  styleUrls: ['shadow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShadowComponent {}
