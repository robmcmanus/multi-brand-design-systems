import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from './Accordion'

const items = [
  { id: 'a', title: 'What problem did this solve?', content: 'A short explanation in plain text.' },
  { id: 'b', title: 'How was it tested?', content: 'Usability sessions and accessibility checks.' },
  { id: 'c', title: 'Archived notes', content: 'Not available.', disabled: true },
]

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  args: { items },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Accordion>

export const Single: Story = { args: { defaultOpen: ['a'] } }
export const Grouped: Story = { args: { multiple: true, defaultOpen: ['a', 'b'] } }
