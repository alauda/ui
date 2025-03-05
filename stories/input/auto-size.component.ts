import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <textarea
      [autosize]="{ minRows: minRows, maxRows: maxRows }"
      [(ngModel)]="value"
    ></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AutoSizeComponent {
  minRows = 0;
  maxRows = 0;
  value = 'Hello world!';
}
