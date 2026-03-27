import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ButtonIcon } from './ButtonIcon';

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5v14"/>
  </svg>
);

const meta: Meta<typeof ButtonIcon> = {
  title: 'UI/Button Icon',
  component: ButtonIcon,
  tags: ['autodocs'],
  argTypes: {
    type:     { control: 'select', options: ['primary','secondary','tertiary','success','error'] },
    size:     { control: 'select', options: ['large','medium','small'] },
    disabled: { control: 'boolean' },
    label:    { control: 'text' },
  },
  args: { type: 'primary', size: 'medium', disabled: false, label: 'Add item', icon: <PlusIcon /> },
};
export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const Playground: Story = {};

export const AllTypes: Story = {
  name: 'All Types',
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-center">
      {(['primary','secondary','tertiary','success','error'] as const).map(t => (
        <ButtonIcon key={t} {...args} type={t} label={t} icon={<PlusIcon />} />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-center">
      {(['large','medium','small'] as const).map(s => (
        <ButtonIcon key={s} {...args} size={s} label={s} icon={<PlusIcon />} />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled action', icon: <PlusIcon /> },
};
