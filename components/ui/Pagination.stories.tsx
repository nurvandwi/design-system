import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 20 } },
    totalPages:  { control: { type: 'number', min: 1, max: 20 } },
  },
  args: { currentPage: 1, totalPages: 10 },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {};

export const MidPage: Story = {
  name: 'Middle Page',
  args: { currentPage: 5, totalPages: 10 },
};

export const LastPage: Story = {
  name: 'Last Page',
  args: { currentPage: 10, totalPages: 10 },
};

export const FewPages: Story = {
  name: 'Few Pages (≤7)',
  args: { currentPage: 3, totalPages: 5 },
};
