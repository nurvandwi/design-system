import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size:           { control: 'select', options: ['large','medium','small'], description: 'Small (124px) | Medium (164px) | Large (204px)' },
    state:          { control: 'select', options: ['default','hover','focus','filled','error','disabled'] },
    label:          { control: 'text' },
    placeholder:    { control: 'text' },
    helperText:     { control: 'text' },
    showHelperText: { control: 'boolean', description: 'Show Helper Text' },
    maxLength:      { control: 'number' },
    rows:           { control: 'number' },
  },
  args: { size: 'small', state: 'default', label: 'Message', placeholder: 'Write something…', rows: 4, showHelperText: true },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Textarea label="Default"  state="default"  placeholder="Default" />
      <Textarea label="Error"    state="error"    placeholder="Invalid" helperText="This field is required." />
      <Textarea label="Disabled" state="disabled" placeholder="Disabled" />
    </div>
  ),
};

export const WithCharCount: Story = {
  name: 'With Character Count',
  args: { label: 'Bio', placeholder: 'Tell us about yourself…', maxLength: 200, value: 'Hello!' },
};
