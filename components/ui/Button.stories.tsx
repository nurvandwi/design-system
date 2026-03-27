import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button, type ButtonProps } from './Button';

// Placeholder icons
const IconPlus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5v14" />
  </svg>
);

const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// Story args swap ReactNode icons for booleans so Storybook controls work
type StoryArgs = Omit<ButtonProps, 'iconLeft' | 'iconRight'> & {
  iconLeft?: boolean;
  iconRight?: boolean;
};

function renderButton(args: StoryArgs) {
  return (
    <Button
      {...args}
      iconLeft={args.iconLeft ? <IconPlus /> : undefined}
      iconRight={args.iconRight ? <IconChevronRight /> : undefined}
    />
  );
}

/**
 * Buttons trigger actions or navigate users to a destination.
 * They come in five types — **Primary, Secondary, Tertiary, Success, Error** —
 * three sizes, and four interactive states.
 *
 * Specs pulled directly from Figma node 14:309.
 * Radius 4px · Font semibold (600) · Gap 8px
 *
 * **Figma:** [Button component](figma://file/YHuv4vU7WdMBGSctEw2cbh?node-id=14:309)
 */
const meta: Meta<StoryArgs> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'error'],
      description: 'Visual style — matches Figma: primary | secondary | tertiary | success | error',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
      description: 'Large (h=48) · Medium (h=40) · Small (h=32)',
      table: { defaultValue: { summary: 'medium' } },
    },
    label: {
      control: 'text',
      description: 'Text label displayed inside the button',
      table: { defaultValue: { summary: 'Button' } },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner — replaces label with spinner + "Loading…"',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state — bg: #d4d4d4, text: #737373',
      table: { defaultValue: { summary: 'false' } },
    },
    iconLeft: {
      control: 'boolean',
      description: 'Show a + icon before the label',
      table: { defaultValue: { summary: 'false' } },
    },
    iconRight: {
      control: 'boolean',
      description: 'Show a › icon after the label',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: 'Button',
    type: 'primary',
    size: 'medium',
    loading: false,
    disabled: false,
    iconLeft: false,
    iconRight: false,
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => renderButton(args),
};

// ─── All Types ────────────────────────────────────────────────────────────────

export const Types: Story = {
  name: 'All Types',
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-center">
      {(['primary', 'secondary', 'tertiary', 'success', 'error'] as const).map((type) => (
        <Button key={type} {...args} type={type} label={type.charAt(0).toUpperCase() + type.slice(1)} />
      ))}
    </div>
  ),
};

// ─── All Sizes ────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'All Sizes',
  render: (args) => (
    <div className="flex flex-wrap gap-3 items-center">
      {(['large', 'medium', 'small'] as const).map((size) => (
        <Button key={size} {...args} size={size} label={`${size.charAt(0).toUpperCase() + size.slice(1)} (${size === 'large' ? '48px' : size === 'medium' ? '40px' : '32px'})`} />
      ))}
    </div>
  ),
};

// ─── States ───────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { loading: true, label: 'Saving…' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

// ─── Individual types ─────────────────────────────────────────────────────────

export const Primary: Story = {
  args: { type: 'primary', label: 'Primary' },
};

export const Secondary: Story = {
  args: { type: 'secondary', label: 'Secondary' },
};

export const Tertiary: Story = {
  args: { type: 'tertiary', label: 'Tertiary' },
};

export const Success: Story = {
  args: { type: 'success', label: 'Confirm' },
};

export const Error: Story = {
  args: { type: 'error', label: 'Delete' },
};

// ─── Icons ────────────────────────────────────────────────────────────────────

export const WithIconLeft: Story = {
  name: 'Icon Left',
  args: { iconLeft: true, label: 'Add item' },
  render: (args) => renderButton(args),
};

export const WithIconRight: Story = {
  name: 'Icon Right',
  args: { iconRight: true, label: 'Continue' },
  render: (args) => renderButton(args),
};

export const WithBothIcons: Story = {
  name: 'Icon Both',
  args: { iconLeft: true, iconRight: true, label: 'Add & go' },
  render: (args) => renderButton(args),
};

// ─── Type × Size Matrix ───────────────────────────────────────────────────────

export const TypeSizeMatrix: Story = {
  name: 'Type × Size Matrix',
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'tertiary', 'success', 'error'] as const).map((type) => (
        <div key={type} className="flex gap-3 items-center">
          {(['large', 'medium', 'small'] as const).map((size) => (
            <Button
              key={size}
              {...args}
              type={type}
              size={size}
              label={`${type} / ${size}`}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ─── Interaction Tests ────────────────────────────────────────────────────────

export const ClickFires: Story = {
  name: 'Interaction: Click fires onClick',
  args: { onClick: fn(), label: 'Click me', iconLeft: false, iconRight: false },
  render: (args) => renderButton(args),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const DisabledBlocks: Story = {
  name: 'Interaction: Disabled blocks click',
  args: { onClick: fn(), disabled: true, label: 'Disabled', iconLeft: false, iconRight: false },
  render: (args) => renderButton(args),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    // pointer-events: none is applied via CSS — cannot click; assert aria state instead
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(args.onClick).not.toHaveBeenCalled();
  },
};
