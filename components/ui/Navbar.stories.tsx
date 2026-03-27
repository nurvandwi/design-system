import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Navbar } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'UI/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    state: { control: 'radio', options: ['default','scrolled'], description: 'State: Default | Scrolled' },
  },
  args: { state: 'default' },
};
export default meta;
type Story = StoryObj<typeof Navbar>;

export const Playground: Story = {};

export const Default: Story = {
  args: { state: 'default' },
};

export const Scrolled: Story = {
  args: { state: 'scrolled' },
};
