import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Tab } from './Tab';

const ITEMS = [
  { value: 'overview', label: 'Overview' },
  { value: 'components', label: 'Components' },
  { value: 'tokens', label: 'Tokens' },
  { value: 'docs', label: 'Docs', disabled: true },
];

const meta: Meta<typeof Tab> = {
  title: 'UI/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    style: { control: 'radio', options: ['underline','filled','pill'] },
    size:  { control: 'select', options: ['sm','md','lg'] },
  },
  args: { style: 'underline', size: 'md', items: ITEMS, value: 'overview' },
};
export default meta;
type Story = StoryObj<typeof Tab>;

export const Playground: Story = {};

export const Underline: Story = {
  args: { style: 'underline', value: 'overview' },
};

export const Filled: Story = {
  args: { style: 'filled', value: 'overview' },
};

export const Pill: Story = {
  args: { style: 'pill', value: 'overview' },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-col gap-6">
      {(['sm','md','lg'] as const).map(s => (
        <Tab key={s} size={s} items={ITEMS} value="overview" />
      ))}
    </div>
  ),
};

export const WithBadge: Story = {
  name: 'With Badge',
  args: {
    items: [
      { value: 'all',     label: 'All',      badge: 24 },
      { value: 'open',    label: 'Open',     badge: 5  },
      { value: 'closed',  label: 'Closed'               },
      { value: 'archived',label: 'Archived', disabled: true },
    ],
    value: 'all',
  },
};

// ─── Interaction Tests ────────────────────────────────────────────────────────

export const TabSwitches: Story = {
  name: 'Interaction: Tab click calls onChange',
  args: { onChange: fn(), value: 'overview' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: /components/i }));
    expect(args.onChange).toHaveBeenCalledWith('components');
  },
};

export const DisabledTabBlocked: Story = {
  name: 'Interaction: Disabled tab blocked',
  args: { onChange: fn(), value: 'overview' },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledTab = canvas.getByRole('tab', { name: /docs/i });
    // Native disabled — assert state without clicking
    expect(disabledTab).toBeDisabled();
    expect(args.onChange).not.toHaveBeenCalled();
  },
};
