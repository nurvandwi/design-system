import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { story: { height: '480px' } },
  },
  argTypes: {
    type:          { control: 'select', options: ['default','info','confirmation','danger','form','slots'] },
    title:         { control: 'text' },
    description:   { control: 'text' },
    open:          { control: 'boolean' },
    hasClose:      { control: 'boolean' },
    primaryLabel:  { control: 'text' },
    secondaryLabel:{ control: 'text' },
  },
  args: {
    type: 'default', open: true, hasClose: true,
    title: 'Confirm action',
    description: 'Are you sure you want to proceed? This action cannot be undone.',
    primaryLabel: 'Confirm', secondaryLabel: 'Cancel',
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Playground: Story = {};

export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <div className="relative h-screen flex flex-col items-center justify-center gap-4 bg-gray-100 p-8">
      <p className="text-sm text-gray-600">Modals shown as cards for display — use Playground for live behavior</p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
        {(['default','info','confirmation','danger','form','slots'] as const).map(t => (
          <div key={t} className="relative overflow-hidden rounded border border-gray-200 bg-white" style={{ height: 200 }}>
            <Modal type={t} title={`${t.charAt(0).toUpperCase()+t.slice(1)} modal`} description="Modal description text here." primaryLabel="OK" secondaryLabel="Cancel" />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Danger: Story = {
  args: { type: 'danger', title: 'Delete project?', description: 'This will permanently delete the project and all its data. This cannot be undone.', primaryLabel: 'Delete project' },
};

export const Form: Story = {
  args: {
    type: 'form',
    title: 'Edit profile',
    description: undefined,
    primaryLabel: 'Save changes',
    children: (
      <div className="flex flex-col gap-3 mt-1">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <input className="rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" placeholder="Your name" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input className="rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" placeholder="you@example.com" />
        </div>
      </div>
    ),
  },
  render: (args) => <Modal {...(args as any)} />,
};

export const NoDescription: Story = {
  name: 'Title Only',
  args: { title: 'Are you sure?', description: undefined },
};

// ─── Interaction Tests ────────────────────────────────────────────────────────

export const CloseButtonFires: Story = {
  name: 'Interaction: Close button calls onClose',
  args: { onClose: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /close modal/i }));
    expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};

export const PrimaryButtonFires: Story = {
  name: 'Interaction: Primary button calls onPrimary',
  args: { onPrimary: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /confirm/i }));
    expect(args.onPrimary).toHaveBeenCalledTimes(1);
  },
};

export const EscapeKeyFires: Story = {
  name: 'Interaction: Escape key calls onClose',
  args: { onClose: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    // Click the primary button to anchor focus inside the modal — onPrimary is
    // not set in this story so the click has no side-effect on the spy.
    await userEvent.click(canvas.getByRole('button', { name: /confirm/i }));
    await userEvent.keyboard('{Escape}');
    expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};
