import { ColorPickerModule } from '@alauda/ui';
import { FormsModule } from '@angular/forms';
import { storiesOf } from '@storybook/angular';

storiesOf('ColorPicker', module).add('Default', () => {
  const value = '#009ce3';

  return {
    moduleMetadata: {
      imports: [ColorPickerModule, FormsModule],
    },
    template: /* HTML */ `
      <aui-color-picker [(ngModel)]="value"></aui-color-picker>
      <br />
      {{ value }}
    `,
    props: {
      value,
    },
  };
});
