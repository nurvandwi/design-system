import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  title: 'UI/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    type:        { control: 'select', options: ['primary','secondary','tertiary'] },
    size:        { control: 'select', options: ['large','medium','small'] },
    orientation: { control: 'radio', options: ['horizontal','vertical'] },
    disabled:    { control: 'boolean' },
  },
  args: { type: 'primary', size: 'medium', orientation: 'horizontal', disabled: false },
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Playground: Story = {};

export const Horizontal: Story = {
  args: { orientation: 'horizontal', items: [{ label: 'Save' }, { label: 'Preview' }, { label: 'Discard' }] },
};

export const Vertical: Story = {
  args: { orientation: 'vertical', items: [{ label: 'Top' }, { label: 'Middle' }, { label: 'Bottom' }] },
};

export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary','secondary','tertiary'] as const).map(t => (
        <ButtonGroup key={t} type={t} items={[{ label: 'First' }, { label: 'Second' }, { label: 'Third' }]} />
      ))}
    </div>
  ),
};
