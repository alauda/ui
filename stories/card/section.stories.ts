import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import CardSectionComponent from './section.component';

import { CardModule } from '@alauda/ui';

const meta: Meta<CardSectionComponent> = {
  title: 'Example/Card',
  component: CardSectionComponent,
  decorators: [
    moduleMetadata({
      declarations: [CardSectionComponent],
      imports: [CardModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CardSectionComponent>;

export const Section: Story = {
  name: 'Section',
};
