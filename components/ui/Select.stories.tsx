import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size:       { control: 'select', options: ['large','medium','small'] },
    state:      { control: 'select', options: ['default','hover','focus','filled','error','disabled'] },
    label:      { control: 'text' },
    placeholder:{ control: 'text' },
    helperText: { control: 'text' },
  },
  args: { size: 'medium', state: 'default', label: 'Country', placeholder: 'Select a country' },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Select label="Default"  state="default"  />
      <Select label="Error"    state="error"    helperText="Please select an option." />
      <Select label="Disabled" state="disabled" />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      {(['large','medium','small'] as const).map(s => (
        <Select key={s} size={s} label={`Size: ${s}`} placeholder={`${s.charAt(0).toUpperCase()+s.slice(1)} select`} />
      ))}
    </div>
  ),
};
