import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Input, type InputProps } from './Input';

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

type StoryArgs = InputProps & {
  showIconLeft?: boolean;
  showIconRight?: boolean;
  showHelperText?: boolean;
};

function renderInput(args: StoryArgs) {
  const { showIconLeft, showIconRight, showHelperText, helperText, ...rest } = args;
  return (
    <Input
      {...rest}
      leadingIcon={showIconLeft ? <MailIcon /> : undefined}
      trailingIcon={showIconRight ? <SearchIcon /> : undefined}
      helperText={showHelperText ? (helperText || 'Helper text') : undefined}
    />
  );
}

const meta: Meta<StoryArgs> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    inputType:      { control: 'radio',   options: ['default','search','number'], description: 'Type: Default | Search | Number' },
    size:           { control: 'select',  options: ['large','medium','small'],    description: 'Large (48px) | Medium (40px) | Small (32px)' },
    state:          { control: 'select',  options: ['default','hover','focus','filled','error','disabled'] },
    label:          { control: 'text' },
    placeholder:    { control: 'text' },
    helperText:     { control: 'text' },
    showIconLeft:   { control: 'boolean', description: 'Show Icon Left' },
    showIconRight:  { control: 'boolean', description: 'Show Icon Right' },
    showHelperText: { control: 'boolean', description: 'Show Helper Text' },
  },
  args: {
    inputType: 'default', size: 'large', state: 'default',
    label: 'Email', placeholder: 'you@example.com',
    showIconLeft: false, showIconRight: false, showHelperText: false,
  },
};
export default meta;
type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  render: (args) => renderInput(args),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Input label="Default"  state="default"  placeholder="Placeholder" />
      <Input label="Focus"    state="focus"    placeholder="Focused" />
      <Input label="Filled"   state="filled"   placeholder="Filled" value="user@example.com" />
      <Input label="Error"    state="error"    placeholder="Invalid" helperText="Please enter a valid email." />
      <Input label="Disabled" state="disabled" placeholder="Disabled" />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      {(['large','medium','small'] as const).map(s => (
        <Input key={s} size={s} placeholder={`${s.charAt(0).toUpperCase()+s.slice(1)} input`} />
      ))}
    </div>
  ),
};

export const SearchVariant: Story = {
  name: 'Search Input',
  args: { inputType: 'search', label: 'Search', placeholder: 'Search components…' },
  render: (args) => renderInput(args),
};

export const NumberVariant: Story = {
  name: 'Number Input',
  args: { inputType: 'number', label: 'Quantity', placeholder: '0' },
  render: (args) => renderInput(args),
};

export const WithIcons: Story = {
  name: 'With Icons',
  args: { showIconLeft: true, showIconRight: true, label: 'Email', placeholder: 'you@example.com' },
  render: (args) => renderInput(args),
};

export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: { showHelperText: true, helperText: 'Minimum 8 characters.', label: 'Password', placeholder: '••••••••' },
  render: (args) => renderInput(args),
};

// ─── Interaction Tests ────────────────────────────────────────────────────────

export const TypingCallsOnChange: Story = {
  name: 'Interaction: Typing calls onChange',
  args: { onChange: fn(), label: 'Name', placeholder: 'Type here' },
  render: (args) => renderInput(args),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByRole('textbox'), 'hello');
    expect(args.onChange).toHaveBeenCalled();
    expect(args.onChange).toHaveBeenLastCalledWith('hello');
  },
};

export const ErrorStateShowsHelper: Story = {
  name: 'Interaction: Error state shows helper text',
  args: { state: 'error', helperText: 'Invalid email address.', showHelperText: true },
  render: (args) => renderInput(args),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Invalid email address.')).toBeInTheDocument();
    expect(canvas.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  },
};
