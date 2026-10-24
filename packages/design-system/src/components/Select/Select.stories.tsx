import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const options = [
  { value: 'one', label: 'Option one' },
  { value: 'two', label: 'Option two' },
  { value: 'three', label: 'Option three' },
  { value: 'four', label: 'Unavailable option', disabled: true },
]

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  args: { label: 'Project type', options },
  decorators: [(Story) => <div style={{ width: 280, minHeight: 240 }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {}
export const Selected: Story = { args: { defaultValue: 'two' } }
export const WithHelper: Story = { args: { helperText: 'Choose the closest match.' } }
export const Error: Story = { args: { errorText: 'Select an option to continue.' } }
export const Disabled: Story = { args: { disabled: true } }
