import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'UI/File Upload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    state:    { control: 'select', options: ['default','hover','uploading','uploaded','error','disabled'] },
    accept:   { control: 'text' },
    multiple: { control: 'boolean' },
    progress: { control: { type: 'range', min: 0, max: 100 } },
  },
  args: { state: 'default', multiple: false, progress: 0 },
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Playground: Story = {};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <FileUpload state="default"   />
      <FileUpload state="hover"     />
      <FileUpload state="uploading" fileName="design-tokens.zip" progress={65} />
      <FileUpload state="uploaded"  fileName="design-tokens.zip" />
      <FileUpload state="error"     errorMessage="File too large. Max size is 5MB." />
      <FileUpload state="disabled"  />
    </div>
  ),
};

export const ImageOnly: Story = {
  name: 'Image Upload',
  args: { accept: '.png, .jpg, .webp', state: 'default' },
};
