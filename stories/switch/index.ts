import { SwitchModule } from '@alauda/ui';
import { Component } from '@angular/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/angular';

storiesOf('Switch', module).add('switch', () => ({
  component: DemoComponent,
  moduleMetadata: {
    imports: [SwitchModule],
    declarations: [DemoComponent],
  },
}));

@Component({
  template: `
    <span>value: {{ switch1 }}, {{ switch2 }}</span>
    <br />
    <aui-switch name="switch" [(value)]="switch1"></aui-switch>
    <br />
    <aui-switch
      name="switch"
      [(ngModel)]="switch1"
      [disabled]="true"
    ></aui-switch>
    <br />
    <aui-switch
      name="switch"
      [value]="switch2"
      (valueChange)="switchValue()"
      [loading]="loading"
    ></aui-switch>
  `,
})
export class DemoComponent {
  switch1 = true;
  switch2 = true;

  loading = false;

  switchValue() {
    action('beforeSwitch')();
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.switch2 = !this.switch2;
    }, 2000);
  }
}
