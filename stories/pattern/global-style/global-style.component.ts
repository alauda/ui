import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './global-style.component.html',
  styleUrls: ['./global-style.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalStyleComponent {}
