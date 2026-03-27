import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Menu } from './Menu';

const DashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
const ChartIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const UsersIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const SettingsIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>;

const ITEMS = [
  { label: 'Dashboard', icon: <DashIcon />,     state: 'active'   as const },
  { label: 'Analytics', icon: <ChartIcon />,    state: 'default'  as const, badge: 3 },
  { label: 'Users',     icon: <UsersIcon />,    state: 'default'  as const },
  { label: 'Settings',  icon: <SettingsIcon />, state: 'disabled' as const },
];

const meta: Meta<typeof Menu> = {
  title: 'UI/Menu',
  component: Menu,
  tags: ['autodocs'],
  args: { items: ITEMS },
};
export default meta;
type Story = StoryObj<typeof Menu>;

export const Playground: Story = {};

export const WithHeader: Story = {
  name: 'With Section Header',
  args: { header: 'Main Navigation', items: ITEMS },
};

export const WithChildren: Story = {
  name: 'With Child Items',
  args: {
    items: [
      { label: 'Dashboard', icon: <DashIcon />, state: 'active' },
      { label: 'Analytics', icon: <ChartIcon />, children: [
        { label: 'Overview' },
        { label: 'Reports' },
        { label: 'Realtime' },
      ]},
      { label: 'Users', icon: <UsersIcon /> },
    ],
  },
};
