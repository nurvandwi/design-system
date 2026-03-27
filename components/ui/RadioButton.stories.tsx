import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RadioButton } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'UI/Radio Button',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    size:      { control: 'select', options: ['large','medium','small'] },
    state:     { control: 'select', options: ['default','hover','focus','disabled'] },
    selected:  { control: 'boolean' },
    label:     { control: 'text' },
  },
  args: { size: 'large', state: 'default', selected: false, label: 'Option A' },
};
export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Playground: Story = {};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-3">
      <RadioButton label="Default"           state="default"  selected={false} />
      <RadioButton label="Selected"          state="default"  selected={true}  />
      <RadioButton label="Focus"             state="focus"    selected={false} />
      <RadioButton label="Disabled"          state="disabled" selected={false} />
      <RadioButton label="Disabled Selected" state="disabled" selected={true}  />
    </div>
  ),
};

export const RadioGroup: Story = {
  name: 'Radio Group Example',
  render: () => (
    <fieldset className="flex flex-col gap-3 border-0 p-0 m-0">
      <legend className="text-sm font-semibold text-[var(--text-bold)] mb-2">Choose a plan</legend>
      <RadioButton name="plan" value="free"    label="Free"       selected={true}  />
      <RadioButton name="plan" value="pro"     label="Pro"        selected={false} />
      <RadioButton name="plan" value="enterprise" label="Enterprise" selected={false} />
    </fieldset>
  ),
};
