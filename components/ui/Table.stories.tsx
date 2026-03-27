import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Table, type Column, type BadgeCell } from './Table';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    selectable: { control: 'boolean', description: 'Show checkbox column for row selection' },
    caption:    { control: 'text',    description: 'Accessible table caption (visually hidden)' },
  },
};
export default meta;
type Story = StoryObj<typeof Table>;

// ─── Shared data ──────────────────────────────────────────────────────────────

const COLUMNS: Column[] = [
  { key: 'name',    label: 'Name',    type: 'default', sortable: true  },
  { key: 'role',    label: 'Role',    type: 'default', sortable: true  },
  { key: 'status',  label: 'Status',  type: 'badge'                    },
  { key: 'revenue', label: 'Revenue', type: 'nominal', sortable: true  },
  { key: 'actions', label: '',        type: 'action',  width: '48px', ariaLabel: 'Actions'  },
];

const ROWS: Record<string, string | number | boolean | BadgeCell>[] = [
  { name: 'Acme Corp',    role: 'Customer',   status: { label: 'Active',   color: 'success' }, revenue: 128500, actions: '' },
  { name: 'Globex Inc',   role: 'Partner',    status: { label: 'Pending',  color: 'warning' }, revenue:  84200, actions: '' },
  { name: 'Initech',      role: 'Customer',   status: { label: 'Inactive', color: 'neutral' }, revenue:  32000, actions: '' },
  { name: 'Umbrella Co',  role: 'Enterprise', status: { label: 'Active',   color: 'success' }, revenue: 310000, actions: '' },
  { name: 'Cyberdyne',    role: 'Customer',   status: { label: 'Error',    color: 'error'   }, revenue:  18750, actions: '' },
  { name: 'Soylent Corp', role: 'Partner',    status: { label: 'Active',   color: 'success' }, revenue:  59400, actions: '' },
];

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { columns: COLUMNS, rows: ROWS, selectable: false, caption: 'Company overview' },
};

export const WithSelection: Story = {
  name: 'With Row Selection',
  args: { columns: COLUMNS, rows: ROWS, selectable: true, caption: 'Company overview' },
};

export const Sortable: Story = {
  name: 'Sortable Columns',
  args: { columns: COLUMNS, rows: ROWS, selectable: true, caption: 'Sortable company data' },
  parameters: { docs: { description: { story: 'Click column headers marked with a chevron to sort ascending → descending → unsorted.' } } },
};

export const BadgeCells: Story = {
  name: 'Badge & Nominal Cells',
  args: {
    columns: [
      { key: 'product',  label: 'Product',  type: 'default', sortable: true },
      { key: 'category', label: 'Category', type: 'badge'                   },
      { key: 'price',    label: 'Price',    type: 'nominal', sortable: true },
      { key: 'stock',    label: 'Stock',    type: 'nominal', sortable: true },
    ],
    rows: [
      { product: 'Pro Plan',      category: { label: 'SaaS',      color: 'primary'   }, price: 99,  stock: 999 },
      { product: 'Enterprise',    category: { label: 'SaaS',      color: 'primary'   }, price: 499, stock: 50  },
      { product: 'Design Kit',    category: { label: 'Asset',     color: 'secondary' }, price: 49,  stock: 200 },
      { product: 'Support Hours', category: { label: 'Service',   color: 'success'   }, price: 150, stock: 100 },
      { product: 'Consultation',  category: { label: 'Service',   color: 'warning'   }, price: 250, stock: 12  },
    ],
  },
};

export const AllCellTypes: Story = {
  name: 'All Cell Types',
  args: {
    columns: [
      { key: 'default', label: 'Default',  type: 'default' },
      { key: 'badge',   label: 'Badge',    type: 'badge'   },
      { key: 'nominal', label: 'Nominal',  type: 'nominal' },
      { key: 'action',  label: '',         type: 'action', width: '48px', ariaLabel: 'Actions' },
    ],
    rows: [
      { default: 'Text cell',    badge: { label: 'Active',  color: 'success' }, nominal: 12500, action: '' },
      { default: 'Another row',  badge: { label: 'Pending', color: 'warning' }, nominal: 8400,  action: '' },
      { default: 'Third entry',  badge: { label: 'Error',   color: 'error'   }, nominal: 3200,  action: '' },
    ],
    selectable: true,
  },
};

export const Empty: Story = {
  name: 'Empty State',
  args: { columns: COLUMNS, rows: [], caption: 'No data' },
};
