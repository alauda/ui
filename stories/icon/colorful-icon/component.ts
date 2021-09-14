import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorfulIconComponent {}
