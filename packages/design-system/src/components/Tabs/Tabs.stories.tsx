import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from './Tabs'

const meta: Meta<typeof Tabs> = { title: 'Components/Tabs', component: Tabs }
export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    'aria-label': 'Sections',
    items: [
      { id: 'a', label: 'Overview', content: 'Overview panel' },
      { id: 'b', label: 'Process', content: 'Process panel' },
      { id: 'c', label: 'Outcome', content: 'Outcome panel' },
      { id: 'd', label: 'Archived', disabled: true, content: 'Unavailable' },
    ],
  },
}

export const BrandSwitch: Story = {
  args: {
    'aria-label': 'Brand',
    defaultValue: '1',
    items: [{ id: '1', label: 'Brand 1' }, { id: '2', label: 'Brand 2' }, { id: '3', label: 'Brand 3' }],
  },
}
