import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Email', placeholder: 'name@example.com' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}
export const WithHelper: Story = { args: { helperText: 'We only use this to reply to you.' } }
export const Filled: Story = { args: { defaultValue: 'rob@example.com' } }
export const Error: Story = { args: { defaultValue: 'rob@', errorText: 'Enter a valid email address.' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'rob@example.com' } }
export const WithIcon: Story = {
  args: {
    iconLeft: (
      <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    label: 'Search',
  },
}
