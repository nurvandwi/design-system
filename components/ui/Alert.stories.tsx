import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    type:        { control: 'select', options: ['info','success','error','warning'] },
    title:       { control: 'text' },
    description: { control: 'text' },
    showClose:   { control: 'boolean' },
  },
  args: { type: 'info', title: 'Heads up!', description: '', showClose: false },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {};

export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <Alert type="info"    title="Informational" description="This is an informational message." />
      <Alert type="success" title="Success!"       description="Your changes have been saved." />
      <Alert type="warning" title="Warning"        description="This action may have consequences." />
      <Alert type="error"   title="Error"          description="Something went wrong. Please try again." />
    </div>
  ),
};

export const WithClose: Story = {
  name: 'With Close Button',
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-lg">
      <Alert type="info"    title="Dismissible"  showClose />
      <Alert type="success" title="All done!"    showClose />
      <Alert type="error"   title="Failed"       showClose description="Click × to dismiss." />
    </div>
  ),
};

export const TitleOnly: Story = {
  name: 'Title Only',
  args: { title: 'Simple notification — no description.' },
};
