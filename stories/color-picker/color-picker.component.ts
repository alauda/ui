import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    template: `
    <aui-color-picker [(ngModel)]="value"></aui-color-picker>
    <br />
    {{ value }}
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export default class ColorPickerComponent {
  value = '#009ce3';
}
