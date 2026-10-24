import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = { title: 'Components/Tag', component: Tag }
export default meta
type Story = StoryObj<typeof Tag>

export const Static: Story = { render: () => <div style={{ display: 'flex', gap: 8 }}><Tag>Design systems</Tag><Tag size="md">Research</Tag></div> }

export const Interactive: Story = {
  render: () => {
    const [on, setOn] = useState<string[]>(['Product'])
    const toggle = (t: string) => setOn((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {['Product', 'Research', 'Systems'].map((t) => (
          <Tag key={t} size="md" selected={on.includes(t)} onClick={() => toggle(t)}>{t}</Tag>
        ))}
      </div>
    )
  },
}
