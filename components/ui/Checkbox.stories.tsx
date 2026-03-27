import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size:          { control: 'select',  options: ['large','medium','small'] },
    state:         { control: 'select',  options: ['default','hover','focus','error','disabled'] },
    checked:       { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    showLabel:     { control: 'boolean', description: 'Show Label' },
    showHelper:    { control: 'boolean', description: 'Show Helper' },
    label:         { control: 'text' },
    helperText:    { control: 'text' },
  },
  args: { size: 'large', state: 'default', checked: false, indeterminate: false, showLabel: true, showHelper: false, label: 'Accept terms', helperText: 'You must accept to continue.' },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Default"       state="default"  checked={false} />
      <Checkbox label="Checked"       state="default"  checked={true}  />
      <Checkbox label="Indeterminate" indeterminate    checked={false} />
      <Checkbox label="Error"         state="error"    checked={false} />
      <Checkbox label="Disabled"      state="disabled" checked={false} />
      <Checkbox label="Disabled checked" state="disabled" checked={true} />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-col gap-3">
      {(['large','medium','small'] as const).map(s => (
        <Checkbox key={s} size={s} label={`${s.charAt(0).toUpperCase()+s.slice(1)} size`} checked />
      ))}
    </div>
  ),
};

// ─── Interaction Tests ────────────────────────────────────────────────────────

export const ToggleCheck: Story = {
  name: 'Interaction: Click calls onChange(true)',
  args: { onChange: fn(), checked: false, label: 'Accept terms' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('checkbox'));
    expect(args.onChange).toHaveBeenCalledWith(true);
  },
};

export const SpaceKeyToggle: Story = {
  name: 'Interaction: Space key calls onChange(true)',
  args: { onChange: fn(), checked: false, label: 'Accept terms' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole('checkbox').focus();
    await userEvent.keyboard(' ');
    expect(args.onChange).toHaveBeenCalledWith(true);
  },
};

export const DisabledCheckboxBlocked: Story = {
  name: 'Interaction: Disabled checkbox blocked',
  args: { onChange: fn(), checked: false, state: 'disabled', label: 'Disabled' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    // Native disabled — assert state without clicking
    expect(checkbox).toBeDisabled();
    expect(args.onChange).not.toHaveBeenCalled();
  },
};
