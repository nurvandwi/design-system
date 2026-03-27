import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const CircleIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>
);
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
);
const StarIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
);
const XIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
);

const iconMap = {
  circle: <CircleIcon />,
  check:  <CheckIcon />,
  star:   <StarIcon />,
  x:      <XIcon />,
};

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color:    { control: 'select', options: ['primary','success','error','warning','neutral','info'] },
    style:    { control: 'radio',  options: ['filled','subtle','outline'] },
    icon:     { control: 'select', options: ['none','left','right','icon-only'] },
    label:    { control: 'text' },
    iconNode: {
      control: 'select',
      options: ['circle','check','star','x'],
      mapping: iconMap,
      description: 'Custom icon rendered in the icon slot (iconNode)',
    },
  },
  args: { color: 'primary', style: 'filled', icon: 'none', label: 'Badge', iconNode: iconMap.circle },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const AllColors: Story = {
  name: 'All Colors',
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(['primary','success','error','warning','neutral','info'] as const).map(c => (
        <Badge key={c} {...args} color={c} label={c.charAt(0).toUpperCase()+c.slice(1)} />
      ))}
    </div>
  ),
};

export const AllStyles: Story = {
  name: 'Filled · Subtle · Outline',
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(['filled','subtle','outline'] as const).map(s => (
        <div key={s} className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-gray-500 w-14 shrink-0">{s}</span>
          {(['primary','success','error','warning','neutral','info'] as const).map(c => (
            <Badge key={c} {...args} color={c} style={s} label={c.charAt(0).toUpperCase()+c.slice(1)} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  name: 'Icon Positions',
  render: (args) => (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge {...args} icon="none"      label="No Icon" />
      <Badge {...args} icon="left"      label="Icon Left" />
      <Badge {...args} icon="right"     label="Icon Right" />
      <Badge {...args} icon="icon-only" label="icon" />
    </div>
  ),
};

export const CustomIcons: Story = {
  name: 'Custom Icon Nodes',
  render: (args) => (
    <div className="flex flex-wrap gap-2 items-center">
      {(['circle','check','star','x'] as const).map(k => (
        <Badge key={k} {...args} icon="left" iconNode={iconMap[k]} label={k.charAt(0).toUpperCase()+k.slice(1)} />
      ))}
    </div>
  ),
};
