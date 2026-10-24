import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  args: { href: '#', children: 'Read the case study' },
}
export default meta
type Story = StoryObj<typeof Link>

export const Inline: Story = {
  render: (args) => (
    <p style={{ maxWidth: 480 }}>
      Body copy continues here and then <Link {...args} variant="inline" /> before carrying on.
    </p>
  ),
}
export const Standalone: Story = { args: { variant: 'standalone' } }
export const External: Story = { args: { variant: 'standalone', external: true, children: 'View on GitHub' } }
export const Disabled: Story = { args: { 'aria-disabled': true, children: 'Unavailable' } }
