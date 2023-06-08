import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import InnerScrollerComponent from './anchor.component';

import { AnchorModule, ScrollingModule } from '@alauda/ui';

const meta: Meta<InnerScrollerComponent> = {
  title: 'Example/Anchor',
  component: InnerScrollerComponent,
  decorators: [
    moduleMetadata({
      declarations: [InnerScrollerComponent],
      imports: [ScrollingModule, AnchorModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<InnerScrollerComponent>;

export const innerScroller: Story = {
  name: 'Inner Scroller',
  parameters: {
    docs: {
      source: {
        type: 'code',
        code: `<div
  auiAnchor
  style="max-height: 300px; overflow-y: auto"
>
  <ul class="d-block">
    <li>
      <label
        auiAnchorLabel
        id="abc"
        >Label 1</label
      >
      <div style="height: 100px">Content 1</div>
      <ul
        class="d-block"
        style="margin-left: 20px"
      >
        <li>
          <label
            auiAnchorLabel
            level
            >SubLabel 1-1</label
          >
          <div style="height: 100px">SubContent 1-1</div>
        </li>
        <li>
          <label
            auiAnchorLabel
            level
            >SubLabel 1-2</label
          >
          <div style="height: 100px">SubContent 1-2</div>
        </li>
      </ul>
    </li>
    <li>
      <label auiAnchorLabel>Label 2</label>
      <div style="height: 200px">Content 2</div>
      <ul
        class="d-block"
        style="margin-left: 20px"
      >
        <li>
          <label
            auiAnchorLabel
            level
            >SubLabel 2-1</label
          >
          <div style="height: 100px">SubContent 2-1</div>
        </li>
        <li>
          <label
            auiAnchorLabel
            level
            >SubLabel 2-2</label
          >
          <div style="height: 100px">SubContent 2-2</div>
        </li>
      </ul>
    </li>
    <li>
      <label auiAnchorLabel>Label 3</label>
      <div style="height: 300px">Content 3</div>
    </li>
    <li>
      <label auiAnchorLabel>Label 4</label>
      <div style="height: 400px">Content 4</div>
    </li>
  </ul>
</div>`,
      },
    },
  },
};
