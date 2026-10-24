import type { Meta, StoryObj } from '@storybook/react'
import { SiteHeader } from './SiteHeader'

const meta: Meta<typeof SiteHeader> = {
  title: 'Components/Site header',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
  args: {
    logo: 'Rob McManus',
    items: [
      { label: 'Work', href: '#work', current: true },
      { label: 'About', href: '#about' },
      { label: 'Resume', href: '#resume' },
      { label: 'Contact', href: '#contact' },
    ],
  },
}
export default meta
type Story = StoryObj<typeof SiteHeader>

export const Desktop: Story = {}
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile1' } } }
