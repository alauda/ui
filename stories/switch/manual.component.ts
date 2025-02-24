import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    template: `<aui-switch
    [value]="data"
    [loading]="loading"
    (valueChange)="toggle()"
  ></aui-switch> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LoadingSwitchComponent {
  data = false;
  loading = false;

  toggle() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.data = !this.data;
    }, 500);
  }
}
