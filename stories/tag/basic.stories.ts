import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import TagBasicComponent from './basic.component';

import { TagModule } from '@alauda/ui';

const meta: Meta<TagBasicComponent> = {
  title: 'Example/Tag',
  component: TagBasicComponent,
  decorators: [
    moduleMetadata({
      declarations: [TagBasicComponent],
      imports: [TagModule, FormsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<TagBasicComponent>;

export const Basic: Story = {
  name: 'Basic',
  args: {
    border: false,
    solid: false,
    size: 'medium',
    closeable: false,
    invalid: false,
    round: false,
    allowClick: false,
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `
        <aui-tag
        type="primary"
        [border]="border"
        [size]="size"
        [solid]="solid"
        [closeable]="closeable"
        [invalid]="invalid"
        [round]="round"
        [allowClick]="allowClick"
        >primary</aui-tag
      >
      <aui-tag
        type="success"
        [border]="border"
        [size]="size"
        [solid]="solid"
        [closeable]="closeable"
        [invalid]="invalid"
        [round]="round"
        [allowClick]="allowClick"
        >success</aui-tag
      >
      <aui-tag
        type="warning"
        [border]="border"
        [size]="size"
        [solid]="solid"
        [closeable]="closeable"
        [invalid]="invalid"
        [round]="round"
        [allowClick]="allowClick"
        >warning</aui-tag
      >
      <aui-tag
        type="error"
        [border]="border"
        [size]="size"
        [solid]="solid"
        [closeable]="closeable"
        [invalid]="invalid"
        [round]="round"
        [allowClick]="allowClick"
        >error</aui-tag
      >
      <aui-tag
        type="info"
        [border]="border"
        [size]="size"
        [solid]="solid"
        [closeable]="closeable"
        [invalid]="invalid"
        [round]="round"
        [allowClick]="allowClick"
        >info</aui-tag
      >
`,
      },
    },
  },
};
