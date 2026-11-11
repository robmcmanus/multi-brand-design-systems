import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'
import { ChipGroup } from './ChipGroup'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: { children: 'Sci-fi', selected: false, disabled: false },
  argTypes: { icon: { control: false } },
}
export default meta
type Story = StoryObj<typeof Chip>

const Plus = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
)

/** Controlled by Storybook args — toggle `selected` and `disabled` in Controls */
export const Playground: Story = {}

/** Click to toggle */
export const Toggle: Story = {
  render: (args) => {
    const [on, setOn] = useState(false)
    return <Chip {...args} selected={on} onSelectedChange={setOn} />
  },
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, max-content)', gap: 16, alignItems: 'center' }}>
      <Chip>Unselected</Chip>
      <Chip icon={<Plus />}>With icon</Chip>
      <Chip selected>Selected</Chip>
      <Chip selected icon={<Plus />}>Selected + icon</Chip>
      <Chip disabled>Disabled</Chip>
      <Chip disabled icon={<Plus />}>Disabled</Chip>
      <Chip disabled selected>Disabled</Chip>
      <Chip disabled selected icon={<Plus />}>Disabled</Chip>
    </div>
  ),
}

const genres = ['Action', 'Comedy', 'Drama', 'Sci-fi', 'Horror', 'Animation', 'Documentary', 'Thriller'].map(
  (g) => ({ value: g.toLowerCase(), label: g })
)

/** Multi-select genre filter */
export const GenreFilter: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['action', 'drama'])
    return (
      <div style={{ maxWidth: 400 }}>
        <ChipGroup label="Filter by genre" options={genres} value={value} onChange={setValue} />
        <p style={{ marginTop: 16, fontSize: 12, opacity: 0.7 }}>Selected: {value.join(', ') || 'none'}</p>
      </div>
    )
  },
}

/** Single-select — choosing one clears the others */
export const SingleSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['now'])
    return (
      <ChipGroup
        label="Showing"
        multiple={false}
        value={value}
        onChange={setValue}
        options={[
          { value: 'now', label: 'Now showing' },
          { value: 'soon', label: 'Coming soon' },
          { value: 'streaming', label: 'Streaming' },
        ]}
      />
    )
  },
}
