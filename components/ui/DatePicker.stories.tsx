import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'UI/Date Picker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: { story: { height: '380px' } },
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['default','primary','secondary','success','warning','danger'],
      description: 'Calendar accent color: default | primary | secondary | success | warning | danger',
    },
    size: {
      control: 'radio',
      options: ['sm','md','lg'],
      description: 'Trigger height: sm (53px) | md (61px) | lg (69px)',
    },
    mode: {
      control: 'radio',
      options: ['single','range'],
      description: 'Selection mode: single date or date range',
    },
    disabled:   { control: 'boolean' },
    error:      { control: 'boolean' },
    label:      { control: 'text' },
    placeholder:{ control: 'text' },
    helperText: { control: 'text' },
  },
  args: {
    color: 'primary',
    size: 'md',
    mode: 'single',
    label: 'Date',
    placeholder: 'Select date',
    disabled: false,
    error: false,
  },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {};

export const AllColors: Story = {
  name: 'All Color Themes',
  parameters: { docs: { story: { height: '420px' } } },
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {(['default','primary','secondary','success','warning','danger'] as const).map(c => (
        <DatePicker
          key={c}
          color={c}
          label={c.charAt(0).toUpperCase() + c.slice(1)}
          value="2026-03-15"
        />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  parameters: { docs: { story: { height: '260px' } } },
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      {(['sm','md','lg'] as const).map(s => (
        <DatePicker key={s} size={s} label={`Size: ${s}`} placeholder="Select date" />
      ))}
    </div>
  ),
};

export const Filled: Story = {
  name: 'Filled (date selected)',
  args: { value: '2026-03-27', label: 'Start date' },
};

export const ErrorState: Story = {
  name: 'Error State',
  args: { error: true, label: 'Due date', helperText: 'Please select a valid date.' },
};

export const DisabledState: Story = {
  name: 'Disabled',
  args: { disabled: true, label: 'End date', value: '2026-04-01' },
};

export const RangeMode: Story = {
  name: 'Range Picker',
  parameters: { docs: { story: { height: '420px' } } },
  args: {
    mode: 'range',
    label: 'Date range',
    placeholder: 'Select date range',
    color: 'primary',
  },
};

export const RangeFilled: Story = {
  name: 'Range Filled',
  args: {
    mode: 'range',
    label: 'Report period',
    rangeStart: '2026-03-10',
    rangeEnd:   '2026-03-24',
    color: 'primary',
  },
};

export const SuccessTheme: Story = {
  name: 'Success — Available Dates',
  args: { color: 'success', label: 'Booking date', value: '2026-03-20' },
};

export const DangerTheme: Story = {
  name: 'Danger — Deadline',
  args: { color: 'danger', label: 'Cancellation deadline', value: '2026-03-31', helperText: 'After this date, no refunds are available.' },
};

// ─── Interaction Tests ────────────────────────────────────────────────────────

export const CalendarOpenClose: Story = {
  name: 'Interaction: Calendar opens and closes',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    // Open
    await userEvent.click(trigger);
    expect(canvas.getByRole('dialog')).toBeInTheDocument();
    // Click trigger again to close
    await userEvent.click(trigger);
    expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
  },
};

export const DaySelectionFires: Story = {
  name: 'Interaction: Day selection fires onChange',
  args: { onChange: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    // Open calendar
    await userEvent.click(canvas.getByRole('button'));
    const dialog = canvas.getByRole('dialog');
    // dialog buttons: [prevMonth, nextMonth, day1, day2, ...]
    const dayButtons = within(dialog).getAllByRole('button').slice(2);
    await userEvent.click(dayButtons[0]);
    expect(args.onChange).toHaveBeenCalled();
  },
};
