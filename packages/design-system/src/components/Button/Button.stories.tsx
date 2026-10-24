import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state and disables interaction',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    onClick: { action: 'clicked' },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Core interactive element. Reads from component tokens — switch brands via the toolbar to see each brand's personality applied automatically.",
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ── Individual variants ──────────────────────────────────────────────────────

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Destructive: Story = {
  args: { variant: 'destructive' },
}

// ── States ───────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { loading: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes — all',
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
}

// ── Icons ─────────────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: 'Icons',
  render: (args) => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button {...args} iconLeft={<ArrowLeft />}>Back</Button>
      <Button {...args} iconRight={<ArrowRight />}>Next</Button>
      <Button {...args} iconLeft={<Plus />}>Add item</Button>
      <Button {...args} variant="secondary" iconLeft={<Download />}>Export</Button>
    </div>
  ),
}

// ── All variants grid ─────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All variants',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button {...args} variant="primary" size={size}>Primary</Button>
          <Button {...args} variant="secondary" size={size}>Secondary</Button>
          <Button {...args} variant="ghost" size={size}>Ghost</Button>
          <Button {...args} variant="destructive" size={size}>Destructive</Button>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the brand switcher in the toolbar to compare how each brand personality changes these components.',
      },
    },
  },
}

export const DisabledAll: Story = {
  name: 'Disabled — all variants',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </div>
  ),
}

// ── Inline icon primitives (no icon library dependency) ───────────────────────

function ArrowLeft() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Plus() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function Download() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v7M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
